"use client";

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Filler,
  Legend,
  ChartConfiguration,
} from 'chart.js';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '@/app/constants/config';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Filler,
  Legend
);

interface Product {
  id: number;
  nama: string;
  prediksi: string;
  ikon: string;
}

interface Dataset {
  marketing_nip: string;
  label: string;
  data: number[];
  targets: null;
  borderColor: string;
  backgroundColor: string;
  fill: boolean;
  tension: number;
  target: number;
}

interface ChartData {
  produk: string;
  produk_id: string;
  labels: string[];
  datasets: Dataset[];
}

interface ProductChartProps {
  className?: string;
}

const ProductChart: React.FC<ProductChartProps> = ({ className = '' }) => {
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [periodType, setPeriodType] = useState<'week' | 'month' | 'year'>('month');
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [checkedMarketings, setCheckedMarketings] = useState<Set<string>>(new Set(['ALL']));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<'line'> | null>(null);
  const { user } = useAuth();

  // Fetch products with better error handling
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const token = Cookies.get('token');
        if (!token) throw new Error('No auth token found');

        const response = await fetch(`${API_BASE_URL}/produk`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        setProducts(data);
        if (data.length > 0) setSelectedProduct(data[0]);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch products');
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Improved chart data fetching
  useEffect(() => {
    const fetchChartData = async () => {
      if (!selectedProduct || !user?.target_month || !user?.target_year) return;

      try {
        setIsLoading(true);
        const token = Cookies.get('token');
        if (!token) throw new Error('No auth token found');

        const url = new URL(`${API_BASE_URL}/bm/monitoring/product-performance`);
        url.searchParams.append('month', user.target_month.toString());
        url.searchParams.append('year', user.target_year.toString());
        url.searchParams.append('product_id', selectedProduct.id.toString());
        url.searchParams.append('group_by', periodType);

        const response = await fetch(url.toString(), {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Failed to fetch chart data');

        const data = await response.json();
        if (data.success) {
          setChartData(data.data);
          const newChecked = new Set(['ALL']);
          setCheckedMarketings(newChecked);
        } else {
          throw new Error(data.message || 'Failed to fetch chart data');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch chart data');
        console.error('Error fetching chart data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [selectedProduct, user?.target_month, user?.target_year, periodType]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowProductDropdown(false);
  };

  const handlePeriodChange = (period: 'week' | 'month' | 'year') => {
    setPeriodType(period);
  };

  const handleCheckboxChange = (marketingNip: string) => {
    setCheckedMarketings(prev => {
      const newChecked = new Set(prev);
      if (marketingNip === 'ALL') {
        if (newChecked.has('ALL')) {
          newChecked.clear();
        } else {
          newChecked.clear();
          newChecked.add('ALL');
        }
      } else {
        if (newChecked.has(marketingNip)) {
          newChecked.delete(marketingNip);
          newChecked.delete('ALL');
        } else {
          newChecked.add(marketingNip);
          if (chartData && newChecked.size === chartData.datasets.length - 1) {
            newChecked.add('ALL');
          }
        }
      }
      return newChecked;
    });
  };

  useEffect(() => {
    updateChart();
    return () => {
      chartInstance.current?.destroy();
    };
  }, [chartData, checkedMarketings]);

  const updateChart = () => {
    if (!chartData) return;
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    const filteredDatasets = chartData.datasets.filter(
      dataset => checkedMarketings.has(dataset.marketing_nip)
    );

    const chartConfig: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: filteredDatasets.map(dataset => ({
          label: dataset.label,
          data: dataset.data,
          borderColor: dataset.borderColor,
          backgroundColor: `${dataset.backgroundColor}20`,
          tension: dataset.tension,
          fill: true,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            display: false,
            grid: {
              display: false,
            },
          },
          x: {
            title: {
              display: false,
            },
            grid: {
              display: true,
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.dataset.label || '';
                const value = context.parsed.y;
                if (value !== null) {
                  return `${label}: Rp ${(value / 1_000_000).toFixed(1)}M`;
                }
                return label;
              },
            },
          },
          legend: {
            display: false,
          },
        },
      },
    };

    chartInstance.current = new Chart(ctx, chartConfig);
  };

  return (
    <div className={`border border-teal-500 rounded-lg overflow-hidden bg-white p-4 ${className}`}>
      {error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start mb-2">
            <h2 className="text-xl font-semibold mb-2 md:mb-0">Performa Target Produk</h2>

            <div className="w-full md:w-auto">
              <div className="relative w-full md:w-40 mb-2">
                <button
                  className="w-full flex justify-between items-center px-3 py-1 bg-white border border-gray-300 rounded-lg focus:outline-none"
                  onClick={() => setShowProductDropdown(!showProductDropdown)}
                >
                  <span className="text-gray-700 text-sm">
                    {selectedProduct?.nama || 'Pilih Produk'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {showProductDropdown && (
                  <div className="absolute right-0 z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <ul>
                      {products.map((product) => (
                        <li
                          key={product.id}
                          className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => handleSelectProduct(product)}
                        >
                          {product.nama}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex rounded-lg bg-gray-100 w-max">
                {(['week', 'month', 'year'] as const).map((period) => (
                  <button
                    key={period}
                    className={`px-4 py-1 rounded-lg text-sm ${
                      periodType === period ? 'bg-teal-500 text-white' : 'text-gray-700'
                    }`}
                    onClick={() => handlePeriodChange(period)}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-48 mb-4">
            <canvas ref={chartRef}></canvas>
          </div>

          {chartData && (
            <div className="flex flex-wrap gap-3">
              {chartData.datasets.map((dataset) => (
                <div key={dataset.marketing_nip} className="flex items-center">
                  <input
                    type="checkbox"
                    id={dataset.marketing_nip}
                    checked={checkedMarketings.has(dataset.marketing_nip)}
                    onChange={() => handleCheckboxChange(dataset.marketing_nip)}
                    className="w-4 h-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500"
                  />
                  <label htmlFor={dataset.marketing_nip} className="ml-1 flex items-center text-sm">
                    <div
                      className="w-3 h-3 mr-1 rounded-sm"
                      style={{ backgroundColor: dataset.backgroundColor }}
                    ></div>
                    {dataset.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductChart;

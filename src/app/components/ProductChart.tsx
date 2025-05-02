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

// Dummy sales data untuk inisialisasi
const salesData = [
  {
    id: '1',
    name: 'ucup1',
    color: '#10b981',
    checked: true,
    data: {
      weekly: { Mon: 1000000, Tue: 2000000, Wed: 3000000, Thu: 2500000, Fri: 4000000 },
      monthly: { Jan: 10000000, Feb: 20000000, Mar: 15000000, Apr: 25000000 },
      yearly: { '2022': 80000000, '2023': 120000000 },
    },
  },
  {
    id: '2',
    name: 'ucup2',
    color: '#3b82f6',
    checked: true,
    data: {
      weekly: { Mon: 1500000, Tue: 1800000, Wed: 2100000, Thu: 1900000, Fri: 3000000 },
      monthly: { Jan: 12000000, Feb: 18000000, Mar: 16000000, Apr: 22000000 },
      yearly: { '2022': 70000000, '2023': 110000000 },
    },
  },
];

// Tipe data
interface PeriodData {
  [key: string]: number;
}

interface SalesDataPeriods {
  weekly: PeriodData;
  monthly: PeriodData;
  yearly: PeriodData;
}

interface SalesData {
  id: string;
  name: string;
  color: string;
  checked: boolean;
  data: SalesDataPeriods;
}

interface ProductChartProps {
  className?: string;
}

type PeriodType = 'Week' | 'Month' | 'Years';

const ProductChart: React.FC<ProductChartProps> = ({ className = '' }) => {
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('Mitraguna');
  const [periodType, setPeriodType] = useState<PeriodType>('Month');
  const [salesState, setSalesState] = useState<SalesData[]>(salesData);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<'line'> | null>(null);

  const PRODUCTS = ['Mitraguna', 'Griya', 'OTO', 'Modal Kerja', 'Investasi', 'KTA'] as const;

  const handleSelectProduct = (product: string) => {
    setSelectedProduct(product);
    setShowProductDropdown(false);
  };

  const handlePeriodChange = (period: PeriodType) => {
    setPeriodType(period);
  };

  const handleCheckboxChange = (id: string) => {
    setSalesState((prev) =>
      prev.map((sales) =>
        sales.id === id ? { ...sales, checked: !sales.checked } : sales
      )
    );
  };

  const getLabels = (): string[] => {
    const firstSales = salesState.find((s) => s.checked);
    if (!firstSales) return [];

    return Object.keys({
      Week: firstSales.data.weekly,
      Month: firstSales.data.monthly,
      Years: firstSales.data.yearly,
    }[periodType]);
  };

  const getDataValues = (sales: SalesData): number[] => {
    return Object.values({
      Week: sales.data.weekly,
      Month: sales.data.monthly,
      Years: sales.data.yearly,
    }[periodType]);
  };

  const updateChart = () => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    const chartConfig: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: getLabels(),
        datasets: salesState
          .filter((sales) => sales.checked)
          .map((sales) => ({
            label: sales.name,
            data: getDataValues(sales),
            borderColor: sales.color,
            backgroundColor: `${sales.color}20`,
            tension: 0.4,
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

  useEffect(() => {
    updateChart();
    return () => {
      chartInstance.current?.destroy();
    };
  }, [salesState, periodType, selectedProduct]);

  return (
    <div className={`border border-teal-500 rounded-lg overflow-hidden bg-white p-4 ${className}`}>
      <div className="flex flex-col md:flex-row justify-between items-start mb-2">
        <h2 className="text-xl font-semibold mb-2 md:mb-0">Performa Target Produk</h2>

        <div className="w-full md:w-auto">
          <div className="relative w-full md:w-40 mb-2">
            <button
              className="w-full flex justify-between items-center px-3 py-1 bg-white border border-gray-300 rounded-lg focus:outline-none"
              onClick={() => setShowProductDropdown(!showProductDropdown)}
            >
              <span className="text-gray-700 text-sm">{selectedProduct}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {showProductDropdown && (
              <div className="absolute right-0 z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                <ul>
                  {PRODUCTS.map((product) => (
                    <li
                      key={product}
                      className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => handleSelectProduct(product)}
                    >
                      {product}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex rounded-lg bg-gray-100 w-max">
            {(['Week', 'Month', 'Years'] as PeriodType[]).map((period) => (
              <button
                key={period}
                className={`px-4 py-1 rounded-lg text-sm ${
                  periodType === period ? 'bg-teal-500 text-white' : 'text-gray-700'
                }`}
                onClick={() => handlePeriodChange(period)}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div className="text-gray-500 text-sm">10 August 2023</div>
      </div>

      <div className="h-48 mb-4">
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="flex flex-wrap gap-3">
        {salesState.map((sales) => (
          <div key={sales.id} className="flex items-center">
            <input
              type="checkbox"
              id={sales.id}
              checked={sales.checked}
              onChange={() => handleCheckboxChange(sales.id)}
              className="w-4 h-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500"
            />
            <label htmlFor={sales.id} className="ml-1 flex items-center text-sm">
              <div
                className="w-3 h-3 mr-1 rounded-sm"
                style={{ backgroundColor: sales.color }}
              ></div>
              {sales.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductChart;

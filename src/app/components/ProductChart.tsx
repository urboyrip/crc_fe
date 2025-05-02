"use client";

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface SalesData {
  id: string;
  name: string;
  color: string;
  checked: boolean;
  data: {
    weekly: { [key: string]: number };
    monthly: { [key: string]: number };
    yearly: { [key: string]: number };
  };
}

interface ProductChartProps {
  className?: string;
}

const ProductChart: React.FC<ProductChartProps> = ({ className }) => {
  // State for dropdown
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('Mitraguna');
  
  // State for period selection
  const [periodType, setPeriodType] = useState<'Week' | 'Month' | 'Years'>('Month');
  
  // Chart reference
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  // Products list
  const products = [
    'Mitraguna',
    'Griya',
    'OTO',
    'Modal Kerja',
    'Investasi',
    'KTA'
  ];
  
  // Sample sales data
  const salesData: SalesData[] = [
    {
      id: 'ucup1',
      name: 'Ucup1',
      color: '#00A3A3',
      checked: true,
      data: {
        weekly: {
          'Week 1': 150000000, 'Week 2': 200000000, 'Week 3': 300000000, 'Week 4': 250000000,
          'Week 5': 275000000, 'Week 6': 325000000, 'Week 7': 375000000, 'Week 8': 400000000
        },
        monthly: {
          'Jan': 150000000, 'Feb': 250000000, 'Mar': 400000000, 'Apr': 350000000,
          'Mei': 200000000, 'Jun': 250000000, 'Jul': 300000000, 'Aug': 350000000
        },
        yearly: {
          '2019': 2500000000, '2020': 3000000000, '2021': 3500000000, '2022': 4000000000,
          '2023': 4500000000
        }
      }
    },
    {
      id: 'ucup2',
      name: 'Ucup2',
      color: '#6B7280',
      checked: false, 
      data: {
        weekly: {
          'Week 1': 100000000, 'Week 2': 150000000, 'Week 3': 200000000, 'Week 4': 175000000,
          'Week 5': 225000000, 'Week 6': 275000000, 'Week 7': 300000000, 'Week 8': 350000000
        },
        monthly: {
          'Jan': 100000000, 'Feb': 200000000, 'Mar': 350000000, 'Apr': 300000000,
          'Mei': 150000000, 'Jun': 200000000, 'Jul': 275000000, 'Aug': 325000000
        },
        yearly: {
          '2019': 2000000000, '2020': 2500000000, '2021': 3000000000, '2022': 3500000000,
          '2023': 4000000000
        }
      }
    },
    {
      id: 'ucup3',
      name: 'Ucup3',
      color: '#9CA3AF',
      checked: false,
      data: {
        weekly: {
          'Week 1': 125000000, 'Week 2': 175000000, 'Week 3': 250000000, 'Week 4': 200000000,
          'Week 5': 250000000, 'Week 6': 300000000, 'Week 7': 325000000, 'Week 8': 375000000
        },
        monthly: {
          'Jan': 125000000, 'Feb': 225000000, 'Mar': 375000000, 'Apr': 325000000,
          'Mei': 175000000, 'Jun': 225000000, 'Jul': 250000000, 'Aug': 300000000
        },
        yearly: {
          '2019': 2250000000, '2020': 2750000000, '2021': 3250000000, '2022': 3750000000,
          '2023': 4250000000
        }
      }
    }
  ];
  
  // State for sales data
  const [salesState, setSalesState] = useState<SalesData[]>(salesData);
  
  // Function to handle product selection
  const handleSelectProduct = (product: string) => {
    setSelectedProduct(product);
    setShowProductDropdown(false);
    updateChart();
  };
  
  // Function to handle period selection
  const handlePeriodChange = (period: 'Week' | 'Month' | 'Years') => {
    setPeriodType(period);
    updateChart();
  };
  
  // Function to handle checkbox change
  const handleCheckboxChange = (id: string) => {
    setSalesState(prevState => 
      prevState.map(sales => 
        sales.id === id ? { ...sales, checked: !sales.checked } : sales
      )
    );
  };
  
  // Function to update chart
  const updateChart = () => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    if (!chartRef.current) return;
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    // Get period data based on selection
    const getPeriodData = (sales: SalesData) => {
      switch (periodType) {
        case 'Week':
          return Object.entries(sales.data.weekly).map(([key, value]) => ({ x: key, y: value }));
        case 'Month':
          return Object.entries(sales.data.monthly).map(([key, value]) => ({ x: key, y: value }));
        case 'Years':
          return Object.entries(sales.data.yearly).map(([key, value]) => ({ x: key, y: value }));
        default:
          return [];
      }
    };
    
    // Get labels based on period
    const getLabels = () => {
      const firstSales = salesState[0];
      if (!firstSales) return [];
      
      switch (periodType) {
        case 'Week':
          return Object.keys(firstSales.data.weekly);
        case 'Month':
          return Object.keys(firstSales.data.monthly);
        case 'Years':
          return Object.keys(firstSales.data.yearly);
        default:
          return [];
      }
    };
    
    // Create datasets
    const datasets = salesState
      .filter(sales => sales.checked)
      .map(sales => ({
        label: sales.name,
        data: getPeriodData(sales),
        borderColor: sales.color,
        backgroundColor: `${sales.color}20`,
        tension: 0.4,
        fill: true,
      }));
    
    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: getLabels(),
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            display: false, // Hide Y-axis labels and grid
            grid: {
              display: false, // Hide Y-axis grid lines
            }
          },
          x: {
            title: {
              display: false, // Remove X-axis title
            },
            grid: {
              display: true,
              drawBorder: true,
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  // Keep tooltip formatting for when hovering
                  label += `Rp ${(context.parsed.y / 1000000).toFixed(1)}M`;
                }
                return label;
              }
            }
          },
          legend: {
            display: false
          }
        }
      }
    });
  };
  
  // Initialize chart when component mounts
  useEffect(() => {
    updateChart();
    
    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [salesState, periodType, selectedProduct]);
  
  return (
    <div className={`border border-teal-500 rounded-lg overflow-hidden bg-white p-4 ${className}`}>
      <div className="flex flex-row justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Performa Target Produk</h2>
        
        <div className="flex flex-row items-center gap-3">
          {/* Period selection */}
          <div className="flex rounded-lg bg-gray-100 w-max">
            <button
              className={`px-4 py-1 rounded-lg text-sm ${
                periodType === 'Week' ? 'bg-teal-500 text-white' : 'text-gray-700'
              }`}
              onClick={() => handlePeriodChange('Week')}
            >
              Week
            </button>
            <button
              className={`px-4 py-1 rounded-lg text-sm ${
                periodType === 'Month' ? 'bg-teal-500 text-white' : 'text-gray-700'
              }`}
              onClick={() => handlePeriodChange('Month')}
            >
              Month
            </button>
            <button
              className={`px-4 py-1 rounded-lg text-sm ${
                periodType === 'Years' ? 'bg-teal-500 text-white' : 'text-gray-700'
              }`}
              onClick={() => handlePeriodChange('Years')}
            >
              Years
            </button>
          </div>
          
          {/* Product dropdown */}
          <div className="relative w-40">
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
                  {products.map((product) => (
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
        </div>
      </div>
      
      <div className="mb-2">
        <div className="text-gray-500 text-sm">10 August 2023</div>
      </div>
      
      {/* Chart container - reduced height */}
      <div className="h-48 mb-4">
        <canvas ref={chartRef}></canvas>
      </div>
      
      {/* Sales checkboxes - reduced size and spacing */}
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
        <div className="flex items-center">
          <input
            type="checkbox"
            id="all"
            className="w-4 h-4 rounded border-gray-300 text-gray-500 focus:ring-gray-500"
          />
          <label htmlFor="all" className="ml-1 text-sm">All</label>
        </div>
      </div>
    </div>
  );
};

export default ProductChart;
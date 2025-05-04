"use client";

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '@/app/constants/config';

interface AssignmentData {
  marketing_nip: string;
  marketing_name: string;
  has_target: boolean;
  total_target: number;
  target_details: {
    product_id: number;
    product_name: string;
    amount: number;
  }[];
}

const MarketingTable = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [showStatusDropDown, setShowStatusDropDown] = useState(false);
  const [marketingData, setMarketingData] = useState<AssignmentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  // Helper function to get month name
  const getMonthName = (monthNumber: number): string => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return months[monthNumber - 1] || '';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = Cookies.get('token');
        // Debug logs
        console.log('User data:', user);
        console.log('Target month:', user?.target_month);
        console.log('Target year:', user?.target_year);

        if (!user?.target_month || !user?.target_year) {
          throw new Error('Month or year not available');
        }

        // Log the API URL being called
        const url = `${API_BASE_URL}/bm/monitoring/assignment?month=${user.target_month}&year=${user.target_year}`;
        console.log('Fetching from:', url);

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Log response status
        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        // Log the result
        console.log('API response:', result);

        if (result.success) {
          setMarketingData(result.data);
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        console.error('Error details:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    // Only call fetchData if user data is available
    if (user?.target_month && user?.target_year) {
      fetchData();
    }
  }, [user?.target_month, user?.target_year]);

  // Format currency helper function
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
    .replace('IDR', 'Rp.')
    .trim();
  };

  // Filter data based on search keyword and status
  const filteredData = marketingData.filter((item) => {
    const matchesKeyword =
      searchKeyword === '' ||
      item.marketing_name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.marketing_nip.includes(searchKeyword);

    const matchesStatus =
      statusFilter === '' || 
      (statusFilter === 'Sudah' && item.has_target) ||
      (statusFilter === 'Belum' && !item.has_target);

    return matchesKeyword && matchesStatus;
  });

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setShowStatusDropDown(false);
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="border border-teal-500 rounded-lg overflow-hidden">
      <div className="p-4 bg-white">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          {/* Search Input */}
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Type keyword Search"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="relative w-full md:w-1/4">
            <button
              className="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none"
              onClick={() => setShowStatusDropDown(!showStatusDropDown)}
            >
              <span className="text-gray-700">{statusFilter || 'Status'}</span>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </button>

            {showStatusDropDown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                <ul>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleStatusFilter('')}
                  >
                    All
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleStatusFilter('Sudah')}
                  >
                    Sudah
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleStatusFilter('Belum')}
                  >
                    Belum
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  NIP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Bulan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr key={item.marketing_nip}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.marketing_nip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.marketing_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user?.target_month ? getMonthName(user.target_month) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {formatCurrency(item.total_target)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium ${
                        item.has_target
                          ? 'bg-teal-100 text-teal-600 border border-teal-600'
                          : 'bg-orange-100 text-orange-600 border border-orange-600'
                      }`}
                    >
                      {item.has_target ? 'Sudah' : 'Belum'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketingTable;
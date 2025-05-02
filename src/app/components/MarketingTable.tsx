"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface MarketingData {
  no: number;
  nip: string;
  nama: string;
  bulan: string;
  target: string;
  status: 'Sudah' | 'Belum';
}

const MarketingTable = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [showStatusDropDown, setShowStatusDropDown] = useState(false);
  
  // Sample data
  const marketingData: MarketingData[] = [
    { no: 1, nip: '124900000', nama: 'Ucuo Arip', bulan: 'Maret', target: 'Rp. 500.000.000,00', status: 'Sudah' },
    { no: 2, nip: '124900000', nama: 'Ucuo Arip', bulan: 'April', target: 'Rp. 500.000.000,00', status: 'Belum' },
    { no: 2, nip: '124900000', nama: 'Ucuo Arip', bulan: 'Mei', target: 'Rp. 500.000.000,00', status: 'Belum' },
    { no: 2, nip: '124900000', nama: 'Ucuo Arip', bulan: 'Juni', target: 'Rp. 500.000.000,00', status: 'Belum' },
    { no: 2, nip: '124900000', nama: 'Ucuo Arip', bulan: 'Juli', target: 'Rp. 500.000.000,00', status: 'Belum' },
    { no: 2, nip: '124900000', nama: 'Ucuo Arip', bulan: 'Agustus', target: 'Rp. 500.000.000,00', status: 'Belum' },
    { no: 2, nip: '124900000', nama: 'Ucuo Arip', bulan: 'Maret', target: 'Rp. 500.000.000,00', status: 'Belum' },
  ];

  // Filter data based on search keyword and status
  const filteredData = marketingData.filter((item) => {
    const matchesKeyword =
      searchKeyword === '' ||
      item.nama.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.nip.includes(searchKeyword) ||
      item.bulan.toLowerCase().includes(searchKeyword.toLowerCase());

    const matchesStatus =
      statusFilter === '' || item.status === statusFilter;

    return matchesKeyword && matchesStatus;
  });

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setShowStatusDropDown(false);
  };

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

        {/* Table */}
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
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.no}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.nip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.nama}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.bulan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.target}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium ${
                        item.status === 'Sudah'
                          ? 'bg-teal-100 text-teal-600 border border-teal-600'
                          : 'bg-orange-100 text-orange-600 border border-orange-600'
                      }`}
                    >
                      {item.status}
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
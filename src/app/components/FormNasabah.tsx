"use client";

import { FC } from "react";

interface DetailNasabahProps {
  data: NasabahData;
  isLoading?: boolean;
}

interface NasabahData {
  cif: string;
  fullName: string;
  phoneCode: string;
  phoneNumber: string;
  accountNumber: string;
  email: string;
  address: string;
  occupation: string;
  age: number;
  income: number;
  payroll: boolean;
  gender: string;
  maritalStatus: boolean;
  categorySegment: string;
  existingProduct: string[];
  transactionActivity: string;
}

const DetailNasabah: FC<DetailNasabahProps> = ({ data, isLoading = false }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Informasi Nasabah</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Memuat data nasabah...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">CIF</label>
              <div className="px-4 py-2 bg-gray-100 rounded-lg">{data.cif}</div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <div className="px-4 py-2 bg-gray-100 rounded-lg">{data.fullName}</div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">No Telephone</label>
              <div className="px-4 py-2 bg-gray-100 rounded-lg">
                {data.phoneCode} {data.phoneNumber}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Nomor Rekening</label>
              <div className="px-4 py-2 bg-gray-100 rounded-lg">{data.accountNumber}</div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="px-4 py-2 bg-gray-100 rounded-lg">{data.email}</div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Alamat</label>
              <div className="px-4 py-2 bg-gray-100 rounded-lg">{data.address}</div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
              <div className="px-4 py-2 bg-gray-100 rounded-lg">
                {data.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Kategori Segmen</label>
              <div className="px-4 py-2 bg-gray-100 rounded-lg">{data.categorySegment}</div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Pekerjaan</label>
              <div className="px-4 py-2 bg-gray-100 rounded-lg">{data.occupation}</div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Umur</label>
              <div className="px-4 py-2 bg-gray-100 rounded-lg">{data.age}</div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Penghasilan</label>
              <div className="px-4 py-2 bg-gray-100 rounded-lg">{formatCurrency(data.income)}</div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Payroll</label>
              <div className="px-4 py-2 bg-gray-100 rounded-lg">
                {data.payroll ? 'Ya' : 'Tidak'}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Status Pernikahan</label>
              <div className="px-4 py-2 bg-gray-100 rounded-lg">
                {data.maritalStatus ? 'Menikah' : 'Belum Menikah'}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Aktivitas Transaksi</label>
              <div className="px-4 py-2 bg-gray-100 rounded-lg">{data.transactionActivity}</div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Produk Eksisting</label>
              <div className="px-4 py-2 bg-gray-100 rounded-lg">
                {data.existingProduct.join(', ')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailNasabah;

"use client";

import { FC } from "react";

interface DetailNasabahProps {
  data: NasabahData;
  isLoading?: boolean;
}

interface NasabahData {
  cif: string;
  fullName: string;
  phoneNumber: string;
  accountNumber: string;
  email: string;
  address: string;
  occupation: string;
  companyName: string;
  age: number;
  income: number;
  payroll: boolean;
  gender: string;
  maritalStatus: boolean;
  categorySegment: string;
  existingProduct: string[];
  transactionActivity: string;
  closedAmount?: number;
  mcCreatedAt?: string;
}

const InfoField: FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="px-4 py-2 bg-gray-100 rounded-lg">{value}</div>
  </div>
);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <InfoField label="CIF" value={data.cif} />
            <InfoField label="Nama Lengkap" value={data.fullName} />
            <InfoField label="Nomor HP" value={data.phoneNumber} />
            <InfoField label="Nomor Rekening" value={data.accountNumber} />
            <InfoField label="Email" value={data.email || "-"} />
            <InfoField label="Alamat" value={data.address} />
            <InfoField label="Pekerjaan" value={data.occupation} />
            <InfoField label="Perusahaan" value={data.companyName} />
          </div>
          <div>
            <InfoField label="Umur" value={`${data.age} tahun`} />
            <InfoField label="Penghasilan" value={formatCurrency(data.income)} />
            <InfoField label="Payroll" value={data.payroll ? "Ya" : "Tidak"} />
            <InfoField 
              label="Gender" 
              value={data.gender === "MALE" ? "Laki-laki" : "Perempuan"} 
            />
            <InfoField 
              label="Status Pernikahan" 
              value={data.maritalStatus ? "Menikah" : "Belum Menikah"} 
            />
            <InfoField label="Segmen" value={data.categorySegment} />
            <InfoField 
              label="Produk Eksisting" 
              value={data.existingProduct.length > 0 ? data.existingProduct.join(", ") : "-"} 
            />
            <InfoField 
              label="Aktivitas Transaksi" 
              value={data.transactionActivity} 
            />
            {data.closedAmount && (
              <InfoField 
                label="Closed Amount" 
                value={formatCurrency(data.closedAmount)} 
              />
            )}
            {data.mcCreatedAt && (
              <InfoField 
                label="Tanggal Assignment" 
                value={new Date(data.mcCreatedAt).toLocaleDateString('id-ID')} 
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailNasabah;

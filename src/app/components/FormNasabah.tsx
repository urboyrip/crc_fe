"use client";

import { FC } from "react";

interface DetailNasabahProps {
  data: NasabahData;
  isLoading?: boolean;
}

interface NasabahData {
  cif: string;
  produkEksisting: string;
  namaLengkap: string;
  pekerjaan: string;
  noTelephone: string;
  kodeNegara: string;
  penghasilan: string;
  nomorRekening: string;
  payroll: string;
  email: string;
  umur: string;
  alamat: string;
  jenisKelamin: string;
}

const DetailNasabah: FC<DetailNasabahProps> = ({ data, isLoading = false }) => {
  const DataField = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
      <div className="relative">
        <p className="w-full py-3 px-4 bg-gray-100 rounded-lg">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="p-4 border border-teal-500 rounded-lg">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Memuat data nasabah...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kolom Kiri */}
          <div className="space-y-6">
            <DataField label="CIF" value={data.cif} />
            <DataField label="Nama Lengkap" value={data.namaLengkap} />
            <DataField
              label="No Telephone"
              value={`${data.kodeNegara} ${data.noTelephone}`}
            />
            <DataField label="Nomor Rekening" value={data.nomorRekening} />
            <DataField label="Email" value={data.email} />
            <DataField label="Alamat" value={data.alamat} />
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-6">
            <DataField label="Produk Eksisting" value={data.produkEksisting} />
            <DataField label="Pekerjaan" value={data.pekerjaan} />
            <DataField label="Penghasilan" value={data.penghasilan} />
            <DataField label="Payroll" value={data.payroll} />
            <DataField label="Umur" value={data.umur} />
            <DataField label="Jenis Kelamin" value={data.jenisKelamin} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailNasabah;

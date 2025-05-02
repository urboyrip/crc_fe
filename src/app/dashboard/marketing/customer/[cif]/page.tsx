"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import DetailNasabah from "@/app/components/FormNasabah";
import { useState, useEffect } from "react";
import StatusNasabah from "@/app/components/StatusNasabah";
import CardReccomendation from "@/app/components/CardReccomendation";

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


export default function DetailCustomer() {
  const [nasabahData, setNasabahData] = useState<NasabahData>({
    cif: '',
    fullName: '',
    phoneCode: '',
    phoneNumber: '',
    accountNumber: '',
    email: '',
    address: '',
    occupation: '',
    age: 0,
    income: 0,
    payroll: false,
    gender: '',
    maritalStatus: false,
    categorySegment: '',
    existingProduct: [],
    transactionActivity: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setNasabahData({
            cif: '88888909882472',
            fullName: 'Sandy Sudrajat Palupesy',
            phoneCode: '+62',
            phoneNumber: '88 9999 34555',
            accountNumber: '78879101',
            email: 'Sandy@example.com',
            address: 'Jl. Sandi Palupesy, Jakarta Selatan Barat Daya, Indonesia Ujung Timur',
            occupation: 'Pegawai BSI',
            age: 30,
            income: 30000000,
            payroll: true,
            gender: 'male',
            maritalStatus: true,
            categorySegment: 'BUMN',
            existingProduct: ['mitraguna','oto','griya'],
            transactionActivity: 'Active'
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="flex items-center text-sm mb-6">
          <a href="/dashboard/marketing" className="text-gray-500 hover:text-teal-500">
            Dashboard
          </a>
          <span className="mx-2">/</span>
          <span className="text-teal-500 font-medium">Details Customers</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">Details Customer</h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : (
          <>
            <DetailNasabah data={nasabahData} isLoading={isLoading} />

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Produk Rekomendasi</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CardReccomendation
                  logo="/mitraguna.png"
                  nomor={1}
                  produk="Mitraguna Online"
                  maksimalPlafond="100.000.000,00"
                  onLihatPersyaratan={() =>
                    console.log("Lihat persyaratan diklik")
                  }
                />
                <CardReccomendation
                  logo="/mitraguna.png"
                  nomor={2}
                  produk="Mitraguna Online"
                  maksimalPlafond="100.000.000,00"
                  onLihatPersyaratan={() =>
                    console.log("Lihat persyaratan diklik")
                  }
                />
                <CardReccomendation
                  logo="/mitraguna.png"
                  nomor={3}
                  produk="Mitraguna Online"
                  maksimalPlafond="100.000.000,00"
                  onLihatPersyaratan={() =>
                    console.log("Lihat persyaratan diklik")
                  }
                />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Ubah Status</h2>
              <StatusNasabah />
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

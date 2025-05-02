"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import DetailNasabah from "@/app/components/FormNasabah";
import { useState, useEffect } from "react";
import StatusNasabah from "@/app/components/StatusNasabah";
import CardReccomendation from "@/app/components/CardReccomendation";

export default function DetailCustomer() {
  // Inisialisasi dengan nilai default yang sesuai dengan tipe data
  const [nasabahData, setNasabahData] = useState({
    cif: "",
    produkEksisting: "",
    namaLengkap: "",
    pekerjaan: "",
    noTelephone: "",
    kodeNegara: "",
    penghasilan: "",
    nomorRekening: "",
    payroll: "",
    email: "",
    umur: "",
    alamat: "",
    jenisKelamin: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi fetch data dari API
    const fetchData = async () => {
      try {
        // Di sini nantinya akan ada kode untuk fetch data dari API
        // Misalnya: const response = await fetch('/api/nasabah/123');
        // const data = await response.json();

        // Untuk sementara, kita pakai data contoh
        setTimeout(() => {
          setNasabahData({
            cif: "848678753948",
            produkEksisting: "Mitraguna",
            namaLengkap: "Sandy Sudrajat Palupesy Sakinah",
            pekerjaan: "Pegawai BSI",
            noTelephone: "88 9999 34555",
            kodeNegara: "+62",
            penghasilan: "Rp. 30.000.000,00",
            nomorRekening: "78879101",
            payroll: "Bank Syariah Indonesia",
            email: "legion@example.com",
            umur: "30 Tahun",
            alamat:
              "Jl. Sandi Palupesy, Jakarta Selatan Barat Daya, Indonesia Ujung Timur",
            jenisKelamin: "Laki-Laki",
          });
          setIsLoading(false);
        }, 1000); // Simulasi loading 1 detik
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
            <DetailNasabah data={nasabahData} />

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

"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CustomerTable from "@/app/components/CustomerTable";
import CardItem from "@/app/components/CardItem";

export default function DashboardMarketing() {
  // Contoh data untuk beberapa CardItem
  const cardData = [
    {
      title: "Mitraguna",
      iconSrc: "/mitraguna.png",
      targetLabel: "Target",
      targetAmount: "100.000.000",
      achievedLabel: "Tercapai",
      achievedAmount: "70.000.000",
    },
    {
      title: "Griya",
      iconSrc: "/griya.png",
      targetLabel: "Target",
      targetAmount: "150.000.000",
      achievedLabel: "Tercapai",
      achievedAmount: "90.000.000",
    },
    {
      title: "OTO",
      iconSrc: "/oto.png",
      targetLabel: "Target",
      targetAmount: "80.000.000",
      achievedLabel: "Tercapai",
      achievedAmount: "60.000.000",
    },
    {
      title: "Prapensiun",
      iconSrc: "/prapensiun.png",
      targetLabel: "Target",
      targetAmount: "200.000.000",
      achievedLabel: "Tercapai",
      achievedAmount: "120.000.000",
    },
    {
      title: "Pensiun",
      iconSrc: "/pensiun.png",
      targetLabel: "Target",
      targetAmount: "200.000.000",
      achievedLabel: "Tercapai",
      achievedAmount: "120.000.000",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Informasi Pengguna dan Target */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Ucup Sandy Palupesy</h1>
              <p className="text-sm text-gray-500">1237681245234 (NIP)</p>
            </div>
            <div className="text-left md:text-right">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">Target 500 Juta</h2>
              <p className="text-sm text-gray-500">Agustus 2025</p>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Dashboard</h3>
            <div className="overflow-x-auto pb-4">
              <div className="flex space-x-4 min-w-max">
                {cardData.map((data, index) => (
                  <CardItem
                    key={index}
                    title={data.title}
                    iconSrc={data.iconSrc}
                    targetLabel={data.targetLabel}
                    targetAmount={data.targetAmount}
                    achievedLabel={data.achievedLabel}
                    achievedAmount={data.achievedAmount}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Tabel Nasabah */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Tabel Nasabah</h3>
            <div className="bg-white rounded-lg border p-4 shadow-sm overflow-x-auto">
              <CustomerTable />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
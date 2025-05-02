"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import MarketingTable from "@/app/components/MarketingTable";
import ProductChart from "@/app/components/ProductChart";
import CardItem from "@/app/components/CardItem";
import { useRouter } from "next/navigation";

export default function DashboardMarketing() {
  const router = useRouter();

  const handleTargetMarketing = () => {
    router.push("/dashboard/manager/targetmarketing");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section with Title and Target */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1">KC Fatmawati</h1>
              <p className="text-sm text-gray-600">Sumarji - 1237681245234 (NIP)</p>
            </div>
            <div className="text-left md:text-right">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Target KC 10 M</h2>
              <p className="text-sm text-gray-600">Agustus 2025</p>
            </div>
          </div>

          {/* Dashboard Title and Button */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl md:text-2xl font-bold">Dashboard Target Marketing</h2>
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg flex items-center"
              onClick={handleTargetMarketing}
            >
              <span className="mr-2">+</span>
              Masukan Target Marketing
            </button>
          </div>

          {/* Marketing Table, Terbaik & Chart Section */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Table Marketing */}
            <div className="lg:w-1/2">
              <h3 className="text-lg md:text-xl font-bold mb-4">Tabel Marketing</h3>
              <div className="bg-white rounded-lg border p-4 shadow-sm overflow-x-auto">
                <MarketingTable />
              </div>
            </div>

            {/* Marketing Terbaik dan Chart Produk */}
            <div className="lg:w-1/2 flex flex-col gap-6">
              {/* Marketing Terbaik */}
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-4">Marketing Terbaik</h3>
                <div className="overflow-x-auto pb-4">
                  <div className="flex space-x-4 min-w-max">
                    {["Ucup 1", "Ucup 2", "Ucup 3", "Ucup 4"].map((title, index) => (
                      <CardItem
                        key={index}
                        title={title}
                        iconSrc="/pensiun.png"
                        targetLabel="Target"
                        targetAmount="100.000.000"
                        achievedLabel="Tercapai"
                        achievedAmount="10.000.000"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Chart Produk */}
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-4">Chart Produk</h3>
                <div className="bg-white rounded-lg border shadow-sm p-4">
                  <ProductChart />
                </div>
              </div>
            </div>
          </div>

          {/* Details Target Marketing */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-6">Details Target Marketing</h2>

            {["Ucup Sandy Palupesy", "Ucup 2", "Ucup 3"].map((name, idx) => (
              <div className="mb-8" key={idx}>
                <div className="mb-2">
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="text-teal-500 font-medium">
                    Target Total Rp. 500.000.000,00
                  </p>
                </div>
                <div className="overflow-x-auto pb-4">
                  <div className="flex space-x-4 min-w-max">
                    {["Mitraguna", "Griya", "OTO", "Prapensiun", "Pensiun", "Hasanah Card"].map((product, pIdx) => (
                      <CardItem
                        key={pIdx}
                        title={product}
                        iconSrc="/pensiun.png"
                        targetLabel="Target"
                        targetAmount="100.000.000"
                        achievedLabel="Tercapai"
                        achievedAmount="10.000.000"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
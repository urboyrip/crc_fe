import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, User, Calendar } from "lucide-react";
import VerifyPopup from "./VerifyPopup";
import SavePopUp from "./SavePopUp";

const FormTargetMarketing = () => {
  // Data untuk produks dengan state yang dapat diubah
  const [products, setProducts] = useState([
    { name: "Griya", icon: "/griya.png", target: "Rp. 5.000.000.000,00", value: 5000000000 },
    { name: "Mitraguna", icon: "/mitraguna.png", target: "Rp. 5.000.000.000,00", value: 5000000000 },
    { name: "Prapensiun", icon: "/prapensiun.png", target: "Rp. 5.000.000.000,00", value: 5000000000 },
    { name: "OTO", icon: "/oto.png", target: "Rp. 5.000.000.000,00", value: 5000000000 },
    { name: "Pensiun", icon: "/pensiun.png", target: "Rp. 5.000.000.000,00", value: 5000000000 },
    { name: "Hasanah Card", icon: "/hasanahcard.png", target: "Rp. 5.000.000.000,00", value: 5000000000 },
  ]);
  
  // State untuk data forms lainnya
  const [marketingName, setMarketingName] = useState("Ucup 1");
  const [selectedMonth, setSelectedMonth] = useState("Maret");
  const [totalTarget, setTotalTarget] = useState("");
  
  // State untuk dropdown
  const [isMarketingOpen, setIsMarketingOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  
  // Data untuk marketing names
  const marketingOptions = [
    { name: "Ucup 1", avatar: "/avatar1.png" },
    { name: "Budi", avatar: "/avatar2.png" },
    { name: "Sarah", avatar: "/avatar3.png" },
    { name: "Ahmad", avatar: "/avatar4.png" },
  ];
  
  // Data untuk bulan
  const monthOptions = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  
  // Menghitung total target dari semua produk
  useEffect(() => {
    const total = products.reduce((sum, product) => sum + product.value, 0);
    setTotalTarget(formatCurrency(total));
  }, [products]);
  
  // Format angka ke format mata uang
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace(/\s/g, '.').replace('IDR', 'Rp.');
  };
  
  // Parse input mata uang ke nilai numerik
  const parseCurrency = (currencyString) => {
    return Number(currencyString.replace(/[^\d,-]/g, '').replace(',', '.'));
  };
  
  // Fungsi untuk mengubah target produk
  const handleProductTargetChange = (index, targetValue) => {
    const updatedProducts = [...products];
    // Hapus karakter non-numerik untuk mendapatkan nilai numerik
    const numericValue = parseCurrency(targetValue);
    
    updatedProducts[index] = {
      ...updatedProducts[index],
      target: targetValue,
      value: isNaN(numericValue) ? 0 : numericValue
    };
    
    setProducts(updatedProducts);
  };
  
  // Fungsi untuk menangani perubahan marketing
  const handleMarketingChange = (name) => {
    setMarketingName(name);
    setIsMarketingOpen(false);
  };
  
  // Fungsi untuk menangani perubahan bulan
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setIsMonthOpen(false);
  };
  
  // Tambahkan state untuk popup
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);

  // Modify handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowVerifyPopup(true);
  };

  // Handle verify confirmation
  const handleVerifyConfirm = () => {
    setShowVerifyPopup(false);
    // Implementasi logika submit
    console.log({
      marketingName,
      selectedMonth,
      products,
      totalTarget
    });
    setShowSavePopup(true);
  };

  // Handle save completion
  const handleSaveComplete = () => {
    setShowSavePopup(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-teal-500 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Masukan Target Marketing</h1>
      <div className="border-t border-teal-300 mb-6"></div>
      
      {/* Pilih Nama Marketing */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Pilih Nama Marketing</label>
        <div className="relative">
          <div
            className="flex items-center justify-between p-4 border border-slate-300 rounded-lg cursor-pointer"
            onClick={() => setIsMarketingOpen(!isMarketingOpen)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {marketingOptions.find(m => m.name === marketingName)?.avatar ? (
                  <Image
                    src={marketingOptions.find(m => m.name === marketingName)?.avatar}
                    alt="Marketing Avatar"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-gray-500" />
                )}
              </div>
              <span className="text-lg">{marketingName}</span>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>

          {isMarketingOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg z-10">
              {marketingOptions.map((option) => (
                <div
                  key={option.name}
                  className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                  onClick={() => handleMarketingChange(option.name)}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {option.avatar ? (
                      <Image
                        src={option.avatar}
                        alt={`${option.name} Avatar`}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  <span>{option.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Target Setiap Produk */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Target Setiap Produk</h2>
        
        {products.map((product, index) => (
          <div key={product.name} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image
                  src={product.icon}
                  alt={`${product.name} Icon`}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-lg">{product.name}</span>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm mr-2">Target</span>
              <input
                type="text"
                value={product.target}
                onChange={(e) => handleProductTargetChange(index, e.target.value)}
                className="p-2 border border-slate-300 rounded-md w-56"
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Pilih Bulan */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Bulan</label>
        <div className="relative">
          <div
            className="flex items-center justify-between p-4 border border-slate-300 rounded-lg cursor-pointer"
            onClick={() => setIsMonthOpen(!isMonthOpen)}
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-lg">{selectedMonth}</span>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>

          {isMonthOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {monthOptions.map((month) => (
                <div
                  key={month}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleMonthChange(month)}
                >
                  <span>{month}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Total Target */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Total Target</label>
        <div className="w-full p-4 border border-slate-300 rounded-lg text-lg bg-gray-50">
          {totalTarget}
        </div>
      </div>
      
      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full p-4 bg-teal-500 text-white text-lg font-medium rounded-lg hover:bg-teal-600 transition"
      >
        Submit
      </button>

      {/* Add Popups */}
      <VerifyPopup 
        isOpen={showVerifyPopup} 
        onClose={() => setShowVerifyPopup(false)}
        onConfirm={handleVerifyConfirm}
      />
      
      <SavePopUp 
        isOpen={showSavePopup} 
        onClose={handleSaveComplete}
      />
    </div>
  );
};

export default FormTargetMarketing;
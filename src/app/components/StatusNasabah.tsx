import { useState } from "react";
import Image from "next/image";
import { ChevronRight, Check, Phone, X } from "lucide-react";
import ClosingPopup from "./ClosingPopUp";

const StatusNasabah = () => {
  const [showPopup, setShowPopup] = useState(false);
  // Data untuk dropdown
  const statusOptions = [
    { name: "Closed", icon: <Check className="w-5 h-5 text-white" /> },
    { name: "Contacted", icon: <Phone className="w-5 h-5 text-white" /> },
    { name: "Rejected", icon: <X className="w-5 h-5 text-white" /> },
  ];

  const productOptions = [
    { name: "Griya", icon: "/griya.png" },
    { name: "Mitraguna", icon: "/mitraguna.png" },
    { name: "Oto", icon: "/oto.png" },
    { name: "Pensiun", icon: "/pensiun.png" },
    { name: "Prapensiun", icon: "/prapensiun.png" },
    { name: "Hasanah Card", icon: "/HasanahCard.png" },
  ];

  // State untuk tracking nilai yang dipilih
  const [selectedStatus, setSelectedStatus] = useState("Closed");
  const [selectedProduct, setSelectedProduct] = useState("Griya");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // State untuk tracking dropdown mana yang terbuka
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);

  // Fungsi untuk menangani perubahan status
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setIsStatusOpen(false);
  };

  // Fungsi untuk menangani perubahan produk
  const handleProductChange = (product) => {
    setSelectedProduct(product);
    setIsProductOpen(false);
  };

  // Warna latar belakang berdasarkan status
  const getStatusColor = () => {
    switch (selectedStatus) {
      case "Closed":
        return "bg-teal-500";
      case "Contacted":
        return "bg-blue-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-teal-500";
    }
  };

  // Mendapatkan icon berdasarkan status
  const getStatusIcon = () => {
    const status = statusOptions.find((s) => s.name === selectedStatus);
    return status?.icon || <Check className="w-5 h-5 text-white" />;
  };

  // Mendapatkan icon berdasarkan produk
  const getProductIconSrc = () => {
    const product = productOptions.find((p) => p.name === selectedProduct);
    return product?.icon || "/Logo.png";
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border border-teal-500 rounded-lg shadow-md">
      {/* Status Dropdown */}
      <div className="relative mb-6">
        <div
          className="flex items-center justify-between p-4 border border-slate-300 rounded-lg cursor-pointer"
          onClick={() => setIsStatusOpen(!isStatusOpen)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor()}`}
            >
              {getStatusIcon()}
            </div>
            <span className="text-lg font-medium">{selectedStatus}</span>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>

        {isStatusOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg z-10">
            {statusOptions.map((status) => (
              <div
                key={status.name}
                className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                onClick={() => handleStatusChange(status.name)}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    status.name === "Closed"
                      ? "bg-teal-500"
                      : status.name === "Contacted"
                      ? "bg-blue-500"
                      : "bg-red-500"
                  }`}
                >
                  {status.icon}
                </div>
                <span>{status.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Amount Field */}
      <div className="mb-6">
        <label className="block text-xl font-medium mb-2">Amount</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-4 border border-slate-300 rounded-lg text-lg"
        />
      </div>

      {/* Product Dropdown */}
      <div className="relative mb-6">
        <label className="block text-xl font-medium mb-2">Pilih Produk</label>
        <div
          className="flex items-center justify-between p-4 border border-slate-300 rounded-lg cursor-pointer"
          onClick={() => setIsProductOpen(!isProductOpen)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image
                src={getProductIconSrc()}
                alt="Product Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-lg font-medium">{selectedProduct}</span>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>

        {isProductOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg z-10">
            {productOptions.map((product) => (
              <div
                key={product.name}
                className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                onClick={() => handleProductChange(product.name)}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <Image
                    src={product.icon}
                    alt={`${product.name} Logo`}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span>{product.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Description Field */}
      <div className="mb-6">
        <label className="block text-xl font-medium mb-2">
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Deskripsi (Optional)"
          className="w-full p-4 border border-slate-300 rounded-lg text-lg"
        />
      </div>

      {/* Update Status Button */}
      <button
        className="w-full p-4 bg-teal-500 text-white text-lg font-medium rounded-lg hover:bg-teal-600 transition"
        onClick={() => setShowPopup(true)}
      >
        Ubah Status
      </button>
      <ClosingPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default StatusNasabah;

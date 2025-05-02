import { useState, ReactNode  } from "react";
import Image from "next/image";
import { ChevronRight, Check, Phone, X } from "lucide-react";
import ClosingPopup from "./ClosingPopUp";
import VerifyPopup from "./VerifyPopup";
import SavePopUp from "./SavePopUp";

// Define interfaces for our data structures
interface StatusOption {
  name: string;
  icon: ReactNode ;
}

interface ProductOption {
  name: string;
  icon: string;
}

const StatusNasabah: React.FC = () => {
  const [showVerifyPopup, setShowVerifyPopup] = useState<boolean>(false);
  const [showSavePopup, setShowSavePopup] = useState<boolean>(false);
  const [showClosingPopup, setShowClosingPopup] = useState<boolean>(false);

  const statusOptions: StatusOption[] = [
    { name: "Closed", icon: <Check className="w-5 h-5 text-white" /> },
    { name: "Contacted", icon: <Phone className="w-5 h-5 text-white" /> },
    { name: "Rejected", icon: <X className="w-5 h-5 text-white" /> },
  ];

  const productOptions: ProductOption[] = [
    { name: "Griya", icon: "/griya.png" },
    { name: "Mitraguna", icon: "/mitraguna.png" },
    { name: "Oto", icon: "/oto.png" },
    { name: "Pensiun", icon: "/pensiun.png" },
    { name: "Prapensiun", icon: "/prapensiun.png" },
    { name: "Hasanah Card", icon: "/HasanahCard.png" },
  ];

  const [selectedStatus, setSelectedStatus] = useState<string>("Closed");
  const [selectedProduct, setSelectedProduct] = useState<string>("Griya");
  const [amount, setAmount] = useState<string>("");
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);
  const [isProductOpen, setIsProductOpen] = useState<boolean>(false);

  const handleStatusChange = (status: string): void => {
    setSelectedStatus(status);
    setIsStatusOpen(false);
  };

  const handleProductChange = (product: string): void => {
    setSelectedProduct(product);
    setIsProductOpen(false);
  };

  const getStatusColor = (): string => {
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

  const getStatusIcon = (): ReactNode  => {
    const status = statusOptions.find((s) => s.name === selectedStatus);
    return status?.icon || <Check className="w-5 h-5 text-white" />;
  };

  const getProductIconSrc = (): string => {
    const product = productOptions.find((p) => p.name === selectedProduct);
    return product?.icon || "/Logo.png";
  };

  const handleVerifyConfirm = (): void => {
    setShowVerifyPopup(false);
    setShowSavePopup(true);
  };

  const handleSaveComplete = (): void => {
    setShowSavePopup(false);
    if (selectedStatus === "Closed") {
      setShowClosingPopup(true);
    }
  };

  const handleSubmit = (): void => {
    setShowVerifyPopup(true);
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

      {/* Update Status Button */}
      <button
        className="w-full p-4 bg-teal-500 text-white text-lg font-medium rounded-lg hover:bg-teal-600 transition"
        onClick={handleSubmit}
      >
        Ubah Status
      </button>

      {/* Popups */}
      <VerifyPopup 
        isOpen={showVerifyPopup} 
        onClose={() => setShowVerifyPopup(false)}
        onConfirm={handleVerifyConfirm}
      />
      
      <SavePopUp 
        isOpen={showSavePopup} 
        onClose={handleSaveComplete}
      />
      
      <ClosingPopup 
        isOpen={showClosingPopup} 
        onClose={() => setShowClosingPopup(false)} 
      />
    </div>
  );
};

export default StatusNasabah;

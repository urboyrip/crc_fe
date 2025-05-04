import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import { ChevronRight, Check, Phone, X } from "lucide-react";
import ClosingPopup from "./ClosingPopUp";
import VerifyPopup from "./VerifyPopup";
import SavePopUp from "./SavePopUp";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { API_BASE_URL } from '@/app/constants/config';



// Update interfaces
interface StatusOption {
  name: string;
  icon: ReactNode;
}

interface Product {
  id: number;
  nama: string;
  prediksi: string;
  ikon: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

interface CustomerData {
  id: number;
  nama: string;
  cif: string;
  status: string;
  closed_amount: number;
  closed_produk_id: number;
  closed_produk: Product | null;
}

interface StatusNasabahProps {
  currentStatus: "new" | "rejected" | "contacted" | "closed";
}

const StatusNasabah: React.FC<StatusNasabahProps> = ({ currentStatus }) => {
  const [showVerifyPopup, setShowVerifyPopup] = useState<boolean>(false);
  const [showSavePopup, setShowSavePopup] = useState<boolean>(false);
  const [showClosingPopup, setShowClosingPopup] = useState<boolean>(false);

  const statusOptions: StatusOption[] = [
    { name: "Closed", icon: <Check className="w-5 h-5 text-white" /> },
    { name: "Contacted", icon: <Phone className="w-5 h-5 text-white" /> },
    { name: "Rejected", icon: <X className="w-5 h-5 text-white" /> },
  ];

  const [selectedStatus, setSelectedStatus] = useState<string>(() => {
    if (currentStatus === "new") return "";
    return currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1);
  });
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const [amount, setAmount] = useState<string>("");
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);
  const [isProductOpen, setIsProductOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams<{ cif: string }>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch(`${API_BASE_URL}/produk`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await response.json();
        setProducts(data);
        if (data.length > 0) {
          setSelectedProduct(data[0].nama);
          setSelectedProductId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch(
          `${API_BASE_URL}/marketing/customers/${params.cif}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }

        const result = await response.json();
        if (result.success) {
          setCustomerData(result.data);
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    fetchCustomerData();
  }, [params.cif]);

  const handleStatusChange = (status: string): void => {
    setSelectedStatus(status);
    setIsStatusOpen(false);
  };

  const handleProductChange = (product: Product): void => {
    setSelectedProduct(product.nama);
    setSelectedProductId(product.id);
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
        return "bg-gray-300";
    }
  };

  const getStatusIcon = (): ReactNode => {
    const status = statusOptions.find((s) => s.name === selectedStatus);
    return status?.icon || null;
  };

  const handleVerifyConfirm = async (): Promise<void> => {
    setShowVerifyPopup(false);
    setShowSavePopup(true);
  };

  const handleSaveComplete = (): void => {
    setShowSavePopup(false);
    if (selectedStatus === "Closed") {
      setShowClosingPopup(true);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!selectedStatus) {
      alert("Please select a status");
      return;
    }

    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const payload = {
        status: selectedStatus.toLowerCase(),
        ...(selectedStatus === "Closed" && {
          product_id: selectedProductId,
          amount: parseInt(amount.replace(/\D/g, ""), 10) || 0,
        }),
      };

      const response = await fetch(
        `${API_BASE_URL}/marketing/customer/${params.cif}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const data = await response.json();
      if (data.success) {
        setShowVerifyPopup(true);
      } else {
        throw new Error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border border-teal-500 rounded-lg shadow-md">
      {currentStatus === "closed" || currentStatus === "rejected" ? (
        <>
          <div 
            className="flex items-center gap-3 p-4 border border-slate-300 rounded-lg cursor-pointer mb-6"
            style={{ pointerEvents: 'none' }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStatus === "closed" ? "bg-teal-500" : "bg-red-500"
              }`}>
                {currentStatus === "closed" ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <X className="w-5 h-5 text-white" />
                )}
              </div>
              <span className="text-lg font-medium">
                {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
              </span>
            </div>
          </div>

          {currentStatus === "closed" && (
            <>
              {customerData && customerData.closed_amount > 0 && (
                <div className="mb-4">
                  <label className="block text-xl font-medium mb-2">Amount</label>
                  <div className="p-4 border border-slate-300 rounded-lg">
                    <span className="text-lg">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(customerData.closed_amount)
                        .replace('IDR', 'Rp.')
                        .trim()}
                    </span>
                  </div>
                </div>
              )}

              {customerData?.closed_produk && (
                <div className="mb-4">
                  <label className="block text-xl font-medium mb-2">Produk</label>
                  <div className="flex items-center gap-3 p-4 border border-slate-300 rounded-lg">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Image
                        src={`/${customerData.closed_produk.ikon}.png`}
                        alt="Product Logo"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-lg">{customerData.closed_produk.nama}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
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
                <span className="text-lg font-medium">
                  {selectedStatus || "Pilih Status"}
                </span>
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

          {selectedStatus === "Closed" && (
            <div className="mb-6">
              <label className="block text-xl font-medium mb-2">Amount</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-4 border border-slate-300 rounded-lg text-lg"
                placeholder="Enter amount"
              />
            </div>
          )}

          {selectedStatus === "Closed" && (
            <div className="relative mb-6">
              <label className="block text-xl font-medium mb-2">Pilih Produk</label>
              <div
                className="flex items-center justify-between p-4 border border-slate-300 rounded-lg cursor-pointer"
                onClick={() => setIsProductOpen(!isProductOpen)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Image
                      src={`/${products.find((p) => p.nama === selectedProduct)?.ikon || "default"}.png`}
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
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                      onClick={() => handleProductChange(product)}
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        <Image
                          src={`/${product.ikon}.png`}
                          alt={`${product.nama} Logo`}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <span>{product.nama}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            className="w-full p-4 bg-teal-500 text-white text-lg font-medium rounded-lg hover:bg-teal-600 transition"
            onClick={handleSubmit}
          >
            Ubah Status
          </button>
        </>
      )}

      <VerifyPopup
        isOpen={showVerifyPopup}
        onClose={() => setShowVerifyPopup(false)}
        onConfirm={handleVerifyConfirm}
      />

      <SavePopUp isOpen={showSavePopup} onClose={handleSaveComplete} />

      <ClosingPopup
        isOpen={showClosingPopup}
        onClose={() => setShowClosingPopup(false)}
      />
    </div>
  );
};

export default StatusNasabah;

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, User } from "lucide-react";
import VerifyPopup from "./VerifyPopup";
import SavePopUp from "./SavePopUp";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import { API_BASE_URL } from '@/app/constants/config';


// Update interfaces to match API response
interface Product {
  product_id: number;
  product_name: string;
  amount: number;
}

interface MarketingStaff {
  marketing_nip: string;
  marketing_name: string;
  has_target: boolean;
  total_target: number;
  target_details: Product[];
}

const FormTargetMarketing: React.FC = () => {
  const { user } = useAuth();
  const [marketingStaff, setMarketingStaff] = useState<MarketingStaff[]>([]);
  const [selectedMarketing, setSelectedMarketing] = useState<MarketingStaff | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalTarget, setTotalTarget] = useState<string>("Rp. 0");
  const [isMarketingOpen, setIsMarketingOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showVerifyPopup, setShowVerifyPopup] = useState<boolean>(false);
  const [showSavePopup, setShowSavePopup] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Format angka ke format mata uang
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace(/\s/g, '.').replace('IDR', 'Rp.');
  };

  // Parse input mata uang ke nilai numerik
  const parseCurrency = (currencyString: string): number => {
    return Number(currencyString.replace(/[^\d,-]/g, '').replace(',', '.'));
  };

  // Fetch marketing staff and their targets
  useEffect(() => {
    const fetchMarketingTargets = async () => {
      try {
        if (!user?.target_month || !user?.target_year) return;

        const token = Cookies.get("token");
        const response = await fetch(
          `${API_BASE_URL}/bm/monitoring/assignment?month=${user.target_month}&year=${user.target_year}&search=`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch marketing targets");
        }

        const data = await response.json();
        if (data.success) {
          setMarketingStaff(data.data);
          if (data.data.length > 0) {
            setSelectedMarketing(data.data[0]);
            setProducts(data.data[0].target_details);
            setTotalTarget(formatCurrency(data.data[0].total_target));
          }
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch data");
        console.error("Error fetching marketing targets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketingTargets();
  }, [user?.target_month, user?.target_year]);

  // Handle marketing selection
  const handleMarketingChange = (staff: MarketingStaff): void => {
    setSelectedMarketing(staff);
    setProducts(staff.target_details);
    setTotalTarget(formatCurrency(staff.total_target));
    setIsMarketingOpen(false);
  };

  // Handle product target change
  const handleProductTargetChange = (index: number, amount: string): void => {
    const numericValue = parseCurrency(amount);
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      amount: isNaN(numericValue) ? 0 : numericValue
    };
    
    setProducts(updatedProducts);
    updateTotalTarget(updatedProducts);
  };

  const updateTotalTarget = (updatedProducts: Product[]): void => {
    const total = updatedProducts.reduce((sum, product) => sum + product.amount, 0);
    setTotalTarget(formatCurrency(total));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setShowVerifyPopup(true);
  };

  const handleVerifyConfirm = async (): Promise<void> => {
    try {
      setErrorMessage(null); // Reset error message
      if (!selectedMarketing || !user?.target_month) {
        throw new Error("Please select marketing staff and ensure month is set");
      }

      const token = Cookies.get("token");
      const payload = {
        bulan: user.target_month,
        target: products.map(product => ({
          product_id: product.product_id,
          amount: product.amount
        }))
      };

      const response = await fetch(
        `${API_BASE_URL}/bm/monitoring/assignment/${selectedMarketing.marketing_nip}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit target data");
      }

      if (data.success) {
        setShowVerifyPopup(false);
        setShowSavePopup(true);
      } else {
        throw new Error(data.message || "Failed to save target");
      }
    } catch (error) {
      console.error("Error submitting target:", error);
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit target");
      setShowVerifyPopup(false); // Close verify popup when error occurs
    }
  };

  const handleSaveComplete = (): void => {
    setShowSavePopup(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-teal-500 rounded-lg shadow-md">
      {/* Show error message if exists */}
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-50 border border-red-500 rounded-lg text-red-700">
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center mb-4">Masukan Target Marketing</h1>
          <div className="border-t border-teal-300 mb-6"></div>

          {/* Marketing Selection Dropdown */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Pilih Nama Marketing</label>
            <div className="relative">
              <div
                className="flex items-center justify-between p-4 border border-slate-300 rounded-lg cursor-pointer"
                onClick={() => setIsMarketingOpen(!isMarketingOpen)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-teal-500 bg-white flex items-center justify-center">
                    <User className="w-6 h-6 text-teal-500" />
                  </div>
                  <span className="text-lg">{selectedMarketing?.marketing_name || "Select Marketing"}</span>
                </div>
                <ChevronRight className="text-gray-400" />
              </div>

              {isMarketingOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg z-10">
                  {marketingStaff.map((staff) => (
                    <div
                      key={staff.marketing_nip}
                      className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                      onClick={() => handleMarketingChange(staff)}
                    >
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-teal-400 flex items-center justify-center">
                        <User className="w-5 h-5 text-teal-500" />
                      </div>
                      <span>{staff.marketing_name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Products List */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">Target Setiap Produk</h2>
            {products.map((product, index) => (
              <div key={product.product_id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Image
                      src={`/${product.product_name.toLowerCase().replace(/\s+/g, '')}.png`}
                      alt={`${product.product_name} Icon`}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-lg">{product.product_name}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm mr-2">Target</span>
                  <input
                    type="text"
                    value={formatCurrency(product.amount)}
                    onChange={(e) => handleProductTargetChange(index, e.target.value)}
                    className="p-2 border border-slate-300 rounded-md w-56"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Total Target Display */}
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
        </>
      )}

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
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { API_BASE_URL } from '@/app/constants/config';


// Define interfaces for type safety
interface CustomerTableProps {
  tab: TabType;
  onTabChange: (newTab: TabType) => void; // Add this
  event?: string;
}

interface ApiCustomer {
  id: number;
  nama: string;
  cif: string;
  nomor_rekening: string;
  nama_perusahaan: string;
  produk_eksisting: string[] | null;
  aktivitas_transaksi: string;
  status: string;
}

interface ApiResponse {
  data: ApiCustomer[];
  message: string;
  meta: {
    current_page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
  };
  success: boolean;
}

// Define specific types for status and tabs
type CustomerStatus = "new" | "rejected" | "contacted" | "closed";
type TabType = "pipeline" | "kelolaan";

const CustomerTable: React.FC<CustomerTableProps> = ({ tab, onTabChange, event }) => {
  const [customers, setCustomers] = useState<ApiCustomer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        const token = Cookies.get("token");
        const baseUrl = `${API_BASE_URL}/marketing`;
        const url =
          tab === "pipeline"
            ? `${baseUrl}/customers?status=${statusFilter}&page=${currentPage}&search=${searchQuery}&limit=${rowsPerPage}`
            : `${baseUrl}/customers/me?status=${statusFilter}&page=${currentPage}&search=${searchQuery}&limit=${rowsPerPage}`; // Added search parameter here

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }

        const data: ApiResponse = await response.json();
        if (data.success) {
          setCustomers(data.data);
          setTotalPages(data.meta.total_pages);
          setTotalItems(data.meta.total_items);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, [tab, currentPage, searchQuery, statusFilter, rowsPerPage]);

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchQuery(event.target.value);
  };

  const handleStatusFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setStatusFilter(event.target.value);
  };

  const handleTabChange = (newTab: TabType): void => {
    setCurrentPage(1);
    onTabChange(newTab); // Call the parent's tab change handler
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Helper function to get status style
  const getStatusStyle = (status: CustomerStatus): string => {
    const styles = {
      new: "bg-yellow-100 text-yellow-600 border-yellow-600",
      processing: "bg-blue-100 text-blue-600 border-blue-600",
      rejected: "bg-red-100 text-red-600 border-red-600",
      contacted: "bg-purple-100 text-purple-600 border-purple-600",
      closed: "bg-green-100 text-green-600 border-green-600",
    };
    return styles[status] || "bg-gray-100 text-gray-600 border-gray-400";
  };

  return (
    <div className="border border-teal-500 rounded-lg p-4">
      {/* Tab Navigation */}
      <div className="flex justify-center border-b mb-4">
        <button
          className={`pb-2 px-4 text-xl font-medium ${
            tab === "pipeline"
              ? "text-teal-500 border-b-2 border-teal-500"
              : "text-gray-400"
          }`}
          onClick={() => handleTabChange("pipeline")}
        >
          Daftar Pipeline Nasabah
        </button>
        <button
          className={`pb-2 px-4 text-xl font-medium ${
            tab === "kelolaan"
              ? "text-teal-500 border-b-2 border-teal-500"
              : "text-gray-400"
          }`}
          onClick={() => handleTabChange("kelolaan")}
        >
          Daftar Nasabah Kelolaan
        </button>
      </div>

      {/* Improved Search and Filter Section */}
      <div className="flex justify-between items-center mb-6">
        {/* Search Bar - Left Side */}
        <div className="relative w-64 md:w-80">
          <input
            type="text"
            placeholder="Cari nama nasabah..."
            className="w-full py-2 px-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <span className="absolute left-3 top-2.5">🔍</span>
        </div>

        {/* Filters - Right Side */}
        <div className="flex gap-4">
          <div className="w-48">
            <select
              className="w-full py-2 px-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="">Semua Status</option>
              {tab === "pipeline" ? (
                <>
                  <option value="new">New</option>
                  <option value="rejected">Rejected</option>
                </>
              ) : (
                <>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </>
              )}
            </select>
          </div>

          <div className="w-48">
            <select
              className="w-full py-2 px-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value={10}>10 per halaman</option>
              <option value={25}>25 per halaman</option>
              <option value={50}>50 per halaman</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : (
        <div className="border border-teal-500 rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-4 px-6 text-left">No</th>
                <th className="py-4 px-6 text-left">CIF</th>
                <th className="py-4 px-6 text-left">Nama</th>
                <th className="py-4 px-6 text-left">No. Rek</th>
                <th className="py-4 px-6 text-left">Produk Eksisting</th>
                <th className="py-4 px-6 text-left">Status</th>
                <th className="py-4 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={customer.id} className="border-b">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">{customer.cif}</td>
                  <td className="py-4 px-6">{customer.nama}</td>
                  <td className="py-4 px-6">{customer.nomor_rekening}</td>
                  <td className="py-4 px-6">
                    {customer.produk_eksisting
                      ? customer.produk_eksisting.join(", ")
                      : "-"}
                  </td>
                  <td className="py-4 px-6">
                    <div className="inline-flex items-center">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium border min-w-[90px] text-center ${getStatusStyle(
                          customer.status as CustomerStatus
                        )}`}
                      >
                        {customer.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      className="px-4 py-1 border border-teal-500 text-teal-500 rounded-md hover:bg-teal-50"
                      onClick={() =>
                        router.push(`/dashboard/marketing/customer/${customer.cif}`)
                      }
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Section */}
      <div className="flex items-center justify-between mt-4 px-4">
        <div className="text-sm text-gray-700">
          Showing {customers.length ? (currentPage - 1) * rowsPerPage + 1 : 0} to{" "}
          {Math.min(currentPage * rowsPerPage, totalItems)} of {totalItems} entries
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-md ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-teal-600 hover:bg-teal-50"
            }`}
          >
            Previous
          </button>

          <span className="px-4 py-2 border rounded-md bg-teal-50">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-md ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-teal-600 hover:bg-teal-50"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;

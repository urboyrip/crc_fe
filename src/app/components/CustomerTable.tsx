"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Define interfaces for type safety
interface Customer {
  no: number;
  cif: string;
  noRek: string;
  produk: string;
  status: CustomerStatus;
  nama: string;
}

interface CustomerTableProps {
  tab: "pipeline" | "kelolaan";
  event?: string;
}

// Define specific types for status and tabs
type CustomerStatus = "New" | "Processing" | "Rejected" | "Contacted" | "Closed";
type TabType = "pipeline" | "kelolaan";
type RowsPerPageOption = 10 | 50 | 100 | number;

const CustomerTable: React.FC<CustomerTableProps> = ({ tab, event }) => {
  // State with proper typing
  const [activeTab, setActiveTab] = useState<TabType>("pipeline");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<RowsPerPageOption>(10);
  const router = useRouter();

  // Type the allCustomers array
  const allCustomers: Customer[] = [
    {
      no: 1,
      cif: "124900000",
      noRek: "0009999900",
      produk: "Mitraguna",
      status: "New",
      nama: "Sandy",
    },
    {
      no: 2,
      cif: "567800000",
      noRek: "0011223344",
      produk: "Fleksi",
      status: "Processing",
      nama: "Sandy",
    },
    {
      no: 3,
      cif: "135700000",
      noRek: "0055667788",
      produk: "KPR",
      status: "Rejected",
      nama: "Sandy",
    },
    {
      no: 4,
      cif: "246800000",
      noRek: "0099887766",
      produk: "KTA",
      status: "Contacted",
      nama: "Sandy",
    },
    {
      no: 5,
      cif: "987600000",
      noRek: "0033221144",
      produk: "Deposito",
      status: "Closed",
      nama: "Sandy",
    },
    {
      no: 6,
      cif: "432100000",
      noRek: "0077889900",
      produk: "Tabungan",
      status: "New",
      nama: "Budi",
    },
    {
      no: 7,
      cif: "876500000",
      noRek: "0011223355",
      produk: "Giro",
      status: "Contacted",
      nama: "Siti",
    },
    {
      no: 8,
      cif: "112233445",
      noRek: "0066554433",
      produk: "Mitraguna",
      status: "Processing",
      nama: "Andi",
    },
    {
      no: 9,
      cif: "998877665",
      noRek: "0022446688",
      produk: "KPR",
      status: "New",
      nama: "Rina",
    },
    {
      no: 10,
      cif: "554433221",
      noRek: "0088664422",
      produk: "KTA",
      status: "Rejected",
      nama: "Joko",
    },
    {
      no: 11,
      cif: "667788990",
      noRek: "0044228866",
      produk: "Deposito",
      status: "Closed",
      nama: "Dewi",
    },
    {
      no: 12,
      cif: "223344556",
      noRek: "0099113355",
      produk: "Tabungan",
      status: "Contacted",
      nama: "Eko",
    },
    {
      no: 13,
      cif: "778899001",
      noRek: "0055779911",
      produk: "Giro",
      status: "New",
      nama: "Lisa",
    },
    {
      no: 14,
      cif: "334455667",
      noRek: "0011882244",
      produk: "Fleksi",
      status: "Processing",
      nama: "Tono",
    },
    {
      no: 15,
      cif: "889900112",
      noRek: "0077339955",
      produk: "Mitraguna",
      status: "Rejected",
      nama: "Maya",
    },
  ];

  // Type the filter function
  const filteredCustomers = (activeTab: TabType): Customer[] => {
    let filteredData = allCustomers.filter((customer) => {
      const searchTerm = searchQuery.toLowerCase();
      return Object.values(customer).some((value) =>
        String(value).toLowerCase().includes(searchTerm)
      );
    });

    if (activeTab === "pipeline") {
      filteredData = filteredData.filter(
        (customer) =>
          customer.status === "New" || customer.status === "Rejected"
      );
    } else if (activeTab === "kelolaan") {
      filteredData = filteredData.filter(
        (customer) =>
          customer.status === "Contacted" || customer.status === "Closed"
      );
    }

    if (statusFilter !== "") {
      filteredData = filteredData.filter(
        (customer) =>
          customer.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    return filteredData.slice(0, rowsPerPage);
  };

  // Type the event handlers
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10) as RowsPerPageOption);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const handleStatusFilterChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setStatusFilter(event.target.value);
  };

  const handleTabChange = (newTab: TabType): void => {
    setActiveTab(newTab);
  };

  // Helper function to get status style
  const getStatusStyle = (status: CustomerStatus): string => {
    const styles = {
      New: "bg-yellow-100 text-yellow-600 border-yellow-600",
      Processing: "bg-blue-100 text-blue-600 border-blue-600",
      Rejected: "bg-red-100 text-red-600 border-red-600",
      Contacted: "bg-purple-100 text-purple-600 border-purple-600",
      Closed: "bg-green-100 text-green-600 border-green-600"
    };
    return styles[status] || "bg-gray-100 text-gray-600 border-gray-400";
  };

  return (
    <div className="border border-teal-500 rounded-lg p-4">
      {/* Tab Navigation */}
      <div className="flex justify-center border-b mb-4">
        <button
          className={`pb-2 px-4 text-xl font-medium ${
            activeTab === "pipeline"
              ? "text-teal-500 border-b-2 border-teal-500"
              : "text-gray-400"
          }`}
          onClick={() => handleTabChange("pipeline")}
        >
          Daftar Pipeline Nasabah
        </button>
        <button
          className={`pb-2 px-4 text-xl font-medium ${
            activeTab === "kelolaan"
              ? "text-teal-500 border-b-2 border-teal-500"
              : "text-gray-400"
          }`}
          onClick={() => handleTabChange("kelolaan")}
        >
          Daftar Nasabah Kelolaan
        </button>
      </div>

      {/* Search and Filter - FIXED LAYOUT */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Search input with fixed width */}
        <div className="relative w-64 md:w-80">
          <input
            type="text"
            placeholder="Type keyword Search"
            className="w-full py-2 px-10 border border-gray-300 rounded-lg"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <span className="absolute left-3 top-2.5">🔍</span>
        </div>
        <div className="flex-1"></div> {/* Spacer */}
        {/* Status filter with fixed width */}
        <div className="w-40">
          <select
            className="w-full py-2 px-3 border border-gray-300 rounded-lg appearance-none"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            <option value="">Semua</option>
            {activeTab === "pipeline" && (
              <>
                <option value="new">New</option>
                <option value="rejected">Rejected</option>
              </>
            )}
            {activeTab === "kelolaan" && (
              <>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </>
            )}
          </select>
        </div>
        {/* Rows per page with fixed width */}
        <div className="flex items-center w-48">
          <label
            htmlFor="rowsPerPage"
            className="mr-2 text-sm text-gray-700 whitespace-nowrap"
          >
            Tampilkan:
          </label>
          <select
            id="rowsPerPage"
            className="py-2 px-3 border border-gray-300 rounded-lg appearance-none text-sm"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={allCustomers.length}>Semua</option>
          </select>
        </div>
      </div>

      {/* Table */}
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
            {filteredCustomers(activeTab).map((customer) => (
              <tr key={customer.no} className="border-b">
                <td className="py-4 px-6">{customer.no}</td>
                <td className="py-4 px-6">{customer.cif}</td>
                <td className="py-4 px-6">{customer.nama}</td>
                <td className="py-4 px-6">{customer.noRek}</td>
                <td className="py-4 px-6">{customer.produk}</td>
                <td className="py-4 px-6">
                  <div className="inline-flex items-center">
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium border min-w-[90px] text-center ${getStatusStyle(
                        customer.status
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
                      router.push("/dashboard/marketing/customer/1")
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
    </div>
  );
};

export default CustomerTable;

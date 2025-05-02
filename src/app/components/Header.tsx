"use client"

import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const handleLogout = () => {
    // Lakukan logika logout Anda di sini (misalnya, menghapus token dari local storage)
    localStorage.removeItem("authToken"); // Contoh: menghapus token

    // Navigasi ke halaman /login
    router.push("/login");
  };
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white rounded-t-xl shadow-sm">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image src="/Logo.png" alt="CRC Logo" width={120} height={40} />
      </div>

      {/* User Info and Logout */}
      <div className="flex items-center space-x-4">
        {/* User Info */}
        <div className="flex items-center space-x-2">
          <Image
            src="/login.png"
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-sm font-medium text-gray-800">Ucup</span>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-teal-500" />

        {/* Logout */}
        <button
          className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition"
          onClick={handleLogout}
        >
          <FiLogOut className="text-lg" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </header>
  );
}

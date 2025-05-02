import React, { useState } from 'react';
import Image from 'next/image';
import TnCPopup from './TnCPopUp';

interface CardReccomendationProps {
  nomor: number;
  produk: string;
  maksimalPlafond: string;
  logo: string;
  onLihatPersyaratan?: () => void;
}

const CardReccomendation: React.FC<CardReccomendationProps> = ({
  nomor,
  produk,
  maksimalPlafond,
  logo,
  onLihatPersyaratan = () => {},
}) => {
  // Tambahkan state untuk mengontrol popup
  const [showTnC, setShowTnC] = useState(false);

  return (
    <>
      <div className="w-full rounded-2xl border border-teal-500 p-4 flex flex-col">
        {/* Judul */}
        <h2 className="text-lg font-semibold mb-4">
          Rekomendasi {nomor}
        </h2>

        {/* Informasi Produk dan Plafond + Logo */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 relative">
            <Image
              src={logo}
              alt={`Logo ${produk}`}
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="text-base font-semibold">{produk}</h3>
            <p className="text-sm text-gray-700 font-medium">
              Maksimal Plafond Rp. {maksimalPlafond}
            </p>
          </div>
        </div>

        {/* Modifikasi tombol untuk membuka popup */}
        <div className="flex justify-end mt-auto">
          <button
            onClick={() => setShowTnC(true)}
            className="bg-teal-500 text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-teal-600 transition"
          >
            Lihat Persyaratan
          </button>
        </div>
      </div>

      {/* Tambahkan TnC Popup */}
      <TnCPopup 
        isOpen={showTnC} 
        onClose={() => setShowTnC(false)} 
      />
    </>
  );
};

export default CardReccomendation;

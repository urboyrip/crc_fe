"use client";

interface TnCPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TnCPopup: React.FC<TnCPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl border border-teal-600 p-10 text-center w-full max-w-2xl mx-4 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Syarat dan Ketentuan Umum</h2>
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-teal-500 text-white">
                <tr>
                  <th className="p-3">Dokumen yang Diperlukan</th>
                  <th className="p-3">CPNS/PNS</th>
                  <th className="p-3">Lembaga Negara</th>
                  <th className="p-3">BUMN/SWASTA</th>
                  <th className="p-3">Yayasan/Amal Usaha</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3">Copy KTP Nasabah & KTP Pasangan/Kartu Keluarga</td>
                  <td className="p-3 text-center">✓</td>
                  <td className="p-3 text-center">✓</td>
                  <td className="p-3 text-center">✓</td>
                  <td className="p-3 text-center">✓</td>
                </tr>
                {/* Add other rows */}
              </tbody>
            </table>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <p>1. Asuransi Jiwa dan/ atau asuransi penjaminan pembiayaan dengan menggunakan Banker's Clause.</p>
            <p>2. Pembayaran angsuran pembiayaan dilakukan dengan cara pendebetan rekening tabungan atas nama Nasabah yang ada di Bank atau penyetoran gaji melalui Bendahara/ bagian kepegawaian tempat Nasabah bekerja.</p>
            <p>3. Angsuran pertama dibayarkan maksimal satu bulan sejak pencairan pembiayaan.</p>
            <p>4. Dilakukan pemblokiran minimal 1x angsuran sampai dengan pembiayaan dinyatakan lunas oleh Bank.</p>
            <p>5. Nasabah tidak diperbolehkan untuk memberikan bingkisan dalam bentuk apapun kepada seluruh petugas Bank.</p>
            <p>6. PT Bank Syariah Indonesia Tbk adalah pelaku Usaha Jasa Keuangan terdaftar dan diawasi oleh Otoritas Jasa Keuangan.</p>
            <p>7. Syarat dan Ketentuan lainnya diatur dalam Syarat Umum Pembiayaan yang akan ditandatangani nasabah.</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default TnCPopup;
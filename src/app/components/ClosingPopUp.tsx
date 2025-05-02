import { FaCheckCircle } from "react-icons/fa";

interface ClosingPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClosingPopup({ isOpen, onClose }: ClosingPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl border border-teal-600 p-10 text-center w-full max-w-2xl mx-4 shadow-lg">
        <FaCheckCircle className="text-teal-600 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-teal-600 mb-2">CLOSED</h2>
        <p className="text-lg font-semibold text-teal-600">
          Selamat anda telah closing,<br />kerja lebih keras lagi!
        </p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}

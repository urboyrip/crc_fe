"use client";

interface VerifyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const VerifyPopup: React.FC<VerifyPopupProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl border border-teal-600 p-10 text-center w-full max-w-2xl mx-4 shadow-lg">
        <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Apakah Anda sudah memeriksa kembali semua informasi yang diinput?
        </h2>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition"
          >
            Periksa Kembali
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPopup;
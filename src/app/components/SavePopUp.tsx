"use client";

interface SavePopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const SavePopUp: React.FC<SavePopUpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl border border-teal-600 p-10 text-center w-full max-w-2xl mx-4 shadow-lg">
        <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Terima kasih, Data Telah Tersimpan!</h2>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default SavePopUp;
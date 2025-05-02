import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CustomerInfoForm from "@/app/components/FormInputNasabah";

export default function InputNasabah() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <a href="/dashboard/marketing" className="hover:text-teal-500">Dashboard</a>
          <span className="mx-2">/</span>
          <span className="text-teal-500">Masukan Nasabah Baru</span>
        </div>
        
        <h1 className="text-2xl font-bold mb-6">Masukan Nasabah Baru</h1>
        
        <CustomerInfoForm />
      </main>
      <Footer />
    </div>
  );
}
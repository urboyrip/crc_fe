"use client"

import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import FormTargetMarketing from "@/app/components/FormTargetMarketing"

export default function TargetMarketing(){
    return(
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow bg-gray-50 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <a href="/dashboard/manager" className="hover:text-teal-500">Dashboard</a>
                        <span>/</span>
                        <span className="text-teal-500">Masukan Target Marketing</span>
                    </div>
                    <FormTargetMarketing />
                </div>
            </main>
            <Footer />
        </div>
    )
}
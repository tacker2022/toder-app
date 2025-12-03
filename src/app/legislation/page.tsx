import React from "react";
import { Scale } from "lucide-react";
import { getLegislations } from "@/actions/legislations";
import LegislationList from "./LegislationList";

export default async function LegislationPage() {
    const legislations = await getLegislations();

    return (
        <main className="pt-32 pb-20 min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-6">
                        <Scale size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Mevzuat & Bilgi Bankası</h1>
                    <p className="text-white/60 text-lg">
                        Sektörle ilgili kanun, yönetmelik ve resmi belgeler.
                    </p>
                </div>

                <LegislationList legislations={legislations} />
            </div>
        </main>
    );
}

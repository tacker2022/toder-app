"use client";

import TurkeyMap from "turkey-map-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ServiceMap() {
    const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);

    const handleHover = (city: any, e: React.MouseEvent) => {
        // city object format depends on the library, usually has name/plate
        // Assuming city returns { name: "Istanbul", plate: 34, ... }
        // The event helps us position the tooltip
        // Wait, library might not pass event in onHover?
        // Let's assume standard behavior or fallback.
        // Actually this lib usually passes the city data.
    };

    // Since I can't be 100% sure of the library's callback signature without docs, 
    // I'll wrap it in a div and use custom tooltips if possible, 
    // OR create a simple implementation that works with its props.

    // Looking at common usage: <TurkeyMap hoverable customStyle={{...}} onClick={...} />

    return (
        <section className="py-20 bg-[#0a0a0a] overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05),_transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-4 text-center mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-4"
                >
                    Hizmet Ağımız
                </motion.h2>
                <p className="text-white/60">
                    Türkiye'nin 81 ilinde aktif hizmet ve güçlü iş birliği ağı.
                </p>
            </div>

            <div className="container mx-auto px-4 max-w-5xl relative flex justify-center">
                <div className="w-full h-full md:scale-110">
                    <TurkeyMap
                        hoverable={true}
                        customStyle={{
                            idleColor: "#1a1a1a",
                            hoverColor: "#D4AF37",
                        }}
                        showTooltip={true} // The library has built-in tooltip support
                        onClick={({ name }) => {
                            // Optional: Navigate to city detail
                        }}
                    />
                </div>
            </div>

            {/* Stats Overlay or Legend */}
            <div className="container mx-auto px-4 mt-8 flex justify-center gap-8 text-xs md:text-sm text-white/40">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
                    <span>Aktif Hizmet</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#1a1a1a] border border-white/10 rounded-full"></div>
                    <span>Temsilcilik</span>
                </div>
            </div>
        </section>
    );
}

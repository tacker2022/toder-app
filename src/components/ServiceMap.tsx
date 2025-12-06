'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cities, City } from '@/data/turkeyMapData';

interface TooltipState {
    show: boolean;
    name: string;
    x: number;
    y: number;
}

export default function ServiceMap() {
    const [tooltip, setTooltip] = useState<TooltipState>({
        show: false,
        name: '',
        x: 0,
        y: 0,
    });

    const [activeCityId, setActiveCityId] = useState<string | null>(null);

    const handleMouseMove = (e: React.MouseEvent, name: string) => {
        // Get cursor position relative to viewport
        const x = e.clientX;
        const y = e.clientY;

        setTooltip({
            show: true,
            name,
            x,
            y,
        });
    };

    const handleMouseEnter = (cityId: string) => {
        setActiveCityId(cityId);
    };

    const handleMouseLeave = () => {
        setActiveCityId(null);
        setTooltip((prev) => ({ ...prev, show: false }));
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-5xl aspect-[2/1] relative">
                <svg
                    viewBox="0 0 1050 590"
                    className="w-full h-full drop-shadow-xl"
                    style={{ filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.4))" }}
                >
                    {cities.map((city) => (
                        <motion.path
                            key={city.id}
                            d={city.path}
                            id={city.id}
                            name={city.name}
                            initial={{ fill: "#1a1a1a", stroke: "#333", strokeWidth: 1 }}
                            animate={{
                                fill: activeCityId === city.id ? "#fbbf24" : "#1a1a1a", // warm amber fill on hover
                                stroke: activeCityId === city.id ? "#f59e0b" : "#404040",
                                scale: activeCityId === city.id ? 1.01 : 1,
                                zIndex: activeCityId === city.id ? 10 : 1,
                                filter: activeCityId === city.id ? "drop-shadow(0 0 10px rgba(251, 191, 36, 0.3))" : "none"
                            }}
                            transition={{ duration: 0.2 }}
                            onMouseMove={(e) => handleMouseMove(e, city.name)}
                            onMouseEnter={() => handleMouseEnter(city.id)}
                            onMouseLeave={handleMouseLeave}
                            className="cursor-pointer transition-all duration-300"
                            style={{
                                outline: 'none',
                                transformOrigin: 'center'
                            }}
                        />
                    ))}
                </svg>

                {/* Tooltip Portal or Fixed Position Overlay */}
                <AnimatePresence>
                    {tooltip.show && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            style={{
                                position: 'fixed',
                                left: tooltip.x + 20,
                                top: tooltip.y - 40,
                                pointerEvents: 'none',
                                zIndex: 9999, // Ensure it's above everything
                            }}
                            className="bg-black/90 text-amber-400 text-sm font-bold px-4 py-2 rounded-full border border-amber-500/30 shadow-2xl backdrop-blur-sm"
                        >
                            {tooltip.name}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Decorative Legend or Info */}
            <div className="absolute bottom-4 right-4 text-xs text-white/20 select-none">
                81 İl Hizmet Noktası
            </div>
        </div>
    );
}

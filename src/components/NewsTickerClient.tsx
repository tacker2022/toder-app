"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface TickerItem {
    id: string;
    title: string;
    type: "haber" | "mevzuat";
    url: string;
    date: string;
}

export default function NewsTickerClient({ items }: { items: TickerItem[] }) {
    const [isPaused, setIsPaused] = useState(false);

    if (items.length === 0) return null;

    // Duplicate items to ensure smooth infinite scroll
    const tickerItems = [...items, ...items, ...items];

    return (
        <div className="w-full bg-[#0a0a0a] border-b border-white/5 h-10 flex items-center overflow-hidden relative z-40">
            {/* Label */}
            <div className="h-full bg-[#D4AF37] text-black text-xs font-bold px-4 flex items-center shrink-0 z-10 shadow-lg relative">
                <span className="animate-pulse mr-2">●</span>
                DUYURULAR
                {/* Slanted edge effect */}
                <div className="absolute top-0 -right-3 w-0 h-0 border-t-[40px] border-t-[#D4AF37] border-r-[15px] border-r-transparent pointer-events-none"></div>
            </div>

            {/* Ticker Content */}
            <div
                className="flex-1 overflow-hidden relative h-full flex items-center mask-image-linear-to-r"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <motion.div
                    className="flex items-center gap-12 whitespace-nowrap pl-4"
                    animate={{
                        x: isPaused ? undefined : ["0%", "-33.33%"],
                    }}
                    transition={{
                        duration: items.length * 5, // Adjust speed based on content length
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {tickerItems.map((item, index) => (
                        <Link
                            key={`${item.id}-${index}`}
                            href={item.url}
                            className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                        >
                            <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold ${item.type === 'haber' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                                }`}>
                                {item.type}
                            </span>
                            <span className="font-medium group-hover:underline decoration-[#D4AF37] underline-offset-4">
                                {item.title}
                            </span>
                            <span className="text-xs text-white/30 ml-1">
                                • {new Date(item.date).toLocaleDateString('tr-TR')}
                            </span>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

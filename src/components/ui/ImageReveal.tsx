"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ImageRevealProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
}

export default function ImageReveal({ src, alt, className = "", width, height }: ImageRevealProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Reveal Curtain */}
            <motion.div
                initial={{ scaleY: 1 }}
                animate={{ scaleY: (isLoaded || hasError) ? 0 : 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 bg-[#D4AF37] z-20 origin-top"
            />

            {/* Image or Fallback */}
            {hasError ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white/20">
                    <span className="text-sm">Görsel Yüklenemedi</span>
                </div>
            ) : (
                <motion.img
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => {
                        setHasError(true);
                        setIsLoaded(true); // Lift curtain even on error
                    }}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: isLoaded ? 1 : 1.2, opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full h-full object-cover"
                />
            )}
        </div>
    );
}

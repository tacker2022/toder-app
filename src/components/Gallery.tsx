"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface GalleryProps {
    images: {
        id: string;
        image_url: string;
    }[];
}

export default function Gallery({ images }: GalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (selectedIndex === null) return;

        if (e.key === "Escape") {
            setSelectedIndex(null);
        } else if (e.key === "ArrowLeft") {
            setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
        } else if (e.key === "ArrowRight") {
            setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
        }
    }, [selectedIndex, images.length]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    if (!images || images.length === 0) return null;

    return (
        <div className="mt-16 border-t border-white/10 pt-12">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-[#D4AF37] rounded-full"></span>
                Galeri
            </h3>

            {/* Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((img, index) => (
                    <motion.div
                        key={img.id}
                        layoutId={`gallery-img-${img.id}`}
                        onClick={() => setSelectedIndex(index)}
                        className="relative group overflow-hidden rounded-xl aspect-video cursor-pointer bg-white/5"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <img
                            src={img.image_url}
                            alt="Gallery"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 rounded-full hover:bg-white/20 transition-colors">
                                <ZoomIn size={24} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                        onClick={() => setSelectedIndex(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-2 rounded-full transition-colors z-50"
                            onClick={() => setSelectedIndex(null)}
                        >
                            <X size={32} />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 p-3 rounded-full transition-colors z-50 hidden md:block"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
                            }}
                        >
                            <ChevronLeft size={32} />
                        </button>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 p-3 rounded-full transition-colors z-50 hidden md:block"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
                            }}
                        >
                            <ChevronRight size={32} />
                        </button>

                        {/* Main Image */}
                        <motion.div
                            layoutId={`gallery-img-${images[selectedIndex].id}`}
                            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={images[selectedIndex].image_url}
                                alt="Gallery Fullscreen"
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            />

                            {/* Counter */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md">
                                {selectedIndex + 1} / {images.length}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

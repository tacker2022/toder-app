"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, FileText, info, Home, UserPlus, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const router = useRouter();

    // Toggle on Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const menuItems = [
        { icon: <Home size={18} />, label: "Ana Sayfa", href: "/", category: "Navigasyon" },
        { icon: <info size={18} />, label: "Hakkımızda", href: "/#vizyon", category: "Navigasyon" },
        { icon: <UserPlus size={18} />, label: "Üyelik Başvurusu", href: "/basvuru", category: "İşlem" },
        { icon: <Calendar size={18} />, label: "Etkinlikler", href: "/#etkinlikler", category: "Navigasyon" },
        { icon: <FileText size={18} />, label: "Mevzuat Bilgi Bankası", href: "/legislation", category: "Kaynak" },
        { icon: <info size={18} />, label: "Sıkça Sorulan Sorular", href: "/faq", category: "Kaynak" },
    ];

    const filteredItems = menuItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (href: string) => {
        setIsOpen(false);
        setQuery("");
        router.push(href);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[10000]"
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-4 p-4 border-b border-white/10">
                            <Search className="text-white/50" size={20} />
                            <input
                                type="text"
                                placeholder="Ne aramak istiyorsunuz?..."
                                className="bg-transparent border-none outline-none text-white text-lg w-full placeholder-white/30"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                autoFocus
                            />
                            <div className="hidden md:flex gap-2">
                                <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded">ESC</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="md:hidden text-white/50">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Results */}
                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {filteredItems.length > 0 ? (
                                <div className="space-y-1">
                                    {filteredItems.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSelect(item.href)}
                                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 text-left group transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="text-white/40 group-hover:text-[#D4AF37] transition-colors">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <span className="text-white font-medium block">{item.label}</span>
                                                    <span className="text-white/30 text-xs">{item.category}</span>
                                                </div>
                                            </div>
                                            <ChevronRight className="text-white/20 group-hover:text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" size={16} />
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-white/30">
                                    Sonuç bulunamadı...
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-3 bg-white/5 border-t border-white/5 text-xs text-white/30 flex justify-between">
                            <span>Yön tuşları veya mouse ile seçin</span>
                            <span className="font-mono text-[#D4AF37]">TODER</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

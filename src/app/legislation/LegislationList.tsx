"use client";

import React, { useState } from "react";
import { FileText, Download, Calendar, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function LegislationList({ legislations }: { legislations: any[] }) {
    const [filter, setFilter] = useState("Tümü");
    const [search, setSearch] = useState("");

    const categories = ["Tümü", "Kanun", "Yönetmelik", "Genelge", "Tebliğ", "Duyuru"];

    const filteredLegislations = legislations.filter((item) => {
        const matchesCategory = filter === "Tümü" || item.category === filter;
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(search.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div>
            {/* Filters */}
            <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === cat
                                    ? "bg-[#D4AF37] text-black"
                                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Belge ara..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                </div>
            </div>

            {/* List */}
            <div className="space-y-4">
                {filteredLegislations.length > 0 ? (
                    filteredLegislations.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 hover:border-[#D4AF37]/30 transition-colors group"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                                                {item.title}
                                            </h3>
                                            <span className="px-2 py-1 rounded text-xs font-medium bg-white/10 text-white/80 border border-white/10">
                                                {item.category}
                                            </span>
                                        </div>
                                        <p className="text-white/60 mb-3">{item.description}</p>
                                        <div className="flex items-center gap-4 text-xs text-white/40">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                <span>{new Date(item.published_date).toLocaleDateString("tr-TR")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {item.pdf_url ? (
                                    <a
                                        href={item.pdf_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 text-white font-medium rounded-lg hover:bg-[#D4AF37] hover:text-black transition-colors shrink-0"
                                    >
                                        <Download size={20} />
                                        <span>İndir / Oku</span>
                                    </a>
                                ) : (
                                    <button disabled className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 text-white/40 font-medium rounded-lg cursor-not-allowed shrink-0">
                                        <FileText size={20} />
                                        <span>Belge Yok</span>
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
                        <FileText size={48} className="mx-auto text-white/20 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Sonuç Bulunamadı</h3>
                        <p className="text-white/60">Aradığınız kriterlere uygun belge bulunmamaktadır.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

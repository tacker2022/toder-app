"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    Building2,
    Users,
    FileText,
    Newspaper,
    Calendar,
    Video,
    Scale,
    HelpCircle,
    Menu,
    X,
    ExternalLink
} from "lucide-react";

const MENU_ITEMS = [
    {
        title: "KURUMSAL",
        items: [
            { label: "Vizyon & Misyon", href: "#vizyon", icon: Building2, desc: "Değerlerimiz ve gelecek hedeflerimiz" },
            { label: "Yönetim Kurulu", href: "#yonetim", icon: Users, desc: "Derneğimizi yöneten kadro" },
            { label: "Komisyonlar", href: "#komisyonlar", icon: FileText, desc: "Çalışma gruplarımız ve komiteler" },
        ]
    },
    {
        title: "MEDYA & ETKİNLİK",
        items: [
            { label: "Haberler", href: "#blog", icon: Newspaper, desc: "Sektörden en güncel gelişmeler" },
            { label: "Duyurular", href: "/events", icon: Calendar, desc: "Yaklaşan etkinlikler ve programlar" },
            { label: "Video Galeri", href: "#medya", icon: Video, desc: "Etkinlik kayıtları ve röportajlar" },
        ]
    },
    {
        title: "BİLGİ MERKEZİ",
        items: [
            { label: "Mevzuat", href: "/legislation", icon: Scale, desc: "Yönetmelikler ve yasal düzenlemeler" },
            { label: "S.S.S.", href: "/faq", icon: HelpCircle, desc: "Sıkça sorulan sorular" },
        ]
    }
];

export default function Navbar() {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Smooth scroll handler
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                setIsMobileMenuOpen(false);
            }
        } else {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-6"
                }`}
            onMouseLeave={() => setActiveTab(null)}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tighter z-[10000] relative">
                    TODER<span className="text-[#D4AF37]">.</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {MENU_ITEMS.map((menu) => (
                        <div
                            key={menu.title}
                            className="relative"
                            onMouseEnter={() => setActiveTab(menu.title)}
                        >
                            <button
                                className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors ${activeTab === menu.title ? "text-[#D4AF37]" : "text-white/80 hover:text-white"
                                    }`}
                            >
                                {menu.title}
                                <ChevronDown
                                    size={14}
                                    className={`transition-transform duration-300 ${activeTab === menu.title ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Dropdown content is handled absolutely within the container or via a full-width wrapper */}
                        </div>
                    ))}

                    <Link
                        href="/basvuru"
                        className="btn-primary-sm ml-4"
                    >
                        Üye Ol
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white p-3 -mr-2 z-[10000] relative hover:bg-white/10 rounded-full transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mega Menu Dropdown (Desktop) */}
            <AnimatePresence>
                {activeTab && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="hidden md:block absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-b border-white/10 shadow-2xl z-[9998]"
                        onMouseEnter={() => setActiveTab(activeTab)}
                        onMouseLeave={() => setActiveTab(null)}
                    >
                        <div className="container mx-auto px-4 py-8">
                            <div className="grid grid-cols-3 gap-8">
                                {/* Links Column */}
                                <div className="col-span-2 grid grid-cols-2 gap-x-12 gap-y-6">
                                    {MENU_ITEMS.find(m => m.title === activeTab)?.items.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            href={item.href}
                                            onClick={(e) => handleLinkClick(e, item.href)}
                                            className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform shrink-0">
                                                <item.icon size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white group-hover:text-[#D4AF37] transition-colors mb-1">
                                                    {item.label}
                                                </h4>
                                                <p className="text-xs text-white/50 leading-relaxed">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Spotlight / Banner Column */}
                                <div className="col-span-1 bg-gradient-to-br from-[#1a1a1a] to-black rounded-xl p-6 border border-white/5 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                                    <h3 className="text-lg font-bold text-white mb-2 relative z-10">
                                        TODER Project
                                    </h3>
                                    <p className="text-sm text-white/60 mb-6 relative z-10">
                                        Sektörün geleceğini şekillendiren projelerimize göz atın.
                                    </p>

                                    <Link
                                        href="/blog"
                                        className="inline-flex items-center gap-2 text-[#D4AF37] text-sm font-bold hover:gap-3 transition-all"
                                    >
                                        İncele <ExternalLink size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-black z-40 md:hidden pt-24 px-6 overflow-y-auto"
                    >
                        <div className="flex flex-col gap-6">
                            {MENU_ITEMS.map((menu, idx) => (
                                <div key={idx} className="border-b border-white/10 pb-6 last:border-0">
                                    <h3 className="text-[#D4AF37] font-bold mb-4 text-sm tracking-wider uppercase">
                                        {menu.title}
                                    </h3>
                                    <div className="grid gap-4">
                                        {menu.items.map((item, i) => (
                                            <Link
                                                key={i}
                                                href={item.href}
                                                onClick={(e) => handleLinkClick(e, item.href)}
                                                className="flex items-center gap-3 text-white/80 hover:text-white"
                                            >
                                                <item.icon size={18} className="text-[#D4AF37]/70" />
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <Link
                                href="/basvuru"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 mt-4"
                            >
                                Üye Başvurusu
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

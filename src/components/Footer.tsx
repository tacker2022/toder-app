"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Linkedin, ChevronRight, ArrowUp } from "lucide-react";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-white inline-block">
                            TODER<span className="text-[#D4AF37]">.</span>
                        </Link>
                        <p className="text-white/60 leading-relaxed">
                            Otopark sektörünün öncü kuruluşu olarak, teknoloji ve standartlaşma ile geleceği şekillendiriyoruz.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/tobfedorg/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/tobfed/posts/?feedView=all"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6">Hızlı Erişim</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="/#vizyon" className="text-white/60 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="-ml-6 group-hover:ml-0 transition-all">Hakkımızda</span>
                                </a>
                            </li>
                            <li>
                                <a href="/#iletisim" className="text-white/60 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="-ml-6 group-hover:ml-0 transition-all">Üyelik</span>
                                </a>
                            </li>
                            <li>
                                <Link href="/faq" className="text-white/60 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="-ml-6 group-hover:ml-0 transition-all">S.S.S.</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/legislation" className="text-white/60 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="-ml-6 group-hover:ml-0 transition-all">Mevzuat</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6">İletişim</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-white/60">
                                <MapPin size={20} className="text-[#D4AF37] shrink-0 mt-1" />
                                <span>Selenium Retro Ataköy 7.8.9.10. Kısım Mah. No:18/1 A Blok Kat:8/106 Bakırköy / İSTANBUL</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/60">
                                <Phone size={20} className="text-[#D4AF37] shrink-0" />
                                <span>0212 570 36 34</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/60">
                                <Mail size={20} className="text-[#D4AF37] shrink-0" />
                                <span>info@toder.org.tr</span>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6">Yasal</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/kvkk" className="text-white/60 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="-ml-6 group-hover:ml-0 transition-all">Gizlilik ve KVKK</span>
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-white/60 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="-ml-6 group-hover:ml-0 transition-all">Çerez Politikası</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-sm text-center md:text-left">
                        © {new Date().getFullYear()} TODER Project – Tüm Hakları Saklıdır.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#D4AF37] hover:text-black transition-all duration-300 group"
                    >
                        <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
}

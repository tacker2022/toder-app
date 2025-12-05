"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Linkedin, ChevronRight, ArrowUp, MessageCircle, Code } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
                                <Link href="/basvuru" className="text-white/60 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="-ml-6 group-hover:ml-0 transition-all">Üyelik</span>
                                </Link>
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
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <p className="text-white/40 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} TODER Project – Tüm Hakları Saklıdır.
                        </p>

                        {/* Developer Credit */}
                        <div className="relative group">
                            <span className="text-white/30 text-xs flex items-center gap-2 cursor-pointer hover:text-[#D4AF37] transition-colors py-2">
                                <Code size={14} />
                                Developed by <span className="font-medium">Talha Çalargün</span>
                            </span>

                            {/* Hover Card */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37]/30 p-1 mb-3">
                                            <div className="w-full h-full rounded-full overflow-hidden relative">
                                                <Image
                                                    src="/images/developer.jpg"
                                                    alt="Talha Çalargün"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                        <h4 className="text-white font-bold text-lg">Talha Çalargün</h4>
                                        <p className="text-[#D4AF37] text-xs font-medium mb-4">Digital Systems & Technology Developer</p>

                                        <div className="flex gap-3 justify-center">
                                            <a
                                                href="https://www.linkedin.com/in/talhaemrecalargun/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#0077b5] hover:text-white transition-all"
                                                title="LinkedIn"
                                            >
                                                <Linkedin size={16} />
                                            </a>
                                            <a
                                                href="https://www.instagram.com/talhacalargun"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#E1306C] hover:text-white transition-all"
                                                title="Instagram"
                                            >
                                                <Instagram size={16} />
                                            </a>
                                            <a
                                                href="https://api.whatsapp.com/send/?phone=905372939874&text&type=phone_number&app_absent=0"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#25D366] hover:text-white transition-all"
                                                title="WhatsApp"
                                            >
                                                <MessageCircle size={16} />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0a0a0a]/90 border-r border-b border-white/10 rotate-45"></div>
                                </div>
                            </div>
                        </div>
                    </div>
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

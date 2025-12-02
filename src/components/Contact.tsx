"use client";

import { MapPin, Phone, Mail, Instagram, Linkedin } from "lucide-react";

export default function Contact() {
    return (
        <section id="iletisim" className="py-20 bg-[#0a0a0a] border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">İletişim</h2>
                    <div className="w-20 h-1 bg-[#D4AF37] rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 transition-colors">
                            <h3 className="text-2xl font-bold mb-6 text-[#D4AF37]">Bize Ulaşın</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#D4AF37]/10 p-3 rounded-lg text-[#D4AF37]">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Adres</h4>
                                        <p className="text-white/70">
                                            Selenium Retro Ataköy 7.8.9.10. Kısım Mah.<br />
                                            No:18/1 A Blok Kat:8/106<br />
                                            Bakırköy / İSTANBUL
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-[#D4AF37]/10 p-3 rounded-lg text-[#D4AF37]">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Telefon</h4>
                                        <p className="text-white/70">0212 570 36 34</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-[#D4AF37]/10 p-3 rounded-lg text-[#D4AF37]">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">E-posta</h4>
                                        <p className="text-white/70">info@toder.org.tr</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex gap-4 justify-center md:justify-start">
                            <a href="https://www.instagram.com/tobfedorg/" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-4 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                                <Instagram size={24} />
                            </a>
                            <a href="https://www.linkedin.com/company/tobfed/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-4 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="h-[400px] bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.650490013084!2d28.83156337654353!3d40.98913997135288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa36611270001%3A0x6666666666666666!2sSelenium%20Retro!5e0!3m2!1str!2str!4v1701500000000!5m2!1str!2str"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}

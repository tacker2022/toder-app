"use client";

import { MapPin, Phone, Mail, Instagram, Linkedin, Send, CheckCircle } from "lucide-react";
import { sendMessage } from "@/actions/messages";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            await sendMessage(formData);
            setSuccess(true);
            // Reset form after 3 seconds
            setTimeout(() => setSuccess(false), 5000);
            // Reset form fields
            const form = document.getElementById("contact-form") as HTMLFormElement;
            form?.reset();
        } catch (error) {
            alert("Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section id="iletisim" className="py-20 bg-[#0a0a0a] border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">İletişim</h2>
                    <div className="w-20 h-1 bg-[#D4AF37] rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 transition-colors h-full">
                            <h3 className="text-2xl font-bold mb-6 text-[#D4AF37]">Bize Ulaşın</h3>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#D4AF37]/10 p-3 rounded-lg text-[#D4AF37] shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1 text-lg">Adres</h4>
                                        <p className="text-white/70 leading-relaxed">
                                            Selenium Retro Ataköy 7.8.9.10. Kısım Mah.<br />
                                            No:18/1 A Blok Kat:8/106<br />
                                            Bakırköy / İSTANBUL
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-[#D4AF37]/10 p-3 rounded-lg text-[#D4AF37] shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1 text-lg">Telefon</h4>
                                        <p className="text-white/70 text-lg">0212 570 36 34</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-[#D4AF37]/10 p-3 rounded-lg text-[#D4AF37] shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1 text-lg">E-posta</h4>
                                        <p className="text-white/70 text-lg">info@toder.org.tr</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <h4 className="font-bold mb-4 text-white/80">Sosyal Medya</h4>
                                    <div className="flex gap-4">
                                        <a href="https://www.instagram.com/tobfedorg/" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-4 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                                            <Instagram size={24} />
                                        </a>
                                        <a href="https://www.linkedin.com/company/tobfed/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-4 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                                            <Linkedin size={24} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message Form */}
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 transition-colors">
                        <h3 className="text-2xl font-bold mb-6 text-[#D4AF37]">Mesaj Gönder</h3>

                        {success ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-[400px] flex flex-col items-center justify-center text-center p-6"
                            >
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6">
                                    <CheckCircle size={40} />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-2">Mesajınız İletildi!</h4>
                                <p className="text-white/60">
                                    En kısa sürede sizinle iletişime geçeceğiz.
                                </p>
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="mt-8 text-[#D4AF37] hover:underline"
                                >
                                    Yeni Mesaj Gönder
                                </button>
                            </motion.div>
                        ) : (
                            <form id="contact-form" action={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-white/60 mb-1">Ad Soyad</label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            required
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                            placeholder="Adınız Soyadınız"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/60 mb-1">Telefon</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                            placeholder="05XX XXX XX XX"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/60 mb-1">E-posta</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                        placeholder="ornek@sirket.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/60 mb-1">Konu</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                        placeholder="Mesajınızın konusu"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/60 mb-1">Mesajınız</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                                        placeholder="İletmek istediğiniz mesaj..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-lg hover:bg-[#b8962e] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? (
                                        "Gönderiliyor..."
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Mesajı Gönder
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Map */}
                <div className="h-[400px] bg-white/5 rounded-2xl overflow-hidden border border-white/10 max-w-6xl mx-auto">
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
        </section>
    );
}

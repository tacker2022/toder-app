"use client";

import { submitApplication } from "@/actions/applications";
import { useState } from "react";
import { FileText, Send, CheckCircle, User, Mail, Phone, Building2, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function ApplicationPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            await submitApplication(formData);
            setSuccess(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            alert("Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <main className="pt-32 pb-20 min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-4 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-2xl p-12 text-center"
                    >
                        <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] mx-auto mb-6">
                            <CheckCircle size={40} />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">Başvurunuz Alındı!</h1>
                        <p className="text-white/60 text-lg mb-8">
                            Üyelik ön başvurunuz başarıyla tarafımıza ulaşmıştır. Yönetim kurulumuzun değerlendirmesi sonrasında sizinle iletişime geçilecektir.
                        </p>
                        <a
                            href="/"
                            className="inline-flex items-center justify-center px-8 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#b8962e] transition-colors"
                        >
                            Ana Sayfaya Dön
                        </a>
                    </motion.div>
                </div>
            </main>
        );
    }

    return (
        <main className="pt-32 pb-20 min-h-screen">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-6">
                        <FileText size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Üyelik Başvurusu</h1>
                    <p className="text-white/60 text-lg">
                        TODER ailesine katılmak için aşağıdaki formu doldurarak ön başvurunuzu iletebilirsiniz.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-10"
                >
                    <form action={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
                                    <User size={16} className="text-[#D4AF37]" />
                                    Ad Soyad
                                </label>
                                <input
                                    type="text"
                                    name="full_name"
                                    required
                                    placeholder="Adınız ve Soyadınız"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
                                    <Building2 size={16} className="text-[#D4AF37]" />
                                    Firma Adı
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    required
                                    placeholder="Temsil Ettiğiniz Firma"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
                                    <Mail size={16} className="text-[#D4AF37]" />
                                    E-posta Adresi
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="ornek@sirket.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
                                    <Phone size={16} className="text-[#D4AF37]" />
                                    Telefon Numarası
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    placeholder="05XX XXX XX XX"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
                                <MessageSquare size={16} className="text-[#D4AF37]" />
                                Mesajınız (Opsiyonel)
                            </label>
                            <textarea
                                name="message"
                                rows={4}
                                placeholder="Eklemek istedikleriniz..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#b8962e] transition-colors disabled:opacity-50 text-lg"
                            >
                                {loading ? (
                                    "Gönderiliyor..."
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Başvuruyu Gönder
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs text-white/40 mt-4">
                                Başvurunuz KVKK kapsamında güvenle saklanacaktır.
                            </p>
                        </div>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}

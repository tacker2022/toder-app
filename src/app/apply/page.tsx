import { submitApplication } from "@/actions/applications";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export default function ApplyPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/" className="text-white/50 hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-bold">Üyelik Başvurusu</h1>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                    <p className="text-white/70 mb-8">
                        TODER Project ailesine katılmak için lütfen aşağıdaki formu doldurun.
                        Başvurunuz incelendikten sonra sizinle iletişime geçilecektir.
                    </p>

                    <form action={submitApplication} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-white/50 mb-2">Ad Soyad</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                    placeholder="Adınız Soyadınız"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white/50 mb-2">Firma / Kurum</label>
                                <input
                                    type="text"
                                    name="company"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                    placeholder="Çalıştığınız Kurum"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-white/50 mb-2">E-posta Adresi</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                    placeholder="ornek@sirket.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white/50 mb-2">Telefon Numarası</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                    placeholder="05XX XXX XX XX"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-white/50 mb-2">Mesajınız (Opsiyonel)</label>
                            <textarea
                                name="message"
                                rows={4}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                                placeholder="Eklemek istedikleriniz..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-lg hover:bg-[#b8962e] transition-colors flex items-center justify-center gap-2 text-lg"
                        >
                            <Send size={20} />
                            Başvuruyu Gönder
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

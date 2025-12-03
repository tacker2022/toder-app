import { getFAQs, deleteFAQ } from "@/actions/faqs";
import Link from "next/link";
import { Plus, Pencil, Trash2, HelpCircle } from "lucide-react";

export default async function AdminFAQsPage() {
    const faqs = await getFAQs();

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Sıkça Sorulan Sorular</h1>
                    <p className="text-white/60">S.S.S. bölümünü buradan yönetebilirsiniz.</p>
                </div>
                <Link
                    href="/admin/faqs/new"
                    className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#b8962e] transition-colors"
                >
                    <Plus size={20} />
                    Yeni Soru Ekle
                </Link>
            </div>

            <div className="grid gap-4">
                {faqs.map((faq: any) => (
                    <div
                        key={faq.id}
                        className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 flex items-start justify-between group hover:border-[#D4AF37]/50 transition-colors"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                                <HelpCircle size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{faq.question}</h3>
                                <p className="text-white/60 line-clamp-2">{faq.answer}</p>
                                <div className="mt-2 text-xs text-white/40">
                                    Sıra: {faq.display_order}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link
                                href={`/admin/faqs/${faq.id}`}
                                className="p-2 text-white/60 hover:text-[#D4AF37] hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <Pencil size={20} />
                            </Link>
                            <form action={deleteFAQ.bind(null, faq.id)}>
                                <button
                                    type="submit"
                                    className="p-2 text-white/60 hover:text-red-500 hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                ))}

                {faqs.length === 0 && (
                    <div className="text-center py-12 bg-[#0a0a0a] border border-white/10 rounded-xl">
                        <HelpCircle size={48} className="mx-auto text-white/20 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Henüz Soru Eklenmemiş</h3>
                        <p className="text-white/60 mb-6">İlk soruyu ekleyerek başlayın.</p>
                        <Link
                            href="/admin/faqs/new"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#b8962e] transition-colors"
                        >
                            <Plus size={20} />
                            Yeni Soru Ekle
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

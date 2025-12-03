"use client";

import { updateFAQ } from "@/actions/faqs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";

export default function EditFAQForm({ faq }: { faq: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const result = await updateFAQ(faq.id, formData);
        setLoading(false);

        if (result?.error) {
            alert(result.error);
        } else {
            router.push("/admin/faqs");
        }
    }

    return (
        <>
            <div className="mb-8">
                <Link
                    href="/admin/faqs"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Listeye Dön
                </Link>
                <h1 className="text-3xl font-bold text-white">Soruyu Düzenle</h1>
            </div>

            <form action={handleSubmit} className="space-y-6 bg-[#0a0a0a] border border-white/10 p-8 rounded-xl">
                <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                        Soru
                    </label>
                    <input
                        type="text"
                        name="question"
                        defaultValue={faq.question}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                        Cevap
                    </label>
                    <textarea
                        name="answer"
                        defaultValue={faq.answer}
                        required
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                        Görüntüleme Sırası
                    </label>
                    <input
                        type="number"
                        name="display_order"
                        defaultValue={faq.display_order}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#b8962e] transition-colors disabled:opacity-50"
                    >
                        {loading ? (
                            "Kaydediliyor..."
                        ) : (
                            <>
                                <Save size={20} />
                                Güncelle
                            </>
                        )}
                    </button>
                </div>
            </form>
        </>
    );
}

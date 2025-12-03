"use client";

import { addLegislation } from "@/actions/legislations";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useState } from "react";

export default function NewLegislationPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const result = await addLegislation(formData);
        setLoading(false);

        if (result?.error) {
            alert(result.error);
        } else {
            router.push("/admin/legislations");
        }
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <Link
                    href="/admin/legislations"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Listeye Dön
                </Link>
                <h1 className="text-3xl font-bold text-white">Yeni Belge Ekle</h1>
            </div>

            <form action={handleSubmit} className="space-y-6 bg-[#0a0a0a] border border-white/10 p-8 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Başlık
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="Örn: Otopark Yönetmeliği"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Kategori
                        </label>
                        <select
                            name="category"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none"
                        >
                            <option value="Kanun">Kanun</option>
                            <option value="Yönetmelik">Yönetmelik</option>
                            <option value="Genelge">Genelge</option>
                            <option value="Tebliğ">Tebliğ</option>
                            <option value="Duyuru">Duyuru</option>
                            <option value="Diğer">Diğer</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                        Açıklama
                    </label>
                    <textarea
                        name="description"
                        rows={3}
                        placeholder="Belge hakkında kısa açıklama..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Yayın Tarihi
                        </label>
                        <input
                            type="date"
                            name="published_date"
                            defaultValue={new Date().toISOString().split('T')[0]}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            PDF Dosyası
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="w-full bg-white/5 border border-dashed border-white/20 rounded-lg px-4 py-3 text-white/60 flex items-center gap-2">
                                <Upload size={20} />
                                <span>PDF seçmek için tıklayın veya sürükleyin</span>
                            </div>
                        </div>
                    </div>
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
                                Kaydet
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

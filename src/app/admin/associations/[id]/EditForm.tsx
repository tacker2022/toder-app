"use client";

import { updateAssociation } from "@/actions/associations";
import { Save, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditAssociationForm({ association }: { association: any }) {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        try {
            const result = await updateAssociation(association.id, formData);

            if (result && 'error' in result && result.error) {
                setError(result.error);
                setLoading(false);
            } else {
                // Success
                router.push("/admin/associations");
                router.refresh();
            }
        } catch (e) {
            setError("Beklenmedik bir hata oluştu.");
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/associations" className="text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold">Dernek Düzenle</h1>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl max-w-2xl">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg mb-6 flex items-center gap-3">
                        <AlertCircle size={20} />
                        <p>{error}</p>
                    </div>
                )}

                <form action={handleSubmit} className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm text-white/50 mb-1">Dernek Adı</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={association.name}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-1">Web Sitesi (Opsiyonel)</label>
                        <input
                            type="url"
                            name="website_url"
                            defaultValue={association.website_url || ""}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-1">Logo (Değiştirmek için seçin)</label>
                        {association.image_url && (
                            <div className="mb-2 p-2 bg-white rounded-lg w-fit">
                                <img
                                    src={association.image_url}
                                    alt="Current"
                                    className="h-16 object-contain"
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                        <p className="text-xs text-white/30 mt-1">PNG veya JPG formatında, şeffaf arka planlı olması önerilir.</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#D4AF37] text-black font-bold py-3 rounded-lg hover:bg-[#b8962e] transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        ) : (
                            <Save size={20} />
                        )}
                        {loading ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                </form>
            </div>
        </div>
    );
}

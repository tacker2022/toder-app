"use client";

import { createPost } from "@/actions/posts";
import { Save, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        try {
            // createPost might throw an error or return an object
            // Based on the code, it throws on error, returns { success: true } on success
            // But wait, if I want to handle errors gracefully without crashing, I should probably update createPost to return { error } instead of throwing.
            // However, for now, let's wrap in try/catch.

            await createPost(formData);

            // If we get here, it was successful (since it throws on error)
            // But wait, server actions that redirect might throw a "NEXT_REDIRECT" error which we should catch or let bubble?
            // Actually, createPost calls revalidatePath but DOES NOT call redirect() anymore in my updated version?
            // Let's check actions/posts.ts again.
            // Ah, I see "revalidatePath" calls.
            // Wait, looking at the file content I viewed in step 2073:
            // Line 93: return { success: true };
            // It does NOT call redirect.

            router.push("/admin/posts?success=true");
        } catch (e: any) {
            console.error(e);
            setError(e.message || "Beklenmedik bir hata oluştu.");
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/posts" className="text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold">Yeni Yazı Ekle</h1>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl max-w-4xl">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg mb-6 flex items-center gap-3">
                        <AlertCircle size={20} />
                        <p>{error}</p>
                    </div>
                )}

                <form action={handleSubmit} className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm text-white/50 mb-2">Başlık</label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] text-lg"
                            placeholder="Yazı Başlığı"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-2">Tarih</label>
                        <input
                            type="date"
                            name="date"
                            defaultValue={new Date().toISOString().split('T')[0]}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-2">Kapak Görseli</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-2">İçerik</label>
                        <textarea
                            name="content"
                            required
                            rows={15}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                            placeholder="Yazı içeriği..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#D4AF37] text-black font-bold py-3 rounded-lg hover:bg-[#b8962e] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        ) : (
                            <Save size={20} />
                        )}
                        {loading ? "Kaydediliyor..." : "Yazıyı Yayınla"}
                    </button>
                </form>
            </div>
        </div>
    );
}

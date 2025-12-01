"use client";

import { updatePost, getPostById } from "@/actions/posts";
import { Save, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        getPostById(resolvedParams.id).then((data) => {
            if (data) {
                setPost(data);
            } else {
                setError("Yazı bulunamadı.");
            }
        });
    }, [resolvedParams.id]);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        try {
            const result = await updatePost(resolvedParams.id, formData);

            if (result && 'error' in result && result.error) {
                setError(result.error);
                setLoading(false);
            } else {
                // Success
                router.push("/admin/posts?success=true");
            }
        } catch (e) {
            setError("Beklenmedik bir hata oluştu.");
            setLoading(false);
        }
    }

    if (!post && !error) return <div className="text-white/50">Yükleniyor...</div>;

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/posts" className="text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold">Yazıyı Düzenle</h1>
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
                            defaultValue={post?.title}
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
                            defaultValue={post?.created_at ? new Date(post.created_at).toISOString().split('T')[0] : ''}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-2">Tarih</label>
                        <input
                            type="date"
                            name="date"
                            defaultValue={post?.created_at ? new Date(post.created_at).toISOString().split('T')[0] : ''}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-2">Kapak Görseli (Değiştirmek için seçin)</label>
                        {post?.image_url && (
                            <img src={post.image_url} alt="Current" className="w-32 h-32 object-cover rounded-lg mb-4 border border-white/10" />
                        )}
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
                            defaultValue={post?.content}
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
                        {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </button>
                </form>
            </div>
        </div>
    );
}

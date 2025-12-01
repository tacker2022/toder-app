"use client";

import { updateVideo, getVideoById } from "@/actions/videos";
import { Save, ArrowLeft, AlertCircle, Video } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        getVideoById(resolvedParams.id).then((data) => {
            if (data) {
                setVideo(data);
            } else {
                setError("Video bulunamadı.");
            }
        });
    }, [resolvedParams.id]);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        try {
            const result = await updateVideo(resolvedParams.id, formData);

            if (result && 'error' in result && result.error) {
                setError(result.error);
                setLoading(false);
            } else {
                // Success
                router.push("/admin/videos?success=true");
            }
        } catch (e) {
            setError("Beklenmedik bir hata oluştu.");
            setLoading(false);
        }
    }

    if (!video && !error) return <div className="text-white/50">Yükleniyor...</div>;

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/videos" className="text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold">Videoyu Düzenle</h1>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl max-w-2xl">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg mb-6 flex items-center gap-3">
                        <AlertCircle size={20} />
                        <p>{error}</p>
                    </div>
                )}

                <form action={handleSubmit} className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm text-white/50 mb-1">Video Başlığı</label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={video?.title}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                            placeholder="Örn: Sektörel Analiz Programı - Bloomberg HT"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-1">YouTube Linki</label>
                        <div className="relative">
                            <Video className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                            <input
                                type="url"
                                name="youtube_url"
                                defaultValue={video?.youtube_url}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                                placeholder="https://www.youtube.com/watch?v=..."
                            />
                        </div>
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
                        {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </button>
                </form>
            </div>
        </div>
    );
}

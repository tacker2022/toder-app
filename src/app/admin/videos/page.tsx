import { getVideos, deleteVideo } from "@/actions/videos";
import { Plus, Trash2, ExternalLink, Video } from "lucide-react";
import Link from "next/link";
import { getYouTubeID } from "@/utils/youtube";

export default async function AdminVideosPage() {
    const videos = await getVideos();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Video Galeri</h1>
                <Link
                    href="/admin/videos/new"
                    className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#b8962e] transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    Yeni Video Ekle
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => {
                    const videoId = getYouTubeID(video.youtube_url);
                    const thumbnailUrl = videoId
                        ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
                        : null;

                    return (
                        <div key={video.id} className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden group">
                            <div className="aspect-video bg-black relative">
                                {thumbnailUrl ? (
                                    <img
                                        src={thumbnailUrl}
                                        alt={video.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/20">
                                        <Video size={48} />
                                    </div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                                    <a
                                        href={video.youtube_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white hover:text-[#D4AF37] transition-colors"
                                    >
                                        <ExternalLink size={32} />
                                    </a>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2 line-clamp-2">{video.title}</h3>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-xs text-white/30">
                                        {new Date(video.created_at).toLocaleDateString("tr-TR")}
                                    </span>
                                    <form action={deleteVideo.bind(null, video.id)}>
                                        <button
                                            type="submit"
                                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Sil"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {videos.length === 0 && (
                    <div className="col-span-full text-center py-12 text-white/30 bg-[#0a0a0a] border border-white/10 rounded-xl border-dashed">
                        <Video size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Henüz hiç video eklenmemiş.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

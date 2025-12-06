import { getPosts } from "@/actions/posts";

import { Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <Link href="/" className="text-white/50 hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-4xl font-bold">Haberler & Etkinlikler</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post: any) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-colors"
                        >
                            <div className="aspect-video bg-black/50 relative overflow-hidden">
                                {post.image_url ? (
                                    <img
                                        src={post.image_url}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/20">
                                        Görsel Yok
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-sm text-[#D4AF37] mb-3">
                                    <Calendar size={14} />
                                    {new Date(post.created_at).toLocaleDateString("tr-TR")}
                                </div>
                                <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-white/60 line-clamp-3 text-sm mb-4">
                                    {post.content}
                                </p>
                                <div className="flex items-center gap-2 text-sm font-medium text-white/80 group-hover:translate-x-1 transition-transform">
                                    Devamını Oku <ArrowRight size={14} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20 text-white/30">
                        Henüz yayınlanmış bir haber bulunmuyor.
                    </div>
                )}
            </div>
        </div>
    );
}

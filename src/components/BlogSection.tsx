import { getPosts } from "@/actions/posts";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function BlogSection() {
    const posts = await getPosts();
    const latestPosts = posts.slice(0, 3); // Show only latest 3 posts

    if (latestPosts.length === 0) return null;

    return (
        <section id="blog" className="py-20 bg-black text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#003366]/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] to-[#F2D06B]">
                        Haberler & Etkinlikler
                    </h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Sektörden en güncel haberler ve TODER Project etkinlikleri.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {latestPosts.map((post: any) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-colors flex flex-col"
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
                                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#D4AF37] flex items-center gap-1">
                                    <Calendar size={12} />
                                    {new Date(post.created_at).toLocaleDateString("tr-TR")}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-white/60 line-clamp-3 text-sm mb-4 flex-grow">
                                    {post.content}
                                </p>
                                <div className="flex items-center gap-2 text-sm font-medium text-white/80 group-hover:translate-x-1 transition-transform mt-auto">
                                    Devamını Oku <ArrowRight size={14} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/blog" className="inline-flex items-center gap-2 px-8 py-3 border border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-black transition-all font-medium">
                        Tüm Haberleri Görüntüle <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

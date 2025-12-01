import { getPostBySlug } from "@/actions/posts";

import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Hero Image */}
            <div className="h-[40vh] md:h-[50vh] relative w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-10"></div>
                {post.image_url ? (
                    <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-white/5"></div>
                )}

                <div className="absolute bottom-0 left-0 w-full z-20 p-8">
                    <div className="max-w-4xl mx-auto">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
                            <ArrowLeft size={20} />
                            Haberlere Dön
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-2 text-[#D4AF37]">
                            <Calendar size={18} />
                            {new Date(post.created_at).toLocaleDateString("tr-TR", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto p-8">
                <article className="prose prose-invert prose-lg max-w-none">
                    <div className="whitespace-pre-wrap text-white/80 leading-relaxed">
                        {post.content}
                    </div>
                </article>

                {/* Gallery */}
                <GallerySection postId={post.id} />
            </div>
        </div>
    );
}

import { getGalleryImages } from "@/actions/gallery";

async function GallerySection({ postId }: { postId: string }) {
    const images = await getGalleryImages(postId);

    if (!images || images.length === 0) return null;

    return (
        <div className="mt-16 border-t border-white/10 pt-12">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-[#D4AF37] rounded-full"></span>
                Etkinlik Galerisi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((img: any) => (
                    <div key={img.id} className="relative group overflow-hidden rounded-xl aspect-video">
                        <img
                            src={img.image_url}
                            alt="Gallery"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <a
                                href={img.image_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
                            >
                                Büyüt
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


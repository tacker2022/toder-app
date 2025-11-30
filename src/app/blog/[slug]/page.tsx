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
            </div>
        </div>
    );
}

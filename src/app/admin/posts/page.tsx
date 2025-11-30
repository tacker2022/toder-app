import { getPosts, deletePost } from "@/actions/posts";
import { Plus, Trash2, Eye, Calendar } from "lucide-react";
import Link from "next/link";

export default async function AdminPostsPage() {
    const posts = await getPosts();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Haberler & Duyurular</h1>
                <Link
                    href="/admin/posts/new"
                    className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#b8962e] transition-colors"
                >
                    <Plus size={20} />
                    Yeni Ekle
                </Link>
            </div>

            <div className="grid gap-4">
                {posts.map((post: any) => (
                    <div
                        key={post.id}
                        className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                        <div className="flex gap-4">
                            {post.image_url && (
                                <img
                                    src={post.image_url}
                                    alt={post.title}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                            )}
                            <div>
                                <h3 className="font-bold text-xl mb-1">{post.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-white/50">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        {new Date(post.created_at).toLocaleDateString("tr-TR")}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded text-xs ${post.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {post.published ? 'Yayında' : 'Taslak'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                title="Görüntüle"
                            >
                                <Eye size={20} />
                            </Link>
                            <form action={deletePost.bind(null, post.id)}>
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
                ))}

                {posts.length === 0 && (
                    <div className="text-center py-12 text-white/30 border border-dashed border-white/10 rounded-xl">
                        Henüz hiç yazı eklenmemiş.
                    </div>
                )}
            </div>
        </div>
    );
}

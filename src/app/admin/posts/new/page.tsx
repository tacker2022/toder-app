import { createPost } from "@/actions/posts";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewPostPage() {
    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/posts" className="text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold">Yeni Yazı Ekle</h1>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl max-w-4xl">
                <form action={createPost} className="grid grid-cols-1 gap-6">
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
                        className="bg-[#D4AF37] text-black font-bold py-3 rounded-lg hover:bg-[#b8962e] transition-colors flex items-center justify-center gap-2"
                    >
                        <Save size={20} />
                        Yazıyı Yayınla
                    </button>
                </form>
            </div>
        </div>
    );
}

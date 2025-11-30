import { addAssociation } from "@/actions/associations";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewAssociationPage() {
    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/associations" className="text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold">Yeni Dernek Ekle</h1>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl max-w-2xl">
                <form action={addAssociation} className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm text-white/50 mb-1">Dernek Adı</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                            placeholder="Örn: OTOMDER"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-1">Web Sitesi (Opsiyonel)</label>
                        <input
                            type="url"
                            name="website_url"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                            placeholder="https://..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-1">Logo</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                        <p className="text-xs text-white/30 mt-1">PNG veya JPG formatında, şeffaf arka planlı olması önerilir.</p>
                    </div>

                    <button
                        type="submit"
                        className="bg-[#D4AF37] text-black font-bold py-3 rounded-lg hover:bg-[#b8962e] transition-colors flex items-center justify-center gap-2 mt-4"
                    >
                        <Save size={20} />
                        Kaydet
                    </button>
                </form>
            </div>
        </div>
    );
}

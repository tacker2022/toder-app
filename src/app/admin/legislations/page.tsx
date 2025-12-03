import { getLegislations, deleteLegislation } from "@/actions/legislations";
import Link from "next/link";
import { Plus, Pencil, Trash2, Scale, FileText, Download } from "lucide-react";

export default async function AdminLegislationsPage() {
    const legislations = await getLegislations();

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Mevzuat & Bilgi Bankası</h1>
                    <p className="text-white/60">Kanun, yönetmelik ve belgeleri buradan yönetebilirsiniz.</p>
                </div>
                <Link
                    href="/admin/legislations/new"
                    className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#b8962e] transition-colors"
                >
                    <Plus size={20} />
                    Yeni Belge Ekle
                </Link>
            </div>

            <div className="grid gap-4">
                {legislations.map((item: any) => (
                    <div
                        key={item.id}
                        className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 flex items-start justify-between group hover:border-[#D4AF37]/50 transition-colors"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                                <FileText size={24} />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                    <span className="px-2 py-1 rounded text-xs font-medium bg-white/10 text-white/80 border border-white/10">
                                        {item.category}
                                    </span>
                                </div>
                                <p className="text-white/60 line-clamp-2 mb-2">{item.description}</p>
                                <div className="flex items-center gap-4 text-xs text-white/40">
                                    <span>Yayın Tarihi: {new Date(item.published_date).toLocaleDateString("tr-TR")}</span>
                                    {item.pdf_url && (
                                        <a
                                            href={item.pdf_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#D4AF37] hover:underline flex items-center gap-1"
                                        >
                                            <Download size={12} /> PDF Görüntüle
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link
                                href={`/admin/legislations/${item.id}`}
                                className="p-2 text-white/60 hover:text-[#D4AF37] hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <Pencil size={20} />
                            </Link>
                            <form action={deleteLegislation.bind(null, item.id)}>
                                <button
                                    type="submit"
                                    className="p-2 text-white/60 hover:text-red-500 hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                ))}

                {legislations.length === 0 && (
                    <div className="text-center py-12 bg-[#0a0a0a] border border-white/10 rounded-xl">
                        <Scale size={48} className="mx-auto text-white/20 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Henüz Belge Eklenmemiş</h3>
                        <p className="text-white/60 mb-6">İlk mevzuat belgesini ekleyerek başlayın.</p>
                        <Link
                            href="/admin/legislations/new"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#b8962e] transition-colors"
                        >
                            <Plus size={20} />
                            Yeni Belge Ekle
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

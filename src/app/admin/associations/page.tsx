import { getAssociations, deleteAssociation } from "@/actions/associations";
import { Plus, Trash2, ExternalLink, Pencil } from "lucide-react";
import Link from "next/link";

export default async function AdminAssociationsPage() {
    const associations = await getAssociations();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Üye Kuruluşlar</h1>
                <Link
                    href="/admin/associations/new"
                    className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#b8962e] transition-colors"
                >
                    <Plus size={20} />
                    Yeni Ekle
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {associations.map((assoc: any) => (
                    <div
                        key={assoc.id}
                        className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl flex items-center justify-between gap-4"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2">
                                <img
                                    src={assoc.image_url}
                                    alt={assoc.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{assoc.name}</h3>
                                {assoc.website_url && (
                                    <a
                                        href={assoc.website_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#D4AF37] text-sm flex items-center gap-1 hover:underline"
                                    >
                                        Web Sitesi <ExternalLink size={12} />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link
                                href={`/admin/associations/${assoc.id}`}
                                className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                title="Düzenle"
                            >
                                <Pencil size={20} />
                            </Link>
                            <form action={deleteAssociation.bind(null, assoc.id)}>
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

                {associations.length === 0 && (
                    <div className="col-span-full text-center py-12 text-white/30">
                        Henüz eklenmiş bir dernek bulunmuyor.
                    </div>
                )}
            </div>
        </div>
    );
}

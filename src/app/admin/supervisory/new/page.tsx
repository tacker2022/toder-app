import { addMember } from "@/actions/members";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewSupervisoryMemberPage() {
    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/supervisory" className="text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold">Yeni Denetim Kurulu Üyesi Ekle</h1>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl max-w-2xl">
                <form action={addMember} className="grid grid-cols-1 gap-4">
                    <input type="hidden" name="type" value="supervisory" />
                    <div>
                        <label className="block text-sm text-white/50 mb-1">Ad Soyad</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                            placeholder="Örn: Ahmet Yılmaz"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-1">Ünvan / Görev</label>
                        <input
                            type="text"
                            name="role"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                            placeholder="Örn: Denetim Kurulu Başkanı"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-1">Firma / Kurum</label>
                        <input
                            type="text"
                            name="company"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                            placeholder="Örn: TODER A.Ş."
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-1">Sıra No (Küçükten büyüğe sıralanır)</label>
                        <input
                            type="number"
                            name="display_order"
                            defaultValue="0"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-1">Fotoğraf</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
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

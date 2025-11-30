import { getMember, updateMember } from "@/actions/members";

export const runtime = "edge";
import { redirect } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function EditMemberPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const member = await getMember(id);

    if (!member) {
        redirect("/admin/members");
    }

    const updateMemberWithId = updateMember.bind(null, id);

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/members" className="text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold">Üye Düzenle</h1>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl max-w-2xl">
                <form action={updateMemberWithId} className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm text-white/50 mb-1">Ad Soyad</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={member.name}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-1">Ünvan / Görev</label>
                        <input
                            type="text"
                            name="role"
                            defaultValue={member.role}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-1">Firma / Kurum</label>
                        <input
                            type="text"
                            name="company"
                            defaultValue={member.company || ""}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/50 mb-1">Fotoğraf (Değiştirmek için seçin)</label>
                        {member.image_url && (
                            <img
                                src={member.image_url}
                                alt="Current"
                                className="w-20 h-20 rounded-full object-cover mb-2 border border-white/10"
                            />
                        )}
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
                        Değişiklikleri Kaydet
                    </button>
                </form>
            </div>
        </div>
    );
}

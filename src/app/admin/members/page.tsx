
import { addMember, deleteMember, getMembers } from "@/actions/members";

export const runtime = "edge";
import { Plus, Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import MemberSearch from "@/components/admin/MemberSearch";

export default async function AdminMembersPage({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        company?: string;
    };
}) {
    const query = searchParams?.query || "";
    const company = searchParams?.company || "";

    const members = await getMembers(query, company);

    // Get unique companies for filter
    const allMembers = await getMembers();
    const companies = Array.from(new Set(allMembers.map(m => m.company).filter(Boolean))) as string[];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Yönetim Kurulu</h1>
                <Link
                    href="/admin/members/new"
                    className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#b8962e] transition-colors"
                >
                    <Plus size={20} />
                    Yeni Ekle
                </Link>
            </div>

            <MemberSearch companies={companies} />

            <div className="grid gap-4">
                {members.map((member: any) => (
                    <div
                        key={member.id}
                        className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4"
                    >
                        <div className="flex items-center gap-4">
                            {member.image_url ? (
                                <img
                                    src={member.image_url}
                                    alt={member.name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37]/20"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold text-white/30">
                                    {member.name.charAt(0)}
                                </div>
                            )}
                            <div>
                                <h3 className="font-bold text-xl">{member.name}</h3>
                                <p className="text-[#D4AF37]">{member.role}</p>
                                {member.company && (
                                    <p className="text-white/50 text-sm">{member.company}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link
                                href={`/admin/members/${member.id}`}
                                className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                title="Düzenle"
                            >
                                <Pencil size={20} />
                            </Link>
                            <form action={deleteMember.bind(null, member.id)}>
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

                {members.length === 0 && (
                    <div className="text-center py-12 text-white/30">
                        Aramanızla eşleşen üye bulunamadı.
                    </div>
                )}
            </div>
        </div>
    );
}

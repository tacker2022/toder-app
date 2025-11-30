import { getDashboardStats } from "@/actions/dashboard";

export const runtime = "edge";
import { Users, Calendar, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
    const stats = await getDashboardStats();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Genel Bakış</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Members Card */}
                <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users size={100} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4 text-[#D4AF37]">
                            <Users size={24} />
                            <h3 className="font-medium">Toplam Üye</h3>
                        </div>
                        <p className="text-4xl font-bold mb-4">{stats.membersCount}</p>
                        <Link href="/admin/members" className="text-sm text-white/50 hover:text-white flex items-center gap-1 transition-colors">
                            Listeyi Görüntüle <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* Events Card */}
                <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Calendar size={100} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4 text-[#D4AF37]">
                            <Calendar size={24} />
                            <h3 className="font-medium">Etkinlikler</h3>
                        </div>
                        <p className="text-4xl font-bold mb-4">{stats.eventsCount}</p>
                        <Link href="/admin/events" className="text-sm text-white/50 hover:text-white flex items-center gap-1 transition-colors">
                            Etkinlikleri Yönet <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* Applications Card */}
                <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FileText size={100} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4 text-[#D4AF37]">
                            <FileText size={24} />
                            <h3 className="font-medium">Başvurular</h3>
                        </div>
                        <div className="flex items-baseline gap-2 mb-4">
                            <p className="text-4xl font-bold">{stats.pendingApplicationsCount}</p>
                            <span className="text-sm text-white/50">bekleyen</span>
                        </div>
                        <Link href="/admin/applications" className="text-sm text-white/50 hover:text-white flex items-center gap-1 transition-colors">
                            Başvuruları İncele <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-4">Hızlı İşlemler</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/admin/members" className="bg-white/5 hover:bg-white/10 p-4 rounded-lg transition-colors flex items-center justify-between group">
                        <span className="font-medium">Yeni Üye Ekle</span>
                        <ArrowRight size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <Link href="/admin/events" className="bg-white/5 hover:bg-white/10 p-4 rounded-lg transition-colors flex items-center justify-between group">
                        <span className="font-medium">Yeni Etkinlik Duyur</span>
                        <ArrowRight size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

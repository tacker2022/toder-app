"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Users, LogOut, FileText, Newspaper, Video } from "lucide-react";
import { signOut } from "@/actions/auth";

export default function AdminSidebar() {
    const pathname = usePathname();

    const links = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/events", label: "Etkinlikler", icon: Calendar },
        { href: "/admin/members", label: "Yönetim Kurulu", icon: Users },
        { href: "/admin/supervisory", label: "Denetim Kurulu", icon: Users },
        { href: "/admin/associations", label: "Üye Kuruluşlar", icon: Users },
    ];

    return (
        <aside className="w-64 bg-[#0a0a0a] border-r border-white/10 h-screen sticky top-0 flex flex-col shrink-0 z-20">
            <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">
                    TODER <span className="text-[#D4AF37]">Admin</span>
                </h2>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <Icon size={20} />
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
                <Link
                    href="/admin/posts"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === "/admin/posts"
                        ? "bg-[#D4AF37] text-black font-medium"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                        }`}
                >
                    <Newspaper size={20} />
                    <span>Haberler</span>
                </Link>
                <Link
                    href="/admin/videos"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname.startsWith("/admin/videos")
                        ? "bg-[#D4AF37] text-black font-medium"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                        }`}
                >
                    <Video size={20} />
                    Video Galeri
                </Link>

                <Link
                    href="/admin/applications"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === "/admin/applications"
                        ? "bg-[#D4AF37] text-black font-medium"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                        }`}
                >
                    <FileText size={20} />
                    <span>Başvurular</span>
                </Link>
            </nav>
            <div className="p-4 border-t border-white/10">
                <form action={signOut}>
                    <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        <LogOut size={20} />
                        <span>Çıkış Yap</span>
                    </button>
                </form>
            </div>
        </aside>
    );
}

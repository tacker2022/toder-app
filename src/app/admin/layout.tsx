import AdminSidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#050505] text-white relative overflow-hidden">
            <div className="grid-overlay fixed inset-0 z-0 opacity-20 pointer-events-none"></div>
            <AdminSidebar />
            <main className="flex-1 p-8 z-10 relative">{children}</main>
        </div>
    );
}

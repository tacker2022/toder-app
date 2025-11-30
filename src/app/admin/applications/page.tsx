import { getApplications, updateApplicationStatus } from "@/actions/applications";

import { Check, X, Clock } from "lucide-react";

export default async function ApplicationsPage() {
    const applications = await getApplications();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Üyelik Başvuruları</h1>

            <div className="grid gap-4">
                {applications.map((app: any) => (
                    <div
                        key={app.id}
                        className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-bold text-lg">{app.full_name}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                    app.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                                        'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                    {app.status === 'approved' ? 'Onaylandı' :
                                        app.status === 'rejected' ? 'Reddedildi' :
                                            'Bekliyor'}
                                </span>
                            </div>
                            <div className="text-sm text-white/50 space-y-1">
                                <p>{app.company} • {app.role}</p>
                                <p>{app.email} • {app.phone}</p>
                                {app.message && <p className="mt-2 text-white/70 italic">"{app.message}"</p>}
                            </div>
                        </div>

                        {app.status === 'pending' && (
                            <div className="flex items-center gap-2">
                                <form action={updateApplicationStatus.bind(null, app.id, 'approved')}>
                                    <button
                                        type="submit"
                                        className="p-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
                                        title="Onayla"
                                    >
                                        <Check size={20} />
                                    </button>
                                </form>
                                <form action={updateApplicationStatus.bind(null, app.id, 'rejected')}>
                                    <button
                                        type="submit"
                                        className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                        title="Reddet"
                                    >
                                        <X size={20} />
                                    </button>
                                </form>
                            </div>
                        )}

                        {app.status !== 'pending' && (
                            <div className="text-white/30 text-sm flex items-center gap-1">
                                <Clock size={14} />
                                {new Date(app.created_at).toLocaleDateString('tr-TR')}
                            </div>
                        )}
                    </div>
                ))}

                {applications.length === 0 && (
                    <div className="text-center py-12 text-white/30">
                        Henüz başvuru bulunmuyor.
                    </div>
                )}
            </div>
        </div>
    );
}

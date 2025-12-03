import { getMessages, markAsRead, deleteMessage } from "@/actions/messages";
import { Mail, Trash2, Check, Clock, MailOpen } from "lucide-react";

export default async function MessagesPage() {
    const messages = await getMessages();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Gelen Mesajlar</h1>

            <div className="grid gap-4">
                {messages.map((msg: any) => (
                    <div
                        key={msg.id}
                        className={`bg-[#0a0a0a] border p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors ${msg.is_read ? "border-white/10 opacity-70" : "border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                            }`}
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-bold text-lg">{msg.full_name}</h3>
                                {!msg.is_read && (
                                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#D4AF37] text-black">
                                        YENİ
                                    </span>
                                )}
                            </div>
                            <div className="text-sm text-white/50 space-y-1 mb-3">
                                <div className="flex items-center gap-2">
                                    <Mail size={14} />
                                    {msg.email}
                                </div>
                                {msg.phone && (
                                    <div className="flex items-center gap-2">
                                        <PhoneIcon size={14} />
                                        {msg.phone}
                                    </div>
                                )}
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                                {msg.subject && <h4 className="font-bold text-sm mb-1 text-white/80">{msg.subject}</h4>}
                                <p className="text-white/70 text-sm whitespace-pre-wrap">{msg.message}</p>
                            </div>
                            <div className="mt-3 text-xs text-white/30 flex items-center gap-1">
                                <Clock size={12} />
                                {new Date(msg.created_at).toLocaleString('tr-TR')}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-start md:self-center">
                            {!msg.is_read && (
                                <form action={markAsRead.bind(null, msg.id)}>
                                    <button
                                        type="submit"
                                        className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                                        title="Okundu Olarak İşaretle"
                                    >
                                        <MailOpen size={20} />
                                    </button>
                                </form>
                            )}
                            <form action={deleteMessage.bind(null, msg.id)}>
                                <button
                                    type="submit"
                                    className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                    title="Sil"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                ))}

                {messages.length === 0 && (
                    <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
                        <Mail size={48} className="mx-auto text-white/20 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Mesaj Yok</h3>
                        <p className="text-white/60">Henüz hiç mesaj almadınız.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function PhoneIcon({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
    );
}

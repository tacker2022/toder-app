import { getEvents, addEvent, deleteEvent } from "@/actions/events";
export const runtime = "edge";
import { Trash2, Plus } from "lucide-react";

export default async function EventsPage() {
    const events = await getEvents();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Etkinlik Yönetimi</h1>

            {/* Add Event Form */}
            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Plus size={20} className="text-[#D4AF37]" />
                    Yeni Etkinlik Ekle
                </h2>
                <form action={addEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Etkinlik Başlığı"
                        required
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                        type="date"
                        name="date"
                        required
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37] md:col-span-2"
                    />
                    <textarea
                        name="description"
                        placeholder="Açıklama"
                        required
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37] md:col-span-2"
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-[#D4AF37] text-black font-bold py-2 rounded-lg hover:bg-[#b8962e] transition-colors md:col-span-2"
                    >
                        Ekle
                    </button>
                </form>
            </div>

            {/* Events List */}
            <div className="grid gap-4">
                {events.map((event: any) => (
                    <div
                        key={event.id}
                        className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-xl font-bold">{event.title}</h3>
                            <p className="text-gray-400 text-sm mb-1">{event.date}</p>
                            <p className="text-gray-300">{event.description}</p>
                        </div>
                        <form action={deleteEvent.bind(null, event.id)}>
                            <button
                                type="submit"
                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}

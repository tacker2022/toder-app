import { getEvents } from "@/actions/events";
import { Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ImageReveal from "@/components/ui/ImageReveal";

export default async function EventsPage() {
    const events = await getEvents();

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4 mb-12">
                    <Link href="/" className="text-white/50 hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-4xl font-bold">Duyurular & Etkinlikler</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events && events.map((event: any) => (
                        <Link
                            key={event.id}
                            href={`/events/${event.id}`}
                            className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-colors flex flex-col"
                        >
                            <div className="aspect-video bg-black/50 relative overflow-hidden">
                                {event.list_image_url || event.image_url ? (
                                    <ImageReveal
                                        src={event.list_image_url || event.image_url}
                                        alt={event.title}
                                        className="w-full h-full"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/20">
                                        Görsel Yok
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#D4AF37] flex items-center gap-1 z-30">
                                    <Calendar size={12} />
                                    {new Date(event.date).toLocaleDateString("tr-TR")}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                                    {event.title}
                                </h2>
                                <p className="text-white/60 line-clamp-3 text-sm mb-4 flex-grow">
                                    {event.description}
                                </p>
                                <div className="flex items-center gap-2 text-sm font-medium text-white/80 group-hover:translate-x-1 transition-transform mt-auto">
                                    Detayları İncele <ArrowRight size={14} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {(!events || events.length === 0) && (
                    <div className="text-center py-20 text-white/30">
                        Henüz yayınlanmış bir duyuru bulunmuyor.
                    </div>
                )}
            </div>
        </div>
    );
}

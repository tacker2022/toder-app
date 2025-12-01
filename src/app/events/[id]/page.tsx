import { getEventById } from "@/actions/events";
import { getGalleryImages } from "@/actions/gallery";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import Gallery from "@/components/Gallery";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = await getEventById(id);

    if (!event) {
        notFound();
    }

    const galleryImages = await getGalleryImages(event.id);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <Link href="/#etkinlikler" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Etkinliklere Dön
                </Link>

                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
                    {/* Hero Image */}
                    {event.image_url && (
                        <div className="w-full h-[400px] relative">
                            <img
                                src={event.image_url}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60"></div>
                        </div>
                    )}

                    <div className="p-8 md:p-12">
                        <div className="flex items-center gap-2 text-[#D4AF37] mb-4">
                            <Calendar size={20} />
                            {new Date(event.date).toLocaleDateString("tr-TR", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                            {event.title}
                        </h1>

                        <div className="prose prose-invert prose-lg max-w-none mb-12">
                            <div className="whitespace-pre-wrap text-white/80 leading-relaxed">
                                {event.description}
                            </div>
                        </div>

                        {/* Gallery Section */}
                        <Gallery images={galleryImages} />
                    </div>
                </div>
            </div>
        </div>
    );
}

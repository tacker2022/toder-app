"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Event {
    id: string;
    title: string;
    date: string;
    description: string;
    image_url?: string;
}

export default function Events({ events }: { events: Event[] }) {
    return (
        <section id="etkinlikler" className="section events-section">
            <div className="parallax-bg"></div>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Etkinlikler & Duyurular</h2>
                    <div className="section-line"></div>
                </div>
                <div className="events-list">
                    {events.map((event, index) => {
                        const dateObj = new Date(event.date);
                        const day = dateObj.getDate();
                        const month = dateObj.toLocaleString("tr-TR", { month: "short" }).toUpperCase();

                        return (
                            <motion.div
                                key={event.id}
                                className="event-card glass-card group cursor-pointer"
                                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                            >
                                <Link href={`/events/${event.id}`} className="block h-full">
                                    <div className="event-date">
                                        <span className="day">{day}</span>
                                        <span className="month">{month}</span>
                                    </div>
                                    <div className="event-info">
                                        {event.image_url && (
                                            <div className="overflow-hidden rounded-lg mb-4">
                                                <img
                                                    src={event.image_url}
                                                    alt={event.title}
                                                    loading="eager"
                                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                        )}
                                        <h3 className="group-hover:text-[#D4AF37] transition-colors">{event.title}</h3>
                                        <p className="line-clamp-3">{event.description}</p>
                                        <div className="mt-4 text-[#D4AF37] text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                            Detayları Gör →
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

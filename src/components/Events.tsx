"use client";

import { motion } from "framer-motion";

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
                                className="event-card glass-card"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="event-date">
                                    <span className="day">{day}</span>
                                    <span className="month">{month}</span>
                                </div>
                                <div className="event-info">
                                    {event.image_url && (
                                        <img
                                            src={event.image_url}
                                            alt={event.title}
                                            className="w-full h-48 object-cover rounded-lg mb-4"
                                        />
                                    )}
                                    <h3>{event.title}</h3>
                                    <p>{event.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

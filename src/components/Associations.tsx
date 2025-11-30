"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAssociations } from "@/actions/associations";

export default function Associations() {
    const [associations, setAssociations] = useState<any[]>([]);

    useEffect(() => {
        const fetchAssociations = async () => {
            const data = await getAssociations();
            setAssociations(data);
        };
        fetchAssociations();
    }, []);

    if (associations.length === 0) return null;

    return (
        <section className="py-12 bg-black border-t border-white/10 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <h2 className="text-2xl font-bold text-white/50 uppercase tracking-widest">Üye Dernekler</h2>
            </div>

            <div className="relative flex overflow-x-hidden">
                <div className="flex animate-marquee whitespace-nowrap">
                    {/* First set of logos */}
                    {associations.map((assoc) => (
                        <div key={assoc.id} className="mx-8 w-48 h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100">
                            {assoc.website_url ? (
                                <a href={assoc.website_url} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={assoc.image_url}
                                        alt={assoc.name}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </a>
                            ) : (
                                <img
                                    src={assoc.image_url}
                                    alt={assoc.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            )}
                        </div>
                    ))}

                    {/* Duplicate set for seamless loop */}
                    {associations.map((assoc) => (
                        <div key={`duplicate-${assoc.id}`} className="mx-8 w-48 h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100">
                            {assoc.website_url ? (
                                <a href={assoc.website_url} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={assoc.image_url}
                                        alt={assoc.name}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </a>
                            ) : (
                                <img
                                    src={assoc.image_url}
                                    alt={assoc.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Second marquee for smoother infinite loop if needed, or just CSS animation */}
                <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap">
                    {associations.map((assoc) => (
                        <div key={`duplicate2-${assoc.id}`} className="mx-8 w-48 h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100">
                            {assoc.website_url ? (
                                <a href={assoc.website_url} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={assoc.image_url}
                                        alt={assoc.name}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </a>
                            ) : (
                                <img
                                    src={assoc.image_url}
                                    alt={assoc.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            )}
                        </div>
                    ))}
                    {associations.map((assoc) => (
                        <div key={`duplicate3-${assoc.id}`} className="mx-8 w-48 h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100">
                            {assoc.website_url ? (
                                <a href={assoc.website_url} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={assoc.image_url}
                                        alt={assoc.name}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </a>
                            ) : (
                                <img
                                    src={assoc.image_url}
                                    alt={assoc.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

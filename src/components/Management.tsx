"use client";

import { motion } from "framer-motion";

interface Member {
    id: string;
    name: string;
    role: string;
    company?: string;
    image_url?: string;
}

export default function Management({ members }: { members: Member[] }) {
    return (
        <section id="yonetim" className="section management-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Yönetim Kurulu</h2>
                    <div className="section-line"></div>
                </div>
                <div className="relative flex overflow-x-hidden group">
                    <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
                        {[...members, ...members].map((member, index) => (
                            <motion.div
                                key={`${member.id}-${index}`}
                                className="member-card glass-card mx-4 w-[280px] flex-shrink-0 inline-block whitespace-normal"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {member.image_url ? (
                                    <img
                                        src={member.image_url}
                                        alt={member.name}
                                        loading="eager"
                                        className="w-[120px] h-[120px] rounded-full object-cover mx-auto mb-6 border-2 border-white/5"
                                    />
                                ) : (
                                    <div className="member-img mx-auto mb-6"></div>
                                )}
                                <h4 className="text-center text-xl font-bold mb-2">{member.name}</h4>
                                <p className="role text-center text-[#D4AF37] mb-2">{member.role}</p>
                                {member.company && <p className="text-sm text-white/50 text-center">{member.company}</p>}
                            </motion.div>
                        ))}
                    </div>

                    <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap hover:[animation-play-state:paused]">
                        {[...members, ...members].map((member, index) => (
                            <motion.div
                                key={`dup-${member.id}-${index}`}
                                className="member-card glass-card mx-4 w-[280px] flex-shrink-0 inline-block whitespace-normal"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {member.image_url ? (
                                    <img
                                        src={member.image_url}
                                        alt={member.name}
                                        loading="eager"
                                        className="w-[120px] h-[120px] rounded-full object-cover mx-auto mb-6 border-2 border-white/5"
                                    />
                                ) : (
                                    <div className="member-img mx-auto mb-6"></div>
                                )}
                                <h4 className="text-center text-xl font-bold mb-2">{member.name}</h4>
                                <p className="role text-center text-[#D4AF37] mb-2">{member.role}</p>
                                {member.company && <p className="text-sm text-white/50 text-center">{member.company}</p>}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

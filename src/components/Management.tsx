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
                <div className="management-grid">
                    {members.map((member, index) => (
                        <motion.div
                            key={member.id}
                            className="member-card glass-card"
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                        >
                            {member.image_url ? (
                                <img
                                    src={member.image_url}
                                    alt={member.name}
                                    loading="eager"
                                    className="w-[120px] h-[120px] rounded-full object-cover mx-auto mb-6 border-2 border-white/5"
                                />
                            ) : (
                                <div className="member-img"></div>
                            )}
                            <h4>{member.name}</h4>
                            <p className="role">{member.role}</p>
                            {member.company && <p className="text-sm text-white/50 mt-1">{member.company}</p>}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

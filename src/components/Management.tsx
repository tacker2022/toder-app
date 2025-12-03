"use client";

import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";

interface Member {
    id: string;
    name: string;
    role: string;
    company?: string;
    image_url?: string;
}

export default function Management({ members }: { members: Member[] }) {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Start at 0%
    const xPercent = useMotionValue(0);

    // Speed in % per millisecond
    // 50s for 100% = 100 / 50000 = 0.002
    // Slow down to 1/4 speed on hover = 0.0005
    const normalSpeed = 0.002;
    const hoverSpeed = 0.0005;

    useAnimationFrame((t, delta) => {
        const currentSpeed = isHovered ? hoverSpeed : normalSpeed;

        let newX = xPercent.get() - currentSpeed * delta;

        // Reset when we've scrolled half the content (since it's duplicated)
        // The content is [...members, ...members]
        // So moving -50% brings us to the start of the second half, which looks like the start
        if (newX <= -50) {
            newX = 0;
        }

        xPercent.set(newX);
    });

    const x = useTransform(xPercent, (v) => `${v}%`);

    return (
        <section id="yonetim" className="section management-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Yönetim Kurulu</h2>
                    <div className="section-line"></div>
                </div>
                <div
                    className="relative flex overflow-x-hidden group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    ref={containerRef}
                >
                    <motion.div
                        className="flex whitespace-nowrap"
                        style={{ x }}
                    >
                        {/* Duplicate members twice to ensure seamless loop */}
                        {[...members, ...members].map((member, index) => (
                            <div
                                key={`${member.id}-${index}`}
                                className="member-card glass-card mx-4 w-[280px] flex-shrink-0 inline-block whitespace-normal"
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
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

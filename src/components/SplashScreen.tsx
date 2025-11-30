"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Member {
    id: string;
    name: string;
    role: string;
    company?: string;
    image_url?: string;
}

export default function SplashScreen({ members }: { members: Member[] }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Hide splash screen after 4 seconds (slightly longer to read names)
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white px-4"
                    initial={{ opacity: 1 }}
                    exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                >
                    {/* Background Gradient Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#1a1a1a]" />

                    {/* Content Container */}
                    <div className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full">
                        {/* Logo Animation */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
                            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="mb-6"
                        >
                            <img
                                src="/logo.png"
                                alt="TODER Logo"
                                className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                            />
                        </motion.div>

                        {/* Text Animation */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-center mb-8"
                        >
                            <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] mb-2">
                                TODER
                            </h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="text-white/50 text-xs md:text-base tracking-[0.2em] uppercase"
                            >
                                Ailesine Hoşgeldiniz
                            </motion.p>
                        </motion.div>

                        {/* Board Members List */}
                        <motion.div
                            className="w-full border-t border-white/10 pt-6 mt-2"
                            initial={{ opacity: 0, width: "0%" }}
                            animate={{ opacity: 1, width: "100%" }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                        >
                            <motion.h3
                                className="text-[#D4AF37] text-sm font-medium mb-4 uppercase tracking-widest"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                            >
                                Yönetim Kurulu
                            </motion.h3>

                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                                {members.map((member, index) => (
                                    <motion.span
                                        key={member.id}
                                        className="text-white/80 text-xs md:text-sm font-light"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.8 + (index * 0.1), duration: 0.5 }}
                                    >
                                        {member.name}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Loading Line Animation */}
                    <motion.div
                        className="absolute bottom-10 w-48 h-1 bg-white/10 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.div
                            className="h-full bg-[#D4AF37]"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

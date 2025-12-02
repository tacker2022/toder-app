"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section id="hero" className="hero-section">
            <div className="hero-bg">
                <motion.div
                    className="orb orb-1"
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="orb orb-2"
                    animate={{
                        x: [0, -20, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
                <div className="grid-overlay"></div>
            </div>
            <div className="container hero-content">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <img
                        src="/toder-logo.png"
                        alt="TODER Logo"
                        className="h-32 md:h-40 mx-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    />
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="hero-subtitle"
                >
                    Sektörün Geleceğini Birlikte Şekillendiriyoruz
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="hero-cta"
                >
                    <a href="#uyelik" className="btn btn-primary">
                        Üyelik Başvurusu
                    </a>
                    <a href="#vizyon" className="btn btn-outline">
                        Hakkımızda
                    </a>
                </motion.div>
            </div>

            {/* Anti-gravity Elements */}
            <div className="floating-elements">
                <motion.div
                    className="float-item item-1"
                    animate={{
                        y: [0, -40, 0],
                        rotate: [0, 10, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="float-item item-2"
                    animate={{
                        y: [0, 30, 0],
                        rotate: [0, -10, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />
                <motion.div
                    className="float-item item-3"
                    animate={{
                        y: [0, -50, 0],
                        rotate: [0, 15, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 4,
                    }}
                />
            </div>
        </section>
    );
}

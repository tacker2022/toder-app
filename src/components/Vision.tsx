"use client";

import { motion } from "framer-motion";
import { Cpu, Handshake, TrendingUp } from "lucide-react";

export default function Vision() {
    return (
        <section id="vizyon" className="section vision-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Biz Kimiz?</h2>
                    <div className="section-line"></div>
                </div>

                <motion.div
                    className="max-w-4xl mx-auto text-center mb-16 text-lg text-white/80 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
        <section id="vizyon" className="py-20 bg-black relative overflow-hidden" ref={ref}>
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="section-title text-[#D4AF37]">
                                Vizyon & Misyon
                            </h2>
                            <p className="max-w-2xl mx-auto text-white/60">
                                Otomotiv sektörünün geleceğine yön veren stratejik hedeflerimiz.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {/* Misyon */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <SpotlightCard className="h-full p-8 border-white/5 hover:border-[#D4AF37]/30 transition-colors">
                                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="w-2 h-8 bg-[#D4AF37] rounded-full"></span>
                                        Misyonumuz
                                    </h3>
                                    <p className="text-white/70 leading-relaxed">
                                        Otomotiv ekosistemindeki tüm paydaşları bir araya getirerek, sektörün sürdürülebilir büyümesine katkı sağlamak,
                                        dijital dönüşüm süreçlerine liderlik etmek ve uluslararası rekabet gücümüzü artıracak projeler geliştirmektir.
                                    </p>
                                </SpotlightCard>
                            </motion.div>

                            {/* Vizyon */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <SpotlightCard className="h-full p-8 border-white/5 hover:border-[#D4AF37]/30 transition-colors">
                                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="w-2 h-8 bg-[#D4AF37] rounded-full"></span>
                                        Vizyonumuz
                                    </h3>
                                    <p className="text-white/70 leading-relaxed">
                                        Türkiye&apos;yi global otomotiv dünyasında teknoloji ve inovasyon üssü haline getirmek;
                                        elektrikli mobilite, otonom sürüş ve bağlantılı araç teknolojilerinde öncü bir rol üstlenmektir.
                                    </p>
                                </SpotlightCard>
                            </motion.div>
                        </div>
                    </div>
                </section>
                );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function Vision() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section id="vizyon" className="py-20 bg-black relative overflow-hidden" ref={ref}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="section-title text-[#D4AF37] mb-6">
                        Biz Kimiz?
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-lg text-white/70 leading-relaxed mb-12"
                    >
                        TODER (Tüm Otopark Entegratör Yatırımcı ve İşletmecileri Derneği), Türkiye’de otopark sektörünü ortak bir çatı altında toplayarak; teknoloji, standartlaşma ve sürdürülebilir işletmecilik alanlarında güçlü bir ekosistem oluşturmayı hedefleyen bağımsız bir sektörel birliktir. Otopark entegratörleri, yatırımcılar, işletmeciler ve teknoloji sağlayıcılarını aynı platformda buluşturan TODER, sektörün ihtiyaçlarını analiz ederek ortak çözümler üretir, mevzuat gelişimlerine liderlik eder ve tüm paydaşların daha verimli, şeffaf ve yenilikçi bir yapıda hizmet verebilmesi için çalışmalar yürütür. Türkiye’nin mobilite, planlı şehirler ve kentsel dönüşüm vizyonu doğrultusunda; modern otopark işletmeciliğinin geleceğini şekillendirmeyi ve akıllı şehir altyapısının güçlü bir parçası olmayı amaçlar.
                    </motion.p>
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

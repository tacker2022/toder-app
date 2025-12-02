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
                >
                    <p>
                        TODER (Tüm Otopark Entegratör Yatırımcı ve İşletmecileri Derneği), Türkiye’de otopark sektörünü ortak bir çatı altında toplayarak;
                        teknoloji, standartlaşma ve sürdürülebilir işletmecilik alanlarında güçlü bir ekosistem oluşturmayı hedefleyen bağımsız bir sektörel birliktir.
                        Otopark entegratörleri, yatırımcılar, işletmeciler ve teknoloji sağlayıcılarını aynı platformda buluşturan TODER, sektörün ihtiyaçlarını analiz ederek
                        ortak çözümler üretir, mevzuat gelişimlerine liderlik eder ve tüm paydaşların daha verimli, şeffaf ve yenilikçi bir yapıda hizmet verebilmesi için çalışmalar yürütür.
                        Türkiye’nin mobilite, planlı şehirler ve kentsel dönüşüm vizyonu doğrultusunda; modern otopark işletmeciliğinin geleceğini şekillendirmeyi ve
                        akıllı şehir altyapısının güçlü bir parçası olmayı amaçlar.
                    </p>
                </motion.div>

                <div className="cards-grid">
                    {[
                        {
                            icon: <Cpu size={40} className="text-[#D4AF37]" />,
                            title: "Dijital Dönüşüm",
                            desc: "Sektörün dijital çağa adaptasyonunu hızlandıran yenilikçi çözümler ve stratejiler.",
                        },
                        {
                            icon: <Handshake size={40} className="text-[#D4AF37]" />,
                            title: "Sektörel İşbirliği",
                            desc: "Paydaşlar arasında güçlü bağlar kurarak ortak akıl ve sinerji oluşturma.",
                        },
                        {
                            icon: <TrendingUp size={40} className="text-[#D4AF37]" />,
                            title: "Eğitim & Gelişim",
                            desc: "Sürekli öğrenme kültürü ile profesyonel yetkinliklerin artırılması.",
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="card glass-card"
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="card-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";

export default function Vision() {
    return (
        <section id="vizyon" className="section vision-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Vizyon & Misyon</h2>
                    <div className="section-line"></div>
                </div>

                <motion.div
                    className="max-w-4xl mx-auto text-center mb-16 text-lg text-white/80 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p>
                        Tiyatro Oyuncuları Derneği (TODER), Türkiye'deki özel tiyatroların sesi olmak, sanatın ve sanatçının haklarını korumak,
                        tiyatro kültürünü yaygınlaştırmak ve gelecek nesillere aktarmak amacıyla kurulmuş köklü bir sivil toplum kuruluşudur.
                        Sanatın birleştirici gücüne inanıyor, sahnelerin ışığını hep birlikte daha parlak yakmak için çalışıyoruz.
                    </p>
                </motion.div>

                <div className="cards-grid">
                    {[
                        {
                            icon: "🚀",
                            title: "Dijital Dönüşüm",
                            desc: "Sektörün dijital çağa adaptasyonunu hızlandıran yenilikçi çözümler ve stratejiler.",
                        },
                        {
                            icon: "🤝",
                            title: "Sektörel İşbirliği",
                            desc: "Paydaşlar arasında güçlü bağlar kurarak ortak akıl ve sinerji oluşturma.",
                        },
                        {
                            icon: "🎓",
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

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
                            initial={{ opacity: 0, y: 30 }}

                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
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

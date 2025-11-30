"use client";

import { motion } from "framer-motion";

export default function Commissions() {
    return (
        <section id="komisyonlar" className="section commissions-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Komisyonlar</h2>
                    <div className="section-line"></div>
                </div>
                <div className="commissions-grid">
                    {[
                        {
                            title: "Teknoloji Komisyonu",
                            desc: "Yapay zeka, blockchain ve yeni teknolojiler.",
                        },
                        {
                            title: "Hukuk Komisyonu",
                            desc: "Sektörel regülasyonlar ve mevzuat çalışmaları.",
                        },
                        {
                            title: "Eğitim Komisyonu",
                            desc: "Akademi işbirlikleri ve sertifika programları.",
                        },
                        {
                            title: "İletişim Komisyonu",
                            desc: "Kurumsal marka yönetimi ve PR çalışmaları.",
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="commission-item"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

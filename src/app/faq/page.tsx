"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "TODER'e kimler üye olabilir?",
        answer: "Otopark işletmeciliği, otopark teknolojileri entegratörlüğü veya otopark yatırımı alanlarında faaliyet gösteren tüzel kişilikler ve şahıs şirketleri TODER'e üye olabilir.",
    },
    {
        question: "Üyelik başvurusu nasıl yapılır?",
        answer: "Web sitemizdeki 'Üyelik Başvurusu' formunu doldurarak ön başvurunuzu iletebilirsiniz. Yönetim kurulumuzun değerlendirmesi sonrasında sizinle iletişime geçilerek gerekli evraklar talep edilecektir.",
    },
    {
        question: "Derneğin amacı nedir?",
        answer: "TODER, otopark sektöründeki standartları yükseltmek, üyeler arası dayanışmayı artırmak, sektörel sorunlara ortak çözümler üretmek ve kamu kurumları ile sektör arasında köprü vazifesi görmek amacıyla kurulmuştur.",
    },
    {
        question: "Aidat ödemeleri nasıl yapılır?",
        answer: "Üyelik aidatları yıllık olarak tahsil edilmektedir. Ödemeler derneğimizin banka hesaplarına havale/EFT yoluyla veya kredi kartı ile yapılabilmektedir.",
    },
    {
        question: "Komisyonlara nasıl katılabilirim?",
        answer: "Üyelerimiz, ilgi ve uzmanlık alanlarına göre Teknoloji, Hukuk, Eğitim veya İletişim komisyonlarında aktif görev alabilirler. Talebinizi yönetim kuruluna iletmeniz yeterlidir.",
    },
];

export default function FAQPage() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <main className="pt-32 pb-20 min-h-screen">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-6">
                        <HelpCircle size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Sıkça Sorulan Sorular</h1>
                    <p className="text-white/60 text-lg">
                        TODER hakkında merak edilenler ve cevapları.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className={`border border-white/10 rounded-xl overflow-hidden transition-colors ${activeIndex === index ? "bg-white/5 border-[#D4AF37]/30" : "bg-black/40 hover:bg-white/5"
                                }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className={`font-medium text-lg ${activeIndex === index ? "text-[#D4AF37]" : "text-white"}`}>
                                    {faq.question}
                                </span>
                                {activeIndex === index ? (
                                    <ChevronUp className="text-[#D4AF37]" />
                                ) : (
                                    <ChevronDown className="text-white/50" />
                                )}
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-white/70 leading-relaxed border-t border-white/5 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center p-8 bg-white/5 rounded-2xl border border-white/10">
                    <h3 className="text-xl font-bold mb-2">Başka bir sorunuz mu var?</h3>
                    <p className="text-white/60 mb-6">
                        Aradığınız cevabı bulamadıysanız bizimle iletişime geçmekten çekinmeyin.
                    </p>
                    <a
                        href="mailto:info@toder.org.tr"
                        className="inline-flex items-center justify-center px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#b8962e] transition-colors"
                    >
                        Bize Ulaşın
                    </a>
                </div>
            </div>
        </main>
    );
}

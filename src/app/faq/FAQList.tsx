"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQList({ faqs }: { faqs: any[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    if (faqs.length === 0) {
        return (
            <div className="text-center text-white/40 py-12">
                Henüz S.S.S. eklenmemiş.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <motion.div
                    key={faq.id}
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
    );
}

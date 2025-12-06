"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
    { label: "Üye Kuruluş", value: 100, suffix: "+" },
    { label: "Otopark Kapasitesi", value: 50000, suffix: "+" },
    { label: "Yıllık Tecrübe", value: 10, suffix: " Yıl" },
    { label: "Şehirde Hizmet", value: 81, suffix: "" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    // Spring animation for smooth counting
    const springValue = useSpring(0, {
        mass: 1,
        stiffness: 50,
        damping: 30,
        duration: 2000
    });

    // Formatting large numbers
    const displayValue = useTransform(springValue, (current) => {
        const rounded = Math.round(current);
        return rounded.toLocaleString("tr-TR");
    });

    useEffect(() => {
        if (inView) {
            springValue.set(value);
        }
    }, [inView, value, springValue]);

    return (
        <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            <motion.span ref={ref}>{displayValue}</motion.span>
            {suffix}
        </span>
    );
}

export default function StatsCounter() {
    return (
        <section className="py-20 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#D4AF37]/5 blur-[100px] rounded-full -z-10"></div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center relative group"
                        >
                            <div className="mb-2 flex justify-center items-center gap-1">
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="text-white/60 text-sm md:text-base font-medium group-hover:text-[#D4AF37] transition-colors duration-300">
                                {stat.label}
                            </p>

                            {/* Decorative Line */}
                            <div className="w-12 h-1 bg-white/10 mx-auto mt-4 rounded-full group-hover:w-24 group-hover:bg-[#D4AF37] transition-all duration-300"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import React from "react";
import { HelpCircle } from "lucide-react";
import { getFAQs } from "@/actions/faqs";
import FAQList from "./FAQList";

export default async function FAQPage() {
    const faqs = await getFAQs();

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

                <FAQList faqs={faqs} />

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

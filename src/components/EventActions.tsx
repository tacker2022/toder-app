"use client";

import { Share2, CalendarPlus, Copy, check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EventActionsProps {
    title: string;
    date: string;
    description: string;
    url: string;
}

export default function EventActions({ title, date, description, url }: EventActionsProps) {
    const [copied, setCopied] = useState(false);

    const handleShareWhatsapp = () => {
        const text = `*${title}*\n\n${description.substring(0, 100)}...\n\nDetaylar: ${url}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    };

    const handleAddToCalendar = () => {
        const eventDate = new Date(date);
        const startDate = eventDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
        const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, ""); // +2 hours

        const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(description + "\n\n" + url)}`;
        window.open(googleUrl, "_blank");
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-wrap gap-3 mt-6">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCalendar}
                className="flex items-center gap-2 bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors"
                title="Google Takvime Ekle"
            >
                <CalendarPlus size={18} />
                Takvime Ekle
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShareWhatsapp}
                className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#128C7E] transition-colors"
                title="WhatsApp'ta Paylaş"
            >
                <Share2 size={18} />
                WhatsApp
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyLink}
                className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-white/20 transition-colors"
                title="Linki Kopyala"
            >
                {copied ? <check size={18} /> : <Copy size={18} />}
                {copied ? "Kopyalandı" : "Linki Kopyala"}
            </motion.button>
        </div>
    );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Toast() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState<"success" | "error">("success");

    useEffect(() => {
        const success = searchParams.get("success");
        const error = searchParams.get("error");

        if (success) {
            setMessage("İşlem başarıyla kaydedildi.");
            setType("success");
            setIsVisible(true);

            // Clear params after showing
            const timer = setTimeout(() => {
                setIsVisible(false);
                router.replace(pathname);
            }, 3000);
            return () => clearTimeout(timer);
        }

        if (error) {
            setMessage("Bir hata oluştu.");
            setType("error");
            setIsVisible(true);

            const timer = setTimeout(() => {
                setIsVisible(false);
                router.replace(pathname);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [searchParams, router, pathname]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: -20, x: 20 }}
                    className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-md ${type === "success"
                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                            : "bg-red-500/10 border-red-500/20 text-red-500"
                        }`}
                >
                    {type === "success" ? <CheckCircle size={24} /> : <XCircle size={24} />}
                    <p className="font-medium">{message}</p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

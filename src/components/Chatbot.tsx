"use client";

import { useChat } from "@ai-sdk/react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    // Manual Chat Implementation
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => {
        setInput(e.target.value);
    };

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        const userMsg = { id: Date.now().toString(), role: 'user', content };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMsg] }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Create placeholder for bot message
            const botMsgId = (Date.now() + 1).toString();
            setMessages(prev => [...prev, { id: botMsgId, role: 'assistant', content: '' }]);

            const reader = response.body?.getReader();
            if (!reader) throw new Error("No reader available");

            const decoder = new TextDecoder();
            let botContent = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                botContent += chunk;

                // Simple update for now - in a real app we might want to debounce this
                setMessages(prev => prev.map(m =>
                    m.id === botMsgId ? { ...m, content: botContent } : m
                ));
            }
        } catch (err) {
            console.error("Chat error:", err);
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const value = input;
        setInput(""); // Clear input
        await sendMessage(value);
    };

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-[350px] h-[500px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="bg-[#D4AF37] p-4 flex justify-between items-center text-black">
                            <div className="flex items-center gap-2">
                                <div className="bg-black/10 p-1.5 rounded-full">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">TODER Asistan</h3>
                                    <span className="text-xs opacity-70 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-800 rounded-full animate-pulse"></span>
                                        Çevrimiçi
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="hover:bg-black/10 p-1 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Chat messages */}
                        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 text-white">
                            {messages.length === 0 && (
                                <div className="text-center text-white/50 text-sm mt-8">
                                    <Bot size={48} className="mx-auto mb-4 opacity-20" />
                                    <p>Merhaba! 👋</p>
                                    <p>Size nasıl yardımcı olabilirim?</p>
                                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                                        <button
                                            onClick={() => {
                                                const value = "Üyelik şartları nelerdir?";
                                                setInput(value);
                                                sendMessage(value);
                                            }}
                                            className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 transition-colors"
                                        >
                                            Üyelik Şartları
                                        </button>
                                        <button
                                            onClick={() => {
                                                const value = "Komisyonlar hakkında bilgi ver.";
                                                setInput(value);
                                                sendMessage(value);
                                            }}
                                            className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 transition-colors"
                                        >
                                            Komisyonlar
                                        </button>
                                    </div>
                                </div>
                            )}

                            {messages.map((m: any) => (
                                <div
                                    key={m.id}
                                    className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === "user" ? "bg-white/10" : "bg-[#D4AF37]"
                                        }`}>
                                        {m.role === "user" ? <User size={16} /> : <Bot size={16} className="text-black" />}
                                    </div>
                                    <div className={`p-3 rounded-2xl text-sm max-w-[80%] ${m.role === "user"
                                        ? "bg-white/10 text-white rounded-tr-none"
                                        : "bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-white rounded-tl-none"
                                        }`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
                                        <Bot size={16} className="text-black" />
                                    </div>
                                    <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce delay-100"></span>
                                        <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            )}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-2xl text-red-400 text-xs">
                                    <p className="font-bold">Hata Oluştu:</p>
                                    <p>{error.message || "Bilinmeyen hata"}</p>
                                    {/* Debug info */}
                                    <pre className="mt-2 opacity-50 text-[10px] whitespace-pre-wrap">
                                        {JSON.stringify(error, null, 2)}
                                    </pre>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/20">
                            <div className="relative">
                                <input
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Bir soru sorun..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#D4AF37] text-black rounded-lg hover:bg-[#b8962e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </form>
                    </motion.div >
                )
                }
            </AnimatePresence >

            {/* Toggle Button */}
            < motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#D4AF37] text-black p-4 rounded-full shadow-lg hover:bg-[#b8962e] transition-colors relative group"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}

                {/* Tooltip */}
                {
                    !isOpen && (
                        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Size nasıl yardımcı olabilirim?
                        </span>
                    )
                }
            </motion.button >
        </div >
    );
}

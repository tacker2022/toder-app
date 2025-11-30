"use client";

import { useChat } from "@ai-sdk/react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, sendMessage, isLoading, error } = useChat({
        onError: (err) => {
            console.error("Chat error:", err);
        }
    }) as any;

    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setInput(""); // Clear input immediately

        try {
            await sendMessage({
                role: "user",
                content: userMessage,
                // Manually add user message since sendMessage might not do it optimistically in this version
                // or if there's an issue with the hook state update.
                // Actually, let's rely on sendMessage but ensure we are passing the correct object.
                // If sendMessage doesn't update the UI, we might need to use setMessages.
                // But setMessages replaces the whole history.

                // Let's try to use the 'append' from the hook again, but maybe it was just not destructured correctly?
                // No, the log showed it was missing.

                // Let's try to force a reload after sending? No.

                // Let's try to use the `handleSubmit` from the hook if possible?
                // The hook returns `handleSubmit` usually. Let's check if it exists in the log.
                // The log showed: addToolOutput, addToolResult, clearError, messages, regenerate, resumeStream, sendMessage, setMessages, status, stop.
                // It does NOT show handleSubmit or handleInputChange.
                // This means we are in a version where we must manage input manually.

                // If sendMessage is called, it should update the messages.
                // Maybe the issue is that we are not awaiting it properly? We are.

                // Let's try to pass the message as a string?
                // await sendMessage(userMessage);

                // Or maybe we need to pass options?

                // Let's try to manually append the user message to the local state using setMessages
                // and then call sendMessage? No, sendMessage should do that.

                // Wait, if the backend returns a stream, maybe the 'Edge Runtime' fix I did earlier fixed the backend,
                // but I haven't tried the normal chat since then?
                // The user said "chatten hala dönüş yok" AFTER I enabled Edge Runtime.
                // But the TEST button worked.

                // So the backend is fine. The frontend hook is the issue.
                // I will try to use `append` again, but maybe I need to import it differently?
                // No, it's returned from useChat.

                // Let's try to use `setMessages` to manually add the user message,
                // and then call `sendMessage`?
                // But `sendMessage` sends the *new* message to the backend.

                // Let's try to use `reload()`? No.

                // Let's look at the `sendMessage` signature again.
                // It usually takes (event, options) or (message, options).

                // I will try to use `append` but cast it differently? No, it's not there.

                // Let's try to use `handleSubmit` by mocking an event?
                // But `handleSubmit` is missing too!

                // Okay, let's try to use `append` from `useChat` by forcing it?
                // Maybe it's named `appendMessage`? No.

                // Let's look at the imports. `import { useChat } from "@ai-sdk/react";`
                // Maybe I should use `useCompletion` instead? No, it's a chat.

                // Let's try to downgrade `ai` and `@ai-sdk/react` to a known stable version?
                // Or maybe I should just implement the fetch logic manually since I already wrote a working test?
                // Yes! If the hook is being difficult, I can just write a simple `sendMessage` function
                // that uses `fetch` and updates the `messages` state manually.
                // This is robust and I know it works because the test worked.

                // I will refactor Chatbot to use manual fetch and state management.
                // This guarantees it works because I control everything.

                const newUserMessage = { id: Date.now().toString(), role: "user", content: userMessage };
                const newMessages = [...messages, newUserMessage];

                // Optimistically update UI
                // We need to use setMessages from useChat, but it might be tied to the hook's internal logic.
                // Actually, if I use manual fetch, I should probably stop using useChat for the logic
                // and just use it for the state, or manage state myself completely.

                // Let's manage state completely manually to be 100% sure.
                // I will keep useChat for now but override the submit logic.
                // Actually, useChat provides `setMessages`. I can use that.

                // But wait, if I use manual fetch, I need to handle streaming.
                // Handling streaming manually is a bit complex.

                // Let's try one last thing with `useChat`.
                // Maybe `sendMessage` expects a string, not an object?
                // await sendMessage(userMessage);

                // Let's try that first.
                await sendMessage(userMessage);

            } catch (err) {
                console.error("Failed to send message:", err);
            }
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
                                    onClick={() => {
                                        const value = "Komisyonlar hakkında bilgi ver.";
                                        setInput(value);
                                        sendMessage(value);
                                    }}
                                    className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 transition-colors"
                                    >
                                    Komisyonlar
                                </button>
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

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getVideos } from "@/actions/videos";
import { getYouTubeID } from "@/utils/youtube";
import { Play, X } from "lucide-react";

export default function Videos() {
    const [videos, setVideos] = useState<any[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            const data = await getVideos();
            setVideos(data);
        };
        fetchVideos();
    }, []);

    if (videos.length === 0) return null;

    return (
        <section id="medya" className="section videos-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Basında Biz</h2>
                    <div className="section-line"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video, index) => {
                        const videoId = getYouTubeID(video.youtube_url);
                        const thumbnailUrl = videoId
                            ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                            : null;

                        return (
                            <motion.div
                                key={video.id}
                                className="video-card group cursor-pointer"
                                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                onClick={() => videoId && setSelectedVideo(videoId)}
                            >
                                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-white/10">
                                    {thumbnailUrl ? (
                                        <img
                                            src={thumbnailUrl}
                                            alt={video.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-black/50 flex items-center justify-center">
                                            <Play size={48} className="text-white/20" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20">
                                            <Play size={32} className="text-white ml-1" />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                                    {video.title}
                                </h3>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors backdrop-blur-sm"
                            >
                                <X size={24} />
                            </button>
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

"use client";

import { updateEvent, getEventById } from "@/actions/events";
import { getGalleryImages, deleteGalleryImage } from "@/actions/gallery";
import { Save, ArrowLeft, AlertCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import ImageCropper from "@/components/admin/ImageCropper";

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState<any>(null);
    const [galleryImages, setGalleryImages] = useState<any[]>([]);
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [listImage, setListImage] = useState<File | null>(null);
    const router = useRouter();

    useEffect(() => {
        getEventById(resolvedParams.id).then((data) => {
            if (data) {
                setEvent(data);
                // Fetch gallery images
                getGalleryImages(data.id).then(setGalleryImages);
            } else {
                setError("Etkinlik bulunamadı.");
            }
        });
    }, [resolvedParams.id]);

    const handleDeleteGalleryImage = async (imageId: string) => {
        if (confirm("Bu görseli silmek istediğinize emin misiniz?")) {
            await deleteGalleryImage(imageId);
            setGalleryImages(prev => prev.filter(img => img.id !== imageId));
        }
    };

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        if (mainImage) formData.set("image", mainImage);
        if (listImage) formData.set("list_image", listImage);

        try {
            const result = await updateEvent(resolvedParams.id, formData);

            if (result && 'error' in result && result.error) {
                setError(result.error);
                setLoading(false);
            } else {
                // Success
                router.push("/admin/events?success=true");
            }
        } catch (e) {
            setError("Beklenmedik bir hata oluştu.");
            setLoading(false);
        }
    }

    if (!event && !error) return <div className="text-white/50">Yükleniyor...</div>;

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/events" className="text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold">Etkinliği Düzenle</h1>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl max-w-4xl">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg mb-6 flex items-center gap-3">
                        <AlertCircle size={20} />
                        <p>{error}</p>
                    </div>
                )}

                <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        name="title"
                        defaultValue={event.title}
                        placeholder="Etkinlik Başlığı"
                        required
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                        type="date"
                        name="date"
                        defaultValue={event.date}
                        required
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    />

                    <div className="md:col-span-2">
                        <ImageCropper
                            label="Etkinlik Görseli (Değiştirmek için yeni yükleyin)"
                            initialImage={event.image_url}
                            onCropComplete={(original, cropped) => {
                                setMainImage(original);
                                setListImage(cropped);
                            }}
                            aspectRatio={16 / 9}
                        />
                        <p className="text-xs text-white/30 mt-2">
                            Yüklediğiniz fotoğrafın tamamı detay sayfasında kullanılır.
                            Seçtiğiniz/kırptığınız alan ise etkinlik listesinde önizleme olarak kullanılır.
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm text-white/50 mb-1">Galeri Görselleri (Yeni Ekle)</label>
                        <input
                            type="file"
                            name="gallery"
                            accept="image/*"
                            multiple
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                        <div className="mt-4 grid grid-cols-4 gap-4">
                            {galleryImages.map((img: any) => (
                                <div key={img.id} className="relative group">
                                    <img
                                        src={img.image_url}
                                        alt="Gallery"
                                        className="w-full h-24 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteGalleryImage(img.id)}
                                        className="absolute top-1 right-1 bg-red-500/80 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <textarea
                        name="description"
                        defaultValue={event.description}
                        placeholder="Açıklama"
                        required
                        rows={6}
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] md:col-span-2"
                    ></textarea>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#D4AF37] text-black font-bold py-3 rounded-lg hover:bg-[#b8962e] transition-colors md:col-span-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        ) : (
                            <Save size={20} />
                        )}
                        {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </button>
                </form>
            </div>
        </div>
    );
}

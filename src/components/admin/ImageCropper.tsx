"use client";

import { useState, useRef, useEffect } from "react";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { X, Crop as CropIcon, Image as ImageIcon } from "lucide-react";

interface ImageCropperProps {
    onCropComplete: (original: File, cropped: File) => void;
    aspectRatio?: number;
    label?: string;
    initialImage?: string | null;
}

// Helper to center the crop
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: "%",
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    );
}

export default function ImageCropper({ onCropComplete, aspectRatio = 16 / 9, label = "Görsel Seç", initialImage }: ImageCropperProps) {
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const imgRef = useRef<HTMLImageElement>(null);
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [croppedPreviewUrl, setCroppedPreviewUrl] = useState<string | null>(null);

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setOriginalFile(file);
            setCrop(undefined);
            const reader = new FileReader();
            reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""));
            reader.readAsDataURL(file);
            setCroppedPreviewUrl(null);
        }
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget;
        setCrop(centerAspectCrop(width, height, aspectRatio));
    }

    async function getCroppedImg(image: HTMLImageElement, crop: PixelCrop, fileName: string): Promise<File> {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        // Use the actual pixel dimensions of the original image
        canvas.width = Math.floor(crop.width * scaleX);
        canvas.height = Math.floor(crop.height * scaleY);
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error("No 2d context");
        }

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            canvas.width,
            canvas.height,
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error("Canvas is empty"));
                    return;
                }
                const file = new File([blob], fileName, { type: "image/png" });
                resolve(file);
            }, "image/png", 1.0);
        });
    }

    async function handleCrop() {
        if (imgRef.current && completedCrop && originalFile) {
            const croppedFile = await getCroppedImg(imgRef.current, completedCrop, "cropped-image.png");
            onCropComplete(originalFile, croppedFile);
            setCroppedPreviewUrl(URL.createObjectURL(croppedFile));
            setImgSrc(""); // Close cropper view
        }
    }

    function handleReset() {
        setImgSrc("");
        setOriginalFile(null);
        setCroppedPreviewUrl(null);
        // We notify parent to clear if needed, but for now simple reset
    }

    return (
        <div className="w-full">
            <label className="block text-sm text-white/50 mb-2">{label}</label>

            {!imgSrc && !croppedPreviewUrl && !initialImage && (
                <div className="relative border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[#D4AF37]/50 transition-colors cursor-pointer bg-white/5 group">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onSelectFile}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="text-white/30 group-hover:text-[#D4AF37] transition-colors" size={32} />
                        <span className="text-white/50 group-hover:text-white transition-colors">Görsel yüklemek için tıklayın</span>
                    </div>
                </div>
            )}

            {!imgSrc && !croppedPreviewUrl && initialImage && (
                <div className="relative border-2 border-dashed border-white/10 rounded-xl p-4 flex items-center gap-4 bg-white/5 group">
                    <img src={initialImage} alt="Current" className="h-20 w-32 object-cover rounded-md" />
                    <div className="flex-1">
                        <p className="text-sm text-white/70 mb-1">Mevcut görsel kullanılıyor</p>
                        <div className="relative inline-block">
                            <span className="text-xs text-[#D4AF37] hover:underline cursor-pointer">Değiştirmek için tıklayın</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={onSelectFile}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            )}

            {imgSrc && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                    <div className="bg-[#111] p-6 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">Önizleme Alanını Seç</h3>

                        </div>
                        <div className="flex-1 overflow-auto flex justify-center bg-black/50 rounded-lg p-4">
                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={aspectRatio}
                                className="max-h-[60vh]"
                            >
                                <img
                                    ref={imgRef}
                                    alt="Crop me"
                                    src={imgSrc}
                                    onLoad={onImageLoad}
                                    style={{ maxHeight: "60vh", objectFit: "contain" }}
                                />
                            </ReactCrop>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setImgSrc("")}
                                className="px-6 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                İptal
                            </button>
                            <button
                                onClick={handleCrop}
                                className="px-6 py-2 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#b8962e] transition-colors flex items-center gap-2"
                            >
                                <CropIcon size={18} />
                                Seçimi Kırp ve Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {croppedPreviewUrl && (
                <div className="mt-4 flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="relative group">
                        <img src={croppedPreviewUrl} alt="Cropped" className="w-32 h-20 object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                            <span className="text-xs text-white font-medium">Seçilen Alan</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-green-400 mb-2 flex items-center gap-1">
                            ✓ Önizleme görseli hazırlandı
                        </p>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="text-xs text-white/50 hover:text-red-400 transition-colors underline"
                        >
                            Görseli Değiştir
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

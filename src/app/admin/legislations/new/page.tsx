"use client";

import { addLegislation } from "@/actions/legislations";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function NewLegislationPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            let pdfUrl = "";

            // Client-side Upload Logic
            if (selectedFile) {
                setUploading(true);
                const supabase = createClient();
                const extension = selectedFile.name.split('.').pop() || 'pdf';
                const filename = `legis-${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;

                // Try uploading to 'documents' bucket
                const { error: uploadError } = await supabase.storage
                    .from("documents")
                    .upload(filename, selectedFile, {
                        cacheControl: "3600",
                        upsert: false
                    });

                if (uploadError) {
                    console.error("Client upload error:", uploadError);
                    // If 'documents' bucket doesn't exist, maybe try 'images' as fallback or alert user
                    // Ideally dev should create the bucket.
                    throw new Error(`Upload Failed: ${uploadError.message}`);
                }

                const { data: publicUrlData } = supabase.storage
                    .from("documents")
                    .getPublicUrl(filename);

                pdfUrl = publicUrlData.publicUrl;
                setUploading(false);
            }

            // check if pdfUrl is set, if so, append it to formData or handle in server action logic replacement
            // We need to modify server action to accept pdf_url string
            // But here, we can just append it to a new formData or use hidden input logic?
            // Better: update server action to look for 'pdf_url' string in formData.
            formData.set("pdf_url", pdfUrl);
            // Remove the file itself from formData to avoid double upload attempt at server
            formData.delete("pdf");

            const result = await addLegislation(formData);

            if (result?.error) {
                alert(result.error);
            } else {
                router.push("/admin/legislations");
            }

        } catch (error: any) {
            console.error(error);
            alert("Hata: " + error.message);
        } finally {
            setLoading(false);
            setUploading(false);
        }
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <Link
                    href="/admin/legislations"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Listeye Dön
                </Link>
                <h1 className="text-3xl font-bold text-white">Yeni Belge Ekle</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-[#0a0a0a] border border-white/10 p-8 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Başlık
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="Örn: Otopark Yönetmeliği"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Kategori
                        </label>
                        <select
                            name="category"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none"
                        >
                            <option value="Kanun">Kanun</option>
                            <option value="Yönetmelik">Yönetmelik</option>
                            <option value="Genelge">Genelge</option>
                            <option value="Tebliğ">Tebliğ</option>
                            <option value="Duyuru">Duyuru</option>
                            <option value="Diğer">Diğer</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                        Açıklama
                    </label>
                    <textarea
                        name="description"
                        rows={3}
                        placeholder="Belge hakkında kısa açıklama..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Yayın Tarihi
                        </label>
                        <input
                            type="date"
                            name="published_date"
                            defaultValue={new Date().toISOString().split('T')[0]}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            PDF Dosyası
                        </label>
                        <div className="relative group">
                            <input
                                type="file"
                                name="pdf" // Kept for logic but overridden in handler
                                accept=".pdf"
                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="w-full bg-white/5 border border-dashed border-white/20 rounded-lg px-4 py-3 text-white/60 flex items-center gap-2 group-hover:border-[#D4AF37]/50 transition-colors">
                                <Upload size={20} className={selectedFile ? "text-[#D4AF37]" : ""} />
                                <span className={selectedFile ? "text-white" : ""}>
                                    {selectedFile ? selectedFile.name : "PDF seçmek için tıklayın veya sürükleyin"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#b8962e] transition-colors disabled:opacity-50"
                    >
                        {(loading || uploading) ? (
                            <>
                                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                                {uploading ? "Dosya Yükleniyor..." : "Kaydediliyor..."}
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                Kaydet
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getLegislations() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("legislations")
        .select("*")
        .order("published_date", { ascending: false });

    if (error) {
        console.error("Error fetching legislations:", error);
        return [];
    }

    return data;
}

export async function addLegislation(formData: FormData) {
    const supabase = await createClient();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const published_date = formData.get("published_date") as string;
    const pdfFile = formData.get("pdf") as File;

    let pdfUrl = "";

    if (pdfFile && pdfFile.size > 0) {
        try {
            const extension = pdfFile.name.split('.').pop() || 'pdf';
            const filename = `legis-${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
            const { data, error } = await supabase.storage
                .from("documents") // Assuming a 'documents' bucket exists or we use 'images' for now? Better to check/create 'documents'. Let's stick to 'images' if 'documents' doesn't exist, but usually PDFs go to documents. I'll try 'documents' and if it fails user might need to create it. Or I can use 'images' bucket if it allows all types, but 'documents' is cleaner. Let's assume 'documents' bucket needs to be created or we use 'public' bucket.
                // Actually, let's check if we can use a generic bucket. The user has 'images' bucket.
                // I'll use 'images' bucket for now to avoid another bucket creation step if possible, but PDFs in 'images' is weird.
                // Let's ask user to create 'documents' bucket or just use 'images' if it allows.
                // Safest bet: Use 'images' bucket but rename it mentally to 'public_assets' or similar.
                // Wait, I should probably ask user to create 'documents' bucket.
                // For now, I will try to upload to 'documents'. If it fails, I'll handle it.
                .upload(filename, pdfFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (error) throw error;

            const { data: publicUrlData } = supabase.storage
                .from("documents")
                .getPublicUrl(filename);

            pdfUrl = publicUrlData.publicUrl;
        } catch (uploadError) {
            console.error("Failed to upload legislation PDF:", uploadError);
            // Fallback: try 'images' bucket if 'documents' fails? No, that's messy.
            // I'll return error.
            return { error: `Upload Error: ${(uploadError as Error).message}. Make sure 'documents' bucket exists.` };
        }
    }

    const { error } = await supabase.from("legislations").insert({
        title,
        description,
        category,
        published_date: published_date || new Date().toISOString(),
        pdf_url: pdfUrl,
    });

    if (error) {
        console.error("Error adding legislation:", error);
        return { error: `Database Error: ${error.message}` };
    }

    revalidatePath("/admin/legislations");
    revalidatePath("/legislation");
    return { success: true };
}

export async function deleteLegislation(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("legislations").delete().eq("id", id);

    if (error) {
        console.error("Error deleting legislation:", error);
        throw new Error("Failed to delete legislation");
    }

    revalidatePath("/admin/legislations");
    revalidatePath("/legislation");
}

export async function getLegislation(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("legislations")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching legislation:", error);
        return null;
    }

    return data;
}

export async function updateLegislation(id: string, formData: FormData) {
    const supabase = await createClient();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const published_date = formData.get("published_date") as string;
    const pdfFile = formData.get("pdf") as File;

    const updates: any = {
        title,
        description,
        category,
        published_date,
    };

    if (pdfFile && pdfFile.size > 0) {
        try {
            const extension = pdfFile.name.split('.').pop() || 'pdf';
            const filename = `legis-${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
            const { data, error } = await supabase.storage
                .from("documents")
                .upload(filename, pdfFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (error) throw error;

            const { data: publicUrlData } = supabase.storage
                .from("documents")
                .getPublicUrl(filename);

            updates.pdf_url = publicUrlData.publicUrl;
        } catch (uploadError) {
            console.error("Failed to upload legislation PDF:", uploadError);
            return { error: `Upload Error: ${(uploadError as Error).message}` };
        }
    }

    const { error } = await supabase
        .from("legislations")
        .update(updates)
        .eq("id", id);

    if (error) {
        console.error("Error updating legislation:", error);
        return { error: `Database Error: ${error.message}` };
    }

    revalidatePath("/admin/legislations");
    revalidatePath("/legislation");
    return { success: true };
}

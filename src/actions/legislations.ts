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
    const clientPdfUrl = formData.get("pdf_url") as string;

    let pdfUrl = clientPdfUrl || "";

    // Fallback: Server-side upload if file is provided but no URL (legacy support or small files)
    if (!pdfUrl && pdfFile && pdfFile.size > 0) {
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

            pdfUrl = publicUrlData.publicUrl;
        } catch (uploadError) {
            console.error("Failed to upload legislation PDF:", uploadError);
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

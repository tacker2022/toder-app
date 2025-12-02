"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAssociations() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("associations")
        .select("*")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching associations:", error);
        return [];
    }

    return data;
}

export async function addAssociation(formData: FormData) {
    const supabase = await createClient();
    const name = formData.get("name") as string;
    const website_url = formData.get("website_url") as string;
    const order_index = parseInt(formData.get("order_index") as string) || 0;
    const imageFile = formData.get("image") as File;

    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
        try {
            // Sanitize filename: use timestamp + random string + extension
            const extension = imageFile.name.split('.').pop() || 'png';
            const filename = `assoc-${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
            const { data, error } = await supabase.storage
                .from("images")
                .upload(filename, imageFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (error) throw error;

            const { data: publicUrlData } = supabase.storage
                .from("images")
                .getPublicUrl(filename);

            imageUrl = publicUrlData.publicUrl;
        } catch (imageError) {
            console.error("Failed to upload association image:", imageError);
            return { error: `Upload Error: ${(imageError as Error).message}` };
        }
    } else {
        return { error: "Image is required" };
    }

    const { error } = await supabase.from("associations").insert({
        name,
        website_url,
        image_url: imageUrl,
    });

    if (error) {
        console.error("Error adding association:", error);
        return { error: `Database Error: ${error.message}` };
    }

    revalidatePath("/admin/associations");
    revalidatePath("/");
    return { success: true };
}

export async function deleteAssociation(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("associations").delete().eq("id", id);

    if (error) {
        console.error("Error deleting association:", error);
        throw new Error("Failed to delete association");
    }

    revalidatePath("/admin/associations");
    revalidatePath("/");
}

export async function getAssociation(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("associations")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching association:", error);
        return null;
    }

    return data;
}

export async function updateAssociation(id: string, formData: FormData) {
    const supabase = await createClient();
    const name = formData.get("name") as string;
    const website_url = formData.get("website_url") as string;
    const imageFile = formData.get("image") as File;

    const updates: any = {
        name,
        website_url,
    };

    if (imageFile && imageFile.size > 0) {
        try {
            // Sanitize filename: use timestamp + random string + extension
            const extension = imageFile.name.split('.').pop() || 'png';
            const filename = `assoc-${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
            const { data, error } = await supabase.storage
                .from("images")
                .upload(filename, imageFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (error) throw error;

            const { data: publicUrlData } = supabase.storage
                .from("images")
                .getPublicUrl(filename);

            updates.image_url = publicUrlData.publicUrl;
        } catch (imageError) {
            console.error("Failed to upload association image:", imageError);
            return { error: `Upload Error: ${(imageError as Error).message}` };
        }
    }

    const { error } = await supabase
        .from("associations")
        .update(updates)
        .eq("id", id);

    if (error) {
        console.error("Error updating association:", error);
        return { error: `Database Error: ${error.message}` };
    }

    revalidatePath("/admin/associations");
    revalidatePath("/");
    return { success: true };
}

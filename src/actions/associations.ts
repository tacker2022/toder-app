"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAssociations() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("associations")
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
    const imageFile = formData.get("image") as File;

    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
        try {
            const filename = `assoc-${Date.now()}-${imageFile.name.replace(/\s/g, "-")}`;
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
            throw new Error("Failed to upload image");
        }
    } else {
        throw new Error("Image is required");
    }

    const { error } = await supabase.from("associations").insert({
        name,
        website_url,
        image_url: imageUrl,
    });

    if (error) {
        console.error("Error adding association:", error);
        throw new Error("Failed to add association");
    }

    revalidatePath("/admin/associations");
    revalidatePath("/");
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

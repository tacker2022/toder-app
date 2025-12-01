"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteGalleryImage(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("gallery_images").delete().eq("id", id);

    if (error) {
        console.error("Error deleting gallery image:", error);
        throw new Error("Failed to delete image");
    }

    revalidatePath("/admin/posts");
    revalidatePath("/admin/events");
    revalidatePath("/blog");
    revalidatePath("/");
}

export async function getGalleryImages(entityId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .or(`post_id.eq.${entityId},event_id.eq.${entityId}`);

    if (error) {
        console.error("Error fetching gallery images:", error);
        return [];
    }

    return data;
}

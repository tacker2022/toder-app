"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getEvents() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching events:", error);
        return [];
    }

    return data;
}

export async function addEvent(formData: FormData) {
    const supabase = await createClient();
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;

    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
        try {
            const filename = `${Date.now()}-${imageFile.name.replace(/\s/g, "-")}`;
            const { data, error } = await supabase.storage
                .from("images")
                .upload(filename, imageFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (error) throw error;

            // Get public URL
            const { data: publicUrlData } = supabase.storage
                .from("images")
                .getPublicUrl(filename);

            imageUrl = publicUrlData.publicUrl;
        } catch (imageError) {
            console.error("Failed to upload event image:", imageError);
        }
    }

    const { error } = await supabase.from("events").insert({
        title,
        date,
        description,
        image_url: imageUrl,
    });

    if (error) {
        console.error("Error adding event:", error);
        throw new Error("Failed to add event");
    }

    revalidatePath("/admin/events");
    revalidatePath("/");
}

export async function deleteEvent(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
        console.error("Error deleting event:", error);
        throw new Error("Failed to delete event");
    }

    revalidatePath("/admin/events");
    revalidatePath("/");
}

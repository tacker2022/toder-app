"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function getEvents() {
    unstable_noStore();
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

    // Images are now uploaded client-side, we just get the URLs
    const imageUrl = formData.get("image_url") as string || "";
    const listImageUrl = formData.get("list_image_url") as string || "";

    const galleryFiles = formData.getAll("gallery") as File[];

    const { data: eventData, error } = await supabase.from("events").insert({
        title,
        date,
        description,
        image_url: imageUrl,
        list_image_url: listImageUrl,
    }).select().single();

    if (error) {
        console.error("Error adding event:", error);
        throw new Error("Failed to add event");
    }

    // Handle Gallery Uploads
    if (galleryFiles && galleryFiles.length > 0) {
        for (const file of galleryFiles) {
            if (file.size > 0) {
                try {
                    const filename = `gallery-${Date.now()}-${Math.random().toString(36).substring(7)}-${file.name.replace(/\s/g, "-")}`;
                    const { error: uploadError } = await supabase.storage
                        .from("images")
                        .upload(filename, file);

                    if (!uploadError) {
                        const { data: { publicUrl } } = supabase.storage
                            .from("images")
                            .getPublicUrl(filename);

                        await supabase.from("gallery_images").insert({
                            event_id: eventData.id,
                            image_url: publicUrl
                        });
                    }
                } catch (e) {
                    console.error("Gallery upload error:", e);
                }
            }
        }
    }

    revalidatePath("/admin/events");
    revalidatePath("/");
}



export async function updateEvent(id: string, formData: FormData) {
    const supabase = await createClient();
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const description = formData.get("description") as string;

    // Images are now uploaded client-side
    const image_url = formData.get("image_url") as string;
    const list_image_url = formData.get("list_image_url") as string;

    const galleryFiles = formData.getAll("gallery") as File[];

    const updates: any = {
        title,
        date,
        description,
    };

    if (image_url) updates.image_url = image_url;
    if (list_image_url) updates.list_image_url = list_image_url;

    const { error } = await supabase
        .from("events")
        .update(updates)
        .eq("id", id);

    if (error) {
        console.error("Error updating event:", error);
        return { error: `Database Error: ${error.message}` };
    }

    // Handle Gallery Uploads
    if (galleryFiles && galleryFiles.length > 0) {
        for (const file of galleryFiles) {
            if (file.size > 0) {
                try {
                    const sanitizedGalleryName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
                    const filename = `gallery-${Date.now()}-${Math.random().toString(36).substring(7)}-${sanitizedGalleryName}`;
                    const { error: uploadError } = await supabase.storage
                        .from("images")
                        .upload(filename, file);

                    if (!uploadError) {
                        const { data: { publicUrl } } = supabase.storage
                            .from("images")
                            .getPublicUrl(filename);

                        await supabase.from("gallery_images").insert({
                            event_id: id,
                            image_url: publicUrl
                        });
                    }
                } catch (e) {
                    console.error("Gallery upload error:", e);
                }
            }
        }
    }

    revalidatePath("/admin/events");
    revalidatePath("/");
    revalidatePath(`/events/${id}`);
    return { success: true };
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

export async function getEventById(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching event:", error);
        return null;
    }

    return data;
}

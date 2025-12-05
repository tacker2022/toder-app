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
    const listImageFile = formData.get("list_image") as File;

    const galleryFiles = formData.getAll("gallery") as File[];

    let imageUrl = "";
    let listImageUrl = "";

    if (listImageFile && listImageFile.size > 0) {
        try {
            const sanitizedParams = listImageFile.name.replace(/[^a-zA-Z0-9.-]/g, "-");
            const filename = `list-${Date.now()}-${sanitizedParams}`;
            const { error } = await supabase.storage
                .from("images")
                .upload(filename, listImageFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (!error) {
                const { data: publicUrlData } = supabase.storage
                    .from("images")
                    .getPublicUrl(filename);
                listImageUrl = publicUrlData.publicUrl;
            }
        } catch (e) {
            console.error("List image upload error:", e);
        }
    }

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
    const image_fit = formData.get("image_fit") as string || "cover";
    const imageFile = formData.get("image") as File;

    const galleryFiles = formData.getAll("gallery") as File[];

    const updates: any = {
        title,
        date,
        description,
    };

    if (imageFile && imageFile.size > 0) {
        try {
            const sanitizedParams = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "-");
            const filename = `${Date.now()}-${sanitizedParams}`;
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
            console.error("Failed to upload event image:", imageError);
            return { error: `Görsel yüklenirken hata oluştu: ${(imageError as Error).message}` };
        }
    }

    const listImageFile = formData.get("list_image") as File;
    if (listImageFile && listImageFile.size > 0) {
        try {
            const sanitizedParams = listImageFile.name.replace(/[^a-zA-Z0-9.-]/g, "-");
            const filename = `list-${Date.now()}-${sanitizedParams}`;
            const { error } = await supabase.storage
                .from("images")
                .upload(filename, listImageFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (!error) {
                const { data: publicUrlData } = supabase.storage
                    .from("images")
                    .getPublicUrl(filename);
                updates.list_image_url = publicUrlData.publicUrl;
            }
        } catch (e) {
            console.error("List image upload error:", e);
        }
    }

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

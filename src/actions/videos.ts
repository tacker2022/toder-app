"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getVideos() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching videos:", error);
        return [];
    }

    return data;
}

export async function addVideo(formData: FormData) {
    const supabase = await createClient();
    const title = formData.get("title") as string;
    const youtube_url = formData.get("youtube_url") as string;

    if (!title || !youtube_url) {
        return { error: "Başlık ve YouTube linki zorunludur." };
    }

    // Basic validation for YouTube URL
    if (!youtube_url.includes("youtube.com") && !youtube_url.includes("youtu.be")) {
        return { error: "Geçerli bir YouTube linki giriniz." };
    }

    const { error } = await supabase.from("videos").insert({
        title,
        youtube_url,
    });

    if (error) {
        console.error("Error adding video:", error);
        return { error: `Database Error: ${error.message}` };
    }

    revalidatePath("/admin/videos");
    revalidatePath("/");
    return { success: true };
}

export async function deleteVideo(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("videos").delete().eq("id", id);

    if (error) {
        console.error("Error deleting video:", error);
        return { error: error.message };
    }

    revalidatePath("/admin/videos");
    revalidatePath("/");
    return { success: true };
}

// Helper to extract YouTube ID (can be used in frontend or backend)
export function getYouTubeID(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

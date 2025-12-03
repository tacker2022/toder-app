"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function sendMessage(formData: FormData) {
    const supabase = await createClient();

    const full_name = formData.get("full_name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const { error } = await supabase.from("messages").insert({
        full_name,
        email,
        phone,
        subject,
        message,
        is_read: false
    });

    if (error) {
        console.error("Error sending message:", error);
        throw new Error(`Failed to send message: ${error.message}`);
    }

    revalidatePath("/admin/messages");
}

export async function getMessages() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching messages:", error);
        return [];
    }

    return data;
}

export async function markAsRead(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("id", id);

    if (error) {
        console.error("Error marking message as read:", error);
        throw new Error("Failed to update message status");
    }

    revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting message:", error);
        throw new Error("Failed to delete message");
    }

    revalidatePath("/admin/messages");
}

"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getFAQs() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching FAQs:", error);
        return [];
    }

    return data;
}

export async function addFAQ(formData: FormData) {
    const supabase = await createClient();
    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;
    const display_order = parseInt(formData.get("display_order") as string) || 0;

    const { error } = await supabase.from("faqs").insert({
        question,
        answer,
        display_order,
    });

    if (error) {
        console.error("Error adding FAQ:", error);
        return { error: `Database Error: ${error.message}` };
    }

    revalidatePath("/admin/faqs");
    revalidatePath("/faq");
    return { success: true };
}

export async function deleteFAQ(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("faqs").delete().eq("id", id);

    if (error) {
        console.error("Error deleting FAQ:", error);
        throw new Error("Failed to delete FAQ");
    }

    revalidatePath("/admin/faqs");
    revalidatePath("/faq");
}

export async function getFAQ(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching FAQ:", error);
        return null;
    }

    return data;
}

export async function updateFAQ(id: string, formData: FormData) {
    const supabase = await createClient();
    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;
    const display_order = parseInt(formData.get("display_order") as string) || 0;

    const { error } = await supabase
        .from("faqs")
        .update({
            question,
            answer,
            display_order,
        })
        .eq("id", id);

    if (error) {
        console.error("Error updating FAQ:", error);
        return { error: `Database Error: ${error.message}` };
    }

    revalidatePath("/admin/faqs");
    revalidatePath("/faq");
    return { success: true };
}

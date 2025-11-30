"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getMembers(query?: string, company?: string) {
    const supabase = await createClient();

    let dbQuery = supabase
        .from("members")
        .select("*")
        .select("*")
        .order("display_order", { ascending: true })
        .order("name", { ascending: true });

    if (query) {
        dbQuery = dbQuery.ilike("name", `%${query}%`);
    }

    if (company && company !== "all") {
        dbQuery = dbQuery.eq("company", company);
    }

    const { data, error } = await dbQuery;

    if (error) {
        console.error("Error fetching members:", error);
        return [];
    }

    return data;
}

export async function addMember(formData: FormData) {
    const supabase = await createClient();
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const display_order = parseInt(formData.get("display_order") as string) || 0;
    const imageFile = formData.get("image") as File;

    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
        try {
            // Sanitize filename: use timestamp + random string + extension
            const extension = imageFile.name.split('.').pop() || 'png';
            const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
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
            console.error("Failed to upload member image:", imageError);
        }
    }

    const { error } = await supabase.from("members").insert({
        name,
        role,
        company: formData.get("company") as string,
        display_order,
        image_url: imageUrl,
    });

    if (error) {
        console.error("Error adding member:", error);
        throw new Error("Failed to add member");
    }

    revalidatePath("/admin/members");
    revalidatePath("/");
}

export async function getMember(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching member:", error);
        return null;
    }

    return data;
}

export async function updateMember(id: string, formData: FormData) {
    const supabase = await createClient();
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const company = formData.get("company") as string;
    const display_order = parseInt(formData.get("display_order") as string) || 0;
    const imageFile = formData.get("image") as File;

    const updates: any = {
        name,
        role,
        company,
        display_order,
    };

    if (imageFile && imageFile.size > 0) {
        try {
            // Sanitize filename: use timestamp + random string + extension
            const extension = imageFile.name.split('.').pop() || 'png';
            const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
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
            console.error("Failed to upload member image:", imageError);
        }
    }

    const { error } = await supabase
        .from("members")
        .update(updates)
        .eq("id", id);

    if (error) {
        console.error("Error updating member:", error);
        throw new Error(`Failed to update member: ${error.message}`);
    }

    revalidatePath("/admin/members");
    revalidatePath("/");
}

export async function deleteMember(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("members").delete().eq("id", id);

    if (error) {
        console.error("Error deleting member:", error);
        throw new Error("Failed to delete member");
    }

    revalidatePath("/admin/members");
    revalidatePath("/");
}

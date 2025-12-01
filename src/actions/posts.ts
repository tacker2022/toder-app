"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getPosts() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error);
        return [];
    }

    return data;
}

export async function getPostBySlug(slug: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        console.error("Error fetching post:", error);
        return null;
    }

    return data;
}

export async function createPost(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File;

    // Create slug from title
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    let image_url = "";

    if (imageFile && imageFile.size > 0) {
        try {
            const filename = `blog-${Date.now()}-${imageFile.name.replace(/\s/g, "-")}`;
            const { error } = await supabase.storage
                .from("images")
                .upload(filename, imageFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (error) throw error;

            const { data: publicUrlData } = supabase.storage
                .from("images")
                .getPublicUrl(filename);

            image_url = publicUrlData.publicUrl;
        } catch (imageError) {
            console.error("Failed to upload blog image:", imageError);
        }
    }

    const { error } = await supabase.from("posts").insert({
        title,
        slug,
        content,
        image_url,
        published: true
    });

    if (error) {
        console.error("Error creating post:", error);
        throw new Error(`Failed to create post: ${error.message}`);
    }

    revalidatePath("/blog");
    revalidatePath("/admin/posts");
    revalidatePath("/");
    revalidatePath("/blog");

    return { success: true };
}

export async function updatePost(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File;

    const updates: any = {
        title,
        content,
        // Update slug if title changed? Maybe better to keep slug stable or update it.
        // Let's update it for now to keep it in sync.
        slug: title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, ""),
    };

    if (imageFile && imageFile.size > 0) {
        // Upload new image
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `blog/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from("images")
            .upload(filePath, imageFile);

        if (uploadError) {
            console.error("Error uploading image:", uploadError);
            return { error: "Görsel yüklenirken hata oluştu." };
        }

        const { data: { publicUrl } } = supabase.storage
            .from("images")
            .getPublicUrl(filePath);

        updates.image_url = publicUrl;
    }

    const { error } = await supabase
        .from("posts")
        .update(updates)
        .eq("id", id);

    if (error) {
        console.error("Error updating post:", error);
        return { error: `Database Error: ${error.message}` };
    }

    revalidatePath("/admin/posts");
    revalidatePath("/");
    revalidatePath("/blog");

    return { success: true };
}

export async function deletePost(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
        console.error("Error deleting post:", error);
        throw new Error(error.message);
    }

    revalidatePath("/admin/posts");
    revalidatePath("/");
    revalidatePath("/blog");
}

export async function getPostById(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching post:", error);
        return null;
    }

    return data;
}

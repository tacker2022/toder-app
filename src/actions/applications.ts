"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitApplication(formData: FormData) {
    const supabase = await createClient();

    const full_name = formData.get("full_name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const message = formData.get("message") as string;

    const { error } = await supabase.from("applications").insert({
        full_name,
        email,
        phone,
        company,
        message,
        status: "pending"
    });

    if (error) {
        console.error("Error submitting application:", error);
        throw new Error(`Failed to submit application: ${error.message}`);
    }

    revalidatePath("/admin/applications");
}

export async function getApplications() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching applications:", error);
        return [];
    }

    return data;
}

export async function updateApplicationStatus(id: string, status: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("applications")
        .update({ status })
        .eq("id", id);

    if (error) {
        console.error("Error updating application status:", error);
        throw new Error("Failed to update status");
    }

    revalidatePath("/admin/applications");
}

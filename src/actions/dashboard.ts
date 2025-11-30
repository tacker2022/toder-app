"use server";

import { createClient } from "@/utils/supabase/server";

export async function getDashboardStats() {
    const supabase = await createClient();

    const [
        { count: membersCount },
        { count: eventsCount },
        { count: pendingApplicationsCount },
        { count: totalApplicationsCount }
    ] = await Promise.all([
        supabase.from("members").select("*", { count: "exact", head: true }),
        supabase.from("events").select("*", { count: "exact", head: true }),
        supabase.from("applications").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("applications").select("*", { count: "exact", head: true })
    ]);

    return {
        membersCount: membersCount || 0,
        eventsCount: eventsCount || 0,
        pendingApplicationsCount: pendingApplicationsCount || 0,
        totalApplicationsCount: totalApplicationsCount || 0
    };
}

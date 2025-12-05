import { createClient } from "@/utils/supabase/server";

export const dynamic = 'force-dynamic';

export default async function DebugPage() {
    const supabase = await createClient();
    const { data: events } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="p-8 bg-black min-h-screen text-white font-mono text-sm">
            <h1 className="text-2xl font-bold mb-4 text-[#D4AF37]">Debug Images</h1>
            <p className="mb-4 text-gray-400">Bu sayfa veritabanındaki ham verileri gösterir. Eğer burada URL varsa ama sitede yoksa, sorun önbellektir.</p>

            <div className="space-y-8">
                {events?.map((event: any) => (
                    <div key={event.id} className="border border-white/20 p-4 rounded-lg bg-white/5">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg">{event.title}</h3>
                            <span className="text-xs text-gray-500">{new Date(event.created_at).toLocaleDateString()}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <h4 className="text-blue-400 font-bold mb-1">Ana Resim (image_url)</h4>
                                <div className="break-all text-xs mb-2 text-white/70">{event.image_url || "BOŞ (NULL)"}</div>
                                {event.image_url ? (
                                    <img src={event.image_url} className="h-32 object-contain border border-white/30 bg-black" />
                                ) : (
                                    <div className="h-32 flex items-center justify-center border border-dashed border-white/20 text-red-500">RESİM YOK</div>
                                )}
                            </div>

                            <div>
                                <h4 className="text-green-400 font-bold mb-1">Liste Resmi (list_image_url)</h4>
                                <div className="break-all text-xs mb-2 text-white/70">{event.list_image_url || "BOŞ (NULL)"}</div>
                                {event.list_image_url ? (
                                    <img src={event.list_image_url} className="h-32 object-contain border border-white/30 bg-black" />
                                ) : (
                                    <div className="h-32 flex items-center justify-center border border-dashed border-white/20 text-red-500">RESİM YOK</div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

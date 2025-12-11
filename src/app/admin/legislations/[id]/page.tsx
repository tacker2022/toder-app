import { getLegislation } from "@/actions/legislations";
import EditLegislationForm from "./EditForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditLegislationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let legislation = null;
    let debugError = null;

    try {
        legislation = await getLegislation(id);
    } catch (err: any) {
        debugError = err.message || err;
    }

    if (!legislation) {
        // Debug mode: Show why it failed instead of 404
        return (
            <div className="p-8 text-white">
                <h1 className="text-2xl font-bold text-red-500 mb-4">Debug: Kayıt Bulunamadı</h1>
                <p><strong>Aranan ID:</strong> {id}</p>
                <div className="mt-4 p-4 bg-gray-900 rounded border border-gray-700">
                    <p className="text-yellow-400">Veritabanından dönen hata veya boş sonuç:</p>
                    <pre className="mt-2 text-xs overflow-auto">
                        {debugError ? JSON.stringify(debugError, null, 2) : "Legislation is null (No error thrown, just no data)"}
                    </pre>
                </div>
                <div className="mt-4">
                    <p>Lütfen bu ekranın görüntüsünü geliştiriciye iletin.</p>
                </div>
            </div>
        );
        // notFound();
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <EditLegislationForm legislation={legislation} />
        </div>
    );
}

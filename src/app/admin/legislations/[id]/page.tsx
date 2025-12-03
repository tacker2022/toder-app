import { getLegislation } from "@/actions/legislations";
import EditLegislationForm from "./EditForm";
import { notFound } from "next/navigation";

export default async function EditLegislationPage({ params }: { params: { id: string } }) {
    const legislation = await getLegislation(params.id);

    if (!legislation) {
        notFound();
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <EditLegislationForm legislation={legislation} />
        </div>
    );
}

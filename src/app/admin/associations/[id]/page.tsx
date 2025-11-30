import { getAssociation } from "@/actions/associations";
import { redirect } from "next/navigation";
import EditAssociationForm from "./EditForm";

export default async function EditAssociationPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const association = await getAssociation(id);

    if (!association) {
        redirect("/admin/associations");
    }

    return <EditAssociationForm association={association} />;
}

import { getFAQ, updateFAQ } from "@/actions/faqs";
import EditFAQForm from "./EditForm";
import { notFound } from "next/navigation";

export default async function EditFAQPage({ params }: { params: { id: string } }) {
    const faq = await getFAQ(params.id);

    if (!faq) {
        notFound();
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <EditFAQForm faq={faq} />
        </div>
    );
}

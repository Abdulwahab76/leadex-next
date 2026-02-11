import { getTermsContent, TermsContent } from "@/lib/mainPages";


export const metadata = {
    title: "BodenLink Terms & Conditions",
    description:
        "Read BodenLink's Terms & Conditions for product use, website access, and legal guidelines.",
};

interface TermsPageProps {
    params?: any;
}

export default async function TermsPage({ }: TermsPageProps) {
    const data: TermsContent | null = await getTermsContent();

    if (!data)
        return (
            <div className="p-6 text-center text-gray-500">
                Terms & Conditions not found
            </div>
        );
    console.log(data);

    return (
        <section aria-labelledby="terms-heading" className="min-h-full wrapper py-10">
            <div className="mb-6">
                <h1 id="terms-heading" className="text-2xl font-medium text-gray-800">
                    {data.termsTitle}
                </h1>
            </div>
            <div className="mb-6">
                <p id="terms-heading" className="font-normal text-gray-800">
                    Effective Date: {data.date}
                </p>
            </div>
            <article className="w-full space-y-4 text-sm text-gray-700">
                <p>{data.termsIntro}</p>

                {data.sections.map((section, index) => (
                    <div key={index} className="space-y-2">
                        <h2 className="font-medium mt-4 text-gray-800">{section.title}</h2>
                        {section.paragraphs.map((p, i) => (
                            <p key={i} className="text-gray-700">
                                {p}
                            </p>
                        ))}
                    </div>
                ))}
            </article>
        </section>
    );
}

import FeaturesSection from "@/Components/FeatureSection";
import { getAboutContent } from "@/lib/mainPages";

export const metadata = {
    title: "About BodenLink - High-Performance Roofing Solutions",
    description:
        "Learn about BodenLink, a leading manufacturer of professional roofing and waterproofing solutions, committed to durability, safety, and innovation.",
};

export default async function AboutPage() {
    const data = await getAboutContent();
    console.log(data);


    if (!data) return <div className="p-6">About page content not found</div>;

    return (
        <div>
            <FeaturesSection />

            <section
                aria-labelledby="about-us-heading"
                className="min-h-full wrapper py-10"
            >
                <div className="mb-6">
                    <h1 id="about-us-heading" className="text-2xl font-medium">
                        {data.aboutTitle}
                    </h1>
                </div>

                <article className="w-full space-y-4 text-sm text-gray-700">
                    {/* Intro */}
                    <p>{data.aboutIntro}</p>

                    {/* Sections from Firestore */}
                    {data.sections.map((section, idx) => (
                        <div key={idx} className="mt-6">
                            <h2 className="font-medium mt-4">{section.title}</h2>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                {section.paragraphs.map((para, pIdx) => (
                                    <li key={pIdx}>{para}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </article>
            </section>
        </div>
    );
}

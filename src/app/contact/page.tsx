import FeaturesSection from "@/Components/FeatureSection";
import ContactForm from "./contactForm";
import { getContactContent } from "@/lib/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | BodenLink",
    description:
        "Contact BodenLink. Address, phone, and enquiry form for stockists and customers.",
};

export default async function ContactPage() {
    const contactData = await getContactContent();

    if (!contactData) {
        return (
            <section className="wrapper py-8">
                <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
                <p className="text-gray-500">Contact information is currently unavailable.</p>
            </section>
        );
    }

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        name: contactData.title,
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: contactData.address,
                            addressLocality: "Banksmeadow", // optional, could store in Firestore later
                            addressRegion: "NSW",
                            postalCode: contactData.postal.split(",").pop()?.trim() ?? "",
                            addressCountry: "AU",
                        },
                        telephone: contactData.phone,
                    }),
                }}
            />

            <FeaturesSection />

            <section className="wrapper py-8">
                <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Client-only form */}
                    <ContactForm />

                    {/* Server-rendered dynamic info */}
                    <div className="flex flex-col gap-y-2 items-start">
                        <h2 className="text-lg font-medium">{contactData.title}</h2>

                        <p className="text-sm text-gray-700 mb-2">Address: {contactData.address}</p>
                        <p className="text-sm text-gray-700 mb-2">Postal: {contactData.postal}</p>
                        <p className="text-sm text-gray-700 mb-2">Phone: {contactData.phone}</p>
                        <p className="text-sm text-gray-700 mb-6">Fax: {contactData.fax}</p>

                        <h3 className="text-md font-medium mb-2">{contactData.stockistTitle}</h3>
                        <p className="text-sm text-gray-600 mb-4">{contactData.stockistPara}</p>

                        <button className="border text-xs border-primary-500 rounded-full px-4 py-2 cursor-pointer bg-primary-500 text-white transition-colors delay-75">
                            {contactData.stockistButton || "Enquire about stockist opportunities"}
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

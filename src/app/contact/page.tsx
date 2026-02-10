import FeaturesSection from "@/Components/FeatureSection";
import ContactForm from "./contactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | BodenLink",
    description:
        "Contact BodenLink. Address, phone, and enquiry form for stockists and customers.",
};

export default function ContactPage() {
    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        name: "BodenLink",
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: "Unit 5/73 Beauchamp Road",
                            addressLocality: "Banksmeadow",
                            addressRegion: "NSW",
                            postalCode: "2019",
                            addressCountry: "AU",
                        },
                        telephone: "02 9666 1069",
                    }),
                }}
            />
            <FeaturesSection
            />
            <section className="wrapper py-8">
                <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Client-only form */}
                    <ContactForm />
                    {/* Server-rendered static info */}
                    <div className="flex flex-col gap-y-2 items-start">
                        <h2 className="text-lg font-medium  ">
                            BodenLink
                        </h2>

                        <p className="text-sm text-gray-700 mb-2">
                            Address: Unit 5/73 Beauchamp Road, Banksmeadow NSW 2019
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                            Postal: P.O. Box 96, Matraville NSW 2036
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                            Phone: 02 9666 1069
                        </p>
                        <p className="text-sm text-gray-700 mb-6">
                            Fax: 02 9666 1870
                        </p>

                        <h3 className="text-md font-medium mb-2">Become a Stockist</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Interested in becoming a stockist of our products? Click below to
                            enquire and our team will get back to you.
                        </p>

                        <button className="border text-xs border-primary-500  rounded-full   px-4 py-2    cursor-pointer  bg-primary-500 text-white transition-colors delay-75">
                            Become a Stockist
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

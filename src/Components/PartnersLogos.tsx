import Image from "next/image";
import { LandingPageHero } from "@/lib/mainPages";

interface PartnersLogosProps {
    heroData: LandingPageHero;
}

export default function PartnersLogos({ heroData }: PartnersLogosProps) {
    const {
        partnerLogos = [],
        distributorLogos = [],
        distributorHeading,
        partnerHeading,
    } = heroData;

    const filteredPartnerLogos = partnerLogos.filter(
        (logo) => logo && logo.trim() !== ""
    );

    const filteredDistributorLogos = distributorLogos.filter(
        (logo) => logo && logo.trim() !== ""
    );

    return (
        <section className="bg-light-background py-16">
            <div className="wrapper">

                {/* ================= PARTNERS ================= */}
                {partnerHeading && (
                    <h2 className="mb-10 text-2xl lg:text-3xl font-medium text-black">
                        {partnerHeading}
                    </h2>
                )}

                {filteredPartnerLogos.length > 0 && (
                    <ul className="flex flex-wrap items-center gap-6 mb-10">
                        {filteredPartnerLogos.map((logo, index) => (
                            <li key={index} className="relative h-10 w-4/12 lg:w-28">
                                <Image
                                    src={logo}
                                    alt="Partner logo"
                                    fill
                                    className="object-contain"
                                />
                            </li>
                        ))}
                    </ul>
                )}

                {/* ================= DISTRIBUTORS ================= */}
                {distributorHeading && (
                    <h2 className="mb-8 text-2xl lg:text-3xl font-medium text-black">
                        {distributorHeading}
                    </h2>
                )}

                {filteredDistributorLogos.length > 0 && (
                    <ul className="flex flex-wrap items-center gap-6">
                        {filteredDistributorLogos.map((logo, index) => (
                            <li key={index} className="relative h-10 w-32">
                                <Image
                                    src={logo}
                                    alt="Distributor logo"
                                    fill
                                    className="object-contain"
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

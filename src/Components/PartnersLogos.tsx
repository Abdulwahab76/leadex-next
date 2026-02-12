import Image from "next/image";
import { LandingPageHero } from "@/lib/mainPages";

interface PartnersLogosProps {
    heroData: LandingPageHero;
}

export default function PartnersLogos({ heroData }: PartnersLogosProps) {
    const { companyLogos = [], distributorHeading, partnerHeading } = heroData;

    // Filter out any empty logos
    const filteredLogos = companyLogos.filter((logo) => logo && logo.trim() !== "");

    return (
        <section className="bg-light-background py-16">
            <div className="mx-auto max-w-7xl w-11/12 px-2 lg:px-0 lg:w-10/12">
                {/* Partner Heading */}
                {partnerHeading && (
                    <h2 className="mb-10 text-2xl lg:text-3xl font-medium text-black">
                        {partnerHeading}
                    </h2>
                )}

                {/* Global Partners Logos */}
                <ul className="flex flex-wrap items-center gap-x-19 lg:gap-x-14 gap-y-10">
                    {filteredLogos.map((logo, index) => (
                        <li key={index} className="relative h-10 w-4/12 lg:w-28">
                            <Image src={logo} alt="Partner logo" fill className="object-contain" />
                        </li>
                    ))}
                </ul>

                {/* Divider spacing */}
                <div className="h-20" />

                {/* Distributor Heading */}
                {distributorHeading && (
                    <h2 className="mb-8 text-2xl lg:text-3xl font-medium text-black">
                        {distributorHeading}
                    </h2>
                )}

                {/* Show only first logo as distributor */}
                {filteredLogos[0] && (
                    <div className="relative h-10 w-32">
                        <Image
                            src={filteredLogos[0]}
                            alt="Distributor logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

import Image from "next/image";

export default function PartnersLogos() {
    return (
        <section className=" bg-light-background py-16">
            <div className="mx-auto max-w-7xl   w-11/12 px-2 lg:px-0 lg:w-10/12">
                <h2 className="mb-10 text-2xl lg:text-3xl font-medium text-black">
                    Some of our global Flashing partners
                </h2>

                {/* Global Partners Logos */}
                <ul className="flex flex-wrap items-center gap-x-19 lg:gap-x-14 gap-y-10">
                    {[
                        "/images/logo-1.webp",
                        "/images/logo-2.webp",
                        "/images/logo-3.webp",
                        "/images/logo-4.png",
                        "/images/logo-5.webp",
                        "/images/logo-6.webp",
                        "/images/logo-7.webp",
                    ].map((logo, index) => (
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

                {/* Divider spacing */}
                <div className="h-20" />

                {/* Heading 2 */}
                <h2 className="mb-8 text-2xl lg:text-3xl font-medium text-black">
                    Our main European Leadax Roof distributor
                </h2>

                {/* Distributor Logo */}
                <div className="relative h-10 w-32">
                    <Image
                        src="/images/logo-8.png"
                        alt="Wienerberger"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </section>
    );
}

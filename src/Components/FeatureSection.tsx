
import Image from "next/image";
import { JSX } from "react";
type Feature = {
    title: string;
    description: string;
    icon: string;
};


const DEFAULT_FEATURES: Feature[] = [
    {
        title: "Circular",
        description:
            "Made of recycled PVB, the safety foil that’s formerly used in laminated glass.",
        icon: "/icons/circular.webp",
    },
    {
        title: "Longer roll lengths",
        description:
            "With BodenLink Original you don’t need to make an overlap every meter.",
        icon: "/icons/longroll.webp",
    },
    {
        title: "Non-toxic",
        description: "No harmful effect on people and planet.",
        icon: "/icons/award.webp",
    },
    {
        title: "Lightweight",
        description:
            "It weighs 3,85 kg p/m², which is 85% lighter than code 25 lead.",
        icon: "/icons/nontoxic.webp",
    },
];


type Props = {
    features?: Feature[];
    heading?: string;
    background?: string;
};

export default function FeaturesSection({
    features = DEFAULT_FEATURES,
    heading = "Product features",
    background = "bg-gray-100",
}: Props): JSX.Element {
    const columnClass =
        features.length === 3
            ? "lg:grid-cols-3"
            : features.length === 2
                ? "lg:grid-cols-2"
                : "lg:grid-cols-4";

    return (
        <section
            aria-labelledby="features-heading"
            className={`py-10 ${background}`}
        >
            <div className="wrapper">
                {/* Accessible heading */}
                <h2 id="features-heading" className="sr-only">
                    {heading}
                </h2>

                <ul
                    className={`grid gap-8 sm:grid-cols-2 ${columnClass}`}
                >
                    {features.map((feature) => (
                        <li
                            key={feature.title}
                            className="flex flex-col items-center text-center"
                        >
                            {/* Icon */}
                            <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-xl">
                                <Image
                                    src={feature.icon}
                                    alt=""
                                    width={120}
                                    height={120}
                                    className="object-contain"
                                />
                            </div>

                            {/* Title */}
                            <h4 className="text-lg font-medium text-gray-900">
                                {feature.title}
                            </h4>

                            {/* Description */}
                            <p className="mt-3 text-xs lg:font-light w-8/12 leading-relaxed">
                                {feature.description}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}


import Image from "next/image";
import { JSX } from "react";

type Feature = {
    title: string;
    description: string;
    icon: string; // static icon path
};

type Props = {
    features?: { title: string; descp: string }[]; // from Firestore / product
    heading?: string;
    background?: string;
};

const ICON_MAP: Record<string, string> = {
    Circular: "/icons/circular.webp",
    "Longer roll lengths": "/icons/longroll.webp",
    "Non-toxic": "/icons/nontoxic.webp",
    Lightweight: "/icons/award.webp",
};

const DEFAULT_FEATURES: Feature[] = [
    { title: "Circular", description: "Made of recycled PVB, the safety foil that’s formerly used in laminated glass.", icon: "/icons/circular.webp" },
    { title: "Longer roll lengths", description: "With BodenLink Original you don’t need to make an overlap every meter.", icon: "/icons/longroll.webp" },
    { title: "Non-toxic", description: "No harmful effect on people and planet.", icon: "/icons/nontoxic.webp" },
    { title: "Lightweight", description: "It weighs 3,85 kg p/m², which is 85% lighter than code 25 lead.", icon: "/icons/award.webp" },
];

export default function FeaturesSection({
    features,
    heading = "Product features",
    background = "bg-gray-100",
}: Props): JSX.Element {
    // Map Firestore features to icon mapping
    console.log(features, 'feat');

    const mappedFeatures: Feature[] =
        features?.length
            ? features.map(f => ({
                title: f.title,
                description: f.descp || "No description", // fallback
                icon: ICON_MAP[f.title] || "/icons/default.webp", // fallback icon
            }))
            : DEFAULT_FEATURES;

    const columnClass =
        mappedFeatures.length === 3
            ? "lg:grid-cols-3"
            : mappedFeatures.length === 2
                ? "lg:grid-cols-2"
                : "lg:grid-cols-4";

    return (
        <section
            aria-labelledby="features-heading"
            className={`py-10 ${background}`}
        >
            <div className="wrapper">
                <h2 id="features-heading" className="sr-only">
                    {heading}
                </h2>

                <ul className={`grid gap-8 sm:grid-cols-2 ${columnClass}`}>
                    {mappedFeatures.map((feature) => (
                        <li
                            key={feature.title}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-xl">
                                <Image
                                    src={feature.icon}
                                    alt=""
                                    width={120}
                                    height={120}
                                    className="object-contain"
                                />
                            </div>

                            <h4 className="text-lg font-medium text-gray-900">
                                {feature.title}
                            </h4>

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

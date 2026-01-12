import Image from "next/image";
import { JSX } from "react";

type Feature = {
    title: string;
    description: string;
    icon: string;
};

const features: Feature[] = [
    {
        title: "Circular",
        description:
            "After our products lifetime, they can be recycled and reused again as new Leadax products.",
        icon: "/icons/circular.webp",
    },
    {
        title: "Easy to use",
        description:
            "You can quickly and easily apply our products, saving you time and materials.",
        icon: "/icons/easy.webp",
    },
    {
        title: "Award-winning",
        description:
            "Our products are award-winning in the categories innovativeness, circularity and sustainability.",
        icon: "/icons/award.webp",
    },
    {
        title: "Non-toxic",
        description:
            "Leadax’s waterproofing products are not harmful for people and the environment.",
        icon: "/icons/nontoxic.webp",
    },
];

export default function FeaturesSection(): JSX.Element {
    return (
        <section
            aria-labelledby="features-heading"
            className="bg-gray-100 py-11"
        >
            {/* Accessible heading */}
            <h2 id="features-heading" className="sr-only">
                Product features
            </h2>

            <div className="mx-auto max-w-350 w-10/12">
                <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <li
                            key={feature.title}
                            className="flex flex-col items-center text-center"
                        >
                            {/* Icon */}
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl  ">
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
                            <h5 className="mt-3 text-xs lg:text-sm font-normal w-10/12 leading-relaxed ">
                                {feature.description}
                            </h5>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

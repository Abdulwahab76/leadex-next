import Image from "next/image";
import { JSX } from "react";

type Project = {
    title: string;
    description: string;
    image: string;
};

const projects: Project[] = [
    {
        title: "Circular bungalow in Lunteren (NL)",
        description:
            "A sustainable and circular bungalow is fitted with Leadax Roof, probably world’s most sustainable flat roofing material.",
        image: "/images/Lunteren.webp",
    },
    {
        title: "The City crane in Utrecht, reborn",
        description:
            "Leadax Original has become a permanent feature in the Utrecht streetscape in the form of a historic crane.",
        image: "/images/Lunteren.webp",
    },
    {
        title: "Lead replacement used in a cavity wall",
        description:
            "“Leadax Original attaches nicely and well to the roof surface, preventing it from bulging.”",
        image: "/images/Lunteren.webp",
    },
];

export default function GetInspiredSection(): JSX.Element {
    return (
        <section
            aria-labelledby="inspired-heading"
            className="bg-white py-16"
        >
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="mb-12 flex items-center justify-between">
                    <h2
                        id="inspired-heading"
                        className="text-3xl font-bold text-gray-900"
                    >
                        Get inspired
                    </h2>

                    <a
                        href="#"
                        className="text-sm font-medium text-blue-600 hover:underline"
                    >
                        View all projects
                    </a>
                </div>

                {/* Cards */}
                <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <li
                            key={project.title}
                            className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
                        >
                            {/* Image */}
                            <div className="relative h-56 w-full">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {project.title}
                                </h3>

                                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                                    {project.description}
                                </p>

                                <a
                                    href="#"
                                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
                                >
                                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-blue-600 text-xs">
                                        →
                                    </span>
                                    Read more
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

import { Clock2 } from "lucide-react";
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
            className="bg-light-background py-16"
        >
            <div className="mx-auto max-w-350 w-10/12">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <h2
                        id="inspired-heading"
                        className="text-3xl font-medium  "
                    >
                        Get inspired
                    </h2>

                    <a
                        href="#"
                        className="text-xs font-normal text-blue-600 "
                    >
                        View all projects
                    </a>
                </div>

                {/* Cards */}
                <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <li
                            key={project.title}
                            className="flex h-full flex-col overflow-hidden rounded-tr-2xl rounded-tl-2xl bg-white shadow-[0_0_30px_0_rgb(0,0,0,0.16)] transition"
                        >
                            {/* Image */}
                            <div className="relative h-49 w-full">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-1 flex-col px-7 p-6">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {project.title}
                                </h3>

                                <p className="mt-3 text-xs leading-relaxed font-normal">
                                    {project.description}
                                </p>

                                {/* Read more always at bottom */}
                                <a
                                    href="#"
                                    className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-normal text-blue-600 hover:underline"
                                >
                                    <Clock2 className="h-3 w-3 text-gray-400" />
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

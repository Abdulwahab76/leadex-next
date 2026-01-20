'use client'
import { ChevronLeft, ChevronRight, Clock2 } from "lucide-react";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";

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
    const [current, setCurrent] = useState(0);
    const total = projects.length;

    // Auto slide (mobile only)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % total);
        }, 4000);

        return () => clearInterval(interval);
    }, [total]);

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + total) % total);
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % total);
    };

    return (
        <section
            aria-labelledby="inspired-heading"
            className="bg-light-background py-8 lg:py-16"
        >
            <div className="mx-auto  w-11/12 px-2 lg:px-0 lg:w-10/12 max-w-350">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex flex-wrap justify-between w-full">
                        <h2
                            id="inspired-heading"
                            className="text-2xl lg:text-3xl font-medium"
                        >
                            Our Solutions
                        </h2>

                        {/* Desktop link */}
                        <a
                            href="#"
                            className="  text-xs font-normal text-blue-600  "
                        >
                            View all projects
                        </a>
                    </div>


                    {/* Mobile navigation */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <button
                            onClick={prevSlide}
                            aria-label="Previous"
                            className="rounded-full   p-3 hover:bg-gray-100 shadow-[0_0_30px_0_rgb(0,0,0,0.16)] "
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            aria-label="Next"
                            className="rounded-full   p-3 hover:bg-gray-100 bg-white shadow-[0_0_30px_0_rgb(0,0,0,0.16)]"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* MOBILE SLIDER */}
                <div className="relative overflow-hidden lg:hidden">
                    <ul
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {projects.map((project) => (
                            <li
                                key={project.title}
                                className="min-w-full px-1"
                            >
                                <Card project={project} />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* DESKTOP GRID */}
                <ul className="hidden   gap-8 lg:grid-cols-3 lg:grid">
                    {projects.map((project) => (
                        <li key={project.title}>
                            <Card project={project} />
                        </li>
                    ))}
                </ul>

            </div>
        </section>
    );
}


function Card({ project }: any) {
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-tr-2xl rounded-tl-2xl bg-white lg:shadow-[0_0_30px_0_rgb(0,0,0,0.16)]">
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

                <p className="mt-3 text-xs font-normal leading-relaxed">
                    {project.description}
                </p>

                <a
                    href="#"
                    className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-normal text-blue-600 hover:underline"
                >
                    <Clock2 className="h-3 w-3 text-gray-400" />
                    Read more
                </a>
            </div>
        </div>
    );
}


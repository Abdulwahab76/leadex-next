"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";

interface ValleySectionProps {
    title: string;
    description: string;
    sideImage?: string;
    examples?: string[];
}

export default function ValleySection({
    title,
    description,
    sideImage,
    examples = [],
}: ValleySectionProps) {
    // ✅ Remove empty or invalid images
    const validExamples = useMemo(
        () => examples.filter((img) => img && img.trim() !== ""),
        [examples]
    );

    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        if (validExamples.length === 0) return;
        setCurrent((prev) =>
            prev === 0 ? validExamples.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        if (validExamples.length === 0) return;
        setCurrent((prev) =>
            prev === validExamples.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-xl max-w-6xl w-full md:p-20 shadow-none lg:shadow-[0_0_20px_0_rgb(0,0,0,0.16)]">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">

                    {/* Text */}
                    <div className="max-w-155">
                        <h2 className="text-2xl font-medium mb-4">{title}</h2>
                        <p className="text-xs leading-relaxed">{description}</p>
                    </div>

                    {/* Right Image (ONLY if valid) */}
                    {sideImage && sideImage.trim() !== "" && (
                        <div className="shrink-0 md:mt-0 mt-10">
                            <Image
                                src={sideImage}
                                width={200}
                                height={200}
                                alt={title}
                                className="w-full md:w-48 object-contain"
                            />
                        </div>
                    )}
                </div>

                {/* Bottom Section */}
                {validExamples.length > 0 && (
                    <div className="mt-12">
                        <h3 className="text-xl md:text-2xl font-medium mb-8 md:mb-12">
                            Examples of {title.toLowerCase()} applications
                        </h3>

                        {/* Desktop Grid */}
                        <div className="hidden md:grid grid-cols-3 gap-10">
                            {validExamples.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image}
                                    width={400}
                                    height={300}
                                    alt={`Example ${index + 1}`}
                                    className="w-full h-56 object-cover"
                                />
                            ))}
                        </div>

                        {/* Mobile Slider */}
                        <div className="relative md:hidden">
                            <Image
                                src={validExamples[current]}
                                width={400}
                                height={300}
                                alt={`Example ${current + 1}`}
                                className="w-full h-56 object-cover rounded-md"
                            />

                            {validExamples.length > 1 && (
                                <>
                                    <button
                                        onClick={prevSlide}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>

                                    <button
                                        onClick={nextSlide}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

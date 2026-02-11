"use client";

import Image from "next/image";
import ValleySection from "@/Components/VallySection";
import FreeSamplesSection from "@/Components/FreeSamplesSection";
import VideoGridSection from "@/Components/VideoGridSection";
import { Solution, SolutionSection } from "@/hooks/useFetchAllSolutions";

interface SolutionClientProps {
    solution: Solution | null;
}

const isValidImage = (src?: string) =>
    src && src.trim() !== "";

const SolutionClient: React.FC<SolutionClientProps> = ({
    solution,
}) => {
    if (!solution) return <p>Solution not found</p>;

    return (
        <main>

            {/* Hero Section */}
            <section className="relative pt-20 md:py-0 h-[90vh] lg:h-[calc(100vh-140px)] w-full flex justify-center items-center">

                {isValidImage(solution.background_image) && (
                    <Image
                        src={solution.background_image.trim()}
                        alt={solution.name}
                        fill
                        priority
                        className="object-cover"
                    />
                )}

                <div className="relative z-10 flex h-full pt-14 lg:pt-30 wrapper flex-col gap-y-5 md:gap-y-3 text-white">
                    <h1 className="max-w-2xl text-[27px] leading-tight md:leading-11 font-bold text-shadow-[3px_2px_5px_#000000] md:text-4xl">
                        {solution.name}
                    </h1>
                    <p className="font-normal text-xl lg:text-lg lg:font-light tracking-wider">
                        {solution.heroPara}
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="wrapper pt-20">
                <div className="flex flex-col gap-y-3">
                    <h2 className="font-medium text-2xl md:text-3xl">
                        {solution.contentHeading}
                    </h2>

                    <p className="font-normal text-xs lg:text-sm lg:font-light">
                        {solution.contentPara}
                    </p>

                    {isValidImage(solution.contentImg) && (
                        <div className="relative w-full aspect-video mt-20">
                            <Image
                                src={solution.contentImg.trim()}
                                alt={solution.contentHeading}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 900px"
                            />
                        </div>
                    )}
                </div>

                {/* Valley Sections */}
                <div className="py-20 flex flex-col gap-y-12 md:gap-y-16">
                    <h2 className="font-medium text-2xl md:text-3xl">
                        Successfully apply {solution.name}
                    </h2>

                    {solution.solutionSections &&
                        Object.values(solution.solutionSections).map(
                            (section: SolutionSection, idx) => {
                                const validImgs =
                                    section?.imgs?.filter(
                                        (img) => img && img.trim() !== ""
                                    ) || [];

                                return (
                                    <ValleySection
                                        key={idx}
                                        title={section.title}
                                        description={section.descp}
                                        sideImage={
                                            validImgs[0] || "/placeholder-image.png"
                                        }
                                        examples={validImgs.slice(1)}
                                    />
                                );
                            }
                        )}
                </div>
            </section>

            {/* Videos */}
            <div>
                <VideoGridSection
                    items={
                        solution.videos
                            ? Object.entries(solution.videos)
                                .filter(([, url]) => url && url.trim() !== "")
                                .map(([id, url]) => ({
                                    id,
                                    type: "video",
                                    url,
                                }))
                            : []
                    }
                />
                <FreeSamplesSection />
            </div>
        </main>
    );
};

export default SolutionClient;

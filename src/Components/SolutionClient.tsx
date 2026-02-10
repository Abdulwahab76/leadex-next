'use client';

import Image from "next/image";
import ValleySection from "@/Components/VallySection";
import FreeSamplesSection from "@/Components/FreeSamplesSection";
import VideoGridSection from "@/Components/VideoGridSection";
import { Solution, SolutionSection } from "@/hooks/useFetchAllSolutions";

interface SolutionClientProps {
    solution: Solution | null;
}

const SolutionClient: React.FC<SolutionClientProps> = ({ solution }) => {
    if (!solution) return <p>Solution not found</p>;
console.log(solution,'solt');

    return (
        <main>
            {/* Hero Section */}
            <section className="relative pt-20 md:py-0 h-[90vh] lg:h-[calc(100vh-140px)] w-full flex justify-center items-center">
                <Image
                    src={solution.background_image}
                    alt={solution.name}
                    fill
                    priority
                    className="object-cover"
                />
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
                    <h2 className="font-medium text-2xl md:text-3xl">{solution.contentHeading}</h2>
                    <p className="font-normal text-xs lg:text-sm lg:font-light">{solution.contentPara}</p>
                    <div className="relative w-full aspect-video mt-20">
                        <Image
                            src={solution.contentImg}
                            alt={solution.contentHeading}
                            priority
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 900px"
                        />
                    </div>
                </div>

                {/* Valley / Application Sections */}
                <div className="py-20 flex flex-col gap-y-12 md:gap-y-16">
                    <h2 className="font-medium text-2xl md:text-3xl">Successfully apply {solution.name}</h2>
                    {Object.values(solution.solutionSections).map((section: SolutionSection, idx) => (
                        <ValleySection
                            key={idx}
                            title={section.title}
                            description={section.descp}
                            sideImage={section.imgs[0]}
                            examples={section.imgs.slice(1)}
                        />
                    ))}
                </div>
            </section>

            {/* Other Sections */}
            <div>
                <VideoGridSection
                    items={[
                        { id: "1", type: "video" },
                        { id: "2", type: "error" },
                        { id: "3", type: "video" },
                        { id: "4", type: "video" },
                    ]}
                />
                <FreeSamplesSection />
            </div>
        </main>
    );
};

export default SolutionClient;

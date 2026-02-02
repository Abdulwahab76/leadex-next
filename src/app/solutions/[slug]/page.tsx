// import DocumentsForm from "@/Components/DocumentsForm"
import FreeSamplesSection from "@/Components/FreeSamplesSection"
import ValleySection from "@/Components/VallySection"
import VideoGridSection from "@/Components/VideoGridSection"
import Image from "next/image"

const Solution = () => {
    return (
        <main>
            <section className="relative  pt-20 md:py-0 h-[90vh] lg:h-[100vh-140px] w-full   flex   justify-center items-center">
                {/* Background Image */}
                <Image
                    src="/solution-slider.webp"
                    alt="Sustainable roofing"
                    fill
                    priority
                    className="object-cover"
                />

                {/* Overlay (optional dark layer for readability) */}

                {/* Content */}
                <div className=" relative z-10 flex h-full pt-14 lg:pt-30  wrapper flex-col   gap-y-5 md:gap-y-3   text-white">
                    <h1 className="max-w-2xl text-[27px] leading-tight md:leading-11 font-bold text-shadow-[3px_2px_5px_#000000] md:text-4xl">
                        Applications Leadax Flashing Original
                    </h1>

                    <p className="  font-normal text-xl lg:text-lg lg:font-light tracking-wider">
                        The circular high-quality lead replacement with the look and feel of traditional lead
                    </p>

                </div>
            </section>

            {/* Leadax Original  */}
            <section className="wrapper pt-20">
                <div className="flex flex-col gap-y-3">
                    <h2 className=" font-medium  text-2xl md:text-3xl">
                        Leadax Original can be used on many applications
                    </h2>
                    <p className="font-normal text-xs  lg:text-sm lg:font-light  ">Click on a number to read more about the most commonly used applications of Leadax Original.
                    </p>
                    <div className="relative w-full aspect-video mt-20 ">
                        <Image
                            src="/images/Toepassing-Leadax-Flashing.webp"
                            alt="Sustainable roofing"
                            priority
                            fill
                            sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 1024px) 90vw,
                        900px
                      "
                        />
                    </div>
                </div>

                <div className="py-20 flex flex-col gap-y-12 md:gap-y-16">
                    <h2 className=" font-medium text-2xl   md:text-3xl">
                        Successfully apply Leadax Original
                    </h2>

                    <ValleySection
                        title="Valley"
                        description="Lead covering is a perfect alternative if your valley gutter. One of the advantages lead’s replacement has over using zinc is its natural produced patina formed in the weathering process. This means that the production complies with European Regulation. In addition lead valleys give a 60–100 year lifespan, which means that you have to make fewer replacements. This saves time and cost."
                        sideImage="/images/valley-3.webp"
                        examples={[
                            "/images/valley-1.webp",
                            "/images/valley-2.webp",
                            "/images/valley-3.webp",
                        ]}
                    />
                    <ValleySection
                        title="Chimney"
                        description="Lead covering is a perfect alternative if your valley gutter. One of the advantages lead’s replacement has over using zinc is its natural produced patina formed in the weathering process. This means that the production complies with European Regulation. In addition lead valleys give a 60–100 year lifespan, which means that you have to make fewer replacements. This saves time and cost."
                        sideImage="/images/valley-3.webp"
                        examples={[
                            "/images/valley-1.webp",
                            "/images/valley-2.webp",
                            "/images/valley-3.webp",
                        ]}
                    />
                    <ValleySection
                        title="Dormer"
                        description="Lead covering is a perfect alternative if your valley gutter. One of the advantages lead’s replacement has over using zinc is its natural produced patina formed in the weathering process. This means that the production complies with European Regulation. In addition lead valleys give a 60–100 year lifespan, which means that you have to make fewer replacements. This saves time and cost."
                        sideImage="/images/valley-3.webp"
                        examples={[
                            "/images/valley-1.webp",
                            "/images/valley-2.webp",
                            "/images/valley-3.webp",
                        ]}
                    />

                    <ValleySection
                        title="Cavity walls and window frames"
                        description="Lead covering is a perfect alternative if your valley gutter. One of the advantages lead’s replacement has over using zinc is its natural produced patina formed in the weathering process. This means that the production complies with European Regulation. In addition lead valleys give a 60–100 year lifespan, which means that you have to make fewer replacements. This saves time and cost."
                        sideImage="/images/valley-3.webp"
                        examples={[
                            "/images/valley-1.webp",
                            "/images/valley-2.webp",
                            "/images/valley-3.webp",
                        ]}
                    />
                </div>
            </section>
            <div>
                <VideoGridSection
                    items={[
                        { id: "1", type: "video" },
                        { id: "2", type: "error" },
                        { id: "3", type: "video" },
                        { id: "4", type: "video" },
                    ]}
                />
                {/* <DocumentsForm /> */}
                <FreeSamplesSection />

            </div>
        </main>
    )
}

export default Solution
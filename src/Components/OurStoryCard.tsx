import Image from "next/image";

export default function OurStoryCard() {
    return (
        <section className=" bg-light-background py-8 lg:py-16">
            <div className="mx-auto max-w-7xl    w-11/12 px-2 lg:px-0 lg:w-10/12">
                <div className="flex items-center flex-col lg:flex-row gap-10 rounded-2xl lg:p-16 lg:py-10 lg:bg-white   lg:shadow-[0_0_30px_0_rgb(0,0,0,0.16)]">

                    {/* Text Content */}
                    <div className="flex flex-col lg:flex-5/12">
                        <h2 className="text-2xl lg:text-3xl  font-medium tracking-tight ">
                            Our story
                        </h2>

                        <p className="mt-4 text-xs leading-relaxed font-light  ">
                            Using today’s waste to prevent global waste forever: that is our mission.
                            Therefore we are committed to the United Nations Sustainable Development Goals.
                            With our circular and sustainable waterproofing products we are on a mission
                            to change the world for the better.
                        </p>

                        <p className="mt-4 text-xs leading-relaxed font-light">
                            What started as an idea, quickly developed into the circular products we make
                            today. We work towards a global impact in reduction of CO2 emissions, an
                            increase of autonomy of fossil resources, a large reduction of waste and
                            creating jobs worldwide in the Cleantech area, together with our worldwide
                            partners.
                        </p>

                        <button className="mt-6 w-fit shadow-[0_0_10px_0_rgb(0,0,0,0.16)] rounded-full border border-gray-300   px-5 cursor-pointer py-3 text-xs font-normal  transition  bg-gray-100">
                            Read more
                        </button>
                    </div>

                    {/* Image */}
                    <div className="relative mx-auto h-60 w-full max-w-md sm:h-72 lg:h-80 flex lg:flex-1">
                        <Image
                            src="/images/Leadax-kantoor.jpg"
                            alt="Company illustration"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>

        </section>
    );
}

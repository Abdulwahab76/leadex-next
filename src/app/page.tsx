import FeaturesSection from "@/Components/FeatureSection";
import FreeSamplesSection from "@/Components/FreeSamplesSection";
import GetInspiredSection from "@/Components/GetInspiredSection";
import OurStoryCard from "@/Components/OurStoryCard";
import PartnersLogos from "@/Components/PartnersLogos";
import ProductsSection from "@/Components/ProductsSection";
import Image from "next/image";

export default function Home() {
  return (
    <main  >
      <section className="relative h-[82vh] lg:h-[73vh] w-full">
        {/* Background Image */}
        <Image
          src="/slider-bg.webp"
          alt="Sustainable roofing"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay (optional dark layer for readability) */}

        {/* Content */}
        <div className=" relative z-10 flex h-full   max-w-350 w-11/12 px-2 lg:px-0 lg:w-10/12 mx-auto flex-col justify-center gap-y-4   text-white">
          <h1 className="max-w-2xl text-[27px] leading-tight font-bold text-shadow-black  text-shadow-[3px_1px_7px_#000000] md:text-4xl">
            The revolutionary sustainable roofing
            and lead replacement
          </h1>

          <p className="  font-normal text-2xl lg:text-lg lg:font-extralight ">
            Circular waterproofing products that are easy to apply
          </p>

          <button className="bg-primary-600 hover:bg-primary-400 text-white font-light py-2.5 px-4 text-xs rounded-full transition w-fit"
          >
            Free Samples
          </button>
        </div>
      </section>

      <FeaturesSection />
      <ProductsSection />
      <OurStoryCard />
      <GetInspiredSection />
      <PartnersLogos />
      <FreeSamplesSection />
    </main>
  );
}

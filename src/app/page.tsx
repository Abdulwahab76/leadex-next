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
      <section className="relative h-[82.5vh] lg:h-[74vh] w-full  flex justify-center items-center">
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
        <div className=" relative z-10 flex h-full pt-14 lg:pt-30  max-w-350 w-11/12 px-2 lg:px-0 lg:w-10/12 mx-auto flex-col   gap-y-3   text-white">
          <h1 className="max-w-2xl text-[27px] leading-11 font-bold text-shadow-[3px_2px_5px_#000000] md:text-4xl">
            The revolutionary sustainable roofing
            and lead replacement
          </h1>

          <p className="  font-normal text-2xl lg:text-lg lg:font-light tracking-wider">
            Circular waterproofing products that are easy to apply
          </p>

          <button className="bg-primary-600 w-27.5 mt-1 hover:bg-primary-400 text-white font-light py-2.5   text-xs rounded-full transition  "
          >
            Free Samples
          </button>
        </div>
      </section>
      <GetInspiredSection />
      {/* <FeaturesSection /> */}
      <ProductsSection />
      {/* <OurStoryCard /> */}
      <PartnersLogos />
      <FreeSamplesSection />
    </main>
  );
}

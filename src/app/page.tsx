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
      <section className="relative h-[90vh] w-full flex items-center">
        {/* Background Image */}
        <Image
          src="/images/hero.jpeg"
          alt="Sustainable roofing"
          fill
          priority
          className="object-cover"
        />

        {/* Optional dark overlay (recommended for readability like reference image) */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Content */}
        <div className="relative z-10 wrapper w-full     text-white text-center">
          <h1
            className="
        max-w-3xl
        font-extrabold
        text-[28px]
        leading-tight
        md:text-4xl
        lg:text-5xl
        xl:text-6xl
        drop-shadow-[3px_3px_6px_rgba(0,0,0,0.85)]
        text-center
        mx-auto
      "
          >
            THE FUTURE OF HIGH PERFORMANCE MATERIALS

          </h1>

          <p
            className="
        mt-3
        
        text-sm
        sm:text-base
        lg:text-lg
        font-light
        tracking-wide
        drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]
      "
          >
            Circular waterproofing products that are easy to apply
          </p>

          <button
            className="
        mt-6
        inline-flex
        items-center
        justify-center
        rounded-full
        bg-primary-600
        px-6
        py-3
        text-xs
      font-normal
        tracking-wider
        transition
        hover:bg-primary-500
        shadow-lg
    cursor-pointer
      "
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

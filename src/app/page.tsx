import FeaturesSection from "@/Components/FeatureSection";
import FreeSamplesSection from "@/Components/FreeSamplesSection";
import GetInspiredSection from "@/Components/GetInspiredSection";
import ProductsSection from "@/Components/ProductsSection";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="relative h-[72vh] w-full">
        {/* Background Image */}
        <Image
          src="/slider-bg.webp"
          alt="Sustainable roofing"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay (optional dark layer for readability) */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div className=" relative z-10 flex h-full  max-w-7xl mx-auto flex-col justify-center   text-white">
          <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
            The revolutionary sustainable roofing
            and lead replacement
          </h1>

          <p className="mt-4  text-lg text-white/90">
            Circular waterproofing products that are easy to apply
          </p>

          <button className="mt-8 w-fit rounded-full cursor-pointer bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500 transition">
            Free Samples
          </button>
        </div>
      </section>

      <FeaturesSection />
      <ProductsSection />
      <FreeSamplesSection />
      <GetInspiredSection />
    </main>
  );
}

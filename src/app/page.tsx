// import FeaturesSection from "@/Components/FeatureSection";
import FreeSamplesSection from "@/Components/FreeSamplesSection";
import GetInspiredSection from "@/Components/GetInspiredSection";
// import OurStoryCard from "@/Components/OurStoryCard";
import PartnersLogos from "@/Components/PartnersLogos";
import ProductsSection from "@/Components/ProductsSection";
import Image from "next/image";
import { montserratHero } from "@/app/font";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className={`relative h-[90vh] w-full flex items-center justify-center overflow-hidden     ${montserratHero.className}
` }>

        {/* Background Image */}
        <Image
          src="/images/hero.jpeg"
          alt="High performance materials"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay – reference accurate */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center text-white text-center translate-y-[2vh] px-4">

          {/* Heading */}
          <h1
            className="
    max-w-225
    font-extrabold
    uppercase
    tracking-normal
    leading-[1.06]
    text-[32px]
    md:text-[42px]
    lg:text-[54px]
    xl:text-[60px]
    [text-shadow:0_2px_4px_rgba(0,0,0,0.55),0_8px_18px_rgba(0,0,0,0.75)]
  "
          >
            THE FUTURE OF <br className="hidden sm:block" />
            HIGH-PERFORMANCE MATERIALS
          </h1>



          {/* Paragraph */}
          <p
            className={`     

      mt-4
      max-w-140
      text-[12px]
        font-normal
      uppercase
      tracking-[0.12em]
      drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]
     ` }
          >
            Delivering superior protection for buildings and infrastructure.
          </p>

          {/* Buttons */}
          <div
            className="
      mt-4
      flex
      flex-col
      sm:flex-row
      lg:gap-7
      gap-4
      w-full
      sm:w-auto
      items-center
      justify-center
    "
          >
            {/* Free Sample */}
            <Link href='/contact'>
              <button
                className="
    w-full
    sm:w-auto
    min-w-60
     px-10
    py-3.5
    text-[12px]
    font-bold
    uppercase
    tracking-widest
     transition
    shadow-[-4px_8px_18px_rgba(0,0,0,0.45)]
  bg-[#2a63a0]
  cursor-pointer
  "
              >
                Free Sample
              </button>
            </Link>

            {/* Request a Quote */}
            <Link href='/contact'>
              <button
                className="
        w-full
        sm:w-auto
        min-w-60
         border
        border-white/70
        bg-white/10
        px-10
        py-3.5
        text-[12px]
        font-bold
        uppercase
            tracking-widest

        backdrop-blur-sm
        transition
        hover:bg-white/20
        cursor-pointer
      "
              >
                Request a Quote
              </button>
            </Link>
          </div>

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

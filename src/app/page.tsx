// import FeaturesSection from "@/Components/FeatureSection";
import FreeSamplesSection from "@/Components/FreeSamplesSection";
import GetInspiredSection from "@/Components/GetInspiredSection";
// import OurStoryCard from "@/Components/OurStoryCard";
import PartnersLogos from "@/Components/PartnersLogos";
import ProductsSection from "@/Components/ProductsSection";
import Image from "next/image";
import { montserratHero } from "@/app/font";
import Link from "next/link";
import HeroSection from "@/Components/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <GetInspiredSection />
      {/* <FeaturesSection /> */}
      <ProductsSection />
      {/* <OurStoryCard /> */}
      <PartnersLogos />
      <FreeSamplesSection />
    </main>
  );
}

import HeroSection from "@/Components/HeroSection";
import ProductsSection from "@/Components/ProductsSection";
import GetInspiredSection from "@/Components/GetInspiredSection";
import PartnersLogos from "@/Components/PartnersLogos";
import FreeSamplesSection from "@/Components/FreeSamplesSection";
import { getLandingPageHero } from "@/lib/mainPages";
import { getAllProducts } from "@/lib/products";


export default async function Home() {
  const landingData = await getLandingPageHero();
  const products = await getAllProducts();

  return (
    <main>
      <HeroSection />

      <GetInspiredSection title={landingData?.SolutionHeading} />

      <ProductsSection
        heading={landingData?.ProductHeading}
        description={landingData?.ProductPara}
        products={products.slice(0, 3)}
      />

      {landingData && <PartnersLogos heroData={landingData} />}

      <FreeSamplesSection />
    </main>
  );
}

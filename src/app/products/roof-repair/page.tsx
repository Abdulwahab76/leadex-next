import Breadcrumb from "@/Components/Breadcrumb";
import ProductCard from "@/Components/ProductCard";
import { roofFlashingProducts } from "@/data";



export default function RoofRepair() {
    return (
        <>
            {/* Top Banner */}
            <section className="bg-primary-500 text-white py-10">
                <div className="wrapper   flex  flex-col md:flex-row gap-y-3 justify-between items-center">
                    <h1 className="text-xl font-bold">Roof Repair</h1>
                    <Breadcrumb current="Roof Flashing" />
                </div>
            </section>

            {/* Products */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-16 justify-items-center">
                    {roofFlashingProducts.map((product) => (
                        <ProductCard
                            key={product.slug}
                            name={product.name}
                            image={product.image}
                            slug={product.slug}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}

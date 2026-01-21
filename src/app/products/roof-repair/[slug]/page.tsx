import { roofFlashingProducts } from "@/data";
import ProductGallery from "./ProductGallery";
import Breadcrumb from "@/Components/Breadcrumb";
import ProductPage from "@/Components/SingleProduct";
import LeadaxFlashingPage from "@/Components/productPage";

type Props = {
    params: { slug: string };
};

export default async function ProductDetailPage({ params }: Props) {
    const { slug } = await params;
    const product = roofFlashingProducts.find((p) => p.slug === slug);
    if (!product) {
        return <div>Product not found: {params.slug}</div>;
    }
    return (
        <div>
            <section className="bg-primary-500 text-white py-10">
                <div className="max-w-350 w-11/12 px-2 lg:px-0 lg:w-10/12 mx-auto flex  flex-col md:flex-row gap-y-3  justify-between items-center">
                    <h1 className="text-xl font-medium">{product.name}</h1>
                    <Breadcrumb current={product.slug} />
                </div>
            </section>
            <section className="max-w-350 w-11/12 px-2 lg:px-0 lg:w-10/12 mx-auto  py-10">
                <div className=" ">

                    {/* LEFT CONTENT */}
                    {/* <div>
                        <h1 className="text-2xl font-medium mb-6">
                            {product.name}
                        </h1>

                        <p className="text-sm text-gray-700 mb-6  ">
                            rusted by Aussie tradies, Wakaflex is the professional’s choice for flashing abutments, step flashings, chimneys, Dutch gables, and other rising structures.
                        </p>

                        <p className="text-sm text-gray-700 mb-6  ">
                            Made from Polyisobutylene (PIB) with an integrated aluminium mesh, Wakaflex offers superior flexibility, memory, and strength. It forms a chemical bond to itself when overlapped, creating a single, continuous waterproof seal that outperforms traditional lead flashing.
                        </p>

                        <p className="text-sm text-gray-700  ">
                            With three-dimensional stretch (up to 50% in length and 15% in width), it conforms smoothly to any roofing profile — including tiles, metal and slate — and maintains a seamless, dressed-down finish. The dual butyl strips on either edge ensure a fast, secure bond to the surface, while the triple-layer HDPE backing protects during installation.
                        </p>
                        <button
                            type="submit"
                            className="border border-primary-500 mt-4  text-xs px-6 py-2   bg-primary-500 text-white transition-colors delay-75 cursor-pointer disabled:opacity-50"
                        >
                            Find a Stocklist
                        </button>
                    </div> */}

                    {/* RIGHT IMAGE SLIDER (CLIENT) */}
                    {/* <ProductGallery images={product.image} /> */}
                    {/* <ProductPage /> */}
                    <LeadaxFlashingPage />
                </div>
            </section>
        </div>

    );
}

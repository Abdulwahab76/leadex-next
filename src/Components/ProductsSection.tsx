import Image from "next/image";
import { JSX } from "react";

type Product = {
    title: string;
    description: string;
    image: string;
};

const products: Product[] = [
    {
        title: "Leadax Flashing",
        description: "Lead replacement. Quick and easy to apply.",
        image: "/images/leadax.webp",
    },
    {
        title: "Leadax Roof",
        description: "Roofing for flat and pitched roofs.",
        image: "/images/leadax-Roov.webp",
    },
    {
        title: "Tools & accessories",
        description: "All the tools needed for easy installation.",
        image: "/images/plastic-roller.webp",
    },
];

export default function ProductsSection(): JSX.Element {
    return (
        <section
            aria-labelledby="products-heading"
            className="bg-white py-16"
        >
            {/* Accessible heading */}
            <h2 id="products-heading" className="sr-only">
                Our products
            </h2>

            <div className="mx-auto max-w-7xl px-6">
                {/* Visible heading + intro */}
                <header className="mb-12 max-w-2xl">
                    <h3 className="text-3xl font-bold text-gray-900">
                        Our products
                    </h3>
                    <p className="mt-4 text-lg text-gray-600">
                        We offer various roofing products, including our
                        award-winning lead replacement Leadax Flashing and
                        our flat roofing product, Leadax Roof.
                    </p>
                </header>

                <ul className="grid  gap-x-12 sm:grid-cols-2 lg:grid-cols-3  ">
                    {products.map((product) => (
                        <li
                            key={product.title}
                            className="flex flex-col items-center   rounded-2xl  bg-white p-6 text-center shadow-2xl transition "
                        >

                            {/* Title */}
                            <h4 className="text-xl font-bold text-gray-900">
                                {product.title}
                            </h4>

                            {/* Description */}
                            <p className="mt-3 w-10/12 text-sm leading-relaxed text-gray-600">
                                {product.description}
                            </p>
                            {/* Image */}
                            <div className="mb-6 flex   items-center justify-center">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    width={400}
                                    height={400}
                                    className="object-contain"

                                />
                            </div>
                            {/* Button */}
                            <button
                                className="mt-6 rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                                aria-label={`Read more about ${product.title}`}
                            >
                                Read more
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

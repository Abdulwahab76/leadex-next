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
            className="bg-light-background py-20 pb-28"
        >
            <div className="mx-auto max-w-350 w-10/12 ">
                {/* Visible heading + intro */}
                <div className="mb-16 max-w-2xl">
                    <h3 className="text-3xl  font-medium  text-gray-900">
                        Our products
                    </h3>
                    <p className="mt-4 text-sm font-extralight">
                        We offer various roofing products, including our
                        award-winning lead replacement Leadax Flashing and
                        our flat roofing product, Leadax Roof.
                    </p>
                </div>

                <ul className="grid  gap-x-8 sm:grid-cols-2 lg:grid-cols-3   ">
                    {products.map((product) => (
                        <li
                            key={product.title}
                            className="flex flex-col items-center shadow-[0_0_30px_0_rgb(0,0,0,0.16)] rounded-2xl bg-white p-11 text-center transition"
                        >

                            {/* Title */}
                            <h4 className="text-2xl font-medium   text-gray-900">
                                {product.title}
                            </h4>

                            {/* Description */}
                            <p className="mt-3 w-fit text-[14px] text-black leading-relaxed  font-light">
                                {product.description}
                            </p>
                            {/* Image */}
                            <div className="my-4 flex items-center justify-center">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    width={260}
                                    height={240}
                                    className="object-contain transition-transform duration-500 ease-in-out hover:-translate-y-2"
                                />
                            </div>

                            {/* Button */}
                            <button
                                className="mt-6 rounded-full cursor-pointer border border-gray-300 px-5 py-2 text-sm font-light   transition hover:bg-gray-100"
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

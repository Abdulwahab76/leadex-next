import Image from "next/image";
import { Product } from "@/lib/products";
import Link from "next/link";

interface ProductsSectionProps {
    heading?: string;
    description?: string;
    products: Product[];
}

const DEFAULT_PRODUCT_IMAGE = "/images/default-product.webp";

export default function ProductsSection({
    heading,
    description,
    products,
}: ProductsSectionProps) {
    const displayedProducts = products.slice(0, 3);

    return (
        <section
            aria-labelledby="products-heading"
            className="bg-light-background py-20 pb-28"
        >
            <div className="wrapper">
                {/* Heading */}
                <div className="mb-16 flex justify-between items-center flex-wrap">
                    <div className="max-w-2xl">
                        <h3 className="text-2xl lg:text-3xl font-medium text-gray-900">
                            {heading ?? "Our Products"}
                        </h3>
                        <p className="mt-4 text-sm font-extralight">{description ?? ""}</p>
                    </div>

                    <Link href='/products' className="mt-6 inline-block text-xs rounded-full cursor-pointer text-primary-500 ">
                        View all products
                    </Link>
                </div>

                {/* Product Cards */}
                {displayedProducts.length > 0 ? (
                    <ul className="grid gap-y-8 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                        {displayedProducts.map((product: Product) => {
                            const productImage =
                                product.colors?.dark?.[0] || product.free_samples?.img || DEFAULT_PRODUCT_IMAGE;
                            const descp = (product.short_desc || product.description)?.substring(0, 50)

                            return (
                                <li
                                    key={product.id}
                                    className="flex flex-col items-center shadow-[0_0_30px_0_rgb(0,0,0,0.16)] rounded-2xl bg-white p-4 py-10 lg:p-11 text-center transition"
                                >
                                    {/* Title */}
                                    <h4 className="text-2xl font-medium text-gray-900">{product.name}</h4>

                                    {/* Description */}
                                    <p className="mt-3 w-fit text-[14px] text-black leading-relaxed font-light">
                                        {descp}
                                    </p>

                                    {/* Image */}
                                    <div className="my-4 flex items-center justify-center">
                                        <Image
                                            src={productImage}
                                            alt={product.name}
                                            width={260}
                                            height={240}
                                            className="object-contain transition-transform duration-500 ease-in-out hover:-translate-y-2"
                                        />
                                    </div>

                                    {/* Button */}
                                    <Link
                                        href={`/products/${product.slug ?? product.id}`}
                                        className="mt-6 rounded-full cursor-pointer border border-gray-300 px-5 py-2.5 text-xs lg:text-xs font-light transition bg-gray-100 shadow-[0_0_10px_0_rgb(0,0,0,0.16)]"
                                        aria-label={`Read more about ${product.name}`}
                                    >
                                        Read more
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No products available.</p>
                )}
            </div>
        </section>
    );
}

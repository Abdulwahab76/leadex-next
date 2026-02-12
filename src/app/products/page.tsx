// app/products/page.tsx
import Image from "next/image";
import { getAllProducts, Product } from "@/lib/products";
import Link from "next/link";

const DEFAULT_PRODUCT_IMAGE = "/images/default-product.webp";

export default async function ProductsPage() {
  // Fetch all products server-side
  const products: Product[] = await getAllProducts();

  return (
    <main>
      <section
        aria-labelledby="products-heading"
        className="bg-light-background py-10 pb-15"
      >
        <div className="mx-auto max-w-350 w-11/12 px-2 lg:px-0 lg:w-10/12">
          {/* Heading */}
          <div className="mb-16 max-w-2xl">
            <h3 className="text-2xl lg:text-3xl font-medium text-gray-900">
              Our Products
            </h3>
            <p className="mt-4 text-sm font-extralight">
              Explore our complete range of high-quality products.
            </p>
          </div>

          {/* No Products */}
          {products.length === 0 && (
            <p className="text-center text-gray-500">No products available.</p>
          )}

          {/* Products Grid */}
          {products.length > 0 && (
            <ul className="grid gap-y-8 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => {
                const productImage =
                  product.colors?.dark?.[0] ||
                  product.free_samples?.img ||
                  DEFAULT_PRODUCT_IMAGE;

                return (
                  <li
                    key={product.id}
                    className="flex flex-col items-center shadow-[0_0_30px_0_rgb(0,0,0,0.16)] rounded-2xl bg-white p-4 py-10 lg:p-11 text-center transition"
                  >
                    {/* Product Name */}
                    <h4 className="text-2xl font-medium text-gray-900">
                      {product.name}
                    </h4>

                    {/* Description */}
                    <p className="mt-3 w-fit text-[14px] text-black leading-relaxed font-light">
                      {product.short_desc || product.description}
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

                    {/* Read More */}
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
          )}
        </div>
      </section>
    </main>
  );
}

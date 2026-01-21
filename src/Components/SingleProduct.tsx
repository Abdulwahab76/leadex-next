'use client'
import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function ProductPage() {
    const productImages = [
        "/images/product-1.png",
        "/images/product-2.png",
        "/images/product-3.png",
        "/images/product-4.png",
    ];

    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (type: string) => {
        if (type === "increase") setQuantity(quantity + 1);
        if (type === "decrease" && quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <div className="  bg-white">
            <div className=" max-w-350 w-11/12 px-2 lg:px-0 lg:w-10/12    mx-auto">
                {/* PRODUCT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-8  ">

                    <div className="space-y-5">
                        {/* Main Image */}
                        <div className="relative w-full aspect-square">
                            <Image
                                src="/images/RVtape1.webp"
                                alt="AutoButyl RVX"
                                fill
                                priority
                                sizes="
                                (max-width: 640px) 100vw,
                                (max-width: 1024px) 90vw,
                                900px
                              "
                                className="object-contain"
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-4">
                            {productImages.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`aspect-square rounded-lg overflow-hidden border-2 transition
                    ${activeImage === index
                                            ? "border-[#0066B2]"
                                            : "border-gray-200"
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Product ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2 max-w-md">
                        {/* Title & Price */}
                        <div>
                            <h1 className="text-3xl md:text-4xl   text-gray-900 mb-2">
                                AutoButyl RVX
                            </h1>
                            <p className="text-xs   text-gray-900">
                                $30.00
                            </p>
                        </div>

                        {/* Quantity */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Quantity
                            </label>
                            <div className="flex items-center gap-x-4  whitespace-nowrap">
                                <div className="border border-gray-300 rounded-full w-full flex-1   items-center">
                                    <button
                                        onClick={() => handleQuantityChange("decrease")}
                                        className="p-2.5   hover:bg-gray-100 transition rounded-l-full"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus
                                            size={18}
                                            className={quantity <= 1 ? "text-gray-300" : "text-gray-700"}
                                        />
                                    </button>
                                    <span className="px-6 text-base font-medium">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange("increase")}
                                        className="p-2.5  hover:bg-gray-100 transition rounded-r-full"
                                    >
                                        <Plus size={18} className="text-gray-700" />
                                    </button>
                                </div>
                                <div className="flex flex-1">
                                    <button className="w-full flex text-xs  bg-primary-600   text-white font-normal py-2.5 px-6 rounded-full transition   items-center justify-center gap-2">
                                        <ShoppingCart size={16} />
                                        Add to cart
                                    </button>
                                </div>

                            </div>
                        </div>

                        {/* Buttons */}
                        <div className=" ">

                            <button className="w-full bg-primary-600 text-white font-normal py-2.5 px-6 rounded-full text-xs transition">
                                Buy it now
                            </button>
                        </div>

                        {/* Description */}
                        <div className="pt-6 border-t border-gray-200">
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                <span className="font-semibold">AutoButyl RVX</span> is a
                                heavy-duty RV roof seal repair tape made from ultra-sticky butyl
                                rubber with a UV-resistant backing. It instantly seals leaks,
                                cracks, and seams to create a permanent, waterproof barrier on
                                RV roofs and exterior surfaces.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-3 pt-2">
                            {[
                                "UV-resistant backing for long-lasting outdoor use",
                                "Bonds to EPDM, TPO, metal, fiberglass, vinyl, and more",
                                "Perfect for RVs, campers, trailers, and mobile homes",
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-[#0066B2] rounded-full mt-2" />
                                    <p className="text-sm text-gray-600">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

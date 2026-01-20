"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, Minus, Plus, Search, User, ShoppingBag, ChevronDown } from 'lucide-react';

const demoImages = [
    "/images/wakaflex-grey.png",
    "/images/wakaflex-darkgrey.png",
    "/images/wakaflex-black.png",
    "/images/wakaflex-red.png",
    "/images/wakaflex-brown.png",
];

export default function ProductGallery({ images }: { images?: any }) {
    const [activeImage, setActiveImage] = useState(demoImages[0]);
    const [quantity, setQuantity] = useState(1);
    const [activeImages, setActiveImages] = useState(0);

    const productImages = [
        "https://images.unsplash.com/photo-1594737626072-90dc274bc2bd?w=800&q=80",
        "https://images.unsplash.com/photo-1594737625785-a6b5f8f6d4a3?w=800&q=80",
        "https://images.unsplash.com/photo-1594737625590-17f0e99c9c0e?w=800&q=80"
    ];
    const handleQuantityChange = (type: any) => {
        if (type === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };
    return (
        <div>
            {/* MAIN IMAGE */}
            <div className="relative w-full h-105 mb-6">
                <Image
                    src={images ? images : activeImage}
                    alt="Product image"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-4">
                {demoImages.map((img) => (
                    <button
                        key={img}
                        onClick={() => setActiveImage(img)}
                        className={`relative w-20 h-20 border rounded-md p-2
              ${activeImage === img
                                ? "border-green-500 ring-2 ring-green-400"
                                : "border-gray-200"
                            }
            `}
                    >
                        <Image src={img} alt="" fill className="object-contain" />
                    </button>
                ))}
            </div>

            {/* Product Section */}
            <div className=" w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
                <div className="grid grid-cols-12 gap-8 lg:gap-16">
                    {/* Product Images */}
                    <div className="space-y-4 col-span-10">
                        {/* Main Image */}
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={productImages[activeImages]}
                                alt="AutoButyl RVX"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Thumbnail Images */}
                        <div className="grid grid-cols-3 gap-4">
                            {productImages.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImages(index)}
                                    className={`aspect-square rounded-lg overflow-hidden border-2 transition ${activeImages === index ? 'border-[#0066B2]' : 'border-gray-200'
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

                    {/* Product Details */}
                    <div className="space-y-6  ">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                AutoButyl RVX
                            </h1>
                            <p className="text-2xl md:text-3xl font-semibold text-gray-900">
                                $30.00
                            </p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Quantity
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => handleQuantityChange('decrease')}
                                        className="p-3 hover:bg-gray-100 transition"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus size={18} className={quantity <= 1 ? 'text-gray-300' : 'text-gray-700'} />
                                    </button>
                                    <span className="px-6 py-2 text-base font-medium">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange('increase')}
                                        className="p-3 hover:bg-gray-100 transition"
                                    >
                                        <Plus size={18} className="text-gray-700" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button className="w-full bg-[#0A5F7D] hover:bg-[#084A62] text-white font-medium py-4 px-6 rounded-lg transition flex items-center justify-center space-x-2">
                                <ShoppingCart size={20} />
                                <span>Add to cart</span>
                            </button>
                            <button className="w-full bg-[#0A5F7D] hover:bg-[#084A62] text-white font-medium py-4 px-6 rounded-lg transition">
                                Buy it now
                            </button>
                        </div>

                        {/* Product Description */}
                        <div className="pt-6 border-t border-gray-200">
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                <span className="font-semibold">AutoButyl RVX</span> is a heavy-duty RV roof seal repair tape made from ultra-sticky butyl rubber with a UV-resistant backing. It instantly seals leaks, cracks, and seams to create a permanent, waterproof barrier on RV roofs and exterior surfaces. Designed for long-lasting outdoor performance, ButylFlex RVX bonds securely to EPDM, TPO, metal, fiberglass, vinyl, and more—ideal for RVs, campers, trailers, mobile homes, and boats.
                            </p>
                        </div>

                        {/* Additional Info */}
                        <div className="space-y-4 pt-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-1.5 h-1.5 bg-[#0066B2] rounded-full mt-2"></div>
                                <p className="text-sm text-gray-600">UV-resistant backing for long-lasting outdoor use</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-1.5 h-1.5 bg-[#0066B2] rounded-full mt-2"></div>
                                <p className="text-sm text-gray-600">Bonds to EPDM, TPO, metal, fiberglass, vinyl, and more</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-1.5 h-1.5 bg-[#0066B2] rounded-full mt-2"></div>
                                <p className="text-sm text-gray-600">Perfect for RVs, campers, trailers, and mobile homes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import Image from "next/image";
import { useState } from "react";

const demoImages = [
    "/images/wakaflex-grey.png",
    "/images/wakaflex-darkgrey.png",
    "/images/wakaflex-black.png",
    "/images/wakaflex-red.png",
    "/images/wakaflex-brown.png",
];

export default function ProductGallery({ images }: { images?: any }) {
    const [activeImage, setActiveImage] = useState(demoImages[0]);

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
        </div>
    );
}

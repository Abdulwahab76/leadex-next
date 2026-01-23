'use client'

import Image from 'next/image'
import { useState } from 'react'


export default function ProductSlider({ slideImages }: { slideImages?: string[] }) {
    const [active, setActive] = useState(0)

    return (
        <div className="w-full">
            {/* Main image */}
            <div className="relative aspect-square w-full bg-white rounded-lg  ">
                <Image
                    src={slideImages?.[active] || '/placeholder-image.jpg'}
                    alt="Product image"
                    fill
                    priority
                    className="object-contain"
                />
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-3 justify-center">
                {slideImages?.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActive(idx)}
                        className={`relative h-16 w-16 rounded-md border transition
              ${active === idx ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                        <Image
                            src={img}
                            alt="Thumbnail"
                            fill
                            className="object-contain p-2"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}

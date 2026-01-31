'use client';
import Image from "next/image";
import { useState } from "react";

type Props = {
    imageUrls?: string[];
};

export default function LeadaxFlashingPage({ imageUrls = [] }: Props) {
    const fallbackImage = "/products/leadax-flashing-gray.png";

    const [activeIndex, setActiveIndex] = useState(0);
    const [isChanging, setIsChanging] = useState(false);

    const activeImage = imageUrls[activeIndex] || fallbackImage;

    const changeImageByIndex = (index: number) => {
        if (index === activeIndex) return;
        if (!imageUrls[index]) return;

        setIsChanging(true);
        setTimeout(() => {
            setActiveIndex(index);
            setIsChanging(false);
        }, 150);
    };

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col items-center justify-center group">

                {/* Image */}
                <Image
                    src={activeImage}
                    alt="Leadax Flashing Roll"
                    width={1000}
                    height={1100}
                    className={`
            w-full
            object-contain
            transition-all
            duration-300
            ease-out
            ${isChanging ? "opacity-0 translate-y-2" : "opacity-100"}
            group-hover:-translate-y-3
            max-w-75
          `}
                />

                {/* Product Shadow */}
                <div
                    className="
        mt-2
        mb-6
        w-44
        h-13
        bg-[#b9b9b9]
        rounded-full
        blur-[10px]
        transform
        scale-y-75
    
        transition-all
        duration-300
        group-hover:bg-[#E4E4E4]
     
      "
                />

                {/* Color Options (index-based) */}
                <div className="flex gap-4 mt-4">

                    {/* Index 0 */}
                    <div className="relative group/color">
                        <button
                            onClick={() => changeImageByIndex(0)}
                            className={`
                w-5 h-5 rounded-full bg-gray-400 border-2
                ${activeIndex === 0 ? "border-black" : "border-gray-600"}
                hover:scale-110 transition-transform
              `}
                        />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover/color:opacity-100 transition">
                            Gray
                        </span>
                    </div>

                    {/* Index 1 */}
                    <div className="relative group/color">
                        <button
                            onClick={() => changeImageByIndex(1)}
                            className="w-5 h-5 rounded-full bg-red-400 hover:scale-110 transition-transform"
                        />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover/color:opacity-100 transition">
                            Red
                        </span>
                    </div>

                    {/* Index 2 */}
                    <div className="relative group/color">
                        <button
                            onClick={() => changeImageByIndex(2)}
                            className="w-5 h-5 rounded-full bg-gray-800 hover:scale-110 transition-transform"
                        />
                        <span className="absolute whitespace-nowrap -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover/color:opacity-100 transition">
                            Dark Gray
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
}

'use client';
import Image from "next/image";
import { useState } from "react";

type Props = {
    colorImages?: Record<string, string[]>; // e.g., { Gray: ["url1", "url2"], Red: ["url3"] }
};

export default function LeadaxFlashingPage({ colorImages = {} }: Props) {
    const colors = Object.keys(colorImages);
    const [activeColor, setActiveColor] = useState(colors[0] || "");
    const [activeIndex, setActiveIndex] = useState(0);
    const [isChanging, setIsChanging] = useState(false);

    const activeImage =
        colorImages[activeColor]?.[activeIndex] || "/products/leadax-flashing-gray.png";

    const changeImageByIndex = (index: number) => {
        if (!colorImages[activeColor]?.[index]) return;
        setIsChanging(true);
        setTimeout(() => {
            setActiveIndex(index);
            setIsChanging(false);
        }, 150);
    };

    const changeColor = (color: string) => {
        setActiveColor(color);
        setActiveIndex(0); // reset to first image of new color
    };

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col items-center justify-center group">

                {/* Product Image */}
                <div className="relative w-full   ">
                    <Image
                        src={activeImage}
                        alt={activeColor}
                        width={300}
                        height={300}
                        className={`object-contain transition-all duration-300 ease-out
                            ${isChanging ? "opacity-0 translate-y-2" : "opacity-100"}
                            group-hover:-translate-y-3
                        `}
                        priority
                    />
                </div>

                {/* Shadow under image */}
                <div
                    className="
                        mt-2 mb-6 w-44 h-16 bg-[#b9b9b9]
                        rounded-full blur-md transform scale-y-75
                        transition-all duration-300 group-hover:bg-[#E4E4E4]
                    "
                />

                {/* Color Options */}
                <div className="flex gap-4 mt-4">
                    {colors.map(color => (
                        <div key={color} className="relative group/color">
                            <button
                                onClick={() => changeColor(color)}
                                className={`w-6 h-6 rounded-full border-2
                                    ${activeColor === color ? "border-black" : "border-gray-400"}
                                    hover:scale-110 transition-transform
                                `}
                                style={{ backgroundColor: color.toLowerCase() }}
                            />
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover/color:opacity-100 transition">
                                {color}
                            </span>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}

import Image from "next/image";

export default function LeadaxFlashingPage({ imageUrls }: { imageUrls?: string }) {
    return (
        <div className="flex justify-center items-center">
            {/* Left Side - Product Image */}
            <div className="flex flex-col items-center justify-center group">

                {/* Image Wrapper */}
                <div className="flex justify-center items-center">
                    <div className="flex flex-col items-center group">

                        {/* Image */}
                        <Image
                            src={imageUrls || "/products/leadax-flashing-roll.jpg"}
                            alt="Leadax Flashing Roll"
                            width={1000}
                            height={1100}
                            className="
        w-full
        object-contain
        transition-transform
        duration-300
        ease-out
        group-hover:-translate-y-3
      "
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
                    </div>
                </div>


                {/* Color Options */}
                <div className="flex gap-4 mt-8">

                    {/* Gray */}
                    <div className="relative group/color">
                        <button className="w-5 h-5 rounded-full bg-gray-400 border-2 border-gray-600 hover:scale-110 transition-transform" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover/color:opacity-100 transition">
                            Gray
                        </span>
                    </div>

                    {/* Red */}
                    <div className="relative group/color">
                        <button className="w-5 h-5 rounded-full bg-red-400 border-2 border-transparent hover:scale-110 transition-transform" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover/color:opacity-100 transition">
                            Red
                        </span>
                    </div>

                    {/* Dark Gray */}
                    <div className="relative group/color">
                        <button className="w-5 h-5 rounded-full bg-gray-800 border-2 border-transparent hover:scale-110 transition-transform" />
                        <span className="absolute whitespace-nowrap -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover/color:opacity-100 transition">
                            Dark Gray
                        </span>
                    </div>

                </div>
            </div>
        </div>

    );
}
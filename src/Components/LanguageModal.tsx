import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CountrySelect } from "./CountrySelect";

type Props = {
    open: boolean;
    onClose: () => void;
};
const COUNTRIES = [
    { code: "nl", label: "Netherlands", icon: "/icons/NL-1.webp" },
    { code: "be", label: "Belgium", icon: "/icons/BE.webp" },
    { code: "de", label: "Germany", icon: "/icons/DE.webp" },
    { code: "fr", label: "France", icon: "/icons/FR.png" },
    { code: "uk", label: "United Kingdom", icon: "/icons/UK.webp" },
    { code: "ie", label: "Ireland", icon: "/icons/IR.webp" },
    { code: "it", label: "Italy", icon: "/icons/IT.webp" },
    { code: "es", label: "Spain", icon: "/icons/ES.webp" },
    { code: "dk", label: "Denmark", icon: "/icons/DEN.webp" },
    { code: "us", label: "USA", icon: "/icons/USA-flag.webp" },
    { code: "au", label: "Australia", icon: "/icons/AUS.webp" },
    { code: "jp", label: "Japan", icon: "/icons/JA.webp" },
];

export default function LanguageModal({ open, onClose }: Props) {
    const [country, setCountry] = useState("nl");
    const [interest, setInterest] = useState<string>("");

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white w-[90%] max-w-130 rounded-2xl px-20 py-10 shadow-xl">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute -right-4 cursor-pointer -top-2 bg-white shadow w-8 h-8 rounded-full   flex items-center justify-center hover:bg-gray-100"
                >
                    <X size={18} />
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center mb-6">
                    Choose your country
                </h2>

                {/* Country Select */}
                <div className="mb-6">
                    <label className="sr-only">Country</label>

                    <div className="relative">
                        {/* Flag */}

                        <CountrySelect
                            value={country}
                            onChange={setCountry}
                        />

                    </div>
                </div>



                {/* Interest */}
                <div className="mb-8">
                    <p className="text-sm mb-3 font-medium">
                        Waar ben je in geïnteresseerd?
                    </p>

                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 text-xs cursor-pointer">
                            <input
                                type="radio"
                                name="interest"
                                value="loodvervanger"
                                checked={interest === "loodvervanger"}
                                onChange={(e) => setInterest(e.target.value)}
                            />
                            Loodvervanger
                        </label>

                        <label className="flex items-center gap-2 text-xs cursor-pointer">
                            <input
                                type="radio"
                                name="interest"
                                value="dakbedekking"
                                checked={interest === "dakbedekking"}
                                onChange={(e) => setInterest(e.target.value)}
                            />
                            Dakbedekking
                        </label>
                    </div>
                </div>

                {/* Confirm */}
                <button
                    disabled={!interest}
                    className="block mx-auto cursor-pointer bg-primary-600  disabled:opacity-50 text-white text-sm font-medium px-8 py-3 rounded-full transition"
                    onClick={() => {
                        console.log({ country, interest });
                        onClose();
                    }}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}

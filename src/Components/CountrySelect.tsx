import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
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

export function CountrySelect({
    value,
    onChange,
}: {
    value: string;
    onChange: (v: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selected = COUNTRIES.find(c => c.code === value);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative w-full">
            {/* Trigger */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full border py-2 pl-3 pr-4 text-xs flex items-center justify-between"
            >
                <div className="flex items-center gap-2">
                    {selected && (
                        <Image
                            src={selected.icon}
                            alt={selected.label}
                            width={20}
                            height={14}
                            className="rounded-sm"
                        />
                    )}
                    <span>{selected?.label}</span>
                </div>
                <ChevronDown size={16} />
            </button>

            {/* Dropdown */}
            {open && (
                <ul className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-md max-h-64 overflow-auto">
                    {COUNTRIES.map((c) => (
                        <li
                            key={c.code}
                            onClick={() => {
                                onChange(c.code);
                                setOpen(false);
                            }}
                            className="px-3 py-2 flex items-center gap-2 text-xs hover:bg-gray-100 cursor-pointer"
                        >
                            <Image
                                src={c.icon}
                                alt={c.label}
                                width={20}
                                height={14}
                                className="rounded-sm"
                            />
                            {c.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

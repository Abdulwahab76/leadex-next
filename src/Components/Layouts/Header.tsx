"use client";

import { Earth, TextAlignJustify, X, ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const topNavLinks = [
        { href: "/sustainability", label: "Sustainability" },
        { href: "/jobs", label: "Jobs" },
        { href: "/faq", label: "FAQ" },
        { href: "/contact", label: "Contact" },
        { href: "/language", label: "Language", icon: <Earth size={16} /> },
    ];
    const mainNavLinks = [
        {
            label: "About",
            href: "/about",
        },
        {
            label: "Solutions",
            submenu: [
                { label: "Roofing Waterproofing", href: "/solutions/roofing-waterproofing" },
                { label: "Flashing Systems", href: "/solutions/flashing-systems" },
                { label: "Building Envelope", href: "/solutions/building-envelope" },
                { label: "Industrial Sealing", href: "/solutions/industrial-sealing" },
            ],
        },
        {
            label: "Products",
            submenu: [
                { label: "Roof Repair", href: "/products/roof-repair" },
                { label: "Waterproof Sealing", href: "/products/waterproof-sealing" },
                { label: "Sound Deadening", href: "/products/sound-deadening" },
                { label: "All Products →", href: "/products", highlight: true },
            ],
        },
        {
            label: "Resources",
            submenu: [
                { label: "Insights", href: "/resources/insights" },
                { label: "Installation Guides", href: "/resources/installation-guides" },
                { label: "Technical Library", href: "/resources/technical-library" },
                { label: "Case Studies", href: "/resources/case-studies" },
                { label: "Videos", href: "/resources/videos" },
            ],
        },
        {
            label: "Contact Us",
            href: "/contact",
        },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white  ">
            <div className="bg-gray-100 text-sm text-gray-700  h-10  hidden lg:flex ">
                <nav
                    aria-label="Utility navigation"
                    className="max-w-350 mx-auto w-10/12  justify-end  flex items-center "
                >
                    <ul className="flex justify-center items-center space-x-3    ">
                        {topNavLinks.map(({ href, label, icon }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className=" hover:text-blue-500 flex items-center text-xs "
                                    aria-label={icon ? label : undefined}
                                >
                                    {icon && <span aria-hidden="true">{icon}</span>}
                                    {!icon && label}
                                    {icon && <span className="sr-only">{label}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="max-w-350 w-10/12 mx-auto h-16 flex items-center justify-between">

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {mobileMenuOpen ? <X /> : <TextAlignJustify />}
                </button>

                {/* Logo */}
                <Link href="/" aria-label="Homepage">
                    <Image
                        src="/images/Bodenlink.png"
                        width={150}
                        height={50}
                        alt="Logo"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex">
                    <ul className="flex gap-x-12">
                        {mainNavLinks.map((item) => (
                            <li key={item.label} className="relative group">
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-1 text-xs hover:text-primary-500"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="flex items-center gap-1 cursor-pointer text-xs hover:text-primary-500">
                                        {item.label}
                                        <ChevronDown
                                            size={14}
                                            className="transition-transform duration-200 "
                                        />
                                    </span>
                                )}

                                {/* Dropdown */}
                                {item.submenu && (
                                    <div className="absolute left-0 top-full mt-3 w-64 rounded-md bg-white shadow-lg
                    opacity-0 invisible translate-y-2
                    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                    transition-all duration-200 ease-out"
                                    >
                                        <ul className="py-2">
                                            {item.submenu.map((sub) => (
                                                <li key={sub.label}>
                                                    <Link
                                                        href={sub.href}
                                                        className={`block px-4 py-2 text-xs hover:bg-gray-100 ${sub.highlight
                                                            ? "font-semibold text-primary-600"
                                                            : ""
                                                            }`}
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* CTA */}
                <div className="hidden md:flex">
                    <Link
                        href="/find-dealer"
                        className="bg-primary-600 hover:bg-primary-500 text-white text-xs px-5 py-2 rounded-full transition"
                    >
                        Free Samples
                    </Link>
                </div>

                <Earth className="md:hidden text-gray-600" />
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <nav className="md:hidden  bg-white">
                    <ul className="px-4 py-4 space-y-2">
                        {mainNavLinks.map((item) => (
                            <li key={item.label}>
                                {item.submenu ? (
                                    <>
                                        <button
                                            className="w-full flex justify-between items-center text-xs py-2"
                                            onClick={() =>
                                                setOpenSubmenu(
                                                    openSubmenu === item.label ? null : item.label
                                                )
                                            }
                                        >
                                            {item.label}
                                            <ChevronRight
                                                size={14}
                                                className={`transition-transform ${openSubmenu === item.label ? "rotate-90" : ""
                                                    }`}
                                            />
                                        </button>

                                        <div
                                            className={`overflow-hidden transition-all duration-300 ${openSubmenu === item.label ? "max-h-96" : "max-h-0"
                                                }`}
                                        >
                                            <ul className="pl-4 space-y-1">
                                                {item.submenu.map((sub) => (
                                                    <li key={sub.label}>
                                                        <Link
                                                            href={sub.href}
                                                            className="block py-1 text-xs text-gray-600"
                                                            onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                            {sub.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href!}
                                        className="block py-2 text-xs"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}

                        <li className="pt-4">
                            <Link
                                href="/find-dealer"
                                className="inline-block bg-primary-500 text-white text-xs px-5 py-2 rounded-full"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Free Samples
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}

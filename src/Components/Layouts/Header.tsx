"use client";

import { Earth, TextAlignJustify, X, ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const topNavLinks = [
        { href: "/shop", label: "Shop" },
        { href: "/language", label: "Language", icon: <Earth size={16} /> },
    ];

    const mainNavLinks = [

        {
            label: "Solutions",
            submenu: [
                { label: "Roofing Waterproofing Systems", href: "/solutions/roofing-waterproofing-systems" },
                { label: "Fire Protection & Fireproofing", href: "/solutions/flashing-protection-fireproofing" },
                { label: "Butyl Waterproofing & Sealing", href: "/solutions/butyle-Waterproofing-sealing" },
                { label: "Automotive Noise & Vibration Control", href: "/solutions/automotive-noise-vibration-control" },
            ],
        },
        {
            label: "Products",
            submenu: [
                {
                    label: "BuildCore",
                    isCategory: true,
                    items: [
                        { label: "RoofBond™ Waterproofing", href: "/products/roofbond-flx" },
                        { label: "FrameFlash™ Waterproof & Sealing", href: "/products/frameflash" },
                        { label: "ThermaSnap Super Seal", href: "/products/thermasnap" },
                    ]
                },
                {
                    label: "AutoShield",
                    isCategory: true,
                    items: [
                        { label: "AutoShield™ NVH Control", href: "/products/autoshield/nvh-control" },
                    ]
                },
                {
                    label: "Domevo",
                    isCategory: true,
                    items: [
                        { label: "Domevo SafeKitchen", href: "/products/domevo/safekitchen" },
                    ]
                },
                { label: "All Products →", href: "/products", highlight: true },
            ],
        },
        {
            label: "About",
            href: "/about",
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
        <header className="sticky top-0 z-50 bg-white">
            <div className="bg-gray-100 text-sm text-gray-700 h-9 hidden lg:flex">
                <nav
                    aria-label="Utility navigation"
                    className="max-w-350 mx-auto w-10/12 justify-end flex items-center"
                >
                    <ul className="flex justify-center items-center space-x-3">
                        {topNavLinks.map(({ href, label, icon }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="hover:text-blue-500 flex items-center text-xs"
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

            <div className="max-w-350 w-10/12 mx-auto h-21 flex items-center justify-between">
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
                                        className="flex items-center gap-1 text-xs font-extralight hover:text-primary-500"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="flex items-center gap-1 cursor-pointer text-xs hover:text-primary-500">
                                        {item.label}
                                        <ChevronDown
                                            size={14}
                                            className="transition-transform duration-200"
                                        />
                                    </span>
                                )}

                                {/* Dropdown - Updated for nested structure */}
                                {item.submenu && (
                                    <div className="absolute left-0 top-full mt-3 w-80 rounded-md bg-white shadow-lg
                                        opacity-0 invisible translate-y-2
                                        group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                                        transition-all duration-200 ease-out"
                                    >
                                        <ul className="py-2">
                                            {item.submenu.map((sub: any) => (
                                                <li key={sub.label}>
                                                    {sub.isCategory ? (
                                                        // Category with nested items
                                                        <div className="px-4 py-2">
                                                            <div className="font-semibold text-xs text-gray-800 mb-1">
                                                                {sub.label}
                                                            </div>
                                                            <ul className="pl-3 space-y-1">
                                                                {sub.items.map((nestedItem: any) => (
                                                                    <li key={nestedItem.label}>
                                                                        <Link
                                                                            href={nestedItem.href}
                                                                            className="block py-1 text-xs text-gray-600 hover:text-primary-600 hover:bg-gray-50 px-2 rounded"
                                                                        >
                                                                            {nestedItem.label}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ) : (
                                                        // Regular link
                                                        <Link
                                                            href={sub.href}
                                                            className={`block px-4 py-2 text-xs hover:bg-gray-100 ${sub.highlight
                                                                ? "font-semibold text-primary-600"
                                                                : ""
                                                                }`}
                                                        >
                                                            {sub.label}
                                                        </Link>
                                                    )}
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
                        className="bg-primary-600 w-27.5 hover:bg-primary-400 text-white font-light py-2.5   text-xs rounded-full transition text-center "
                    >
                        Free Samples
                    </Link>
                </div>

                <Earth className="md:hidden text-gray-600" />
            </div>

            {/* Mobile Menu - Updated for nested structure */}
            {mobileMenuOpen && (
                <nav className="md:hidden bg-white">
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
                                            className={`overflow-hidden transition-all duration-300 ${openSubmenu === item.label ? "max-h-[600px]" : "max-h-0"
                                                }`}
                                        >
                                            <ul className="pl-4 space-y-1">
                                                {item.submenu.map((sub: any) => (
                                                    <li key={sub.label}>
                                                        {sub.isCategory ? (
                                                            // Category with nested items (mobile)
                                                            <div className="py-2">
                                                                <div className="font-semibold text-xs text-gray-800 mb-2">
                                                                    {sub.label}
                                                                </div>
                                                                <ul className="pl-3 space-y-1">
                                                                    {sub.items.map((nestedItem: any) => (
                                                                        <li key={nestedItem.label}>
                                                                            <Link
                                                                                href={nestedItem.href}
                                                                                className="block py-1 text-xs text-gray-600"
                                                                                onClick={() => setMobileMenuOpen(false)}
                                                                            >
                                                                                {nestedItem.label}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ) : (
                                                            // Regular link (mobile)
                                                            <Link
                                                                href={sub.href}
                                                                className={`block py-1 text-xs ${sub.highlight
                                                                    ? "font-semibold text-primary-600"
                                                                    : "text-gray-600"
                                                                    }`}
                                                                onClick={() => setMobileMenuOpen(false)}
                                                            >
                                                                {sub.label}
                                                            </Link>
                                                        )}
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
                                className="bg-primary-600 w-27.5 hover:bg-primary-400 text-white font-light py-2.5   text-xs rounded-full transition  "
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
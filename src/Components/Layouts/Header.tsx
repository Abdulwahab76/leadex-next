"use client";

import { Earth, TextAlignJustify, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const topNavLinks = [
        { href: "/sustainability", label: "Sustainability" },
        { href: "/jobs", label: "Jobs" },
        { href: "/faq", label: "FAQ" },
        { href: "/contact", label: "Contact" },
        { href: "/language", label: "Language", icon: <Earth size={16} /> },
    ];

    const mainNavLinks = [
        { href: "/products", label: "Products" },
        { href: "/pricing", label: "Pricing" },
        { href: "/sustainability", label: "Sustainability" },
        { href: "/blog", label: "Blog" },
        { href: "/about", label: "About" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white  ">
            {/* Top bar */}
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

            {/* Main header */}
            <div className="shadow  w-full ">
                <div className="py-2.5 ">
                    <div className="flex max-w-350 w-10/12 h-16 justify-between mx-auto items-center ">
                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-expanded={mobileMenuOpen}
                                aria-controls="mobile-menu"
                                aria-label="Toggle menu"
                                className="text-gray-700 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400 rounded"
                                type="button"
                            >
                                {mobileMenuOpen ? (
                                    // X icon
                                    <X />
                                ) : (
                                    // Hamburger icon
                                    <TextAlignJustify />
                                )}
                            </button>
                        </div>
                        {/* Logo */}
                        <div  >
                            <Link
                                href="/"
                                aria-label="Leadax homepage"
                                className="text-xl font-bold text-primary-500"
                            >
                                <Image src='/images/Bodenlink.png' width={150} height={150} alt="logo" />
                            </Link>
                        </div>

                        {/* Desktop nav */}
                        <nav
                            aria-label="Primary navigation"
                            className="hidden md:flex space-x-8  "
                        >
                            <ul className="flex gap-x-14">
                                {mainNavLinks.map(({ href, label }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className="  hover:text-primary-500 font-normal"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </ul>
                        </nav>
                        <Earth className="text-gray-600 lg:hidden block" />
                        {/* CTA button desktop */}
                        <div className="hidden md:flex  ">
                            <Link
                                href="/find-dealer"
                                className="bg-primary-600 hover:bg-primary-400 text-white font-light py-2 px-4 text-xs rounded-full transition"
                            >
                                Free Samples
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Mobile menu panel */}
                {mobileMenuOpen && (
                    <nav
                        id="mobile-menu"
                        aria-label="Mobile primary navigation"
                        className="md:hidden bg-white border-t border-gray-200"
                    >
                        <ul className="space-y-1 px-4 pt-2 pb-4">
                            {mainNavLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-100 hover:text-primary-600"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}

                            {/* CTA button mobile */}
                            <li>
                                <Link
                                    href="/find-dealer"
                                    className="block text-center bg-primary-400 hover:bg-primary-500 text-white font-semibold py-2 px-5 rounded-full mt-3"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Free Samples
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}

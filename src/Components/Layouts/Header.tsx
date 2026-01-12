"use client";

import { TextAlignEnd, X } from "lucide-react";
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
        { href: "/language", label: "Language", icon: "🌐" },
    ];

    const mainNavLinks = [
        { href: "/products", label: "Products" },
        { href: "/professionals", label: "For professionals" },
        { href: "/applications", label: "Applications" },
        { href: "/projects", label: "Projects" },
        { href: "/blog", label: "Blog" },
        { href: "/our-story", label: "Our story" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white  ">
            {/* Top bar */}
            <div className="bg-gray-100 text-sm text-gray-700  h-10  ">
                <nav
                    aria-label="Utility navigation"
                    className="max-w-7xl mx-auto  justify-end sm: pt-3 flex items-center   "
                >
                    <ul className="flex justify-center items-center space-x-6    ">
                        {topNavLinks.map(({ href, label, icon }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="hover:underline flex items-center space-x-1  "
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
            <div className=" shadow   w-full px-4">
                <div className="py-6   sm:px-6 lg:px-8  ">
                    <div className=" flex max-w-7xl h-16 justify-between mx-auto items-center">
                        {/* Logo */}
                        <div  >
                            <Link
                                href="/"
                                aria-label="Leadax homepage"
                                className="text-xl font-bold text-primary-500"
                            >
                                <Image src='/Bodenlink.jpg' width={120} height={120} alt="logo" />
                            </Link>
                        </div>

                        {/* Desktop nav */}
                        <nav
                            aria-label="Primary navigation"
                            className="hidden md:flex space-x-8  "
                        >
                            {mainNavLinks.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="text-gray-700 hover:text-primary-500 font-medium"
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA button desktop */}
                        <div className="hidden md:flex  ">
                            <Link
                                href="/find-dealer"
                                className="bg-primary-600 hover:bg-primary-400 text-white font-semibold py-2 px-5 rounded-full transition"
                            >
                                Free Samples
                            </Link>
                        </div>

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
                                    <TextAlignEnd />
                                )}
                            </button>
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

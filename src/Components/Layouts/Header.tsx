"use client";

import { Earth, TextAlignJustify, X, ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageModal from "../LanguageModal";
import { useFetchAllProducts } from "@/hooks/useFetchAllProducts";
import { useFetchAllSolutions } from "@/hooks/useFetchAllSolutions";

type SubMenuItem = {
    label: string;
    href?: string;
};

type NavLink = {
    label: string;
    href?: string;
    submenu?: SubMenuItem[];
};


export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [languageModalOpen, setLanguageModalOpen] = useState(false);


    const [mainNavLinks, setMainNavLinks] = useState<NavLink[]>([
        {
            label: "About",
            href: "/about",
        },
        {
            label: "Solutions",
            href: "/solutions",
        },
        {
            label: "Products",
            href: "/products",
        },
        {
            label: "Resources",
            submenu: [
                { label: "Insights", href: "https://bodenlinkshop.com/blogs/blogs" },
                { label: "Installation Guides", href: "/resources/installation-guides" },
                { label: "Technical Library", href: "/technical-library" },
                { label: "Case Studies", href: "/resources/case-studies" },
                { label: "Videos", href: "/resources/videos" },
            ],
        },
        {
            label: "Contact Us",
            href: "/contact",
        },
    ]);


    const { products } = useFetchAllProducts();
    const { solutions } = useFetchAllSolutions();


    useEffect(() => {
        if (!products.length && !solutions.length) return;

        setMainNavLinks((prev: NavLink[]) =>
            prev.map((link): NavLink => {
                if (link.label === "Products") {
                    return {
                        ...link,
                        submenu: [
                            ...buildCategoryMenu(products, "products"),
                            {
                                label: "All Products →",
                                href: "/products",
                            },
                        ],
                    };
                }

                if (link.label === "Solutions") {
                    return {
                        ...link,
                        submenu: buildCategoryMenu(solutions, "solutions"),
                    };
                }

                return link;
            })
        );
    }, [products, solutions]);



    const buildCategoryMenu = (
        items: any[],
        basePath: string
    ) => {
        const categories = Array.from(
            new Set(items.map((i) => i.category).filter(Boolean))
        );

        return categories.map((category) => ({
            label: category,
            isCategory: true,
            items: items
                .filter((i) => i.category === category)
                .map((i) => ({
                    label: i.name,
                    href: `/${basePath}/${i.slug ?? i.id}`,
                })),
        }));
    };


    return (
        <header className="sticky top-0 z-50 bg-white">
            <div className="bg-gray-100 text-sm text-gray-700 h-9 hidden lg:flex">
                <nav
                    aria-label="Utility navigation"
                    className="max-w-350 mx-auto w-10/12 justify-end flex items-center"
                >
                    <ul className="flex justify-center items-center space-x-3">
                        <li>
                            <Link
                                href="/shop"
                                className="hover:text-blue-500 text-xs"
                            >
                                Shop
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => setLanguageModalOpen(true)}
                                className="hover:text-blue-500 flex items-center text-xs"
                                aria-label="Select language"
                            >
                                <Earth size={16} />
                            </button>
                        </li>

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
                                    <div className="flex items-center gap-x-1">
                                        <Link
                                            href={item.href}
                                            className="flex items-center gap-1 text-xs hover:text-primary-500"
                                        >
                                            {item.label}
                                        </Link>
                                        {item.submenu && <span className="flex items-center gap-1 cursor-pointer text-xs hover:text-primary-500">
                                            <ChevronDown
                                                size={14}
                                                className="transition-transform duration-200"
                                            />
                                        </span>}
                                    </div>
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
                                            {item.submenu?.map((sub: any) => (
                                                <li key={sub.label}>
                                                    {sub.isCategory ? (
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
                                                        <Link
                                                            href={sub.href}
                                                            className={`block px-4 py-2 text-xs hover:bg-gray-100 ${sub.highlight ? "font-semibold text-primary-600" : ""
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
                        href="/contact"
                        className="bg-primary-600 w-30   text-white font-light py-2.5   text-xs rounded-full transition text-center "
                    >
                        Request a quote
                    </Link>
                </div>

                <Earth onClick={() => setLanguageModalOpen(true)}
                    className="md:hidden text-gray-600" />
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
                                            className={`overflow-hidden transition-all duration-300 ${openSubmenu === item.label ? "max-h-150" : "max-h-0"
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

                        <li className="pt-4 w-full">
                            <Link
                                href="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <button className="bg-primary-600 w-full text-white font-light py-2.5   text-xs rounded-full transition  "
                                >
                                    Request a quote
                                </button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
            <LanguageModal
                open={languageModalOpen}
                onClose={() => setLanguageModalOpen(false)}
            />

        </header>
    );
}
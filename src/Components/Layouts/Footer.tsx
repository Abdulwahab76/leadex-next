import Link from "next/link";
import { Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    const mainNavLinks = [
        { href: "/products", label: "Products" },
        { href: "/pricing", label: "Pricing" },
        { href: "/sustainability", label: "Sustainability" },
        { href: "/blogs", label: "Blogs" },
        { href: "/about", label: "About" },
    ];
    return (
        <footer className="bg-linear-to-b from-[#1b1f2a] to-[#151822] text-gray-400">

            {/* Top divider */}
            <div className="border-t border-white/10" />

            {/* Main footer */}
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-12 md:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Image src='/images/Bodenlink.png' width={150} height={150} alt="logo" />

                        <p className="mt-4 text-sm leading-relaxed">
                            Engineered butyl solutions for long-term protection and performance.
                        </p>
                    </div>

                    {/* Solutions */}
                    <div className="md:border-l md:border-white/10 md:pl-8">
                        <h4 className="text-white text-sm font-medium mb-4">
                            Solutions
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#">Roofing Waterproofing</Link></li>
                            <li><Link href="#">Flashing Systems</Link></li>
                            <li><Link href="#">Building Envelope</Link></li>
                            <li><Link href="#">Industrial Sealing</Link></li>
                        </ul>
                    </div>

                    {/* Products */}
                    <div className="md:border-l md:border-white/10 md:pl-8">
                        <h4 className="text-white text-sm font-medium mb-4">
                            Products
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#">Roof Repair</Link></li>
                            <li><Link href="#">Waterproof Sealing</Link></li>
                            <li><Link href="#">Sound Deadening</Link></li>
                            <li><Link href="#">All Products</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="md:border-l md:border-white/10 md:pl-8">
                        <h4 className="text-white text-sm font-medium mb-4">
                            Resources
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#">Insights</Link></li>
                            <li><Link href="#">Installation Guides</Link></li>
                            <li><Link href="#">Technical Library</Link></li>
                            <li><Link href="#">Case Studies</Link></li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Bottom links */}
            <div className="border-t border-white/10">
                <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">

                    {/* Legal */}
                    <div className="flex flex-wrap gap-4">
                        {mainNavLinks.map((item) =>

                            <Link href={item.href}>{item.label}</Link>
                        )}
                    </div>

                    {/* Social */}
                    <div className="flex gap-4">
                        <Link href="#"><Linkedin size={16} /></Link>
                        <Link href="#"><Youtube size={16} /></Link>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-xs py-4 text-gray-500">
                © 2026 BodenLink. All rights reserved. Professional-grade solutions for global markets.
            </div>

        </footer>
    );
}

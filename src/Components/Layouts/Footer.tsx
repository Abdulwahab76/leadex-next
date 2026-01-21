import Link from "next/link";
import { Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    const mainNavLinks = [
        { href: "/terms-of-services ", label: "Terms of Services " },
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/blogs", label: "Blogs" },
        { href: "/sustainability  ", label: "Sustainability  " },
        { href: "/about", label: "About" },
    ];
    const subMenu = [
        { label: "Roofing Waterproofing Systems", href: "/solutions/roofing-waterproofing-systems" },
        { label: "Fire Protection & Fireproofing", href: "/solutions/flashing-protection-fireproofing" },
        { label: "Butyl Waterproofing & Sealing", href: "/solutions/butyle-Waterproofing-sealing" },
        { label: "Automotive Noise & Vibration Control", href: "/solutions/automotive-noise-vibration-control" }
    ]

    const subMenuProduct = [
        {
            label: "BuildCore",
            isCategory: true,
            items: [
                { label: "RoofBond™ Waterproofing", href: "/products/roof-repair/flexoflash" },
                { label: "FrameFlash™ Waterproof & Sealing", href: "/products/buildcore/frameflash" },
                { label: "ThermaSnap Super Seal", href: "/products/buildcore/thermasnap" },
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
    ]
    return (
        <footer className="bg-linear-to-b from-[#1b1f2a] to-[#151822] text-gray-400">

            {/* Top divider */}
            <div className="border-t border-white/10" />

            {/* Main footer */}
            <section className="max-w-350 w-11/12 px-2 lg:px-0 lg:w-10/12  mx-auto py-16 ">
                <div className="grid gap-12 md:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Image src='/images/Bodenlink.png' width={150} height={150} alt="logo" />

                        <p className="mt-4 text-sm leading-relaxed">
                            We Propect, We Perform, We Innovate
                        </p>
                    </div>

                    {/* Solutions */}
                    <div className="md:border-l md:border-white/10 md:pl-8">
                        <h4 className="text-white text-sm font-medium mb-4">
                            Solutions
                        </h4>
                        <ul className="space-y-2 text-sm *:hover:text-blue-500 transition-colors">
                            {subMenu.map((item, ind) => <li key={ind}><Link href={item.href}>{item.label}</Link></li>)}

                        </ul>
                    </div>

                    {/* Products */}
                    <div className="md:border-l md:border-white/10 md:pl-8">
                        <h4 className="text-white text-sm font-medium mb-4">
                            Products
                        </h4>
                        <ul className="space-y-2 text-sm *:hover:text-blue-500 transition-colors">
                            {subMenuProduct.map((item) =>
                                item.items?.map((subItem, index) => <li key={index}><Link href="#">{subItem.label}</Link></li>))}

                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="md:border-l md:border-white/10 md:pl-8">
                        <h4 className="text-white text-sm font-medium mb-4">
                            Resources
                        </h4>
                        <ul className="space-y-2 text-sm *:hover:text-blue-500 transition-colors">
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
                <div className="mx-auto   max-w-350 w-11/12 px-2 lg:px-0 lg:w-10/12   py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">

                    {/* Legal */}
                    <div className="flex flex-wrap gap-4">
                        {mainNavLinks.map((item, index) =>

                            <Link key={index} href={item.href}>{item.label}</Link>
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

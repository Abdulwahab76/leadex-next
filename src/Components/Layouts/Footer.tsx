import Link from "next/link";
import Image from "next/image";
import { Linkedin, Youtube } from "lucide-react";
import { getFooterLinks, NavLink } from "@/lib/navigation";
 
export default async function Footer() {
    const mainNavLinks: NavLink[] = await getFooterLinks();

    return (
        <footer className="bg-linear-to-b from-[#1b1f2a] to-[#151822] text-gray-400">
            {/* Top divider */}
            <div className="border-t border-white/10" />

            {/* Main footer */}
            <section className="max-w-350 w-11/12 px-2 lg:px-0 lg:w-10/12 mx-auto py-16">
                <div className="grid gap-12 md:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <Image src="/images/Bodenlink.png" width={150} height={150} alt="logo" />
                        <p className="mt-4 text-sm leading-relaxed">Protection. Performance. Perfected</p>
                    </div>

                    {/* Solutions */}
                    <div className="md:border-l md:border-white/10 md:pl-8">
                        <h4 className="text-white text-sm font-medium mb-4">Solutions</h4>
                        <ul className="space-y-2 text-sm transition-colors">
                            {mainNavLinks
                                .find((link) => link.label === "Solutions")
                                ?.submenu?.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.href!}>{item.label}</Link>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div className="md:border-l md:border-white/10 md:pl-8">
                        <h4 className="text-white text-sm font-medium mb-4">Products</h4>
                        <ul className="space-y-2 text-sm transition-colors">
                            {mainNavLinks
                                .find((link) => link.label === "Products")
                                ?.submenu?.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.href!}>{item.label}</Link>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="md:border-l md:border-white/10 md:pl-8">
                        <h4 className="text-white text-sm font-medium mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm transition-colors">
                            {mainNavLinks
                                .find((link) => link.label === "Resources")
                                ?.submenu?.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.href!}>{item.label}</Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Bottom links */}
            <div className="border-t border-white/10">
                <div className="mx-auto max-w-350 w-11/12 lg:w-10/12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
                    {/* Legal */}
                    <div className="flex flex-wrap gap-4">
                        {mainNavLinks
                            .filter((link) => !link.submenu)
                            .map((link, index) => (
                                <Link key={index} href={link.href!}>
                                    {link.label}
                                </Link>
                            ))}
                    </div>

                    {/* Social */}
                    <div className="flex gap-4">
                        <Link href="#">
                            <Linkedin size={16} />
                        </Link>
                        <Link href="#">
                            <Youtube size={16} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-xs py-4 text-gray-500 px-3">
                © 2026 BodenLink. All rights reserved. Professional-grade solutions for global markets.
            </div>
        </footer>
    );
}

import Link from "next/link";
import { Instagram, Facebook, Linkedin, Video, Search } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-900">
            {/* Top Section */}
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-12 md:grid-cols-2">
                    {/* Left */}
                    <div>
                        <h3 className="text-xl font-bold">
                            Don&apos;t miss out on anything Leadax
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">Follow our socials</p>

                        <div className="mt-4 flex gap-4">
                            <Link href="#"><Instagram size={20} /></Link>
                            <Link href="#"><Facebook size={20} /></Link>
                            <Link href="#"><Linkedin size={20} /></Link>
                            <Link href="#"><Video size={20} /></Link>
                        </div>
                    </div>

                    {/* Right */}
                    <div>
                        <h3 className="text-lg font-bold">Newsletter</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Sign up to stay informed
                        </p>

                        <form className="mt-4 flex flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                placeholder="E-mail address..."
                                className="flex-1 rounded-md border px-4 py-3 text-sm focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="rounded-full bg-white px-6 py-3 text-sm font-medium shadow hover:bg-gray-200 transition"
                            >
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Links Section */}
            <nav className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-sm">
                    {/* Column 1 */}
                    <div>
                        <h4 className="font-bold">About Leadax</h4>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="#">All products</Link></li>
                            <li><Link href="#">Our story</Link></li>
                            <li><Link href="#">FAQ</Link></li>
                            <li><Link href="#">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="font-bold">Direct</h4>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="#">Request sample</Link></li>
                            <li><Link href="#">Book a demo</Link></li>
                            <li><Link href="#">Download documents</Link></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="font-bold">Information</h4>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="#">For processors</Link></li>
                            <li><Link href="#">For architects</Link></li>
                            <li><Link href="#">For prefab</Link></li>
                            <li><Link href="#">For retailers</Link></li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <address className="not-italic">
                        <h4 className="font-bold">Contact</h4>
                        <p className="mt-4">
                            Ir. R.R. van der Zeelaan 10<br />
                            8191 HZ Wapenveld, The Netherlands
                        </p>
                        <p className="mt-3">
                            Chamber of Commerce nr: 78460395
                        </p>
                        <p className="mt-1">
                            VAT nr: NL857178532B01
                        </p>
                    </address>
                </div>
            </nav>
            <div className="flex py-6 bg-primary-800 justify-between items-center flex-col md:flex-row px-14">
                {/* Bottom Bar */}
                <div className=" py-4 text-center text-sm text-white">
                    © 2026 Leadax B.V.
                </div>

                <div className="flex gap-x-3   py-4 h-10 items-center">
                    <input type="text" placeholder="search" className="bg-white/50 px-3 text-white outline-none py-2" />
                    <button><Search color="white" /></button>
                </div>
            </div>

        </footer>
    );
}

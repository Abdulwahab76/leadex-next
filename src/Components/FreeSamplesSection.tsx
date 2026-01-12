import Image from "next/image";
import { JSX } from "react";

export default function FreeSamplesSection(): JSX.Element {
    return (
        <section
            aria-labelledby="samples-heading"
            className="relative overflow-hidden bg-primary-400"
        >
            <div className="mx-auto max-w-7xl px-6 py-16 lg:py-16">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* LEFT CONTENT */}
                    <div>
                        <h2
                            id="samples-heading"
                            className="text-lg font-medium tracking-tight text-black sm:text-5xl"
                        >
                            Get your free samples now!
                        </h2>

                        <ul className="mt-8 space-y-3 text-lg text-black">
                            <li className="flex items-start gap-3">
                                <span className="text-green-600">✓</span>
                                <span>No strings attached. You're not tied down to anything.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-600">✓</span>
                                <span>Free delivery, everywhere in the world.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-600">✓</span>
                                <span>
                                    Samples of our lead replacement and roofing membrane.
                                </span>
                            </li>
                        </ul>

                        <button
                            className="mt-10 rounded-full bg-white px-8 py-4 text-base font-semibold text-black shadow transition hover:bg-gray-100"
                            aria-label="Get free samples"
                        >
                            Get samples
                        </button>
                    </div>

                    {/* RIGHT IMAGES */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative   h-96 w-full max-w-md sm:h-90">
                            <Image
                                src="/images/Sampledoos.webp"
                                alt="Leadax sample products"
                                fill
                                className="object-contain h-full w-full"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom divider */}
            <div className="absolute bottom-0 left-0 h-2 w-full bg-white" />
        </section>
    );
}

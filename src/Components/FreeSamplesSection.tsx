import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

export default function FreeSamplesSection(): JSX.Element {
    return (
        <section
            aria-labelledby="samples-heading"
            className="relative overflow-visible bg-primary-500  lg:py-0 pt-10 "
        >
            <div className="mx-auto max-w-350 w-10/12   ">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* LEFT CONTENT */}
                    <div className="flex flex-col gap-y-8">
                        <h2
                            id="samples-heading"
                            className="text-2xl font-medium tracking-tight text-white sm:text-4xl"
                        >
                            Get your free samples now!
                        </h2>

                        <ul className=" *:text-xs space-y-0 text-lg text-white">
                            <li className="flex items-start gap-3">
                                <span className="text-green-800">✓</span>
                                <span>No strings attached. You're not tied down to anything.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-800">✓</span>
                                <span>Free delivery, everywhere in the world.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-800">✓</span>
                                <span>
                                    Samples of our lead replacement and roofing membrane.
                                </span>
                            </li>
                        </ul>

                        <Link href='/contact'> <button
                            className=" w-fit rounded-full bg-white px-5 py-2.5 cursor-pointer text-xs font-normal text-black shadow-2xl transition hover:bg-gray-100"
                            aria-label="Get free samples"
                        >
                            Get samples

                        </button>
                        </Link>
                    </div>

                    {/* RIGHT IMAGES */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative  h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-11/12">
                            <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 w-full h-full">
                                <Image
                                    src="/images/Sampledoos.webp"
                                    alt="Leadax sample products"
                                    width={440}
                                    height={440}
                                    className="object-contain h-full w-full"
                                    priority
                                />
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </section>
    );
}

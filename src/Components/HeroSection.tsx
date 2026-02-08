import Image from "next/image";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { montserratHero } from "@/app/font";

export default async function HeroSection() {
    // Fallbacks (used only if Firestore fails)
    let heroTitle = "REDISCOVER IRELAND'S TIMELESS TREASURES";
    let heroPara = "Authentic Irish gifts, made with pride and tradition.";
    let heroImage = "/images/hero-bg.png";

    try {
        const docRef = doc(db, "landingPage", "landingPageHero");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            heroTitle = data.title ?? heroTitle;
            heroPara = data.para ?? heroPara;
            heroImage = data.backgroundImage ?? heroImage;
        }
    } catch (error) {
        console.error("Error fetching hero section data:", error);
    }

    return (
        <section
            className={`relative h-[90vh] w-full flex items-center justify-center overflow-hidden ${montserratHero.className}`}
        >
            {/* Background Image */}
            <Image
                src={heroImage}
                alt="Hero background"
                fill
                priority
                sizes="100vw"
                className="object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Content */}
            <div className="relative z-10 w-full flex flex-col items-center text-white text-center translate-y-[2vh] px-4">
                {/* Heading */}
                <h1
                    className="
    max-w-225
    font-extrabold
    uppercase
    tracking-normal
    leading-[1.06]
    text-[32px]
    md:text-[42px]
    lg:text-[54px]
    xl:text-[60px]
    [text-shadow:0_2px_4px_rgba(0,0,0,0.55),0_8px_18px_rgba(0,0,0,0.75)]
  "
                >
                    {heroTitle.slice(0, 14)}
                    <br />
                    {heroTitle.slice(14)}
                </h1>


                {/* Paragraph */}
                <p
                    className="
            mt-4
            max-w-140
            text-[12px]
            font-normal
            uppercase
            tracking-[0.12em]
            drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]
          "
                >
                    {heroPara}
                </p>

                {/* Buttons */}
                <div
                    className="
            mt-4
            flex
            flex-col
            sm:flex-row
            lg:gap-7
            gap-4
            w-full
            sm:w-auto
            items-center
            justify-center
          "
                >
                    {/* Primary Button */}
                    <Link href="/contact">
                        <button
                            className="
                w-full
                sm:w-auto
                min-w-60
                px-10
                py-3.5
                text-[12px]
                font-bold
                uppercase
                tracking-widest
                bg-[#2a63a0]
                shadow-[-4px_8px_18px_rgba(0,0,0,0.45)]
                cursor-pointer
              "
                        >
                            Free Sample
                        </button>
                    </Link>

                    {/* Secondary Button */}
                    <Link href="/contact">
                        <button
                            className="
                w-full
                sm:w-auto
                min-w-60
                border
                border-white/70
                bg-white/10
                px-10
                py-3.5
                text-[12px]
                font-bold
                uppercase
                tracking-widest
                backdrop-blur-sm
                transition
                hover:bg-white/20
                cursor-pointer
              "
                        >
                            Request a Quote
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

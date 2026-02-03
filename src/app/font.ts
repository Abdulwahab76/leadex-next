import { Montserrat } from "next/font/google";

export const montserratHero = Montserrat({
    subsets: ["latin"],
    weight: ['400', "700", "800"],
    display: "swap",
    variable: "--font-montserrat-hero",
});

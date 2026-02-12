import {

    doc,
    getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";


export interface PrivacyContent {
    title: string;
    lastUpdated?: string;
    intro: string;
}

export const getPrivacyContent = async (): Promise<PrivacyContent | null> => {
    const docRef = doc(db, "privacy", "privacyContent");
    const snap = await getDoc(docRef);

    if (!snap.exists()) return null;

    return snap.data() as PrivacyContent;
};

export interface AboutSection {
    title: string;
    paragraphs: string[];
}

export interface AboutContent {
    aboutTitle: string;
    aboutIntro: string;
    sections: AboutSection[];
}

export const getAboutContent = async (): Promise<AboutContent | null> => {
    try {
        const docRef = doc(db, "landingPage", "landingPageAbout");
        const snap = await getDoc(docRef);

        if (!snap.exists()) return null;

        return snap.data() as AboutContent;
    } catch (error) {
        console.error("Error fetching About content:", error);
        return null;
    }
};


export interface Section {
    title: string;
    paragraphs: string[];
}

export interface TermsContent {
    termsTitle: string;
    termsIntro: string;
    sections: Section[];
    date: string;
}

export const getTermsContent = async (): Promise<TermsContent | null> => {
    try {
        const docRef = doc(db, "landingPage", "landingPageTerms");
        const snap = await getDoc(docRef);

        if (!snap.exists()) return null;

        return snap.data() as TermsContent;
    } catch (error) {
        console.error("Error fetching Terms content:", error);
        return null;
    }
};



export interface LandingPageHero {
    title: string;
    para: string;
    backgroundImage: string;

    ProductHeading: string;
    ProductPara: string;
    SolutionHeading: string;

    distributorHeading: string;
    partnerHeading: string;

    companyLogos: string[];
}


export const getLandingPageHero = async (): Promise<LandingPageHero | null> => {
    try {
        const docRef = doc(db, "landingPage", "landingPageHero");
        const snap = await getDoc(docRef);

        if (!snap.exists()) return null;

        return snap.data() as LandingPageHero;
    } catch (error) {
        console.error("Error fetching Landing Page Hero:", error);
        return null;
    }
};
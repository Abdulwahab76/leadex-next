import {

    doc,
    getDoc,
} from "firebase/firestore";
import { Solution } from "@/hooks/useFetchAllSolutions";
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
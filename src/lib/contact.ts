import {

    doc,
    getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
export interface ContactContent {
    title: string;
    address: string;
    postal: string;
    phone: string;
    fax: string;
    stockistTitle: string;
    stockistPara: string;
    stockistButton: string;
}

export const getContactContent = async (): Promise<ContactContent | null> => {
    try {
        const docRef = doc(db, "contact", "contactContent");
        const snap = await getDoc(docRef);
        if (!snap.exists()) return null;
        return snap.data() as ContactContent;
    } catch (error) {
        console.error("Error fetching contact content:", error);
        return null;
    }
};

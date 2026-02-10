import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export async function getHeroContent() {
    const docRef = doc(db, "landingPage", "landingPageHero");
    const docSnap = await getDoc(docRef);

    const data = docSnap.data();


    return {
        heading: data.landingPage,
        paragraph: data.paragraph,
        imageUrl,
    };
}

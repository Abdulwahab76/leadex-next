import SolutionClient from "@/Components/SolutionClient";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import { Solution } from "@/hooks/useFetchAllSolutions";

interface SolutionPageProps {
    params: { slug: string }; // slug or document ID
}

export default async function SolutionPage({ params }: SolutionPageProps) {
    const { slug } = await params;

    let solution: Solution | null = null;

    try {
        // Fetch Firestore document by ID
        const docRef = doc(db, "solutions", slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            solution = {
                id: docSnap.id,
                background_image: data.background_image ?? "",
                category: data.category ?? "",
                contentHeading: data.contentHeading ?? "",
                contentImg: data.contentImg ?? "",
                contentPara: data.contentPara ?? "",
                heroPara: data.heroPara ?? "",
                name: data.name ?? "",
                solutionSections: data.solutionSections ?? {},
            };
        } else {
            console.error("Solution not found:", slug);
        }
    } catch (err) {
        console.error("Error fetching solution:", err);
    }

    // Pass server-fetched solution to client component
    return <SolutionClient solution={solution} />;
}

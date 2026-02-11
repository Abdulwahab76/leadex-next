import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
} from "firebase/firestore";
import { Solution } from "@/hooks/useFetchAllSolutions";
import { db } from "../../firebase/firebaseConfig";

const solutionCollection = collection(db, "solutions");

// GET ALL
export const getAllSolutions = async () => {
    const snapshot = await getDocs(solutionCollection);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Solution[];
};

// GET ONE
export const getSolutionById = async (id: string) => {
    const docRef = doc(db, "solutions", id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as Solution;
};

// CREATE
export const createSolution = async (data: Omit<Solution, "id">) => {
    return await addDoc(solutionCollection, data);
};

// UPDATE
export const updateSolution = async (
    id: string,
    data: Partial<Solution>
) => {
    const docRef = doc(db, "solutions", id);
    return await updateDoc(docRef, data);
};

// DELETE
export const deleteSolution = async (id: string) => {
    const docRef = doc(db, "solutions", id);
    return await deleteDoc(docRef);
};

// Fetch the privacy content from Firestore


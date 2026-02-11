import { useEffect, useState, useCallback } from "react";
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export interface SolutionSection {
  descp: string;
  title: string;
  imgs: string[];
}

export interface Solution {
  id: string;
  background_image: string;
  category: string;
  contentHeading: string;
  contentImg: string;
  contentPara: string;
  heroPara: string;
  name: string;
  solutionSections: Record<string, SolutionSection>;
  videos?: Record<string, string>; // 👈 add this
}


interface UseFetchAllSolutionsResult {
  solutions: Solution[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useFetchAllSolutions = (): UseFetchAllSolutionsResult => {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSolutions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const querySnapshot = await getDocs(collection(db, "solutions"));

      const fetchedSolutions: Solution[] = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          ...doc.data(),
        } as Solution)
      );

      setSolutions(fetchedSolutions);
    } catch (err) {
      console.error("Error fetching solutions:", err);
      setError("Failed to fetch solutions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions]);

  return {
    solutions,
    loading,
    error,
    refetch: fetchSolutions,
  };
};

import { useEffect, useState, useCallback } from "react";
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; // adjust path if needed

// 🔴 You SHOULD replace this with a real Product interface
export interface Product {
  id: string;
  [key: string]: any;
}

interface UseFetchAllsolutionsResult {
  solutions: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useFetchAllSolutions = (): UseFetchAllsolutionsResult => {
  const [solutions, setsolutions] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchsolutions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const querySnapshot = await getDocs(collection(db, "solutions"));

      const fetchedsolutions = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

      setsolutions(fetchedsolutions);
    } catch (err) {
      console.error("Error fetching solutions:", err);
      setError("Failed to fetch solutions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchsolutions();
  }, [fetchsolutions]);

  return {
    solutions,
    loading,
    error,
    refetch: fetchsolutions,
  };
};

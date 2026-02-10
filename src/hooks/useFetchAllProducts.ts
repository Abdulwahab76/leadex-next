import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

/* ✅ Real product shape (current Firestore truth) */
export interface Product {
  id: string;

  name: string;
  slug?: string; // optional (not in Firestore yet)

  short_desc: string;
  description: string;
  category: string;

  specifications: {
    title: string;
    value: string;
  }[];

  Application?: {
    "Roof Nodes"?: string[];
    "Penetrations"?: string[];
    "Repairs"?: string[];
  };

  /* 🔥 READY FOR NEXT DATA (optional, safe) */
  features?: {
    title: string;
    descp: string;
  }[];

  faqs?: {
    question: string;
    answer: string;
  }[];
  colors: Record<string, string[]>
  free_samples: {
    title: string;
    checklist: string[];
    img?: string;
  }
}


interface UseFetchAllProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useFetchAllProducts = (): UseFetchAllProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const snapshot = await getDocs(collection(db, "products"));

      const fetchedProducts: Product[] = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          name: data.name,
          slug: data.slug,
          short_desc: data.short_desc,
          description: data.description,
          category: data.category,
          specifications: data.specifications ?? [],
          Application: data.Application ?? {},
          faqs: data.faqs ?? [],
          features: data.product_features ?? [],
          colors: data.colors ?? [],
          free_samples: data.free_samples ?? [],
        };
      });

      setProducts(fetchedProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
};

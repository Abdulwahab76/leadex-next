// lib/products.ts
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

/* ✅ Real product shape (matching Firestore) */
export interface Product {
    id: string;

    name: string;
    slug?: string;

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

    features?: {
        title: string;
        descp: string;
    }[];

    faqs?: {
        question: string;
        answer: string;
    }[];

    colors: Record<string, string[]>;
    free_samples: {
        title: string;
        checklist: string[];
        img?: string;
    };
}

export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const snapshot = await getDocs(collection(db, "products"));

        return snapshot.docs.map((doc) => {
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
                colors: data.colors ?? {},
                free_samples: data.free_samples ?? {},
            } as Product;
        });
    } catch (err) {
        console.error("Error fetching products:", err);
        return [];
    }
};

// GET ONE PRODUCT BY ID
export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        const docRef = doc(db, "products", id);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) return null;

        const data = snapshot.data();
        return {
            id: snapshot.id,
            name: data.name,
            slug: data.slug,
            short_desc: data.short_desc,
            description: data.description,
            category: data.category,
            specifications: data.specifications ?? [],
            Application: data.Application ?? {},
            faqs: data.faqs ?? [],
            features: data.product_features ?? [],
            colors: data.colors ?? {},
            free_samples: data.free_samples ?? {},
        } as Product;
    } catch (err) {
        console.error("Error fetching product by ID:", err);
        return null;
    }
};

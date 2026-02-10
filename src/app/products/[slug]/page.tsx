import ProductClientNew from "@/Components/ProductClientNew";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import { Product } from "@/hooks/useFetchAllProducts";

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    let products: Product[] = [];

    try {
        const snapshot = await getDocs(collection(db, "products"));
        products = snapshot.docs.map((doc) => {
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
            };
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }

    return (
        <main>
            <ProductClientNew slug={slug} products={products} />
        </main>
    );
}

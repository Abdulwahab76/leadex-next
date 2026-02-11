
import { doc, getDoc } from "firebase/firestore";
import { Product } from "@/hooks/useFetchAllProducts";
import ProductForm from "@/Components/ProductForm";
import { db } from "../../../../../../firebase/firebaseConfig";

interface Props {
    params: { slug: string };
}

export default async function EditProductPage({ params }: Props) {
    const { slug } = await params

    const snap = await getDoc(doc(db, "products", slug));

    if (!snap.exists()) {
        return <div className="p-6">Product not found</div>;
    }

    const product = {
        id: snap.id,
        ...snap.data(),
    } as Product;

    return <ProductForm mode="edit" initialProduct={product} />;

}

'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/Components/ui/table";

import { DropdownButton } from "@/Components/common/dropdown-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { auth, db } from "../../../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  addDoc
} from "firebase/firestore";

import { Product } from "@/hooks/useFetchAllProducts";
import { ProductModal } from "@/Components/productModal";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const router = useRouter();

  /* ---------------- AUTH ---------------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.replace("/admin/login");
      else setAuthLoading(false);
    });
    return () => unsub();
  }, [router]);

  /* ---------------- FETCH PRODUCTS ---------------- */
  async function fetchProducts() {
    try {
      setLoading(true);
      const snapshot = await getDocs(query(collection(db, "products")));

      const list: Product[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data() as any;
        return {
          id: docSnap.id,
          name: d.name || "",
          slug: d.slug || "",
          category: d.category || "",
          short_desc: d.short_desc || "",
          description: d.description || "",

          specifications: d.specifications || [],
          Application: d.Application || {},
          product_features: d.product_features || [],
          faqs: d.faqs || [],
          colors: d.colors || {},
          free_samples: d.free_samples || { title: "", checklist: [] },

          active: d.active ?? true,
        };
      });

      setProducts(list);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!authLoading) fetchProducts();
  }, [authLoading]);

  /* ---------------- DELETE ---------------- */
  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;

    const toastId = toast.loading("Deleting...");
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts((p) => p.filter((x) => x.id !== id));
      toast.success("Deleted", { id: toastId });
    } catch (e) {
      console.error(e);
      toast.error("Delete failed", { id: toastId });
    }
  }

  if (authLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl animate-pulse">Checking Auth...</h2>
      </div>
    );

  return (
    <div className="wrapper py-10 font-inria">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Product Management</h1>
        <button
          // onClick={() => {
          //   setEditProduct(null);
          //   setShowModal(true);
          // }}
          onClick={() => router.push("/admin/products/new")}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md"
        >
          Add Product
        </button>

      </div>

      {/* TABLE */}
      {loading ? (
        <div className="text-center py-20 text-2xl animate-pulse">
          Loading products...
        </div>
      ) : (
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.length ? (
              products.map((p) => (
                <TableRow key={p.id} >
                  <TableCell>{p.name}</TableCell>
                  <TableCell className="text-center">{p.category}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <TableCell className="flex justify-start gap-2">
                      <DropdownButton
                        product={p}
                        onEdit={(product) => {
                          setEditProduct(product);
                          setShowModal(true);
                        }}
                        onDelete={handleDelete} // already defined in your component
                      />
                    </TableCell>

                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {showModal && (
        <ProductModal
          mode={editProduct ? "edit" : "add"}
          product={editProduct ?? undefined}
          onClose={() => {
            setShowModal(false);
            setEditProduct(null);
          }}
          onSuccess={(savedProduct) => {
            setProducts((prev) => {
              if (editProduct) {
                // UPDATE in list
                return prev.map((p) =>
                  p.id === savedProduct.id ? savedProduct : p
                );
              }
              // ADD to list
              return [savedProduct, ...prev];
            });
          }}
        />
      )}

    </div>
  );
}



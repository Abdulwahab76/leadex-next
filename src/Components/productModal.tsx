"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
    addDoc,
    collection,
    doc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";
import { Product } from "@/hooks/useFetchAllProducts";
import { db } from "../../firebase/firebaseConfig";
import { ApplicationEditor } from "./ApplicationEditor";

interface Props {
    mode: "add" | "edit";
    product?: Product; // only for edit
    onClose: () => void;
    onSuccess: (p: Product) => void;
}

export function ProductModal({
    mode,
    product,
    onClose,
    onSuccess,
}: Props) {
    const [form, setForm] = useState<Product>({
        id: product?.id || "",
        name: product?.name || "",
        short_desc: product?.short_desc || "",
        description: product?.description || "",
        category: product?.category || "",

        specifications: product?.specifications || [],
        Application: product?.Application || {
            "Roof Nodes": [],
            "Penetrations": [],
            "Repairs": [],
        },

        features: product?.features || [],
        faqs: product?.faqs || [],
        colors: product?.colors || {},

        free_samples: product?.free_samples || {
            title: "",
            checklist: [],
            img: "",
        },
    });


    const [saving, setSaving] = useState(false);

    /* ---------- IMAGE LIST HANDLER (URL BASED) ---------- */
    function addImage(color: string, url: string) {
        if (!url) return;

        setForm((prev) => ({
            ...prev,
            colors: {
                ...prev.colors,
                [color]: [...(prev.colors[color] || []), url],
            },
        }));
    }

    function removeImage(color: string, index: number) {
        setForm((prev) => ({
            ...prev,
            colors: {
                ...prev.colors,
                [color]: prev.colors[color].filter((_, i) => i !== index),
            },
        }));
    }

    /* ---------- SAVE ---------- */
    async function handleSave() {
        if (!form.name || !form.category) {
            toast.error("Name and category are required");
            return;
        }

        const toastId = toast.loading(
            mode === "add" ? "Creating product..." : "Updating product..."
        );

        setSaving(true);

        try {
            if (mode === "add") {
                const ref = await addDoc(collection(db, "products"), {
                    name: form.name,
                    category: form.category,
                    short_desc: form.short_desc,
                    description: form.description,
                    specifications: form.specifications,
                    Application: form.Application,
                    product_features: form.features,
                    faqs: form.faqs,
                    colors: form.colors,
                    free_samples: form.free_samples,

                    active: true,
                    createdAt: serverTimestamp(),
                });

                onSuccess({ ...form, id: ref.id });
            } else {
                await updateDoc(doc(db, "products", form.id), {
                    name: form.name,
                    category: form.category,
                    short_desc: form.short_desc,
                    description: form.description,

                    specifications: form.specifications,
                    Application: form.Application,
                    product_features: form.features,
                    faqs: form.faqs,
                    colors: form.colors,
                    free_samples: form.free_samples,
                });

                onSuccess(form);
            }

            toast.success(
                mode === "add" ? "Product created" : "Product updated",
                { id: toastId }
            );
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Save failed", { id: toastId });
        } finally {
            setSaving(false);
        }
    }

    /* ---------- UI ---------- */
    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh]">
                <h2 className="text-2xl font-bold mb-4">
                    {mode === "add" ? "Add Product" : "Edit Product"}
                </h2>

                {/* BASIC INFO */}
                <div className="grid grid-cols-1 gap-3 mb-4">
                    <input
                        className="border p-2 rounded"
                        placeholder="Product name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <input
                        className="border p-2 rounded"
                        placeholder="Category"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />

                    <textarea
                        className="border p-2 rounded"
                        placeholder="Short description"
                        value={form.short_desc}
                        onChange={(e) =>
                            setForm({ ...form, short_desc: e.target.value })
                        }
                    />

                    <textarea
                        className="border p-2 rounded min-h-30"
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                    />
                </div>
                {/* APPLICATION */}
                <h3 className="font-semibold mt-4 mb-2">Applications</h3>

                <ApplicationEditor
                    title="Roof Nodes"
                    items={form.Application?.["Roof Nodes"] || []}
                    onChange={(items) =>
                        setForm((prev) => ({
                            ...prev,
                            Application: { ...prev.Application, "Roof Nodes": items },
                        }))
                    }
                />

                <ApplicationEditor
                    title="Penetrations"
                    items={form.Application?.["Penetrations"] || []}
                    onChange={(items) =>
                        setForm((prev) => ({
                            ...prev,
                            Application: { ...prev.Application, "Penetrations": items },
                        }))
                    }
                />

                <ApplicationEditor
                    title="Repairs"
                    items={form.Application?.["Repairs"] || []}
                    onChange={(items) =>
                        setForm((prev) => ({
                            ...prev,
                            Application: { ...prev.Application, "Repairs": items },
                        }))
                    }
                />
                {/* SPECIFICATIONS */}
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Specifications</h3>

                    {/* EXISTING SPECS */}
                    {form.specifications.map((spec, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                className="border p-2 rounded flex-1"
                                placeholder="Title"
                                value={spec.title}
                                onChange={(e) => {
                                    const updated = [...form.specifications];
                                    updated[index] = {
                                        ...updated[index],
                                        title: e.target.value,
                                    };
                                    setForm({ ...form, specifications: updated });
                                }}
                            />

                            <input
                                className="border p-2 rounded flex-1"
                                placeholder="Value"
                                value={spec.value}
                                onChange={(e) => {
                                    const updated = [...form.specifications];
                                    updated[index] = {
                                        ...updated[index],
                                        value: e.target.value,
                                    };
                                    setForm({ ...form, specifications: updated });
                                }}
                            />

                            <button
                                onClick={() => {
                                    setForm({
                                        ...form,
                                        specifications: form.specifications.filter(
                                            (_, i) => i !== index
                                        ),
                                    });
                                }}
                                className="text-red-500 px-2"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {/* ADD NEW SPEC */}
                    <button
                        onClick={() =>
                            setForm({
                                ...form,
                                specifications: [
                                    ...form.specifications,
                                    { title: "", value: "" },
                                ],
                            })
                        }
                        className="mt-2 text-sm text-blue-600"
                    >
                        + Add specification
                    </button>
                </div>


                {/* COLORS + IMAGES */}
                <h3 className="font-semibold mt-4 mb-2">Colors & Images (URLs)</h3>

                {["red", "gray", "dark"].map((color) => (
                    <ColorImageEditor
                        key={color}
                        color={color}
                        images={form.colors[color] || []}
                        onAdd={(url) => addImage(color, url)}
                        onRemove={(i) => removeImage(color, i)}
                    />
                ))}

                {/* FOOTER */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="border px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-primary text-white px-4 py-2 rounded"
                    >
                        {saving ? "Saving..." : mode === "add" ? "Create" : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ================= IMAGE LIST EDITOR ================= */

function ColorImageEditor({
    color,
    images,
    onAdd,
    onRemove,
}: {
    color: string;
    images: string[];
    onAdd: (url: string) => void;
    onRemove: (index: number) => void;
}) {
    const [url, setUrl] = useState("");

    return (
        <div className="border rounded p-3 mb-3">
            <h4 className="font-medium capitalize mb-2">{color}</h4>

            <div className="flex gap-2 mb-2">
                <input
                    className="border p-2 rounded flex-1"
                    placeholder="Image URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button
                    onClick={() => {
                        onAdd(url);
                        setUrl("");
                    }}
                    className="bg-green-600 text-white px-3 rounded"
                >
                    Add
                </button>
            </div>

            <ul className="text-sm space-y-1">
                {images.map((img, i) => (
                    <li key={i} className="flex justify-between items-center">
                        <span className="truncate">{img}</span>
                        <button
                            onClick={() => onRemove(i)}
                            className="text-red-500 text-xs"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

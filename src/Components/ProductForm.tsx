"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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



/* ---------- MAIN FORM ---------- */
export default function ProductForm({
    mode,
    initialProduct,
}: {
    mode: "add" | "edit";
    initialProduct?: Product;
}) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState<Product>({
        id: initialProduct?.id || "",
        name: initialProduct?.name || "",
        short_desc: initialProduct?.short_desc || "",
        description: initialProduct?.description || "",
        category: initialProduct?.category || "",

        specifications: initialProduct?.specifications || [],
        Application: initialProduct?.Application || {
            "Roof Nodes": [],
            Penetrations: [],
            Repairs: [],
        },

        features: initialProduct?.features || [],
        faqs: initialProduct?.faqs || [],
        colors: initialProduct?.colors || {},

        free_samples: initialProduct?.free_samples || {
            title: "",
            checklist: [],
            img: "",
        },
    });

    /* ---------- COLOR HANDLERS ---------- */
    function addImage(color: string, url: string) {
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

        setSaving(true);

        try {
            if (mode === "add") {
                await addDoc(collection(db, "products"), {
                    ...form,
                    active: true,
                    createdAt: serverTimestamp(),
                });
                toast.success("Product created");
            } else {
                await updateDoc(doc(db, "products", form.id), {
                    ...form,
                    updatedAt: serverTimestamp(),
                });
                toast.success("Product updated");
            }

            router.push("/admin/products");
        } catch (err) {
            console.error(err);
            toast.error("Save failed");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="wrapper py-4">
            <h1 className="text-2xl font-bold mb-6">
                {mode === "add" ? "Add Product" : "Edit Product"}
            </h1>

            {/* BASIC INFO */}
            <div className="grid gap-3 mb-6">
                <label className="font-medium">Name</label>
                <input
                    className="border p-2 rounded"
                    placeholder="Product name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <label className="font-medium">Category</label>

                <input
                    className="border p-2 rounded"
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
                <label className="font-medium">Short Descp</label>

                <textarea
                    className="border p-2 rounded"
                    placeholder="Short description"
                    value={form.short_desc}
                    onChange={(e) =>
                        setForm({ ...form, short_desc: e.target.value })
                    }
                />
                <label className="font-medium">Description</label>

                <textarea
                    className="border p-2 rounded min-h-30"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />
            </div>
            <h3 className="font-semibold mb-2">Application</h3>

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
            <h3 className="font-semibold mb-2">Specifications</h3>

            {form.specifications.map((spec, index) => (
                <div key={index} className="flex gap-2 mb-2">
                    <input
                        className="border p-2 rounded flex-1"
                        placeholder="Title"
                        value={spec.title}
                        onChange={(e) => {
                            const updated = [...form.specifications];
                            updated[index].title = e.target.value;
                            setForm({ ...form, specifications: updated });
                        }}
                    />

                    <input
                        className="border p-2 rounded flex-1"
                        placeholder="Value"
                        value={spec.value}
                        onChange={(e) => {
                            const updated = [...form.specifications];
                            updated[index].value = e.target.value;
                            setForm({ ...form, specifications: updated });
                        }}
                    />

                    <button
                        onClick={() =>
                            setForm({
                                ...form,
                                specifications: form.specifications.filter(
                                    (_, i) => i !== index
                                ),
                            })
                        }
                        className="text-red-500 px-2"
                    >
                        ✕
                    </button>
                </div>
            ))}
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
                className="mb-6 text-sm text-blue-600"
            >
                + Add specification
            </button>

            {/* COLORS */}
            <h3 className="font-semibold mt-6 mb-2">
                Colors & Images (URLs)
            </h3>

            {["red", "gray", "dark"].map((color) => (
                <ColorImageEditor
                    key={color}
                    color={color}
                    images={form.colors[color] || []}
                    onAdd={(url) => addImage(color, url)}
                    onRemove={(i) => removeImage(color, i)}
                />
            ))}

            {/* ================= FAQs ================= */}
            <div className="mt-6">
                <h3 className="font-semibold mb-2">FAQs</h3>

                {(form.faqs ?? []).map((faq, index) => (
                    <div key={index} className="border rounded p-3 mb-3">
                        <input
                            className="border p-2 rounded w-full mb-2"
                            placeholder="Question"
                            value={faq.question}
                            onChange={(e) => {
                                const updated = [...(form.faqs || [])];
                                updated[index] = {
                                    ...updated[index],
                                    question: e.target.value,
                                };
                                setForm({ ...form, faqs: updated });
                            }}
                        />

                        <textarea
                            className="border p-2 rounded w-full min-h-20"
                            placeholder="Answer"
                            value={faq.answer}
                            onChange={(e) => {
                                const updated = [...(form.faqs || [])];
                                updated[index] = {
                                    ...updated[index],
                                    answer: e.target.value,
                                };
                                setForm({ ...form, faqs: updated });
                            }}
                        />

                        <button
                            onClick={() =>
                                setForm({
                                    ...form,
                                    faqs: form.faqs ? form.faqs.filter((_, i) => i !== index) : [],
                                })
                            }
                            className="text-red-500 text-sm mt-2"
                        >
                            Remove FAQ
                        </button>
                    </div>
                ))}

                {/* ADD NEW FAQ */}
                <button
                    onClick={() =>
                        setForm({
                            ...form,
                            faqs: [...(form.faqs || []), { question: "", answer: "" }],
                        })
                    }
                    className="text-sm text-blue-600"
                >
                    + Add FAQ
                </button>
            </div>




            {/* ================= FREE SAMPLES / CTA ================= */}
            <div className="mt-6">
                <h3 className="font-semibold mb-2">CTA – Free Samples</h3>

                {/* TITLE */}
                <label className="font-medium">Title</label>
                <input
                    className="border p-2 rounded w-full mb-2"
                    placeholder="CTA title"
                    value={form.free_samples.title}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            free_samples: {
                                ...form.free_samples,
                                title: e.target.value,
                            },
                        })
                    }
                />
                <label className="font-medium">Image url</label>

                {/* IMAGE URL */}
                <input
                    className="border p-2 rounded w-full mb-3"
                    placeholder="CTA image URL"
                    value={form.free_samples.img}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            free_samples: {
                                ...form.free_samples,
                                img: e.target.value,
                            },
                        })
                    }
                />

                {/* CHECKLIST */}
                <label className="font-medium mb-1">Checklist</label>

                {form.free_samples.checklist.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input
                            className="border p-2 rounded flex-1"
                            placeholder="Checklist item"
                            value={item}
                            onChange={(e) => {
                                const updated = [...form.free_samples.checklist];
                                updated[index] = e.target.value;

                                setForm({
                                    ...form,
                                    free_samples: {
                                        ...form.free_samples,
                                        checklist: updated,
                                    },
                                });
                            }}
                        />

                        <button
                            onClick={() =>
                                setForm({
                                    ...form,
                                    free_samples: {
                                        ...form.free_samples,
                                        checklist: form.free_samples.checklist.filter(
                                            (_, i) => i !== index
                                        ),
                                    },
                                })
                            }
                            className="text-red-500 px-2"
                        >
                            ✕
                        </button>
                    </div>
                ))}

                {/* ADD CHECKLIST ITEM */}
                <button
                    onClick={() =>
                        setForm({
                            ...form,
                            free_samples: {
                                ...form.free_samples,
                                checklist: [...form.free_samples.checklist, ""],
                            },
                        })
                    }
                    className="text-sm text-blue-600"
                >
                    + Add checklist item
                </button>
            </div>


            {/* FOOTER */}
            <div className="flex justify-between mt-8">
                <button
                    onClick={() => router.push("/admin/products")}
                    className="border px-4 py-2 rounded"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-primary text-white px-6 py-2 rounded"
                >
                    {mode == 'add' ?
                        saving ? "Saving..." : "Add Product" : 'Edit Product'}
                </button>
            </div>

        </div>
    );
}

/* ---------- IMAGE EDITOR ---------- */
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
                        if (!url) return;
                        onAdd(url);
                        setUrl("");
                    }}
                    className="bg-primary-600 text-white px-3 rounded"
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
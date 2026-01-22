"use client";

import { useState } from "react";

type DocumentType = "processing" | "brochures";
type ProductType =
    | "Leadax Flashing Original"
    | "Leadax Flashing Easy FA"
    | "Leadax Roof";

interface FormState {
    documents: DocumentType[];
    products: ProductType[];
    name: string;
    company: string;
    industry: string;
    country: string;
    email: string;
}

export default function DocumentsForm() {
    const [form, setForm] = useState<FormState>({
        documents: [],
        products: [],
        name: "",
        company: "",
        industry: "",
        country: "",
        email: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const toggleArrayValue = <T,>(key: keyof FormState, value: T) => {
        setForm((prev) => {
            const arr = prev[key] as T[];
            return {
                ...prev,
                [key]: arr.includes(value)
                    ? arr.filter((v) => v !== value)
                    : [...arr, value],
            };
        });
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!form.documents.length) newErrors.documents = "Field is required";
        if (!form.name) newErrors.name = "Required";
        if (!form.company) newErrors.company = "Required";
        if (!form.industry) newErrors.industry = "Required";
        if (!form.country) newErrors.country = "Required";
        if (!form.email) newErrors.email = "Required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitHandler = async () => {
        if (!validate()) return;

        setLoading(true);
        setSuccess(false);

        // 🔌 API later
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1200);
    };

    return (
        <section className=" py-14">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl p-6 md:p-16   shadow-none lg:shadow-[0_0_30px_0_rgb(0,0,0,0.16)]">
                <h2 className="text-xl font-medium mb-12">
                    Receive the documents you need quickly by email
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* LEFT */}
                    <div>
                        <p className="text-sm font-medium mb-4">
                            Documents <span className="text-red-500">*</span>
                        </p>

                        <div className="space-y-2">
                            {["processing", "brochures"].map((doc) => (
                                <label key={doc} className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={form.documents.includes(doc as DocumentType)}
                                        onChange={() =>
                                            toggleArrayValue("documents", doc as DocumentType)
                                        }
                                    />
                                    {doc === "processing"
                                        ? "Processing Instructions"
                                        : "Brochures"}
                                </label>
                            ))}
                        </div>

                        {errors.documents && (
                            <p className="text-xs text-red-500 mt-2">
                                {errors.documents}
                            </p>
                        )}

                        <p className="text-sm font-medium mt-8 mb-4">
                            Product <span className="text-red-500">*</span>
                        </p>

                        <div className="space-y-2">
                            {[
                                "Leadax Flashing Original",
                                "Leadax Flashing Easy FA",
                                "Leadax Roof",
                            ].map((product) => (
                                <label key={product} className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={form.products.includes(product as ProductType)}
                                        onChange={() =>
                                            toggleArrayValue("products", product as ProductType)
                                        }
                                    />
                                    {product}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Input
                            label="Name"
                            value={form.name}
                            error={errors.name}
                            onChange={(v) => setForm({ ...form, name: v })}
                        />
                        <Input
                            label="Company name"
                            value={form.company}
                            error={errors.company}
                            onChange={(v) => setForm({ ...form, company: v })}
                        />

                        <Select
                            label="Industry"
                            value={form.industry}
                            error={errors.industry}
                            options={["Roofing", "Construction", "Architecture"]}
                            onChange={(v) => setForm({ ...form, industry: v })}
                        />
                        <Select
                            label="Country"
                            value={form.country}
                            error={errors.country}
                            options={["Netherlands", "Germany", "UK"]}
                            onChange={(v) => setForm({ ...form, country: v })}
                        />

                        <Input
                            label="E-mail address"
                            value={form.email}
                            error={errors.email}
                            onChange={(v) => setForm({ ...form, email: v })}
                        />

                        <div className="flex items-end">
                            <button
                                onClick={submitHandler}
                                disabled={loading}
                                className="bg-primary-600  transition text-white px-4 py-2.5 rounded-full text-xs font-normal disabled:opacity-50"
                            >
                                {loading ? "Sending..." : "Get documents"}
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-gray-500 mt-6">
                    Read our <span className="underline cursor-pointer">privacy policy</span>.
                </p>

                {success && (
                    <p className="text-green-600 text-sm mt-6">
                        ✅ Documents request submitted successfully
                    </p>
                )}
            </div>
        </section>
    );
}

/* 🔹 Reusable Inputs */

function Input({
    label,
    value,
    onChange,
    error,
}: {
    label: string;
    value: string;
    error?: string;
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <label className="text-sm font-medium">
                {label} <span className="text-red-500">*</span>
            </label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border-b border-gray-400 focus:outline-none py-2 mt-2"
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}

function Select({
    label,
    value,
    onChange,
    options,
    error,
}: {
    label: string;
    value: string;
    options: string[];
    error?: string;
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <label className="text-sm font-medium">
                {label} <span className="text-red-500">*</span>
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border-b border-gray-400 py-2 mt-2 bg-transparent"
            >
                <option value="">Select</option>
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}

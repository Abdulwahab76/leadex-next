"use client";

import { useState } from "react";
import { Solution, SolutionSection } from "@/hooks/useFetchAllSolutions";

interface Props {
    initialData?: Solution | null;
    onSubmit: (data: Omit<Solution, "id">) => Promise<void>;
}

export default function SolutionForm({ initialData, onSubmit }: Props) {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState<Omit<Solution, "id">>({
        background_image: initialData?.background_image || "",
        category: initialData?.category || "",
        contentHeading: initialData?.contentHeading || "",
        contentImg: initialData?.contentImg || "",
        contentPara: initialData?.contentPara || "",
        heroPara: initialData?.heroPara || "",
        name: initialData?.name || "",
        solutionSections: initialData?.solutionSections || {},
        videos: initialData?.videos || {},
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // ----------------------------
    // SECTION HANDLING
    // ----------------------------

    const addSection = () => {
        const key = `solution${Object.keys(form.solutionSections).length + 1}`;

        setForm((prev) => ({
            ...prev,
            solutionSections: {
                ...prev.solutionSections,
                [key]: {
                    title: "",
                    descp: "",
                    imgs: [],
                },
            },
        }));
    };

    const updateSection = (
        key: string,
        field: keyof SolutionSection,
        value: any
    ) => {
        setForm((prev) => ({
            ...prev,
            solutionSections: {
                ...prev.solutionSections,
                [key]: {
                    ...prev.solutionSections[key],
                    [field]: value,
                },
            },
        }));
    };

    const addImageToSection = (key: string) => {
        updateSection(key, "imgs", [
            ...form.solutionSections[key].imgs,
            "",
        ]);
    };

    const updateImage = (key: string, index: number, value: string) => {
        const updatedImgs = [...form.solutionSections[key].imgs];
        updatedImgs[index] = value;
        updateSection(key, "imgs", updatedImgs);
    };

    const removeSection = (key: string) => {
        const updated = { ...form.solutionSections };
        delete updated[key];
        setForm((prev) => ({
            ...prev,
            solutionSections: updated,
        }));
    };

    // ----------------------------
    // VIDEO HANDLING
    // ----------------------------

    const addVideo = () => {
        const key = `video${Object.keys(form.videos || {}).length + 1}`;

        setForm((prev) => ({
            ...prev,
            videos: {
                ...prev.videos,
                [key]: "",
            },
        }));
    };

    const updateVideo = (key: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            videos: {
                ...prev.videos,
                [key]: value,
            },
        }));
    };

    // ----------------------------

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await onSubmit(form);

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl">

            {/* BASIC FIELDS */}

            <div>
                <label className="font-medium">Solution Name</label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="border w-full p-2"
                />
            </div>

            <div>
                <label className="font-medium">Category</label>
                <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="border w-full p-2"
                />
            </div>

            <div>
                <label className="font-medium">Background Image URL</label>
                <input
                    name="background_image"
                    value={form.background_image}
                    onChange={handleChange}
                    className="border w-full p-2"
                />
            </div>
            {/* Hero Paragraph */}
            <div className="flex flex-col gap-2">
                <label className="font-medium">Hero sub Heading</label>
                <textarea
                    name="heroPara"
                    value={form.heroPara}
                    onChange={handleChange}
                    rows={4}
                    className="border rounded p-3"
                />
            </div>

            {/* Content Heading */}
            <div className="flex flex-col gap-2">
                <label className="font-medium">Content Heading *</label>
                <input
                    name="contentHeading"
                    value={form.contentHeading}
                    onChange={handleChange}
                    required
                    className="border rounded p-3"
                />
            </div>

            {/* Content Paragraph */}
            <div className="flex flex-col gap-2">
                <label className="font-medium">Content Paragraph</label>
                <textarea
                    name="contentPara"
                    value={form.contentPara}
                    onChange={handleChange}
                    rows={4}
                    className="border rounded p-3"
                />
            </div>

            {/* Content Image */}
            <div className="flex flex-col gap-2">
                <label className="font-medium">Content Image URL</label>
                <input
                    name="contentImg"
                    value={form.contentImg}
                    onChange={handleChange}
                    className="border rounded p-3"
                />
            </div>
            {/* ---------------------------- */}
            {/* SECTIONS */}
            {/* ---------------------------- */}

            <div className="border-t pt-6">
                <h2 className="text-xl font-bold mb-4">Solution Sections</h2>

                {Object.entries(form.solutionSections).map(([key, section]) => (
                    <div key={key} className="border p-4 mb-6 space-y-4 bg-gray-50">

                        <div className="flex justify-between">
                            <h3 className="font-semibold">{key}</h3>
                            <button
                                type="button"
                                onClick={() => removeSection(key)}
                                className="text-red-600"
                            >
                                Remove
                            </button>
                        </div>

                        <input
                            placeholder="Title"
                            value={section.title}
                            onChange={(e) =>
                                updateSection(key, "title", e.target.value)
                            }
                            className="border w-full p-2"
                        />

                        <textarea
                            placeholder="Description"
                            value={section.descp}
                            onChange={(e) =>
                                updateSection(key, "descp", e.target.value)
                            }
                            className="border w-full p-2"
                        />

                        <div>
                            <p className="font-medium">Images</p>

                            {section.imgs.map((img, index) => (
                                <input
                                    key={index}
                                    placeholder="Image URL"
                                    value={img}
                                    onChange={(e) =>
                                        updateImage(key, index, e.target.value)
                                    }
                                    className="border w-full p-2 mb-2"
                                />
                            ))}

                            <button
                                type="button"
                                onClick={() => addImageToSection(key)}
                                className="text-blue-600"
                            >
                                + Add Image
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addSection}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    + Add Section
                </button>
            </div>

            {/* ---------------------------- */}
            {/* VIDEOS */}
            {/* ---------------------------- */}

            <div className="border-t pt-6">
                <h2 className="text-xl font-bold mb-4">Videos</h2>

                {form.videos &&
                    Object.entries(form.videos).map(([key, value]) => (
                        <input
                            key={key}
                            placeholder="Video URL"
                            value={value}
                            onChange={(e) => updateVideo(key, e.target.value)}
                            className="border w-full p-2 mb-2"
                        />
                    ))}

                <button
                    type="button"
                    onClick={addVideo}
                    className="bg-primary-600 text-white px-4 py-2 rounded"
                >
                    + Add Video
                </button>
            </div>

            {/* SUBMIT */}

            <button
                type="submit"
                disabled={loading}
                className="bg-primary-600 text-white px-6 py-3 rounded"
            >
                {loading ? "Saving..." : "Save Solution"}
            </button>
        </form>
    );
}

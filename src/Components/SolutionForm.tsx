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

    // ----------------------------
    // IMAGE PREVIEW COMPONENT
    // ----------------------------

    const ImagePreview = ({ url }: { url: string }) => {
        if (!url) return null;

        return (
            <div className="relative w-full  rounded-lg overflow-hidden border mt-3">
                <img
                    src={url}
                    alt="Preview"
                    className="object-contain"
                    sizes="100vw"
                />
            </div>
        );
    };

    // ----------------------------
    // HANDLERS
    // ----------------------------

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const addSection = () => {
        const key = `solution${Object.keys(form.solutionSections).length + 1}`;

        setForm((prev) => ({
            ...prev,
            solutionSections: {
                ...prev.solutionSections,
                [key]: { title: "", descp: "", imgs: [] },
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
        updateSection(key, "imgs", [...form.solutionSections[key].imgs, ""]);
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

    const addVideo = () => {
        const key = `video${Object.keys(form.videos || {}).length + 1}`;

        setForm((prev) => ({
            ...prev,
            videos: { ...prev.videos, [key]: "" },
        }));
    };

    const updateVideo = (key: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            videos: { ...prev.videos, [key]: value },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(form);
        setLoading(false);
    };

    // ----------------------------
    // UI
    // ----------------------------

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-sm space-y-12"
        >
            {/* BASIC INFO */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="font-semibold">Solution Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="border rounded-lg p-3 w-full mt-2"
                    />
                </div>

                <div>
                    <label className="font-semibold">Category</label>
                    <input
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="border rounded-lg p-3 w-full mt-2"
                    />
                </div>
            </div>

            {/* HERO IMAGE */}
            <div>
                <label className="font-semibold">Background Image URL</label>
                <input
                    name="background_image"
                    value={form.background_image}
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full mt-2"
                />
                <ImagePreview url={form.background_image} />
            </div>

            {/* HERO TEXT */}
            <div>
                <label className="font-semibold">Hero Sub Heading</label>
                <textarea
                    name="heroPara"
                    value={form.heroPara}
                    onChange={handleChange}
                    rows={4}
                    className="border rounded-lg p-3 w-full mt-2"
                />
            </div>

            {/* CONTENT SECTION */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="font-semibold">Content Heading</label>
                    <input
                        name="contentHeading"
                        value={form.contentHeading}
                        onChange={handleChange}
                        className="border rounded-lg p-3 w-full mt-2"
                    />
                </div>

                <div>
                    <label className="font-semibold">Content Image URL</label>
                    <input
                        name="contentImg"
                        value={form.contentImg}
                        onChange={handleChange}
                        className="border rounded-lg p-3 w-full mt-2"
                    />
                    <ImagePreview url={form.contentImg} />
                </div>
            </div>

            <div>
                <label className="font-semibold">Content Paragraph</label>
                <textarea
                    name="contentPara"
                    value={form.contentPara}
                    onChange={handleChange}
                    rows={4}
                    className="border rounded-lg p-3 w-full mt-2"
                />
            </div>

            {/* SECTIONS */}
            <div>
                <h2 className="text-xl font-bold mb-6">Solution Sections</h2>

                {Object.entries(form.solutionSections).map(([key, section]) => (
                    <div
                        key={key}
                        className="border rounded-xl p-6 mb-8 bg-gray-50 space-y-4"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold">{key}</h3>
                            <button
                                type="button"
                                onClick={() => removeSection(key)}
                                className="text-red-600 text-sm"
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
                            className="border p-3 rounded w-full"
                        />

                        <textarea
                            placeholder="Description"
                            value={section.descp}
                            onChange={(e) =>
                                updateSection(key, "descp", e.target.value)
                            }
                            className="border p-3 rounded w-full"
                        />

                        <div>
                            <p className="font-medium mb-3">Images</p>

                            <div className="grid md:grid-cols-2 gap-4">
                                {section.imgs.map((img, index) => (
                                    <div key={index}>
                                        <input
                                            placeholder="Image URL"
                                            value={img}
                                            onChange={(e) =>
                                                updateImage(key, index, e.target.value)
                                            }
                                            className="border p-2 rounded w-full"
                                        />
                                        <ImagePreview url={img} />
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => addImageToSection(key)}
                                className="text-blue-600 text-sm mt-3"
                            >
                                + Add Image
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addSection}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + Add Section
                </button>
            </div>

            {/* VIDEOS */}
            <div>
                <h2 className="text-xl font-bold mb-4">Videos</h2>

                {form.videos &&
                    Object.entries(form.videos).map(([key, value]) => (
                        <input
                            key={key}
                            placeholder="Video URL"
                            value={value}
                            onChange={(e) => updateVideo(key, e.target.value)}
                            className="border p-3 rounded w-full mb-3"
                        />
                    ))}

                <button
                    type="button"
                    onClick={addVideo}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg"
                >
                    + Add Video
                </button>
            </div>

            {/* SUBMIT */}
            <div className="pt-6 border-t">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg"
                >
                    {loading ? "Saving..." : "Save Solution"}
                </button>
            </div>
        </form>
    );
}

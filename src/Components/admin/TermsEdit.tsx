"use client";

import { faClose, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EditButton from "../common/editButton";

interface Section {
    title: string;
    paragraphs: string[];
}

function TermsEdit() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [intro, setIntro] = useState("");
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [date, setDate] = useState("");
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "landingPage", "landingPageTerms");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTitle(data.termsTitle || "");
                    setIntro(data.termsIntro || "");
                    setSections(data.sections || []);
                    setDate(data.date)
                } else {
                    toast.error("No terms document found!");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching terms data");
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    const handleEdit = () => setIsModalOpen(true);
    const closeModal = () => { if (!saving) setIsModalOpen(false); };

    const addSection = () => setSections([...sections, { title: "", paragraphs: [""] }]);
    const removeSection = (i: number) => setSections(sections.filter((_, idx) => idx !== i));
    const updateSectionTitle = (i: number, value: string) => {
        const updated = [...sections]; updated[i].title = value; setSections(updated);
    };
    const addParagraph = (i: number) => { const updated = [...sections]; updated[i].paragraphs.push(""); setSections(updated); };
    const removeParagraph = (i: number, j: number) => {
        const updated = [...sections];
        updated[i].paragraphs = updated[i].paragraphs.filter((_, idx) => idx !== j);
        setSections(updated);
    };
    const updateParagraph = (i: number, j: number, value: string) => {
        const updated = [...sections];
        updated[i].paragraphs[j] = value;
        setSections(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !intro.trim() || sections.some(s => !s.title || s.paragraphs.some(p => !p.trim()))) {
            return toast.error("All fields are required");
        }
        setSaving(true);
        try {
            const docRef = doc(db, "landingPage", "landingPageTerms");
            await updateDoc(docRef, {
                termsTitle: title.trim(),
                termsIntro: intro.trim(),
                sections,
                date: date.trim()
            });
            toast.success("Terms updated!");
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            toast.error("Failed to save");
        } finally { setSaving(false); }
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Terms & Conditions</h2>
                <EditButton onClick={handleEdit} />
            </div>

            {/* Display Terms */}
            {loading ? (
                <p className="text-gray-400 py-10 text-center">Loading...</p>
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <p className="font-semibold text-gray-700">Title:</p>
                        <p className="text-gray-800">{title}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <p className="font-semibold text-gray-700">Effective Date:</p>
                        <p className="text-gray-800">{date}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <p className="font-semibold text-gray-700">Intro:</p>
                        <p className="text-gray-800">{intro}</p>
                    </div>

                    {sections.map((s, i) => (
                        <div key={i} className="border border-gray-300 rounded p-4 shadow-sm">
                            <h3 className="font-semibold text-lg mb-2 text-gray-800">{s.title || "Untitled Section"}</h3>
                            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                {s.paragraphs.map((p, j) => (
                                    <li key={j}>{p}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/40 p-4 ">
                    <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg relative p-6 md:p-8">
                        <button
                            onClick={closeModal}
                            disabled={saving}
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                        >
                            <FontAwesomeIcon icon={faClose} />
                        </button>

                        <h3 className="text-xl md:text-2xl font-semibold mb-6">Edit Terms & Conditions</h3>

                        <form className="space-y-6 max-h-100 overflow-y-auto" onSubmit={handleSubmit}>
                            {/* Title */}
                            <div>
                                <label className="block font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2 focus:ring focus:ring-primary focus:outline-none"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    disabled={saving}
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Effective Date</label>
                                <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2 focus:ring focus:ring-primary focus:outline-none"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                    disabled={saving}
                                />
                            </div>
                            {/* Intro */}
                            <div>
                                <label className="block font-medium mb-1">Intro</label>
                                <textarea
                                    className="w-full border rounded px-3 py-2 focus:ring focus:ring-primary focus:outline-none"
                                    value={intro}
                                    onChange={(e) => setIntro(e.target.value)}
                                    rows={3}
                                    required
                                    disabled={saving}
                                />
                            </div>

                            {/* Sections */}
                            {sections.map((s, i) => (
                                <div key={i} className="border border-gray-300 rounded p-4 space-y-3 relative">
                                    <button
                                        type="button"
                                        onClick={() => removeSection(i)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>

                                    <input
                                        type="text"
                                        placeholder="Section Title"
                                        className="w-full border rounded px-3 py-2 focus:ring focus:ring-primary focus:outline-none"
                                        value={s.title}
                                        onChange={(e) => updateSectionTitle(i, e.target.value)}
                                        required
                                        disabled={saving}
                                    />

                                    {s.paragraphs.map((p, j) => (
                                        <div key={j} className="flex flex-col sm:flex-row gap-2">
                                            <input
                                                type="text"
                                                className="flex-1 border rounded px-3 py-2 focus:ring focus:ring-primary focus:outline-none"
                                                value={p}
                                                onChange={(e) => updateParagraph(i, j, e.target.value)}
                                                required
                                                disabled={saving}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeParagraph(i, j)}
                                                className="text-red-500 hover:text-red-700 font-semibold"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={() => addParagraph(i)}
                                        className="flex items-center gap-2 text-primary font-semibold mt-2"
                                    >
                                        <FontAwesomeIcon icon={faPlus} /> Add Paragraph
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addSection}
                                className="flex items-center gap-2 text-primary font-semibold"
                            >
                                <FontAwesomeIcon icon={faPlus} /> Add Section
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-primary-600 text-white py-2 rounded font-semibold "
                            >
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TermsEdit;

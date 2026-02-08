"use client";
import { faClose, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import EditButton from "../common/editButton";

interface Section {
  title: string;
  paragraphs: string[];
}

function AboutEditDynamic() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "landingPage", "landingPageAbout");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.aboutTitle || "");
          setIntro(data.aboutIntro || "");
          setSections(data.sections || []);
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching page data");
        console.error("Error fetching page data:", error);
      } finally {
        setLoading(false);
      }
    };
    getSectionData();
  }, []);

  const handleEdit = () => setIsModalOpen(true);
  const closeModal = () => {
    if (!saving) setIsModalOpen(false);
  };

  const addSection = () => {
    setSections([...sections, { title: "", paragraphs: [""] }]);
  };

  const removeSection = (index: number) => {
    const updated = sections.filter((_, i) => i !== index);
    setSections(updated);
  };

  const updateSectionTitle = (index: number, value: string) => {
    const updated = [...sections];
    updated[index].title = value;
    setSections(updated);
  };

  const addParagraph = (index: number) => {
    const updated = [...sections];
    updated[index].paragraphs.push("");
    setSections(updated);
  };

  const removeParagraph = (sectionIndex: number, paraIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].paragraphs = updated[sectionIndex].paragraphs.filter(
      (_, i) => i !== paraIndex
    );
    setSections(updated);
  };

  const updateParagraph = (
    sectionIndex: number,
    paraIndex: number,
    value: string
  ) => {
    const updated = [...sections];
    updated[sectionIndex].paragraphs[paraIndex] = value;
    setSections(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      sections.some(
        (s) => !s.title.trim() || s.paragraphs.some((p) => !p.trim())
      ) ||
      !title.trim() ||
      !intro.trim
    ) {
      toast.error("All fields are required.");
      return;
    }

    setSaving(true);
    try {
      const docRef = doc(db, "landingPage", "landingPageAbout");
      await updateDoc(docRef, {
        sections,
        aboutTitle: title.trim(),
        aboutIntro: intro.trim(),
      });
      toast.success("About page updated!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update about page.");
      console.error("Update error:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="wrapper mt-10 p-5 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">About Page</h2>
        <EditButton onClick={handleEdit} />
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading...</div>
      ) : (
        <div className="mt-4 space-y-6">
          <div className="grid grid-cols-2 gap-1 mt-4">
            <p className="text-primary">About Title :</p>
            <p>{title}</p>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-4">
            <p className="text-primary">About Para :</p>
            <p>{intro}</p>
          </div>
          {sections.map((section, index) => (
            <div key={index} className="border p-4 rounded relative">
              <button
                onClick={() => removeSection(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <h3 className="font-semibold mb-2">
                {section.title || "Untitled Section"}
              </h3>
              {section.paragraphs.map((para, pIndex) => (
                <p key={pIndex} className="mb-5">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 max-w-[600px] w-[95%] relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              disabled={saving}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit About Page</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  About Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  About Intro <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="border p-2 pe-8 rounded space-y-2 relative"
                >
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>

                  <input
                    type="text"
                    placeholder="Section Title"
                    value={section.title}
                    onChange={(e) => updateSectionTitle(index, e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    disabled={saving}
                    required
                  />
                  {section.paragraphs.map((para, pIndex) => (
                    <div key={pIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Paragraph text"
                        value={para}
                        onChange={(e) =>
                          updateParagraph(index, pIndex, e.target.value)
                        }
                        className="flex-1 border rounded px-3 py-2"
                        disabled={saving}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeParagraph(index, pIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addParagraph(index)}
                    className="flex items-center gap-2 text-primary font-semibold"
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
                className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-(--btn-hover-bg) transition cursor-pointer disabled:opacity-60"
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

export default AboutEditDynamic;

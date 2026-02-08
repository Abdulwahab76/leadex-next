"use client";
import EditButton from "@/components/common/editButton";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";

function BlogEdit() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "blogPage", "blogPageContent");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setIntro(data.intro || "");
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

  function handleEdit() {
    setIsModalOpen(true);
  }

  function closeModal() {
    if (!saving) setIsModalOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !intro.trim()) {
      toast.error("All fields are required.");
      return;
    }
    setSaving(true);
    try {
      const docRef = doc(db, "blogPage", "blogPageContent");
      await updateDoc(docRef, {
        title: title.trim(),
      });
      toast.success("Blog page updated!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update blog page.");
      console.error("Update error:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="wrapper mt-10! p-5 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Blog Page</h2>
        <EditButton onClick={handleEdit} />
      </div>
      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-1 mt-4">
            <p className="text-primary">Title :</p>
            <p>{title}</p>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-4">
            <p className="text-primary">Intro :</p>
            <p>{intro}</p>
          </div>
        </>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 max-w-[400px] w-[90%] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              disabled={saving}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer disabled:opacity-50"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit Blog Page</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                Title <span className="text-red-500">*</span>
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
                Intro <span className="text-red-500">*</span>
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

export default BlogEdit;

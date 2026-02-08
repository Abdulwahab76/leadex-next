"use client";
import EditButton from "@/components/common/editButton";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";

function HeroEdit() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroTitle, setHeroTitle] = useState("");
  const [heroPara, setHeroPara] = useState("");
  const [afterHeroTitle, setAfterHeroTitle] = useState("");
  const [afterHeroPara, setAfterHeroPara] = useState("");
  const [ourStoryTitle, setOurStoryTitle] = useState("");
  const [ourStoryPara, setOurStoryPara] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "landingPage", "landingPageHero");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setHeroTitle(data.title || "");
          setHeroPara(data.para || "");
          setHeroImage(data.backgroundImage || "");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching section data");
        console.error("Error fetching section data:", error);
      } finally {
        setLoading(false);
      }
    };
    getSectionData();
  }, []);

  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "landingPage", "afterHero");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setAfterHeroTitle(data.title || "");
          setAfterHeroPara(data.para || "");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching section data");
        console.error("Error fetching section data:", error);
      } finally {
        setLoading(false);
      }
    };
    getSectionData();
  }, []);

  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "landingPage", "landingPageOurStory");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setOurStoryTitle(data.title || "");
          setOurStoryPara(data.para || "");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching section data");
        console.error("Error fetching section data:", error);
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
    if (!heroTitle.trim() || !heroPara.trim() || !heroImage.trim() || !afterHeroTitle.trim() || !afterHeroPara.trim() || !ourStoryTitle.trim() || !ourStoryPara.trim()) {
      toast.error("All fields are required.");
      return;
    }
    setSaving(true);
    try {
      const heroDocRef = doc(db, "landingPage", "landingPageHero");
      await updateDoc(heroDocRef, {
        title: heroTitle.trim(),
        para: heroPara.trim(),
        backgroundImage: heroImage.trim(),
      });
      const afterHeroDocRef = doc(db, "landingPage", "afterHero");
      await updateDoc(afterHeroDocRef, {
        title: afterHeroTitle.trim(),
        para: afterHeroPara.trim(),
      });
      const ourStoryDocRef = doc(db, "landingPage", "landingPageOurStory");
      await updateDoc(ourStoryDocRef, {
        title: ourStoryTitle.trim(),
        para: ourStoryPara.trim(),
      });
      toast.success("section updated!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update section.");
      console.error("Update error:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Hero Section</h2>
        <EditButton onClick={handleEdit} />
        {/* <button className="bg-primary-500">Edit</button> */}
      </div>
      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-1 mt-4">
            <p className="text-primary">Hero Title :</p>
            <p>{heroTitle}</p>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-4">
            <p className="text-primary">Hero Para :</p>
            <p>{heroPara}</p>
          </div>
          <div className="flex items-start justify-between gap-1 mt-4">
            <p className="text-primary">Background Image :</p>
            {heroImage ? (
              <img
                src={heroImage}
                alt="hero background image"
                width={200}
                height={200}
                className="rounded shadow"
              />
            ) : (
              <span className="text-gray-400">No image</span>
            )}
          </div>
        </>
      )}

      <h2 className="text-2xl">After Hero Section</h2>

      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-1 mt-4">
            <p className="text-primary">Title :</p>
            <p>{afterHeroTitle}</p>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-4">
            <p className="text-primary">Para :</p>
            <p>{afterHeroPara}</p>
          </div>
        </>
      )}

      <h2 className="text-2xl">Our Story Section</h2>

      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-1 mt-4">
            <p className="text-primary">Title :</p>
            <p>{ourStoryTitle}</p>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-4">
            <p className="text-primary">Para :</p>
            <p>{ourStoryPara}</p>
          </div>
        </>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-[95%] max-w-3xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ---------- Header ---------- */}
            <div className="sticky top-0 bg-white z-10 border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Edit Landing Page</h3>
              <button
                onClick={closeModal}
                disabled={saving}
                className="text-gray-500 hover:text-red-500 text-xl font-bold disabled:opacity-50"
                aria-label="Close"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>

            {/* ---------- Scrollable Content ---------- */}
            <div className="overflow-y-auto px-6 py-6">
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                onSubmit={handleSubmit}
              >
                {/* ===== HERO SECTION ===== */}
                <h3 className="md:col-span-2 text-lg font-semibold">
                  Hero Section
                </h3>

                <Input
                  label="Hero Title"
                  value={heroTitle}
                  onChange={setHeroTitle}
                  saving={saving}
                />

                <Input
                  label="Hero Para"
                  value={heroPara}
                  onChange={setHeroPara}
                  saving={saving}
                />

                <div className="md:col-span-2">
                  <Input
                    label="Image URL"
                    value={heroImage}
                    onChange={setHeroImage}
                    saving={saving}
                  />
                </div>

                {/* ===== AFTER HERO ===== */}
                <h3 className="md:col-span-2 text-lg font-semibold">
                  After Hero Section
                </h3>

                <Input
                  label="Title"
                  value={afterHeroTitle}
                  onChange={setAfterHeroTitle}
                  saving={saving}
                />

                <Input
                  label="Para"
                  value={afterHeroPara}
                  onChange={setAfterHeroPara}
                  saving={saving}
                />

                {/* ===== OUR STORY ===== */}
                <h3 className="md:col-span-2 text-lg font-semibold">
                  Our Story Section
                </h3>

                <Input
                  label="Title"
                  value={ourStoryTitle}
                  onChange={setOurStoryTitle}
                  saving={saving}
                />

                <Input
                  label="Para"
                  value={ourStoryPara}
                  onChange={setOurStoryPara}
                  saving={saving}
                />
              </form>
            </div>

            {/* ---------- Footer ---------- */}
            <div className="sticky bottom-0 bg-white border-t px-6 py-4">
              <button
                type="submit"
                form="modal-form"
                disabled={saving}
                onClick={handleSubmit}
                className="w-full bg-primary-500 text-white py-2 rounded font-semibold disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default HeroEdit;

function Input({
  label,
  value,
  onChange,
  saving,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  saving: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        className="w-full border rounded px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        disabled={saving}
      />
    </div>
  );
}

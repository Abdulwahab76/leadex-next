"use client";
import React, { useEffect, useState } from "react";
import EditButton from "../common/editButton";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function NavbarEdit() {
  const [logo, setLogo] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "navbar", "navbarContent");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setLogo(data.logo || "");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching navbar data");
        console.error("Error fetching navbar data:", error);
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
    if (!logo.trim()) {
      toast.error("All fields are required.");
      return;
    }
    setSaving(true);
    try {
      const docRef = doc(db, "navbar", "navbar");
      await updateDoc(docRef, {
        logo: logo.trim(),
      });
      toast.success("Navbar updated!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update navbar.");
      console.error("Update error:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="wrapper mt-10! p-5 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Navbar</h2>
        <EditButton onClick={handleEdit} />
      </div>
      {loading ? (
        <div className="py-10">
          <div className="h-6 text-center rounded mb-4 animate-pulse">
            Loading...
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-1 mt-4">
            <p className="text-primary">Logo :</p>
            <img
              src={logo}
              alt="logo"
              width={200}
              height={120}
              className="rounded shadow"
            />
          </div>
        </>
      )}

      {/* Edit Modal */}
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
            <h3 className="text-xl font-semibold mb-4">Edit Navbar</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Logo URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
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

export default NavbarEdit;

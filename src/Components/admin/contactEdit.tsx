"use client";

import EditButton from "@/Components/common/editButton";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";

function ContactEdit() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [stockistTitle, setStockistTitle] = useState("");
  const [stockistPara, setStockistPara] = useState("");
  const [stockistButton, setStockistButton] = useState("");
  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "contact", "contactContent");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setAddress(data.address || "");
          setPostal(data.postal || "");
          setPhone(data.phone || "");
          setFax(data.fax || "");
          setStockistTitle(data.stockistTitle || "");
          setStockistPara(data.stockistPara || "");
          setStockistButton(data.stockistButton || "");
        } else {
          toast.error("No contact document found!");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch contact data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Modal functions
  const handleEdit = () => setIsModalOpen(true);
  const closeModal = () => { if (!saving) setIsModalOpen(false); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !address || !phone || !stockistTitle) {
      toast.error("Please fill in all required fields!");
      return;
    }

    setSaving(true);
    try {
      const docRef = doc(db, "contact", "contactContent");
      await updateDoc(docRef, {
        title,
        address,
        postal,
        phone,
        fax,
        stockistTitle,
        stockistButton,
        stockistPara,
      });
      toast.success("Contact page updated!");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update contact page!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Contact Page</h2>
        <EditButton onClick={handleEdit} />
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 gap-2 mt-4">
          <p className="text-primary">Title:</p>
          <p>{title}</p>

          <p className="text-primary">Address:</p>
          <p>{address}</p>

          <p className="text-primary">Postal:</p>
          <p>{postal}</p>

          <p className="text-primary">Phone:</p>
          <p>{phone}</p>

          <p className="text-primary">Fax:</p>
          <p>{fax}</p>

          <p className="text-primary">Stockist Title:</p>
          <p>{stockistTitle}</p>

          <p className="text-primary">Stockist Para:</p>
          <p>{stockistPara}</p>
          <p className="text-primary">Stockist Button:</p>
          <p>{stockistButton}</p>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 max-w-150 max-h-120 overflow-y-auto w-[90%] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              disabled={saving}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>

            <h3 className="text-xl font-semibold mb-4">Edit Contact Page</h3>

            <form className="space-y-3" onSubmit={handleSubmit}>
              {/** Map each field **/}
              {[
                { label: "Title", value: title, setter: setTitle },
                { label: "Address", value: address, setter: setAddress },
                { label: "Postal", value: postal, setter: setPostal },
                { label: "Phone", value: phone, setter: setPhone },
                { label: "Fax", value: fax, setter: setFax },
                { label: "Stockist Title", value: stockistTitle, setter: setStockistTitle },
                { label: "Stockist Para", value: stockistPara, setter: setStockistPara },
                { label: "Stockist Button", value: stockistPara, setter: setStockistButton },

              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-sm font-medium mb-1">{field.label}</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    disabled={saving}
                    required
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-primary-600 text-white py-2 rounded font-semibold  "
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

export default ContactEdit;

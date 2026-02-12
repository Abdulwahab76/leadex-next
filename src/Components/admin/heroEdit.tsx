"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import EditButton from "@/Components/common/editButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function LandingPageHeroCMS() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔹 ALL FIELDS FROM landingPageHero
  const [title, setTitle] = useState("");
  const [para, setPara] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  const [productHeading, setProductHeading] = useState("");
  const [productPara, setProductPara] = useState("");
  const [solutionHeading, setSolutionHeading] = useState("");
  const [distributorHeading, setDistributorHeading] = useState("");
  const [partnerHeading, setPartnerHeading] = useState("");
  const [companyLogos, setCompanyLogos] = useState<string[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const docRef = doc(db, "landingPage", "landingPageHero");
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const data = snap.data();

          setTitle(data.title || "");
          setPara(data.para || "");
          setBackgroundImage(data.backgroundImage || "");

          setProductHeading(data.ProductHeading || "");
          setProductPara(data.ProductPara || "");
          setSolutionHeading(data.SolutionHeading || "");
          setDistributorHeading(data.distributorHeading || "");
          setPartnerHeading(data.partnerHeading || "");
          setCompanyLogos(data.companyLogos || []);
        } else {
          toast.error("Landing page hero document not found");
        }
      } catch (error: any) {
        console.error("Fetch error:", error);
        toast.error("Failed to fetch landing page data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !para || !backgroundImage) {
      toast.error("Hero fields are required");
      return;
    }

    setSaving(true);

    try {
      const docRef = doc(db, "landingPage", "landingPageHero");

      await setDoc(
        docRef,
        {
          title: title.trim(),
          para: para.trim(),
          backgroundImage: backgroundImage.trim(),

          ProductHeading: productHeading.trim(),
          ProductPara: productPara.trim(),
          SolutionHeading: solutionHeading.trim(),
          distributorHeading: distributorHeading.trim(),
          partnerHeading: partnerHeading.trim(),
          companyLogos: companyLogos.filter((logo) => logo.trim() !== ""),

          updatedAt: new Date(),
        },
        { merge: true }
      );

      toast.success("Landing page hero updated successfully!");
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };


  const addLogo = () => setCompanyLogos([...companyLogos, ""]);

  const updateLogo = (index: number, value: string) => {
    const updated = [...companyLogos];
    updated[index] = value;
    setCompanyLogos(updated);
  };

  const removeLogo = (index: number) => {
    setCompanyLogos(companyLogos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Landing Page Hero</h2>
        <EditButton onClick={() => setIsModalOpen(true)} />
      </div>

      {loading ? (
        <p className="py-6 text-gray-400">Loading...</p>
      ) : (
        <div className="mt-6 space-y-2 text-sm">
          <p><b>Title:</b> {title}</p>
          <p><b>Product Heading:</b> {productHeading}</p>
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => !saving && setIsModalOpen(false)}
        >
          <div
            className="bg-white w-[95%] max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-semibold">
                Edit Landing Page Hero
              </h3>
              <button onClick={() => setIsModalOpen(false)} disabled={saving}>
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">

              {/* HERO */}
              <Input label="Hero Title" value={title} onChange={setTitle} saving={saving} />
              <Input label="Hero Paragraph" value={para} onChange={setPara} saving={saving} />
              <Input label="Background Image URL" value={backgroundImage} onChange={setBackgroundImage} saving={saving} />

              {/* HEADINGS */}
              <Input label="Product Heading" value={productHeading} onChange={setProductHeading} saving={saving} />
              <Input label="Product Paragraph" value={productPara} onChange={setProductPara} saving={saving} />
              <Input label="Solution Heading" value={solutionHeading} onChange={setSolutionHeading} saving={saving} />
              <Input label="Distributor Heading" value={distributorHeading} onChange={setDistributorHeading} saving={saving} />
              <Input label="Partner Heading" value={partnerHeading} onChange={setPartnerHeading} saving={saving} />

              {/* COMPANY LOGOS */}
              <div>
                <label className="block font-medium mb-2">Company Logos</label>

                {companyLogos.map((logo, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={logo}
                      onChange={(e) => updateLogo(index, e.target.value)}
                      className="w-full border rounded px-3 py-2"
                      disabled={saving}
                    />
                    <button
                      type="button"
                      onClick={() => removeLogo(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addLogo}
                  className="text-primary-500 font-medium"
                >
                  + Add Logo
                </button>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-primary-500 text-white py-2 rounded mt-6"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPageHeroCMS;

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
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={saving}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );
}

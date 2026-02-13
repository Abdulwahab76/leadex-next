"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import EditButton from "@/Components/common/editButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

function LandingPageHeroCMS() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [para, setPara] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  const [productHeading, setProductHeading] = useState("");
  const [productPara, setProductPara] = useState("");
  const [solutionHeading, setSolutionHeading] = useState("");
  const [distributorHeading, setDistributorHeading] = useState("");
  const [partnerHeading, setPartnerHeading] = useState("");

  const [distributorLogos, setDistributorLogos] = useState<string[]>([]);
  const [partnerLogos, setPartnerLogos] = useState<string[]>([]);

  /* ================= FETCH ================= */

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

          setDistributorLogos(data.distributorLogos || []);
          setPartnerLogos(data.partnerLogos || []);
        }
      } catch (error: any) {
        toast.error("Failed to fetch landing page data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================= SAVE ================= */

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

          distributorLogos: distributorLogos.filter((l) => l.trim() !== ""),
          partnerLogos: partnerLogos.filter((l) => l.trim() !== ""),

          updatedAt: new Date(),
        },
        { merge: true }
      );

      toast.success("Landing page hero updated successfully!");
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  /* ================= LOGO HANDLERS ================= */

  const updateLogo = (
    index: number,
    value: string,
    type: "distributor" | "partner"
  ) => {
    if (type === "distributor") {
      const updated = [...distributorLogos];
      updated[index] = value;
      setDistributorLogos(updated);
    } else {
      const updated = [...partnerLogos];
      updated[index] = value;
      setPartnerLogos(updated);
    }
  };

  const addLogo = (type: "distributor" | "partner") => {
    if (type === "distributor") {
      setDistributorLogos([...distributorLogos, ""]);
    } else {
      setPartnerLogos([...partnerLogos, ""]);
    }
  };

  const removeLogo = (
    index: number,
    type: "distributor" | "partner"
  ) => {
    if (type === "distributor") {
      setDistributorLogos(distributorLogos.filter((_, i) => i !== index));
    } else {
      setPartnerLogos(partnerLogos.filter((_, i) => i !== index));
    }
  };

  const LogoPreview = ({ url }: { url: string }) => {
    if (!url) return null;

    return (
      <div className="relative w-24 h-24 border rounded overflow-hidden mt-2">
        <Image src={url} alt="logo" fill className="object-contain" />
      </div>
    );
  };

  /* ================= UI ================= */

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Landing Page Hero</h2>
        <EditButton onClick={() => setIsModalOpen(true)} />
      </div>

      {/* PREVIEW SECTION */}
      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-10 mt-6">

          {/* ================= LEFT: TEXT ================= */}
          <div className="space-y-4">

            <Field label="Title" value={title} />
            <Field label="Paragraph" value={para} />
            <Field label="Product Heading" value={productHeading} />
            <Field label="Product Paragraph" value={productPara} />
            <Field label="Solution Heading" value={solutionHeading} />
            <Field label="Distributor Heading" value={distributorHeading} />
            <Field label="Partner Heading" value={partnerHeading} />

          </div>

          {/* ================= RIGHT: IMAGES ================= */}
          <div className="space-y-8">

            {/* Background Image */}
            <div>
              <p className="text-primary font-medium mb-2">Background Image</p>
              {backgroundImage && (
                <div className="relative w-full h-40 rounded overflow-hidden border">
                  <Image
                    src={backgroundImage}
                    alt="bg"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Distributor Logos */}
            {distributorLogos.length > 0 && (
              <div>
                <p className="text-primary font-medium mb-2">
                  Distributor Logos
                </p>
                <div className="flex flex-wrap gap-4">
                  {distributorLogos.map((logo, i) => (
                    <div key={i} className="relative w-20 h-20 border rounded">
                      <Image
                        src={logo}
                        alt="dist"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Partner Logos */}
            {partnerLogos.length > 0 && (
              <div>
                <p className="text-primary font-medium mb-2">
                  Partner Logos
                </p>
                <div className="flex flex-wrap gap-4">
                  {partnerLogos.map((logo, i) => (
                    <div key={i} className="relative w-20 h-20 border rounded">
                      <Image
                        src={logo}
                        alt="partner"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      )}


      {/* MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => !saving && setIsModalOpen(false)}
        >
          <div
            className="bg-white w-[95%] max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-6">
              Edit Landing Page Hero
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">

              <Input label="Hero Title" value={title} onChange={setTitle} saving={saving} />
              <Input label="Hero Paragraph" value={para} onChange={setPara} saving={saving} />
              <Input label="Background Image URL" value={backgroundImage} onChange={setBackgroundImage} saving={saving} />
              <LogoPreview url={backgroundImage} />

              {/* Distributor Logos */}
              <LogoEditor
                title="Distributor Logos"
                logos={distributorLogos}
                type="distributor"
                addLogo={addLogo}
                updateLogo={updateLogo}
                removeLogo={removeLogo}
                saving={saving}
              />

              {/* Partner Logos */}
              <LogoEditor
                title="Partner Logos"
                logos={partnerLogos}
                type="partner"
                addLogo={addLogo}
                updateLogo={updateLogo}
                removeLogo={removeLogo}
                saving={saving}
              />

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-primary-500 text-white py-2 rounded"
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

/* ================= SMALL COMPONENTS ================= */

function Input({
  label,
  value,
  onChange,
  saving,
}: any) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
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

function LogoEditor({
  title,
  logos,
  type,
  addLogo,
  updateLogo,
  removeLogo,
  saving,
}: any) {
  return (
    <div>
      <label className="block font-medium mb-2">{title}</label>

      {logos.map((logo: string, index: number) => (
        <div key={index} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={logo}
              onChange={(e) =>
                updateLogo(index, e.target.value, type)
              }
              className="w-full border rounded px-3 py-2"
              disabled={saving}
            />
            <button
              type="button"
              onClick={() => removeLogo(index, type)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>

          {logo && (
            <div className="relative w-24 h-24 border rounded mt-2">
              <Image src={logo} alt="logo" fill className="object-contain" />
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => addLogo(type)}
        className="text-primary-500 font-medium"
      >
        + Add Logo
      </button>
    </div>
  );
}
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-primary font-medium">{label}</p>
      <p className="text-gray-800">{value || "-"}</p>
    </div>
  );
}

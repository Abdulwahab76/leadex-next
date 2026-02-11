"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import HeroEdit from "@/Components/admin/heroEdit";
// import NavbarEdit from "@/components/admin/navbarEdit";
import PrivacyEdit from "@/Components/admin/privacyEdit";
import AboutEdit from "@/Components/admin/aboutEdit";
import Link from "next/link";
import { useDeploy } from "@/hooks/useDeploy";
import ContactEdit from "@/Components/admin/contactEdit";
import TermsEdit from "@/Components/admin/TermsEdit";
// import BlogEdit from "@/Components/admin/blogEdit";

const deployHookUrl = process.env.NEXT_PUBLIC_VERCEL_DEPLOY_LINK;

export default function DashboardPage() {
  const { deployLoading, triggerDeploy } = useDeploy(deployHookUrl || "");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/admin/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading)
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <h2 className="text-lg text-gray-600 tracking-wide">
            Loading admin dashboard…
          </h2>
        </div>
      </div>
    );

  return (
    <div className="wrapper pb-20">
      {/* ---------- Top Action Bar ---------- */}
      <div className="sticky top-0 z-30   ">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end gap-3">
          <Link
            href="/admin/solutions"
            className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition"
          >
            Soltuions
          </Link>
          <Link
            href="/admin/products"
            className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition"
          >
            Products
          </Link>

          <button
            onClick={triggerDeploy}
            disabled={deployLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
          >
            {deployLoading ? "Saving…" : "Save Changes"}
          </button>

          <Link
            href="/admin/forgot-password"
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
          >
            Reset Password
          </Link>
        </div>
      </div>

      {/* ---------- Main Content ---------- */}
      <div className=" ">
        <AdminSection title="Landing Page">
          <HeroEdit />
        </AdminSection>

        <AdminSection title="Privacy Page">
          <PrivacyEdit />
        </AdminSection>

        <AdminSection title="About Page">
          <AboutEdit />
        </AdminSection>
        <AdminSection title="Terms Page">
          <TermsEdit />
        </AdminSection>
        <AdminSection title="Contact Page">
          <ContactEdit />
        </AdminSection>


      </div>
    </div>
  );
}

function AdminSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4 text-center border-b py-4">{title}</h2>
      <div className="     w-full ">
        {children}
      </div>
    </section>
  );
}

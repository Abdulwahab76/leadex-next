"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import HeroEdit from "@/components/admin/heroEdit";
import NavbarEdit from "@/components/admin/navbarEdit";
import PrivacyEdit from "@/components/admin/privacyEdit";
import AboutEdit from "@/components/admin/aboutEdit";
import Link from "next/link";
import { useDeploy } from "@/hooks/useDeploy";
import ContactEdit from "@/components/admin/contactEdit";
import BlogEdit from "@/components/admin/blogEdit";

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
  }, [auth, router]);

  if (loading)
    return (
      <div className="min-h-screen min-w-screen flex justify-center items-center">
        <h2 className="text-center text-4xl animate-pulse">Loading...</h2>
      </div>
    );

  return (
    <div className="mb-20">
      <div className="flex justify-end">
        <div className="flex ">
          <Link
            href="/admin/blog"
            className="block bg-primary text-white px-4 py-2 rounded-md w-max ml-auto mt-4 mr-4 hover:bg-(--btn-hover-bg) transition-all ease-in-out duration-200"
          >
            Blogs
          </Link>
          <button
            onClick={triggerDeploy}
            className="block bg-blue-500 text-white px-4 py-2 rounded-md w-max ml-auto mt-4 mr-4 hover:bg-blue-800 transition-all ease-in-out duration-200 cursor-pointer"
          >
            {deployLoading ? "Loading..." : "Save Changes"}
          </button>
          <Link
            href="/admin/forgot-password"
            className="block bg-primary text-white px-4 py-2 rounded-md w-max ml-auto mt-4 mr-4 hover:bg-(--btn-hover-bg) transition-all ease-in-out duration-200"
          >
            Reset Password
          </Link>
        </div>
      </div>
      <h2 className="text-4xl text-center mt-10">Landing Page</h2>
      <HeroEdit />
      <h2 className="text-4xl text-center mt-10">Privacy Page</h2>
      <PrivacyEdit />
      <h2 className="text-4xl text-center mt-10">About Page</h2>
      <AboutEdit />
      <h2 className="text-4xl text-center mt-10">Contact Page</h2>
      <ContactEdit />
      <h2 className="text-4xl text-center mt-10">Blog Page</h2>
      <BlogEdit />
    </div>
  );
}

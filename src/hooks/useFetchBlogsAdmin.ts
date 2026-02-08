"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Blog } from "@/types/types";
import { db } from "../../firebase/firebaseConfig";

export function useFetchBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const list: Blog[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            slug: data.slug,
            description: data.description,
            body: data.body,
            keywords: data.keywords || [],
            imageUrl: data.imageUrl || "",
            videoUrl: data.VideoUrl || "",
            YTVideoUrl: data.YTVideoUrl || "",
            type: data.type || "",
            active: data.active ?? false,
            createdAt: data.createdAt,
          };
        });

        setBlogs(list);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
}

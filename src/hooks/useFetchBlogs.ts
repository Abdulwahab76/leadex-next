import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export async function getAllBlogs() {
  const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      body: data.body,
      keywords: data.keywords || [],
      imageUrl: data.imageUrl || "",
      videoUrl: data.videoUrl || "",
      YTVideoUrl: data.YTVideoUrl || "",
      type: data.type || "",
      active: data.active ?? false,
      createdAt: data.createdAt,
    };
  });
}

export async function getBlogBySlug(slug: string) {
  const q = query(collection(db, "blogs"), where("slug", "==", slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  const data = doc.data();

  return {
    id: doc.id,
    ...data,
  };
}

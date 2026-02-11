// "use client";

import { exp } from "firebase/firestore/pipelines";

// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   doc,
//   updateDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "../../../../../firebase/firebaseConfig";
// // import RichTextEditor from "@/components/common/rich-text-editor";
// // import TagInput from "@/components/common/tag-input";
// // import { Switch } from "@/components/ui/switch";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// function Page() {
//   const pathname = usePathname();
//   const slug = pathname.split("/admin/blog/")[1];
//   const router = useRouter();
//   const [type, setType] = useState("image");

//   const [loading, setLoading] = useState(true);
//   const [docId, setDocId] = useState("");

//   const [keywords, setKeywords] = useState<string[]>([]);
//   const [active, setActive] = useState(false);
//   const [body, setBody] = useState("");

//   const [formData, setFormData] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     imageUrl: "",
//     videoUrl: "",
//     YTVideoUrl: "",
//   });

//   useEffect(() => {
//     async function fetchBlog() {
//       try {
//         const q = query(collection(db, "blogs"), where("slug", "==", slug));
//         const snapshot = await getDocs(q);

//         if (snapshot.empty) {
//           toast.error("Blog not found");
//           setLoading(false);
//           return;
//         }

//         const docSnap = snapshot.docs[0];
//         const data = docSnap.data();

//         setDocId(docSnap.id);

//         setFormData({
//           title: data.title || "",
//           slug: data.slug || "",
//           description: data.description || "",
//           imageUrl: data.imageUrl || "",
//           videoUrl: data.videoUrl || "",
//           YTVideoUrl: data.YTVideoUrl || "",
//         });

//         setBody(data.body || "");
//         setKeywords(data.keywords || []);
//         setActive(data.active ?? false);
//         setType(data.type || "image");
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load blog");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchBlog();
//   }, [slug]);

//   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   }

//   async function handleUpdate(e: React.FormEvent) {
//     e.preventDefault();

//     if (!docId) {
//       toast.error("Blog document not found");
//       return;
//     }

//     toast.loading("Updating blog...", { id: "update-blog" });

//     try {
//       await updateDoc(doc(db, "blogs", docId), {
//         ...formData,
//         body,
//         keywords,
//         active,
//         type,
//         updatedAt: serverTimestamp(),
//       });

//       toast.success("Blog updated successfully!", { id: "update-blog" });
//       router.push("/admin/blog");
//     } catch (err) {
//       console.error(err);
//       toast.error("Update failed", { id: "update-blog" });
//     }
//   }

//   if (loading) {
//     return (
//       <div className="wrapper font-inria mt-20">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="wrapper font-inria">
//       <h2 className="font-bold text-[52px] capitalize mt-[52px]">
//         Edit Blog Post
//       </h2>

//       <form onSubmit={handleUpdate} className="mt-5">
//         {/* Title */}
//         <div className="flex flex-col gap-2 mb-5">
//           <label className="font-bold">Title</label>
//           <input
//             id="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="border rounded-sm py-1 px-2 shadow"
//             required
//           />
//         </div>

//         {/* Slug */}
//         <div className="flex flex-col gap-2 mb-5">
//           <label className="font-bold">Slug</label>
//           <input
//             id="slug"
//             value={formData.slug}
//             onChange={handleChange}
//             className="border rounded-sm py-1 px-2 shadow"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div className="flex flex-col gap-2 mb-5">
//           <label className="font-bold">Summary</label>
//           <input
//             id="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="border rounded-sm py-1 px-2 shadow"
//             required
//           />
//         </div>

//         {/* Body */}
//         {/* <RichTextEditor defaultValue={body} onChange={setBody} /> */}

//         {/* Tags */}
//         <div className="flex flex-col gap-2 my-5">
//           <label className="font-bold">Tags</label>
//           {/* <TagInput value={keywords} onChange={setKeywords} /> */}
//         </div>

//         <div className="flex items-center justify-center">
//           <div className="flex bg-gray-200 rounded-md w-fit">
//             <button
//               className={`px-2 ${
//                 type === "image" && "bg-primary text-white"
//               } py-1 rounded-md`}
//               onClick={() => {
//                 setType("image");
//               }}
//               type="button"
//             >
//               Image
//             </button>
//             <button
//               className={`px-2 ${
//                 type === "video" && "bg-primary text-white"
//               } py-1 rounded-md`}
//               onClick={() => {
//                 setType("video");
//               }}
//               type="button"
//             >
//               Video
//             </button>
//             <button
//               className={`px-2 ${
//                 type === "YTVideo" && "bg-primary text-white"
//               } py-1 rounded-md`}
//               onClick={() => {
//                 setType("YTVideo");
//               }}
//               type="button"
//             >
//               YTVideo
//             </button>
//           </div>
//         </div>

//         {type === "image" ? (
//           <div className="flex flex-col gap-2 mb-5">
//             <label htmlFor="imageUrl" className="font-bold">
//               Image URL (manual)
//             </label>
//             <input
//               type="text"
//               id="imageUrl"
//               className="border rounded-sm py-1 px-2 shadow"
//               placeholder="Enter Image URL"
//               value={formData.imageUrl}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         ) : type === "video" ? (
//           <div className="flex flex-col gap-2 mb-5">
//             <label htmlFor="imageUrl" className="font-bold">
//               Video URL (manual)
//             </label>
//             <input
//               type="text"
//               id="videoUrl"
//               className="border rounded-sm py-1 px-2 shadow"
//               placeholder="Enter Video URL"
//               value={formData.videoUrl}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         ) : (
//           <div className="flex flex-col gap-2 mb-5">
//             <label htmlFor="imageUrl" className="font-bold">
//               YTVideo (Social Media Embed Code )
//             </label>
//             <input
//               type="text"
//               id="YTVideoUrl"
//               className="border rounded-sm py-1 px-2 shadow"
//               placeholder="Enter YTVideo URL"
//               value={formData.YTVideoUrl}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         )}

//         {/* Active */}
//         <div className="flex items-center gap-2">
//           <p className="font-bold">Active</p>
//           {/* <Switch checked={active} onCheckedChange={setActive} /> */}
//         </div>

//         <button className="bg-primary text-white px-3 py-2 rounded-sm my-8">
//           Update Blog
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Page;

import { doc, getDoc } from "firebase/firestore";
import { Product } from "@/hooks/useFetchAllProducts";
import ProductForm from "@/Components/ProductForm";
// import { db } from "../../../../../../firebase/firebaseConfig";

interface Props {
    params: { slug: string };
}

export default async function EditProductPage({ params }: Props) {
    const {slug} = await params
    // const snap = await getDoc(doc(db, "products", params.slug));

    // if (!snap.exists()) {
    //     return <div className="p-6">Product not found</div>;
    // }

    // const product = {
    //     id: snap.id,
    //     ...snap.data(),
    // } as Product;

    // return <ProductForm mode="edit" initialProduct={product} />;
    return (
        <div>hello {slug}</div>
    )
}

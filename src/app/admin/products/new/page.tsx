// "use client";

import ProductForm from "@/Components/ProductForm";

// import { useState } from "react";
// import RichTextEditor from "@/components/common/rich-text-editor";
// import TagInput from "@/components/common/tag-input";
// import { Switch } from "@/components/ui/switch";
// import { db } from "../../../../../firebase/firebaseConfig";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// function Page() {
//   const router = useRouter();
//   const [type, setType] = useState("image");
//   const [keywords, setKeywords] = useState<string[]>([]);
//   const [active, setActive] = useState(false);
//   const [body, setBody] = useState("");
//   const [submit, setSubmit] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     imageUrl: "",
//     videoUrl: "",
//     YTVideoUrl: "",
//   });

//   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   }

//   async function handleSubmit(e: React.FormEvent) {
//     setSubmit(true);
//     toast.loading("Creating blog", { id: "create-blog" });
//     e.preventDefault();

//     const payload = {
//       ...formData,
//       body,
//       keywords,
//       active,
//       type,
//       createdAt: serverTimestamp(),
//     };

//     try {
//       await addDoc(collection(db, "blogs"), payload);
//       toast.success("Blog created successfully!", { id: "create-blog" });
//       router.push("/admin/blog");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to create blog", { id: "create-blog" });
//     } finally {
//       setSubmit(false);
//     }
//   }

//   return (
//     <div className="wrapper font-inria">
//       <h2 className="font-bold text-[52px] capitalize mt-[52px]">
//         New Blog Post
//       </h2>

//       <form onSubmit={handleSubmit} className="mt-5">
//         {/* Title */}
//         <div className="flex flex-col gap-2 mb-5">
//           <label htmlFor="title" className="font-bold">
//             Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             className="border rounded-sm py-1 px-2 shadow"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Slug */}
//         <div className="flex flex-col gap-2 mb-5">
//           <label htmlFor="slug" className="font-bold">
//             Slug
//           </label>
//           <input
//             type="text"
//             id="slug"
//             className="border rounded-sm py-1 px-2 shadow"
//             value={formData.slug}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Description */}
//         <div className="flex flex-col gap-2 mb-5">
//           <label htmlFor="description" className="font-bold">
//             Summery
//           </label>
//           <input
//             type="text"
//             id="description"
//             className="border rounded-sm py-1 px-2 shadow"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Rich Text */}
//         <RichTextEditor onChange={setBody} />

//         {/* Tags */}
//         <div className="flex flex-col gap-2 my-5">
//           <label className="font-bold">Tags</label>
//           <TagInput value={keywords} onChange={setKeywords} />
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
//               YTVideo URL (manual)
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
//           <Switch checked={active} onCheckedChange={setActive} />
//         </div>

//         {/* Submit */}
//         <button
//           className="bg-primary hover:bg-(--btn-hover-bg) text-white px-3 py-2 rounded-sm my-8 transition-colors"
//           disabled={submit}
//         >
//           Create Blog
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Page;

export default function NewProductPage() {
    return <ProductForm mode="add" />;
}

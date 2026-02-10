"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { DropdownButton } from "@/Components/common/dropdown-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "@/Components/ui/switch";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function page() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchBlogs() {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const list: any[] = snapshot.docs.map((doc) => {
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
          active: data.active ?? false,
          type: data.type,
          createdAt: data.createdAt,
        };
      });

      setBlogs(list);
    }

    fetchBlogs();
  }, []);

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

  async function handleActiveBlog(id: string, value: boolean) {
    const toastId = toast.loading("Updating Status...");

    try {
      await updateDoc(doc(db, "blogs", id), {
        active: value,
      });

      setBlogs((prev) =>
        prev.map((b) => (b.id === id ? { ...b, active: value } : b))
      );

      toast.success("Blog Status Updated", { id: toastId });
    } catch (err) {
      toast.error("Error updating blog status", { id: toastId });
      console.error(err);
    }
  }

  if (loading)
    return (
      <div className="min-h-screen min-w-screen flex justify-center items-center">
        <h2 className="text-center text-4xl animate-pulse">Loading...</h2>
      </div>
    );

  return (
    <div className="wrapper font-inria">
      <div className="flex items-center justify-between mt-[52px]">
        <h2 className="font-bold text-[52px] capitalize">Product Manage</h2>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 justify-center bg-primary text-white px-4 py-2 rounded-md w-max ml-auto mt-4 hover:bg-(--btn-hover-bg) transition-all ease-in-out duration-200"
        >
          <FontAwesomeIcon icon={faPlus} className="w-3" />
          Add Product
        </Link>
      </div>

      <Table className="border my-6 relative">
        <TableHeader>
          <TableRow>
            <TableHead className="">Title</TableHead>
            <TableHead className="text-center">Tags</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center whitespace-nowrap">
              URL Type
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium">{blog.title}</TableCell>
                <TableCell className="flex items-center gap-2 justify-center flex-wrap">
                  {blog.keywords.map((tag: string, i: number) => (
                    <span
                      className="bg-green-100 px-2 py-1 text-green-700 rounded-full border font-medium text-xs"
                      key={i}
                    >
                      {tag}
                    </span>
                  ))}
                </TableCell>
                <TableCell className="text-right">
                  <Switch
                    id="blog-mode"
                    checked={blog.active}
                    onCheckedChange={(val) =>
                      handleActiveBlog(blog.id ? blog.id : "", val)
                    }
                  />
                </TableCell>
                <TableCell className="text-right">
                  {blog.type}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownButton slug={blog.slug} id={blog.id || ""} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No Blogs Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default page;

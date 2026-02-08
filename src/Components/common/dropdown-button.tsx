"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";

interface Props {
  slug: string;
  id: string;
}

export function DropdownButton({ slug, id }: Props) {
  const router = useRouter();

  const handleDeleteBlog = async (id: string) => {
    const ask = confirm("Are you sure you want to delete this blog?");
    if (!ask) return;

    const toastId = toast.loading("Deleting...");

    try {
      await deleteDoc(doc(db, "blogs", id));
      toast.success("Blog deleted successfully.", { id: toastId });
      router.push("/admin/blog");
    } catch (error) {
      toast.error("Failed to delete blog.", { id: toastId });
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="font-bold text-lg">
          ...
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-20" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`/admin/blog/${slug}`)}
          >
            <FontAwesomeIcon icon={faEdit} />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`/blog/${slug}`)}
          >
            <FontAwesomeIcon icon={faEye} />
            View
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-500 cursor-pointer"
            onClick={() => handleDeleteBlog(id)}
          >
            <FontAwesomeIcon icon={faTrash} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

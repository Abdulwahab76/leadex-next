"use client";

import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Product } from "@/hooks/useFetchAllProducts";
import { useRouter } from "next/navigation";

interface Props {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
}

export function DropdownButton({ product, onEdit, onDelete }: Props) {
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-bold text-lg">
                    ⋯
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-32" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="cursor-pointer flex gap-2"
                        // onClick={() => onEdit(product)}
                        onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="text-red-500 cursor-pointer flex gap-2"
                        onClick={() => onDelete(product.id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

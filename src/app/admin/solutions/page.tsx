"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllSolutions, deleteSolution } from "@/lib/solutionService";
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
import { Solution } from "@/hooks/useFetchAllSolutions"; // ✅ change import
import { useRouter } from "next/navigation";
export default function SolutionsAdminPage() {
    const [solutions, setSolutions] = useState<Solution[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const data = await getAllSolutions();
        setSolutions(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        const confirmDelete = confirm("Are you sure?");
        if (!confirmDelete) return;

        await deleteSolution(id);
        fetchData();
    };

    if (loading) return <p className="p-10">Loading...</p>;

    return (
        <div className="p-10 wrapper">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Solutions</h1>
                <Link
                    href="/admin/solutions/new"
                    className="bg-primary-500 text-white px-4 py-2 rounded"
                >
                    + Add Solution
                </Link>
            </div>

            <table className="w-full border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Category</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {solutions.map((solution) => (
                        <tr key={solution.id} className="border-t">
                            <td className="p-3">{solution.name}</td>
                            <td className="p-3">{solution.category}</td>
                            <td className="p-3">
                                <SolutionDropdownButton
                                    solution={solution}
                                    onDelete={handleDelete}
                                />
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

interface Props {
    solution: Solution; // ✅ changed
    onDelete: (id: string) => void; // no need for onEdit if using router
}
export function SolutionDropdownButton({ solution, onDelete }: Props) {
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
                        onClick={() => router.push(`/admin/solutions/${solution.id}/edit`)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="text-red-500 cursor-pointer flex gap-2"
                        onClick={() => onDelete(solution.id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
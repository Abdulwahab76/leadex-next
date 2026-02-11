"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllSolutions, deleteSolution } from "@/lib/solutionService";
import { Solution } from "@/hooks/useFetchAllSolutions";

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
                            <td className="p-3 flex gap-3">
                                <Link
                                    href={`/admin/solutions/${solution.id}/edit`}
                                    className="text-blue-600"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(solution.id)}
                                    className="text-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

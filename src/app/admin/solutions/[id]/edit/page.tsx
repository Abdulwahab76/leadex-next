"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    getSolutionById,
    updateSolution,
} from "@/lib/solutionService";
import { Solution } from "@/hooks/useFetchAllSolutions";
import SolutionForm from "@/Components/SolutionForm";

export default function EditSolutionPage() {
    const { id } = useParams();
    const router = useRouter();
    const [solution, setSolution] = useState<Solution | null>(null);

    useEffect(() => {
        if (id) {
            getSolutionById(id as string).then(setSolution);
        }
    }, [id]);

    const handleUpdate = async (data: any) => {
        await updateSolution(id as string, data);
        router.push("/admin/solutions");
    };

    if (!solution) return <p className="p-10">Loading...</p>;

    return (
        <div className="p-10 wrapper">
            <h1 className="text-2xl font-bold mb-6">Edit Solution</h1>
            <SolutionForm initialData={solution} onSubmit={handleUpdate} />
        </div>
    );
}

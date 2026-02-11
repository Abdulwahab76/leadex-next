"use client";

import { useRouter } from "next/navigation";
import { createSolution } from "@/lib/solutionService";
import SolutionForm from "@/Components/SolutionForm";

export default function NewSolutionPage() {
    const router = useRouter();

    const handleCreate = async (data: any) => {
        await createSolution(data);
        router.push("/admin/solutions");
    };

    return (
        <div className="p-10 wrapper">
            <h1 className="text-2xl font-bold mb-6">Create Solution</h1>
            <SolutionForm onSubmit={handleCreate} />
        </div>
    );
}

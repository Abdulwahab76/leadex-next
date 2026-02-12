import { Solution } from "@/hooks/useFetchAllSolutions";
import { getAllSolutions } from "@/lib/solutionService";
import Image from "next/image";
import Link from "next/link";


export const revalidate = 60; // ISR, optional

export default async function SolutionsPage() {
    let solutions: Solution[] = [];

    try {
        solutions = await getAllSolutions();
    } catch (error) {
        console.error("Error fetching solutions:", error);
    }

    if (!solutions.length) {
        return (
            <div className="text-center py-20 text-gray-500">
                No solutions available.
            </div>
        );
    }

    return (
        <main className="bg-light-background py-16">
            <div className="mx-auto w-11/12 lg:w-10/12 max-w-6xl">
                <h1 className="text-3xl lg:text-4xl font-bold mb-12 text-center">
                    Our Solutions
                </h1>

                <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {solutions.map((solution) => (
                        <li key={solution.id}>
                            <Card solution={solution} />
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

function Card({ solution }: { solution: Solution }) {
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg h-full">
            {/* Hero / Background Image */}
            <div className="relative h-52 w-full">
                <Image
                    src={solution.background_image || "/placeholder.png"}
                    alt={solution.name ?? 'Solution image'}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col px-6 py-4">
                <h3 className="text-lg font-bold">{solution.name}</h3>
                <p className="mt-2 text-xs text-gray-600">{solution.heroPara ?? 'Missing'}</p>

                <Link
                    href={`/solutions/${solution.id}`}
                    className="mt-auto inline-flex items-center gap-2 pt-4 text-xs text-blue-600 hover:underline"
                >
                    Read more
                </Link>
            </div>
        </div>
    );
}

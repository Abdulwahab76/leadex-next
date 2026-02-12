'use client'
import { Solution } from "@/hooks/useFetchAllSolutions";
import { getAllSolutions } from "@/lib/solutionService";
import { ChevronLeft, ChevronRight, Clock2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";

export interface SolutionSection {
    title: string;
    descp: string;
    imgs: string[];
}

type Props = {
    title?: string;
    limit?: number;
};

export default function GetInspiredSection({ title, limit = 3 }: Props): JSX.Element {
    const [solutions, setSolutions] = useState<Solution[]>([]);
    const [current, setCurrent] = useState(0);

    // Fetch solutions from Firestore
    useEffect(() => {
        const fetchSolutions = async () => {
            try {
                const allSolutions = await getAllSolutions();
                setSolutions(allSolutions.slice(0, limit)); // show only first N
            } catch (error) {
                console.error("Error fetching solutions:", error);
            }
        };
        fetchSolutions();
    }, [limit]);

    const total = solutions.length;

    // Auto slider (mobile)
    useEffect(() => {
        if (total <= 1) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % total);
        }, 4000);
        return () => clearInterval(interval);
    }, [total]);

    const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);
    const nextSlide = () => setCurrent((prev) => (prev + 1) % total);


    return (
        <section className="bg-light-background py-8 lg:py-16">
            <div className="mx-auto w-11/12 px-2 lg:px-0 lg:w-10/12 max-w-350">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex flex-wrap justify-between w-full">
                        <h2 className="text-2xl lg:text-3xl font-medium">
                            {title ?? "Our Solutions in Action"}
                        </h2>
                        <a href="/solutions" className="text-xs font-normal text-blue-600">
                            View all projects
                        </a>
                    </div>

                    {/* Mobile nav */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <button onClick={prevSlide} className="rounded-full p-3 shadow">
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button onClick={nextSlide} className="rounded-full p-3 shadow">
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* MOBILE SLIDER */}
                <div className="relative overflow-hidden lg:hidden">
                    <ul
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {solutions.map((solution) => (
                            <li key={solution.id} className="min-w-full px-1">
                                <Card solution={solution} />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* DESKTOP GRID */}
                <ul className="hidden gap-8 lg:grid-cols-3 lg:grid">
                    {solutions.map((solution) => (
                        <li key={solution.id}>
                            <Card solution={solution} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

function Card({ solution }: { solution: Solution }) {
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow">
            {/* Hero / Background Image */}
            <div className="relative h-52 w-full">
                <Image
                    src={solution.background_image ?? "/placeholder.png"}
                    alt={solution.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col px-7 p-6">
                <h3 className="text-lg font-bold">{solution.name}</h3>
                <p className="mt-2 text-xs text-gray-600">{solution.heroPara}</p>

                <Link
                    href={`/solutions/${solution.id}`}
                    className="mt-auto inline-flex items-center gap-2 pt-4 text-xs text-blue-600"
                >
                    <Clock2 className="h-3 w-3 text-gray-400" />
                    Read more
                </Link>
            </div>
        </div>
    );
}

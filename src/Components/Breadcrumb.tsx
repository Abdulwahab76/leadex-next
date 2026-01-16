import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Breadcrumb({ current }: { current: string }) {
    return (
        <nav className="text-sm text-white flex md:flex-row  ">
            <Link href="/" className="hover:underline">
                Home
            </Link>
            <span className="mx-2"><ChevronRight /></span>
            <span>{current}</span>
        </nav>
    );
}

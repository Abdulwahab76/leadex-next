import Image from "next/image";
import Link from "next/link";

type Props = {
    name: string;
    image: string;
    slug: string;
};

export default function ProductCard({ name, image, slug }: Props) {

    return (
        <Link
            href={`/products/roof-repair/${slug}`}
            className="flex flex-col items-center gap-3 hover:scale-105 transition"
        >
            <Image
                src={image}
                alt={name}
                width={120}
                height={200}
                className="object-contain"
            />
            <span className="text-green-600 text-sm font-medium">{name}</span>
        </Link>
    );
}

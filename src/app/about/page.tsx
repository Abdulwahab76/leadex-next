import FeaturesSection from "@/Components/FeatureSection";

export const metadata = {
    title: "About BodenLink - High-Performance Roofing Solutions",
    description:
        "Learn about BodenLink, a leading manufacturer of professional roofing and waterproofing solutions, committed to durability, safety, and innovation.",
};

export default function AboutPage() {
    return (
        <div>
            <FeaturesSection
                features={[
                    {
                        title: "Sustainability",
                        description: "Reducing waste through circular materials.",
                        icon: "/icons/circular.webp",
                    },
                    {
                        title: "High quality",
                        description: "Certified and tested for professional use.",
                        icon: "/icons/award.webp",
                    },
                    {
                        title: "Innovation",
                        description: "Constantly improving our solutions.",
                        icon: "/icons/easy.webp",
                    },
                ]}
            />
            <section
                aria-labelledby="about-us-heading"
                className="min-h-full wrapper py-10"
            >
                <div className="mb-6">
                    <h1 id="about-us-heading" className="text-2xl font-medium">
                        About BodenLink
                    </h1>
                </div>

                <article className="w-full space-y-4 text-sm text-gray-700">
                    <p>
                        BodenLink is a trusted manufacturer of high-performance roofing and
                        waterproofing solutions designed for professional construction and
                        industrial applications. Our products combine engineering excellence
                        with field-proven reliability, ensuring long-term durability and
                        safety.
                    </p>

                    <p>
                        We focus on providing innovative alternatives to traditional
                        construction materials by combining advanced polymers, reinforced
                        structures, and proven adhesive technologies. Our goal is to make
                        installation faster, safer, and more efficient for contractors and
                        installers.
                    </p>

                    <h2 className="font-medium mt-4">Our Product Portfolio</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Engineered waterproofing and flashing systems</li>
                        <li>Lead-free and environmentally responsible materials</li>
                        <li>Products tested to international performance standards</li>
                        <li>Designed for professional installers and contractors</li>
                    </ul>

                    <h2 className="font-medium mt-4">Our Mission & Commitment</h2>
                    <p>
                        Our mission is to provide high-quality, durable, and safe roofing
                        solutions while minimizing environmental impact. BodenLink is
                        dedicated to innovation, technical support, and maintaining the
                        highest standards in product performance.
                    </p>

                    <h2 className="font-medium mt-4">Why Choose BodenLink</h2>
                    <p>
                        Contractors and construction professionals trust BodenLink for critical
                        roofing, penetration sealing, and weatherproofing projects because
                        our products consistently deliver performance under challenging
                        conditions. We combine technical expertise, rigorous testing, and
                        practical installation solutions to ensure peace of mind for every
                        project.
                    </p>
                </article>
            </section>

        </div>

    );
}

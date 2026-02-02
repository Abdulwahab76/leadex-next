import FeaturesSection from '@/Components/FeatureSection'

const Sustainability = () => {
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
        </div>
    )
}

export default Sustainability
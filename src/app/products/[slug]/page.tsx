import ProductClient, { Product } from "@/Components/ProductClient"
import ProductClientNew from "@/Components/ProductClientNew"


export default async function ProductPage() {
    const product: Product = {
        id: 'B128',
        title:
            'Polyester Cotton Cargo Work Pants With Detachable Tool Pockets & Knee Reinforcement B128',
        price: 55,
        information: 'Bodenlink RoofBond is a premium, self-adhesive waterproof flashing membrane designed as the ultimate alternative to traditional lead or aluminum panels.This flexible ribbonmaterial features a high- performance three-layer construction consisting of a UV - resistant top layer, an expandable aluminum mesh core, and a powerful butyl adhesive backing.',
        description: [
            'Rapid Installation: 40–60% faster than traditional methods',
            'Lead-Free: Non-toxic and safe for rainwater harvesting',
            'No Open Flame: Cold-applied butyl adhesive requires no torching.',
            '20+ Year Durability: Engineered for long-term weatherability and UV resistance.',
            'Extreme Flexibility: Can be stretched in any direction to match roof profiles.',
        ],
        features: [
            {
                title: 'Three-Layer Composite Construction',
                content:
                    'Constructed with a UV-resistant Polyisobutylene (PIB) top layer, a stretchable aluminum mesh core, and a premium butyl rubber adhesive for long-term waterproofing and durability.',
            },
            {
                title: 'Self-Adhesive Butyl Backing',
                content:
                    'High-bond butyl rubber adhesive provides strong adhesion without primers or open-flame installation, enabling safe and fast cold application.',
            },
            {
                title: 'Stretchable Aluminum Mesh Core',
                content:
                    'Expandable aluminum reinforcement allows multidirectional stretching, enabling the membrane to conform tightly to complex roof shapes and penetrations.',
            },
            {
                title: 'UV & Weather Resistance',
                content:
                    'Polyisobutylene (PIB) surface layer offers excellent resistance to UV exposure, moisture, and extreme weather conditions for 20+ year durability.',
            },
            {
                title: 'Extreme Temperature Performance',
                content:
                    'Designed to perform in harsh climates with service temperatures ranging from −22°F to 194°F and cold flexibility tested down to −58°F.',
            },
            {
                title: 'Lead-Free & Environmentally Safe',
                content:
                    'Non-toxic, lead-free formulation makes it safe for installers and suitable for rainwater harvesting systems.',
            },
        ],
        physicalProperties: [
            { label: 'Thickness', value: '1.5 – 2.0 mm' },
            { label: 'Colors', value: 'Black, Terracotta' },
            { label: 'Weight', value: '~0.5 lb/ft²' },
            { label: 'Service Temperature', value: '−22°F to 194°F' },
            { label: 'Cold Flexibility', value: 'Pass at −58°F' },
        ],
        materialComposition: [
            {
                layer: 'Top Layer',
                material: 'Polyisobutylene (PIB)',
                function: 'UV & weather resistance',
            },
            {
                layer: 'Reinforcement',
                material: 'Stretchable aluminum mesh',
                function: 'Strength & flexibility',
            },
            {
                layer: 'Adhesive',
                material: 'Premium butyl rubber',
                function: 'High-bond adhesion, no primer required',
            },
            {
                layer: 'Backing',
                material: 'Release film',
                function: 'Controlled, clean application',
            },
        ],
        availableSizesCoverage: [
            {
                width: '11 in',
                rollLength: '16.4 ft',
                totalCoverage: '15 ft²',
            },
            {
                width: '12 in',
                rollLength: '16.4 ft',
                totalCoverage: '16 ft²',
            },
            {
                width: '12 in',
                rollLength: '32.8 ft',
                totalCoverage: '32 ft²',
            },
            {
                width: '18 in',
                rollLength: '16.4 ft',
                totalCoverage: '24 ft²',
            },
            {
                width: '18 in',
                rollLength: '32.8 ft',
                totalCoverage: '48 ft²',
            },
            {
                width: '24 in',
                rollLength: '32.8 ft',
                totalCoverage: '65 ft²',
            },
        ],
        idealApplications: [
            {
                title: 'Roof Nodes',
                items: [
                    'Chimneys',
                    'Skylights',
                    'Masonry wall abutments',
                ],
            },
            {
                title: 'Penetrations',
                items: [
                    'Solar panel bases',
                    'Fan bases',
                    'Vent pipes',
                ],
            },
            {
                title: 'Repairs',
                items: [
                    'Existing flashing repairs',
                    'Lead replacement',
                ],
            },
        ],
        technicalPerformance: [
            {
                property: 'Watertightness',
                performance: '≥ 0.3 psi (2 kPa)',
                standard: 'EN 1928',
            },
            {
                property: 'Tensile Strength',
                performance: '> 300 N / 50 mm',
                standard: 'EN 12311-1',
            },
            {
                property: 'Elongation',
                performance: '> 50% (both directions)',
                standard: 'EN 12311-1',
            },
            {
                property: 'Fire Classification',
                performance: 'Class E',
                standard: 'EN 13501-1',
            },
        ],
        compatibleSubstrates: [
            {
                category: 'Masonry',
                materials: ['Brick', 'Concrete', 'Stone'],
            },
            {
                category: 'Metal',
                materials: ['Steel', 'Aluminum', 'Zinc', 'Copper'],
            },
            {
                category: 'Other',
                materials: [
                    'Clay tiles',
                    'Concrete tiles',
                    'Wood',
                    'OSB',
                    'Bituminous membranes',
                ],
            },
        ],
        installationGuide: [
            {
                step: 1,
                title: 'Surface Preparation',
                description:
                    'Ensure surfaces are completely dry, clean, and free of dust, grease, or loose debris.',
            },
            {
                step: 2,
                title: 'Measure & Cut',
                description:
                    'Measure and cut the membrane, allowing a minimum overlap of 2 in (50 mm) on all sides.',
            },
            {
                step: 3,
                title: 'Application',
                description:
                    'Peel back the release film and press the membrane firmly onto the surface.',
            },
            {
                step: 4,
                title: 'Rolling',
                description:
                    'Use a rubber roller (essential) to activate the butyl adhesive and ensure full contact.',
            },
            {
                step: 5,
                title: 'Seams',
                description:
                    'Overlap adjacent pieces by 4 in (100 mm) and roll seams firmly for watertight sealing.',
            },
        ],
        storageAndHealth: [
            {
                title: 'Storage Conditions',
                description:
                    'Store in a cool, dry place between 41°F and 77°F, away from direct sunlight.',
            },
            {
                title: 'Shelf Life',
                description:
                    'Product shelf life is 12–24 months when stored in original, unopened packaging.',
            },
            {
                title: 'Health & Safety',
                description:
                    'Wear standard roofing PPE including gloves and eye protection. Avoid prolonged skin contact with adhesive.',
            },
        ]
    }



    return (
        <main className="py-8">
            <ProductClientNew product={product} slideImages={[
                "/images/box.webp",
                "/images/dakaflash-roll.png",
                "/images/Flexoflash-packaging.png",
            ]} />
        </main>
    )
}

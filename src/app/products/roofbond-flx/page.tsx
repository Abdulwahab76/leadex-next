import ProductClient, { Product } from "@/Components/ProductClient"


export default async function ProductPage() {
    const product: Product = {
        id: 'B128',
        title:
            'Polyester Cotton Cargo Work Pants With Detachable Tool Pockets & Knee Reinforcement B128',
        price: 55,
        colors: ['Black', 'Grey', 'Navy'],
        waistSizes: ['W30', 'W32', 'W34', 'W36'],
        lengths: ['L28', 'L30', 'L32'],
        description: [
            'Durable polyester-cotton fabric for tough working conditions',
            'Heavy-duty tool pockets for fast access',
            'Knee reinforcement for added durability',
            'Breathable fabric for all-day comfort',
            'Reinforced stitching for long-lasting wear',
        ],
        features: [
            {
                title: 'Detachable Hammer Pockets',
                content:
                    'Provides versatile tool holding and easy removal for comfort and convenience during lighter tasks.',
            },
            {
                title: 'Three-Layer Tool Pockets',
                content:
                    'Designed to store tools securely while preventing fabric wear and tear.',
            },
            {
                title: 'Knee Protection',
                content:
                    'Extra reinforced knee panels for improved durability and comfort during kneeling work.',
            },
            {
                title: 'Stretchable Waistband',
                content:
                    'Elastic waist inserts ensure comfort and flexibility throughout the workday.',
            },
        ],
    }



    return (
        <main className="wrapper px-4 py-8">
            <ProductClient product={product} slideImages={[
                "/images/valley-application-1.webp",
                "/images/valley-application-2.webp",
                "/images/valley-application-2.webp",
            ]} />
        </main>
    )
}

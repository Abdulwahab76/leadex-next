import ProductClientNew from "@/Components/ProductClientNew"

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    return (
        <main className="py-8">
            <ProductClientNew
                slug={slug}
                slideImages={[
                    "/images/box.webp",
                    "/images/dakaflash-roll.png",
                    "/images/Flexoflash-packaging.png",
                ]}
            />
        </main>
    )
}


'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Star, X } from 'lucide-react'
import { Product } from './ProductClient'
import ProductSlider from './ProductSlider'
import FeaturesSection from './FeatureSection'

type PanelType =
    | 'description'
    | 'specification'
    | 'application'

    | null

export default function ProductClientNew({
    product,
    slideImages,
}: {
    product: Product
    slideImages: string[]
}) {
    const [activePanel, setActivePanel] = useState<PanelType>(null)

    return (
        <div className="flex flex-col gap-y-10">

            {/* MAIN PRODUCT SECTION */}
            <section className="wrapper grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                {/* LEFT – IMAGE GALLERY (DESKTOP) */}
                <div className="space-y-8 hidden lg:block">
                    {slideImages.map((img, index) => (
                        <Image
                            key={index}
                            src={img}
                            alt={`${product.title} ${index + 1}`}
                            width={900}
                            height={1100}
                            priority={index === 0}
                            className="w-full h-auto object-contain"
                        />
                    ))}
                </div>

                {/* LEFT – SLIDER (MOBILE) */}
                <div className="block lg:hidden">
                    <ProductSlider slideImages={slideImages} />
                </div>

                {/* RIGHT – CONTENT */}
                <div className="relative self-start">
                    <div className="sticky lg:top-24 flex flex-col gap-4">
                        {/* TITLE + RATING */}
                        <div className='flex flex-col gap-y-4'>
                            <h1 className="text-2xl lg:text-3xl font-medium">{product.title}</h1>
                            <div className="flex items-center gap-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className="text-amber-500 fill-amber-500"
                                    />
                                ))}
                                <span className="text-xs text-gray-600">10 Reviews</span>
                            </div>
                        </div>
                        <Link
                            href="https://bodenlinkshop.com/products/roofbond-flx?variant=50834099306781"
                            target="_blank"
                            className="block text-center border border-primary-600 bg-primary-600 text-white py-3 font-medium hover:bg-white hover:text-primary-600 transition"
                        >
                            Order Now
                        </Link>
                        {/* FEATURES — MOBILE (FULL WIDTH) */}
                        <div className="lg:hidden -mx-[calc((100vw-100%)/2)]">
                            <FeaturesSection />
                        </div>

                        {/* ORDER BUTTON */}


                        {/* PRODUCT DETAILS */}
                        <div className="pt-6 border-t border-gray-300 divide-y">
                            <h3 className="text-2xl lg:text-3xl font-medium pb-6">
                                Product Details
                            </h3>
                            <SlideItem label="Description" onClick={() => setActivePanel('description')} />
                            <SlideItem label="Specification" onClick={() => setActivePanel('specification')} />
                            <SlideItem label="Application" onClick={() => setActivePanel('application')} />
                        </div>

                    </div>
                </div>

            </section>

            {/* FEATURES — DESKTOP (FULL WIDTH) */}
            <div className="hidden lg:block">
                <FeaturesSection />
            </div>

            {/* RIGHT SLIDE DRAWER */}
            {activePanel && (
                <RightDrawer onClose={() => setActivePanel(null)}>
                    {activePanel === 'description' && <DescriptionPanel product={product} />}
                    {activePanel === 'specification' && <SpecificationPanel product={product} />}
                    {activePanel === 'application' && <ApplicationPanel product={product} />}
                </RightDrawer>
            )}

            {/* FAQ SECTION */}
            <section className="wrapper max-w-350 mx-auto">
                <h2 className="text-xl font-medium mb-6">FAQ</h2>
                {product.features.map((f, i) => (
                    <FaqAccordion
                        key={i}
                        title={f.title}
                        content={f.content}
                    />
                ))}
            </section>

        </div>

    )
}

function SlideItem({ label, onClick }: { label: string; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-full cursor-pointer flex justify-between items-center py-4 text-sm font-medium"
        >
            {label}
            <ChevronDown size={18} />
        </button>
    )
}

function RightDrawer({
    children,
    onClose,
}: {
    children: React.ReactNode
    onClose: () => void
}) {
    return (
        <div className="fixed inset-0 z-50">
            {/* Overlay */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/40"
            />

            {/* Drawer */}
            <div
                className="
                    fixed
                    bottom-0
                    right-0
                    w-full
                    h-screen
                    bg-white
                    overflow-y-auto
                    p-6
                   animate-slideInUp
                    lg:top-0
                    lg:h-full
                    lg:max-w-md
                    lg:animate-slideIn
                "
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-lg"
                >
                    <X />
                </button>

                {children}
            </div>
        </div>
    )
}


function DescriptionPanel({ product }: { product: Product }) {

    return (
        <>
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p className="text-sm text-gray-700 mb-4">{product.information}</p>
            <ul className="space-y-2 text-sm">
                {product.description.map((item, i) => {
                    const [title, rest] = item.split(":");
                    return (
                        <li key={i} className="flex gap-2 md:text-lg text-xs">
                            <span className="text-green-600">✔</span>
                            <span>
                                <strong className=''>{title}:</strong>{rest}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </>
    )
}

function SpecificationPanel({ product }: { product: Product }) {
    return (
        <>
            <h2 className="text-lg font-semibold mb-4">Specification</h2>
            <ul className="space-y-2 text-sm">
                {product.physicalProperties.map(p => (
                    <li key={p.label} className="flex justify-between">
                        <span>{p.label}</span>
                        <span className="font-medium">{p.value}</span>
                    </li>
                ))}
            </ul>
        </>
    )
}

function ApplicationPanel({ product }: { product: Product }) {
    return (
        <>
            <h2 className="text-lg font-semibold mb-4">Application</h2>
            {product.idealApplications.map(app => (
                <div key={app.title} className="mb-4">
                    <p className="font-medium text-sm mb-1">{app.title}</p>
                    <ul className="text-sm space-y-1">
                        {app.items.map(i => <li key={i}>• {i}</li>)}
                    </ul>
                </div>
            ))}
        </>
    )
}

function FaqAccordion({ title, content }: { title: string; content: string }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="border-b">
            <button
                onClick={() => setOpen(!open)}
                className="w-full text-left flex justify-between items-center py-4 font-medium"
            >
                {title}
                <ChevronDown className={`transition ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && <p className="pb-4 text-sm text-gray-600">{content}</p>}
        </div>
    )
}
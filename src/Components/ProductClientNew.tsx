'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Star, X } from 'lucide-react'
import { Product } from './ProductClient'
import ProductSlider from './ProductSlider'
import FeaturesSection from './FeatureSection'
import FreeSamplesSection from './FreeSamplesSection'
import LeadaxFlashingPage from './productPage'

type PanelType = 'description' | 'specification' | 'application' | null

export default function ProductClientNew({
    product,
    slideImages,
}: {
    product: Product
    slideImages: string[]
}) {
    const [activePanel, setActivePanel] = useState<PanelType>(null)

    return (
        <div className="flex flex-col gap-y-12 pt-4 lg:pt-8">

            {/* MAIN PRODUCT */}
            <section className="wrapper grid grid-cols-1 lg:grid-cols-2 gap-8  items-start">

                {/* LEFT IMAGES */}
                {/* <div className="hidden lg:block space-y-8">
                    {slideImages.map((img, i) => (
                        <Image
                            key={i}
                            src={img}
                            alt={`${product.title} ${i + 1}`}
                            width={900}
                            height={1100}
                            priority={i === 0}
                            className="w-full object-contain"
                        />
                    ))}
                </div> */}
                <LeadaxFlashingPage imageUrls={slideImages} />

                {/* <div className="lg:hidden">
                    <ProductSlider slideImages={slideImages} />
                </div> */}

                {/* RIGHT */}
                <div className="relative self-start">
                    <div className="sticky top-24 flex flex-col gap-4">

                        <h1 className="text-2xl lg:text-3xl font-medium">{product.title}</h1>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                            ))}
                            <span className="text-xs text-gray-600">10 Reviews</span>
                        </div>
                        <p>{product.information.substring(0, 210)}</p>
                        <Link
                            href="https://bodenlinkshop.com/products/roofbond-flx"
                            target="_blank"
                            className="bg-primary-600 text-white text-center py-3 font-medium border border-primary-600 hover:bg-white hover:text-primary-600 transition"
                        >
                            Order Now
                        </Link>

                        <div className="pt-6  divide-y">
                            <h3 className="text-2xl font-medium pb-6">Product Details</h3>
                            <SlideItem label="Description" onClick={() => setActivePanel('description')} />
                            <SlideItem label="Specification" onClick={() => setActivePanel('specification')} />
                            <SlideItem label="Application" onClick={() => setActivePanel('application')} />
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <FeaturesSection />

            {/* CUSTOMER REVIEWS */}
            <section className="wrapper">
                <CustomerReviews />
            </section>

            {/* REQUEST A QUOTE */}
            <section className=" py-5">
                <FreeSamplesSection />

            </section>

            {/* FAQ */}
            <section className="wrapper max-w-3xl">
                <h2 className="text-xl font-medium mb-6">FAQ</h2>
                {product.features.map((f, i) => (
                    <FaqAccordion key={i} title={f.title} content={f.content} />
                ))}
            </section>

            {/* DRAWER */}
            {activePanel && (
                <RightDrawer onClose={() => setActivePanel(null)}>
                    {activePanel === 'description' && <DescriptionPanel product={product} />}
                    {activePanel === 'specification' && <SpecificationPanel product={product} />}
                    {activePanel === 'application' && <ApplicationPanel product={product} />}
                </RightDrawer>
            )}
        </div>
    )
}


function CustomerReviews() {
    const ratings = [
        { stars: 5, count: 0 },
        { stars: 4, count: 1 },
        { stars: 3, count: 0 },
        { stars: 2, count: 0 },
        { stars: 1, count: 0 },
    ]


    const totalReviews = 1
    const avgRating = 4


    return (
        <div className=" pt-10 border-b border-gray-300 pb-5">
            <h2 className="text-xl font-medium mb-8">Customer Reviews</h2>


            {/* TOP SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">


                {/* LEFT — AVG RATING */}
                <div className="flex items-center gap-4">
                    <div className="text-5xl font-semibold">{avgRating}</div>
                    <div>
                        <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={18}
                                    className={i < avgRating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-gray-600">
                            Based on {totalReviews} review
                        </p>
                    </div>
                </div>

                {/* MIDDLE — RATING BARS */}
                <div className="space-y-2 ">
                    {ratings.map(r => (
                        <div key={r.stars} className="flex items-center gap-2 text-sm">
                            <span className="w-4">{r.stars}</span>
                            <Star size={12} className="text-amber-500 fill-amber-500" />
                            <div className="flex-1 h-2 bg-gray-200 rounded">
                                <div
                                    className="h-2 bg-primary-600 rounded"
                                    style={{
                                        width: totalReviews
                                            ? `${(r.count / totalReviews) * 100}%`
                                            : '0%',
                                    }}
                                />
                            </div>
                            <span className="w-6 text-right text-gray-600">{r.count}</span>
                        </div>
                    ))}
                </div>


                {/* RIGHT — CTA */}
                <div className="lg:text-right">
                    <button className="inline-flex items-center justify-center border border-primary-600 text-primary-600 px-6 py-3 text-sm font-medium hover:bg-primary-600 hover:text-white transition">
                        Write a review
                    </button>
                </div>
            </div>


            {/* REVIEW LIST */}
            <div className="mt-10   pt-6">
                <div className="flex items-start lg:flex-row flex-col gap-x-10">
                    <div className='flex items-center gap-x-3'>
                        {/* AVATAR */}
                        <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                            A
                        </div>
                        <p className="text-sm font-medium mb-1">Ana</p>


                    </div>



                    {/* CONTENT */}
                    <div className="flex-1 my-4 lg:my-0">
                        {/* STARS + META */}
                        <div className="flex items-center gap-4 mb-2 justify-start lg:justify-between">

                            <div className='flex items-start'>
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className="text-amber-500 fill-amber-500"
                                    />
                                ))}
                            </div>
                            <div className='flex gap-x-4 items-center'>
                                <span className='text-white p-2 bg-primary-600 text-xs rounded-lg'>
                                    Verified buyer
                                </span>
                                <span className="text-sm  ">
                                    06/12/24
                                </span>
                            </div>
                        </div>

                        {/* REVIEW */}
                        <p className="text-sm   leading-relaxed">
                            Loved it. Would make only one change. Back pockets should be closer
                            to the sides for easy reach.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}



function SlideItem({ label, onClick }: { label: string; onClick: () => void }) {
    return (
        <button onClick={onClick} className="cursor-pointer w-full flex justify-between py-4 text-sm font-medium">
            {label}
            <ChevronDown size={18} />
        </button>
    )
}

function RightDrawer({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 ">
            <div onClick={onClose} className="absolute inset-0 bg-black/40" />
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white p-6 overflow-y-auto animate-slideInUp lg:animate-slideIn">
                <button onClick={onClose} className="absolute top-4 right-4 cursor-pointer">
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
            <p className="text-sm mb-4">{product.information}</p>
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
                    <p className="font-medium">{app.title}</p>
                    <ul className="text-sm">
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
            <button onClick={() => setOpen(!open)} className="w-full flex justify-between py-4 font-medium">
                {title}
                <ChevronDown className={open ? 'rotate-180' : ''} />
            </button>
            {open && <p className="pb-4 text-sm text-gray-600">{content}</p>}
        </div>
    )
}
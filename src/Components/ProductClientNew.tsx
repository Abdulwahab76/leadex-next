'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, X, Star } from 'lucide-react'
import { useFetchAllProducts, Product } from '@/hooks/useFetchAllProducts'
import LeadaxFlashingPage from './productPage'
import FeaturesSection from './FeatureSection'
import FreeSamplesSection from './FreeSamplesSection'

type PanelType = 'description' | 'specification' | 'application' | null

export default function ProductClientNew({
    slug,
    slideImages
}: {
    slug: string
    slideImages: string[]
}) {
    const { products, loading, error } = useFetchAllProducts()
    const [activePanel, setActivePanel] = useState<PanelType>(null)

    const product = products.find(p => p.id === slug)

    if (loading) return <ProductSkeleton />
    if (error) return <div className="wrapper">Failed to load product</div>
    if (!product) return <div className="wrapper">Product not found</div>

    return (
        <div className="flex flex-col gap-y-12 pt-4 lg:pt-8">

            {/* MAIN PRODUCT */}
            <section className="wrapper grid grid-cols-1 lg:grid-cols-2 gap-8  items-start">
                <LeadaxFlashingPage colorImages={product.colors} />

                <div className="sticky top-24 space-y-4">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                        ))}
                        <span className="text-xs text-gray-600">1 Reviews</span>

                    </div>

                    <p>{product.short_desc}</p>

                    <div className="divide-y pt-6">
                        <SlideItem label="Description" onClick={() => setActivePanel('description')} />
                        <SlideItem label="Specification" onClick={() => setActivePanel('specification')} />
                        <SlideItem label="Application" onClick={() => setActivePanel('application')} />
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <FeaturesSection features={product.features} />
            <section className="wrapper">
                <CustomerReviews />
            </section>


            {/* FAQ */}
            {product.faqs && (
                <section className="wrapper max-w-3xl">
                    <h2 className="text-xl font-medium mb-6">FAQ</h2>
                    {product.faqs.map((f, i) => (
                        <FaqAccordion key={i} title={f.question} content={f.answer} />
                    ))}
                </section>
            )}
            {/* REQUEST A QUOTE */}
            <section className=" pt-5">
                <FreeSamplesSection freeSample={product.free_samples}/>
            </section>
            {/* DRAWER */}
            {activePanel && (
                <RightDrawer onClose={() => setActivePanel(null)}>
                    {activePanel === 'description' && (
                        <>
                            <h2 className='font-medium text-xl mb-4'>Description</h2>
                            <p className="text-sm">{product.description}</p>
                        </>
                    )}

                    {activePanel === 'specification' && (
                        <>
                            <h2 className='font-medium text-xl mb-4'>Specification</h2>
                            <ul className="space-y-2">
                                {product.specifications?.map(s => (
                                    <li key={s.title} className="flex justify-between text-sm">
                                        <span>{s.title}</span>
                                        <span className="font-medium">{s.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {activePanel === 'application' &&
                        product.Application && (
                            <div>
                                {/* Application heading */}
                                <h2 className="font-medium text-xl mb-4">Application</h2>

                                {/* Application content */}
                                {Object.entries(product.Application).map(([title, items]) => (
                                    <div key={title} className="mb-4">
                                        <p className="font-medium">{title}</p>
                                        <ul className="text-sm">
                                            {items?.map(i => (
                                                <li key={i}>• {i}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}

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
        <button onClick={onClick} className="w-full flex justify-between py-4 font-medium">
            {label}
            <ChevronDown size={18} />
        </button>
    )
}

function RightDrawer({ children, onClose, title }: any) {
    return (
        <div className="fixed inset-0 z-50">
            <div onClick={onClose} className="absolute inset-0 bg-black/40" />
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white p-6 overflow-y-auto animate-slideInUp lg:animate-slideIn">
                <button onClick={onClose} className="absolute top-4 right-4">
                    <X />
                </button>
                {children}
            </div>
        </div>
    )
}

function FaqAccordion({ title, content }: any) {

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

function ProductSkeleton() {
    return (
        <div className="wrapper grid lg:grid-cols-2 gap-10 animate-pulse">
            <div className="h-105 bg-gray-200 rounded" />
            <div className="space-y-4">
                <div className="h-6 bg-gray-200 w-2/3" />
                <div className="h-4 bg-gray-200 w-full" />
                <div className="h-4 bg-gray-200 w-5/6" />
            </div>
        </div>
    )
}

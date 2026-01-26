'use client'

import { useState } from 'react'
import ProductSlider from './ProductSlider'
import { ChevronDown } from 'lucide-react'

export type Product = {
    id: string
    title: string
    price: number
    information: string
    description: string[]
    features: { title: string; content: string }[]
    physicalProperties: { label: string; value: string }[]
    materialComposition: { layer: string; material: string; function: string }[]
    availableSizesCoverage: {
        width: string
        rollLength: string
        totalCoverage: string
    }[]
    idealApplications: { title: string; items: string[] }[]
    technicalPerformance: {
        property: string
        performance: string
        standard: string
    }[]
    compatibleSubstrates: {
        category: string
        materials: string[]
    }[]
    installationGuide: {
        step: number
        title: string
        description: string
    }[]
    storageAndHealth: {
        title: string
        description: string
    }[]
}

export default function ProductClient({
    product,
    slideImages,
}: {
    product: Product
    slideImages: string[]
}) {
    const tabs = ['Description', 'Specification', 'Application']
    const [activeTab, setActiveTab] = useState('Description')

    return (
        <section>
            {/* ================= PRODUCT HEADER ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <ProductSlider slideImages={slideImages} />

                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-medium">{product.title}</h1>
                    <p className="text-xl font-medium">${product.price}.00 USD</p>

                    <a
                        href="https://bodenlinkshop.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 bg-primary-600 text-white py-3 rounded-md text-center"
                    >
                        Buy with Shop
                    </a>
                </div>
            </div>

            {/* ================= TABS ================= */}
            <div className="mt-16 border-b border-gray-300 flex justify-center gap-10 text-sm font-medium">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 ${activeTab === tab
                                ? 'border-b-2 border-black text-black'
                                : 'text-gray-500'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* ================= DESCRIPTION ================= */}
            {activeTab === 'Description' && (
                <div className="mt-10 max-w-350 mx-auto">
                    <p className="text-sm text-gray-700">{product.information}</p>

                    <ul className="mt-6 space-y-2 text-sm">
                        {product.description.map((item, i) => (
                            <li key={i} className="flex gap-2">
                                <span className="text-green-600">✔</span>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10">
                        {product.features.map((f, i) => (
                            <Accordion key={i} title={f.title} content={f.content} />
                        ))}
                    </div>
                </div>
            )}

            {/* ================= SPECIFICATION ================= */}
            {activeTab === 'Specification' && (
                <div className="mt-10 space-y-16">

                    {/* Physical Properties */}
                    <SpecSection title="Physical Properties">
                        {product.physicalProperties.map((p) => (
                            <Row key={p.label} left={p.label} right={p.value} />
                        ))}
                    </SpecSection>

                    {/* Material Composition */}
                    <TableSection
                        title="Material Composition"
                        headers={['Layer', 'Material', 'Function']}
                        rows={product.materialComposition.map((m) => [
                            m.layer,
                            m.material,
                            m.function,
                        ])}
                    />

                    {/* Available Sizes */}
                    <TableSection
                        title="Available Sizes & Coverage (US Customary)"
                        headers={['Width', 'Roll Length', 'Total Coverage']}
                        rows={product.availableSizesCoverage.map((s) => [
                            s.width,
                            s.rollLength,
                            s.totalCoverage,
                        ])}
                    />

                    {/* Technical Performance */}
                    <TableSection
                        title="Technical Performance"
                        headers={['Test Property', 'Performance', 'Standard']}
                        rows={product.technicalPerformance.map((t) => [
                            t.property,
                            t.performance,
                            t.standard,
                        ])}
                    />

                    {/* Compatible Substrates */}
                    <div>
                        <h2 className="text-xl font-medium mb-6">
                            Compatible Substrates
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {product.compatibleSubstrates.map((c) => (
                                <div
                                    key={c.category}
                                    className="border border-gray-400 rounded-md p-4"
                                >
                                    <h3 className="font-medium mb-2">{c.category}</h3>
                                    <ul className="text-sm space-y-1">
                                        {c.materials.map((m) => (
                                            <li key={m}>• {m}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Storage & Health */}
                    <SpecSection title="Storage & Health">
                        {product.storageAndHealth.map((s) => (
                            <Row key={s.title} left={s.title} right={s.description} />
                        ))}
                    </SpecSection>
                </div>
            )}

            {/* ================= APPLICATION ================= */}
            {activeTab === 'Application' && (
                <div className="mt-10 space-y-16">

                    {/* Ideal Applications */}
                    <div>
                        <h2 className="text-xl font-medium mb-6">Ideal Applications</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {product.idealApplications.map((a) => (
                                <div
                                    key={a.title}
                                    className="border border-gray-400 rounded-md p-5"
                                >
                                    <h3 className="font-medium mb-3">{a.title}</h3>
                                    <ul className="text-sm space-y-1">
                                        {a.items.map((i) => (
                                            <li key={i}>• {i}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Installation Guide */}
                    <div>
                        <h2 className="text-xl font-medium mb-6">
                            Installation Quick Guide
                        </h2>
                        {product.installationGuide.map((s) => (
                            <div
                                key={s.step}
                                className="flex gap-4 border-b border-gray-400 pb-4 mb-4"
                            >
                                <span className="font-medium">{s.step}.</span>
                                <div>
                                    <p className="font-medium text-sm">{s.title}</p>
                                    <p className="text-sm text-gray-600">{s.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

/* ================= HELPERS ================= */

function Accordion({
    title,
    content,
}: {
    title: string
    content: string
}) {
    const [open, setOpen] = useState(false)
    return (
        <div className="border-b border-gray-400">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between py-4 text-sm font-medium"
            >
                {title}
                <ChevronDown className={`${open ? 'rotate-180' : ''}`} />
            </button>
            {open && <p className="pb-4 text-sm text-gray-600">{content}</p>}
        </div>
    )
}

function SpecSection({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <div>
            <h2 className="text-xl font-medium mb-6">{title}</h2>
            <div className="space-y-3">{children}</div>
        </div>
    )
}

function Row({ left, right }: { left: string; right: string }) {
    return (
        <div className="flex justify-between border-b border-gray-400 pb-2 text-sm">
            <span>{left}</span>
            <span className="font-medium">{right}</span>
        </div>
    )
}

function TableSection({
    title,
    headers,
    rows,
}: {
    title: string
    headers: string[]
    rows: string[][]
}) {
    return (
        <div>
            <h2 className="text-xl font-medium mb-6">{title}</h2>
            <div className="overflow-x-auto border border-gray-400 rounded-md">
                <table className="w-full text-sm">
                    <thead className="bg-primary-300">
                        <tr>
                            {headers.map((h) => (
                                <th key={h} className="px-4 py-3 text-left font-medium">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r, i) => (
                            <tr key={i} className="border-t border-gray-400">
                                {r.map((c, j) => (
                                    <td key={j} className="px-4 py-3">
                                        {c}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
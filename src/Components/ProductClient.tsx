'use client'

import { useState } from 'react'
import ProductSlider from './ProductSlider'
import { ChevronDown, Heart, Minus, Plus, Share2, Star } from 'lucide-react'

export type Product = {
    id: string
    title: string
    price: number
    information: string;
    colors: string[]
    waistSizes: string[]
    lengths: string[]
    description: string[]
    features: {
        title: string
        content: string
    }[]
    physicalProperties: {
        label: string
        value: string
    }[];
    materialComposition: {
        layer: string
        material: string
        function: string
    }[];
    availableSizesCoverage: {
        width: string
        rollLength: string
        totalCoverage: string
    }[]
    idealApplications: {
        title: string
        items: string[]
    }[];
    technicalPerformance: {
        property: string
        performance: string
        standard: string
    }[];
    compatibleSubstrates: {
        category: string
        materials: string[]
    }[];
    installationGuide: {
        step: number
        title: string
        description: string
    }[];
    storageAndHealth: {
        title: string
        description: string
    }[];
}


export default function ProductClient({ product, slideImages }: { product: Product, slideImages: string[] }) {
    // const [color, setColor] = useState(product.colors[0])
    // const [waist, setWaist] = useState(product.waistSizes[0])
    // const [length, setLength] = useState(product.lengths[0])
    // const [qty, setQty] = useState(1)
    // const tabs = ['Description', 'Size Chart', 'Shipping & Returns']
    // const [activeTab, setActiveTab] = useState('Description')

    // const subtotal = product.price * qty

    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* LEFT */}
                <ProductSlider slideImages={slideImages} />

                {/* RIGHT */}
                <div className="flex flex-col gap-y-2.5">
                    <h1 className="text-2xl font-medium">{product.title}</h1>
                    <p className="mt-3 text-xl font-medium">${product.price}.00 USD</p>
                    <p className='text-xs leading-loose'>{product.information}</p>
                    <ul className="mt-6 space-y-2 text-sm">
                        {product.description.map((item, i) => {
                            const [title, rest] = item.split(":");
                            return (
                                <li key={i} className="flex gap-2 md:text-lg text-xs">
                                    <span className="text-green-600">✔</span>
                                    <span>
                                        <strong>{title}:</strong>{rest}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                    {/* <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center text-sm  font-medium">

                            {['1', '2', '3', '4', '5'].map((item, ind) => <Star key={ind} size={14} className='text-amber-500 fill-amber-500' />)}

                            <span className="ml-3">36 Reviews</span>
                        </div>
                    </div> */}

                    {/* OPTIONS */}
                    {/* <div className=" space-y-4">
                        <SelectBox label="Color" value={color} options={product.colors} onChange={setColor} />
                        <SelectBox label="Waist" value={waist} options={product.waistSizes} onChange={setWaist} />
                        <SelectBox label="Length" value={length} options={product.lengths} onChange={setLength} />
                    </div> */}

                    {/* Quantity */}
                    {/* <div className="flex  flex-col rounded-md  mt-2">
                        <label className="flex  text-sm font-medium mb-2 tracking-normal ">Quantity </label>
                        <div className="flex border  border-gray-500 rounded-md w-3/12 py-2.5 px-2.5">
                            <button className="w-10  " onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={14} /></button>
                            <span className="flex-1 flex items-center justify-center">{qty}</span>
                            <button className="w-10 text-left flex justify-end items-center " onClick={() => setQty(q => q + 1)}><Plus size={14} /></button>
                        </div>

                    </div> */}


                    {/* Subtotal */}
                    {/* <p className="mt-4 text-sm">
                        Subtotal: <span className="font-semibold">${subtotal}.00 USD</span>
                    </p> */}

                    {/* CTA */}
                    {/* <div className='flex items-center gap-4 flex-wrap md:justify-start justify-center '>
                        <button className="  hover:animate-wiggle
 bg-black  cursor-pointer text-white py-4 rounded-md font-medium w-full md:w-9/12  shadow-none lg:shadow-[0px_5px_10px_0_#7198C4]">
                            ADD TO CART
                        </button>
                        <span className='w-14 h-14 border border-gray-300 rounded-full flex justify-center items-center  '>
                            <button className=" underline text-sm text-gray-500 font-light"><Heart /></button>
                        </span>
                        <Share2 />
                    </div> */}


                    <button className="mt-3 bg-primary-600 text-white py-3 rounded-md">
                        Buy with Shop
                    </button>

                    {/* <label className="mt-3 text-xs flex items-center gap-2">
                        <input type="checkbox" /> I agree with Terms & Conditions
                    </label> */}

                </div>
            </div>
            {/* tabs */}
            <div className='flex flex-col '>
                {/* <div className="mt-10 border-b border-gray-200 flex gap-8 text-sm font-medium justify-center items-center">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 ${activeTab === tab
                                ? 'border-b-2 border-gray-200 cursor-pointer'
                                : 'text-gray-500'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === 'Description' && (
                    <ul className="mt-6 space-y-2 text-sm">
                        {product.description.map((item, i) => (
                            <li key={i} className="flex gap-2">
                                <span className="text-green-600">✔</span> {item}
                            </li>
                        ))}
                    </ul>
                )} */}
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT — PHYSICAL PROPERTIES */}
                    <div>
                        <h2 className="text-xl font-medium mb-6">
                            Physical Properties
                        </h2>

                        <div className="space-y-4">
                            {product.physicalProperties.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between border-b border-gray-400 pb-2 text-sm"
                                >
                                    <span className="text-black">
                                        {item.label}
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — IMAGE */}
                    <div className="flex justify-center">
                        <img
                            src="/images/placeholderimage-1.webp" // replace with your real image
                            alt="RoofBond Physical Properties"
                            className="max-w-sm w-full object-contain"
                        />
                    </div>

                </div>
                <div className="mt-16">
                    <h2 className="text-xl font-medium mb-6">
                        Material Composition
                    </h2>

                    <div className="overflow-x-auto border border-gray-400 rounded-md">
                        <table className="w-full text-sm">
                            <thead className="bg-primary-300">
                                <tr>
                                    <th className="text-left px-4 py-3 font-medium">
                                        Layer
                                    </th>
                                    <th className="text-left px-4 py-3 font-medium">
                                        Material
                                    </th>
                                    <th className="text-left px-4 py-3 font-medium">
                                        Function
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {product.materialComposition.map((item, i) => (
                                    <tr
                                        key={i}
                                        className="border-t border-gray-400"
                                    >
                                        <td className="px-4 py-3 font-medium">
                                            {item.layer}
                                        </td>
                                        <td className="px-4 py-3">
                                            {item.material}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {item.function}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-16">
                    <h2 className="text-xl font-medium mb-6">
                        Available Sizes & Coverage (US Customary)
                    </h2>

                    <div className="overflow-x-auto border border-gray-400 rounded-md">
                        <table className="w-full text-sm">
                            <thead className="bg-primary-300">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium">
                                        Width
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium">
                                        Roll Length
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium">
                                        Total Coverage
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {product.availableSizesCoverage.map((item, index) => (
                                    <tr key={index} className="border-t border-gray-400">
                                        <td className="px-4 py-3 font-medium">
                                            {item.width}
                                        </td>
                                        <td className="px-4 py-3">
                                            {item.rollLength}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {item.totalCoverage}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* PDF NOTE */}
                    <p className="mt-3 text-xs text-gray-700">
                        Note: Actual coverage is 10–20% lower due to overlaps and waste. Order 15–20% extra.
                    </p>
                </div>


                <div className="mt-16">
                    <h2 className="text-xl font-medium mb-6">
                        Ideal Applications
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {product.idealApplications.map((app) => (
                            <div
                                key={app.title}
                                className="border border-gray-400 rounded-md p-5"
                            >
                                <h3 className="font-medium mb-3">
                                    {app.title}
                                </h3>

                                <ul className="space-y-2 text-sm text-black">
                                    {app.items.map((item) => (
                                        <li key={item} className="flex gap-2">
                                            <span className="text-green-600">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* LEFT — TECHNICAL PERFORMANCE */}
                    <div>
                        <h2 className="text-xl font-medium mb-6">
                            Technical Performance
                        </h2>

                        <div className="overflow-x-auto border border-gray-400 rounded-md">
                            <table className="w-full text-sm">
                                <thead className="bg-primary-300">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium">
                                            Test Property
                                        </th>
                                        <th className="px-4 py-3 text-left font-medium">
                                            Performance
                                        </th>
                                        <th className="px-4 py-3 text-left font-medium">
                                            Standard
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {product.technicalPerformance.map((item) => (
                                        <tr key={item.property} className="border-t border-gray-400">
                                            <td className="px-4 py-3 font-medium">
                                                {item.property}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.performance}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {item.standard}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* RIGHT — COMPATIBLE SUBSTRATES */}
                    <div>
                        <h2 className="text-xl font-medium mb-6">
                            Compatible Substrates
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {product.compatibleSubstrates.map((group, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-400 rounded-md p-5"
                                >
                                    <h3 className="font-medium mb-2">
                                        {group.category}
                                    </h3>

                                    <ul className="text-sm text-black space-y-1">
                                        {group.materials.map((mat) => (
                                            <li key={mat}>• {mat}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
                <div className="mt-16 grid grid-cols-1  items-center">

                    {/* LEFT — INSTALLATION STEPS */}
                    <div>
                        <h2 className="text-xl font-medium mb-6">
                            Installation Quick Guide
                        </h2>

                        <div className="space-y-4">
                            {product.installationGuide.map((item) => (
                                <div
                                    key={item.step}
                                    className="flex gap-4 border-b border-gray-400 pb-4"
                                >
                                    <div className="text-sm font-semibold text-black w-6">
                                        {item.step}.
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">
                                            {item.title}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
                <div className="mt-16 grid grid-cols-1  items-center">

                    {/* LEFT — STORAGE & HEALTH */}
                    <div>
                        <h2 className="text-xl font-medium mb-6">
                            Storage & Health
                        </h2>

                        <div className="space-y-4">
                            {product.storageAndHealth.map((item, index) => (
                                <div
                                    key={index}
                                    className="border-b border-gray-400 pb-4"
                                >
                                    <p className="text-sm font-medium">
                                        {item.title}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* footer faqs */}
                <div className="mt-10">
                    <h2 className="text-xl font-medium mb-6">
                        FAQ'S
                    </h2>
                    {product.features.map((f, i) => (
                        <Accordion key={i} title={f.title} content={f.content} />
                    ))}
                </div>
            </div>
        </section>
    )
}
// function SelectBox({ label, value, options, onChange }: any) {
//     return (
//         <div className=" w-full lg:w-7/12 ">
//             <label className="flex  text-sm font-medium mb-2 tracking-normal">{label}</label>
//             <div className="relative">
//                 <select
//                     value={value}
//                     onChange={(e) => onChange(e.target.value)}
//                     className="w-full outline-none border-gray-400 ap appearance-none border px-4 py-3 pr-10 rounded-md"
//                 >
//                     {options.map((o: string) => (
//                         <option key={o}>{o}</option>
//                     ))}
//                 </select>
//                 <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-800"><ChevronDown size={16} /></span>
//             </div>
//         </div>
//     )
// }

function Accordion({ title, content }: { title: string; content: string }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="border-b border-gray-400">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex text-left justify-between items-center py-4 text-sm font-medium cursor-pointer"
            >
                {title}
                <ChevronDown
                    size={22}
                    className={`transition ${open ? 'rotate-180' : ''}`}
                />
            </button>
            {open && <p className="pb-4 text-sm text-gray-600">{content}</p>}
        </div>
    )
}

'use client'

import { useState } from 'react'
import ProductSlider from './ProductSlider'
import { ChevronDown, Heart, Minus, Plus, Share2, Star } from 'lucide-react'

export type Product = {
    id: string
    title: string
    price: number
    colors: string[]
    waistSizes: string[]
    lengths: string[]
    description: string[]
    features: {
        title: string
        content: string
    }[]

}


export default function ProductClient({ product, slideImages }: { product: Product, slideImages: string[] }) {
    const [color, setColor] = useState(product.colors[0])
    const [waist, setWaist] = useState(product.waistSizes[0])
    const [length, setLength] = useState(product.lengths[0])
    const [qty, setQty] = useState(1)
    const tabs = ['Description', 'Size Chart', 'Shipping & Returns']
    const [activeTab, setActiveTab] = useState('Description')

    const subtotal = product.price * qty

    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* LEFT */}
                <ProductSlider slideImages={slideImages} />

                {/* RIGHT */}
                <div className="flex flex-col gap-y-2.5">
                    <h1 className="text-2xl font-medium">{product.title}</h1>
                    <p className="mt-3 text-xl font-medium">${product.price}.00 USD</p>
                    <p className='text-xs leading-loose'>{product.description}</p>
                    <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center text-sm  font-medium">

                            {['1', '2', '3', '4', '5'].map((item, ind) => <Star key={ind} size={14} className='text-amber-500 fill-amber-500' />)}

                            <span className="ml-3">36 Reviews</span>
                        </div>
                    </div>

                    {/* OPTIONS */}
                    <div className=" space-y-4">
                        <SelectBox label="Color" value={color} options={product.colors} onChange={setColor} />
                        <SelectBox label="Waist" value={waist} options={product.waistSizes} onChange={setWaist} />
                        <SelectBox label="Length" value={length} options={product.lengths} onChange={setLength} />
                    </div>

                    {/* Quantity */}
                    <div className="flex  flex-col rounded-md  mt-2">
                        <label className="flex  text-sm font-medium mb-2 tracking-normal ">Quantity </label>
                        <div className="flex border  border-gray-500 rounded-md w-3/12 py-2.5 px-2.5">
                            <button className="w-10  " onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={14} /></button>
                            <span className="flex-1 flex items-center justify-center">{qty}</span>
                            <button className="w-10 text-left flex justify-end items-center " onClick={() => setQty(q => q + 1)}><Plus size={14} /></button>
                        </div>

                    </div>


                    {/* Subtotal */}
                    <p className="mt-4 text-sm">
                        Subtotal: <span className="font-semibold">${subtotal}.00 USD</span>
                    </p>

                    {/* CTA */}
                    <div className='flex items-center gap-4 flex-wrap md:justify-start justify-center '>
                        <button className="  hover:animate-wiggle
 bg-black  cursor-pointer text-white py-4 rounded-md font-medium w-full md:w-9/12  shadow-none lg:shadow-[0px_5px_10px_0_#7198C4]">
                            ADD TO CART
                        </button>
                        <span className='w-14 h-14 border border-gray-300 rounded-full flex justify-center items-center  '>
                            <button className=" underline text-sm text-gray-500 font-light"><Heart /></button>
                        </span>
                        <Share2 />
                    </div>


                    <button className="mt-3 bg-purple-600 text-white py-3 rounded-md">
                        Buy with Shop
                    </button>

                    <label className="mt-3 text-xs flex items-center gap-2">
                        <input type="checkbox" /> I agree with Terms & Conditions
                    </label>

                </div>
            </div>
            {/* tabs */}
            <div className='flex flex-col '>
                <div className="mt-10 border-b border-gray-200 flex gap-8 text-sm font-medium justify-center items-center">
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
                )}
                <div className="mt-10">
                    {product.features.map((f, i) => (
                        <Accordion key={i} title={f.title} content={f.content} />
                    ))}
                </div>
            </div>
        </section>
    )
}
function SelectBox({ label, value, options, onChange }: any) {
    return (
        <div className=" w-full lg:w-7/12 ">
            <label className="flex  text-sm font-medium mb-2 tracking-normal">{label}</label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full outline-none border-gray-400 ap appearance-none border px-4 py-3 pr-10 rounded-md"
                >
                    {options.map((o: string) => (
                        <option key={o}>{o}</option>
                    ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-800"><ChevronDown size={16} /></span>
            </div>
        </div>
    )
}

function Accordion({ title, content }: { title: string; content: string }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center py-4 text-sm font-medium cursor-pointer"
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

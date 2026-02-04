import { ArrowDown, ArrowRight, ChevronRight, File } from "lucide-react"



interface TechnicalLibraryCard {
    title: string
    description: string
    icon: string
    items: { label: string; type: string }[]
}
export default function TechnicalLibrary() {
    const technicalLibraryCards: TechnicalLibraryCard[] = [
        {
            title: 'Technical Data Sheets (TDS)',
            description:
                'Get detailed specifications and product performance data sheets.',
            icon: 'file',
            items: [
                { label: 'Lead-Free Flexible Flashing TDS', type: 'pdf' },
                { label: 'Roofing Membrane TDS', type: 'pdf' },
            ],
        },
        {
            title: 'Safety Data Sheets (SDS)',
            description:
                'Find important safety information for safe handling of our products.',
            icon: 'file',
            items: [
                { label: 'Lead-Free Flexible Flashing SDS', type: 'pdf' },
                { label: 'Roofing Membrane SDS', type: 'pdf' },
            ],
        },
        {
            title: 'Installation Details',
            description:
                'Access detailed installation guides and CAD drawings for proper product application.',
            icon: 'file',
            items: [
                { label: 'Eave Installation Guide', type: 'pdf' },
                { label: 'Chimney Flashing Detail', type: 'cad' },
                { label: 'Roof Vent Installation Detail', type: 'dwg' },
            ],
        },
        {
            title: 'System Details & Drawings',
            description:
                'Browse detailed system drawings and application-specific information.',
            icon: 'file',
            items: [
                { label: 'Typical Asphalt Shingle Detail', type: 'pdf' },
                { label: 'Standing Seam Metal Roof System', type: 'pdf' },
                { label: 'Tile Roof System', type: 'pdf' },
            ],
        },
        {
            title: 'Test Reports & Certifications',
            description:
                'Review testing results and certification documents.',
            icon: 'file',
            items: [
                { label: 'Lead Replacement Flashing Test Report', type: 'pdf' },
                { label: 'Roofing Membrane Fire Test Certification', type: 'pdf' },
            ],
        },
        {
            title: 'Technical Downloads',
            description:
                'Find all our technical PDFs in one place.',
            icon: 'file',
            items: [
                { label: 'Product Brochure', type: 'pdf' },
                { label: 'Complete Technical Data Sheet Collection', type: 'zip' },
                { label: 'CAD Details Collection', type: 'zip' },
            ],
        },
    ]

    return (
        <div className="min-h-screen py-10 bg-gray-50">
            <div className="wrapper ">
                {/* Top Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-[32px] font-semibold text-gray-900">
                            Technical Library
                        </h1>
                        <p className="mt-2 max-w-2xl text-[14px] leading-6 text-gray-600">
                            Access our comprehensive collection of technical documents and resources designed
                            for construction professionals in the U.S. and Canada.
                        </p>
                    </div>


                </div>

                {/* Search */}
                <div className="mt-6 flex gap-3">
                    <input
                        placeholder="Search documents..."
                        className="h-10 w-full rounded-md border border-gray-300 px-4 text-sm text-gray-900800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="h-10 w-46 cursor-pointer rounded-md bg-primary-600 px-4 text-xs font-normal text-white  ">
                        Contact Support
                    </button>
                </div>

                {/* Cards Grid */}
                <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-2">
                    {/* Card */}
                    {technicalLibraryCards.map((item, ind) => (
                        <div key={ind} className="grid grid-cols-1 gap-6 md:grid-cols-1">
                            <div className="flex h-full gap-y-8 flex-col rounded-lg border border-gray-200 bg-white p-5">
                                <div className="flex gap-3">
                                    <File size={44} className="text-gray-600 font-light" />
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1 text-sm leading-5 text-gray-600">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {item.items.map((item) => (
                                        <div

                                            className="flex items-center justify-between"
                                        >
                                            <span className="text-[14px] font-medium text-blue-600 hover:underline cursor-pointer">
                                                {item.label}
                                            </span>
                                            <ArrowDown className="h-4 w-4 text-blue-600 cursor-pointer" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Card */}
                            <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-5">


                                <div className="my-4 h-px bg-gray-200" />

                                <div className="space-y-3">
                                    {[
                                        'Lead-Free Flexible Flashing SDS',
                                        'Roofing Membrane SDS',
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center justify-between"
                                        >
                                            <span className="text-[14px] font-medium text-blue-600 hover:underline cursor-pointer">
                                                {item}
                                            </span>
                                            <ArrowDown className="h-4 w-4 text-blue-600 cursor-pointer" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}



                </div>

                {/* Bottom Note */}
                <p className="mt-8 text-sm  ">
                    Note: All technical documents are specific to the U.S. and Canada markets.
                </p>

                {/* Bottom Action Boxes */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-200 bg-white py-3 text-sm font-medium text-blue-600 hover:bg-gray-50">
                        <span>Contact Support</span>
                        <span className="text-blue-600"><ChevronRight /></span>
                    </div>

                    <div className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-200 bg-white py-3 text-sm font-medium text-blue-600 hover:bg-gray-50">
                        <span>Case Studies</span>
                        <span className="text-blue-600"><ChevronRight /></span>
                    </div>

                    <div className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-200 bg-white py-3 text-sm font-medium text-blue-600 hover:bg-gray-50">
                        <span>Video Guides</span>
                        <span className="text-blue-600"><ChevronRight /></span>
                    </div>
                </div>

            </div>
        </div>
    )
}

"use client";

interface VideoItem {
    id: string;
    title?: string;
    type: "video" | "error";
}

interface VideoGridSectionProps {
    items: VideoItem[];
}

export default function VideoGridSection({ items }: VideoGridSectionProps) {
    return (
        <section className="bg-[#F3F4F6] py-14">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="aspect-video bg-black flex items-center justify-center"
                        >
                            {/* Placeholder for now */}
                            {item.type === "video" ? (
                                <div className="w-full h-full bg-black flex items-center justify-center text-white text-sm">
                                    Video Placeholder
                                </div>
                            ) : (
                                <div className="w-full h-full bg-black flex flex-col items-center justify-center text-white">
                                    <p className="text-lg font-medium mb-1">Sorry</p>
                                    <p className="text-sm opacity-80">
                                        This video does not exist.
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

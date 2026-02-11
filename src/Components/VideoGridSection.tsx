"use client";

interface VideoItem {
    id: string;
    url?: string;
    type: "video" | "error";
}

interface VideoGridSectionProps {
    items: VideoItem[];
}

const isValidUrl = (url?: string) =>
    url && url.trim() !== "";

const getYouTubeEmbedUrl = (url: string) => {
    try {
        const parsed = new URL(url);

        // youtube.com/watch?v=
        if (parsed.hostname.includes("youtube.com")) {
            const id = parsed.searchParams.get("v");
            return id ? `https://www.youtube.com/embed/${id}` : null;
        }

        // youtu.be/
        if (parsed.hostname.includes("youtu.be")) {
            return `https://www.youtube.com/embed${parsed.pathname}`;
        }

        return null;
    } catch {
        return null;
    }
};

export default function VideoGridSection({ items }: VideoGridSectionProps) {
    if (!items || items.length === 0) return null;

    return (
        <section
            className="bg-[#F3F4F6] py-14"
            aria-label="Video content section"
        >
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {items.map((item) => {
                        const hasValidUrl = isValidUrl(item.url);

                        if (!hasValidUrl || item.type !== "video") {
                            return (
                                <div
                                    key={item.id}
                                    className="aspect-video bg-black flex flex-col items-center justify-center text-white"
                                >
                                    <p className="text-lg font-medium mb-1">Sorry</p>
                                    <p className="text-sm opacity-80">
                                        This video does not exist.
                                    </p>
                                </div>
                            );
                        }

                        const youtubeEmbed = getYouTubeEmbedUrl(
                            item.url!.trim()
                        );

                        return (
                            <div key={item.id} className="aspect-video">
                                {/* YouTube Video */}
                                {youtubeEmbed ? (
                                    <iframe
                                        src={youtubeEmbed}
                                        title="Video player"
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        loading="lazy"
                                    />
                                ) : (
                                    // Direct MP4 / Video File
                                    <video
                                        className="w-full h-full object-cover"
                                        controls
                                        preload="metadata"
                                    >
                                        <source src={item.url} />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

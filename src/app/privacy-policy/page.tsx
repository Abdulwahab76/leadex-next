import { getPrivacyContent } from "@/lib/mainPages";

export default async function PrivacyPage() {
    const data = await getPrivacyContent();

    if (!data || !data.intro) return <div className="p-6">Privacy policy not found</div>;

    // Split text by line breaks for potential lists
    const lines = data.intro.split("\n").filter(Boolean);

    // Regex to detect email
    const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;

    return (
        <section className="wrapper py-10 space-y-4 text-sm text-gray-700">
            <h1 className="text-2xl font-medium">{data.title || "Privacy Policy"}</h1>
            {data.lastUpdated && (
                <p className="text-xs text-gray-500">Last updated: {data.lastUpdated}</p>
            )}

            {lines.map((line, idx) => {
                // Check if line looks like a list item (starts with - or * or number)
                const isListItem = /^(\s*[-*]\s|\d+\.\s)/.test(line);

                if (isListItem) {
                    return (
                        <ul key={idx} className="list-disc pl-5 space-y-1">
                            {lines.slice(idx).map((item, i) => {
                                const cleanItem = item.replace(/^(\s*[-*]\s|\d+\.\s)/, "");
                                const parts = cleanItem.split(emailRegex);
                                const matchEmail = cleanItem.match(emailRegex);

                                return (
                                    <li key={i} className="leading-relaxed">
                                        {/* Bold text before : */}
                                        {parts[0].includes(":") ? (
                                            <>
                                                <strong>{parts[0].split(":")[0]}:</strong>{" "}
                                                {parts[0].split(":")[1]}{" "}
                                            </>
                                        ) : (
                                            parts[0]
                                        )}
                                        {/* Email if exists */}
                                        {matchEmail && <strong>{matchEmail[0]}</strong>}
                                        {/* Remaining text after email */}
                                        {parts[1]}
                                    </li>
                                );
                            })}
                        </ul>
                    );
                }

                // Regular paragraph: bold before ":" and bold email
                const colonSplit = line.split(":");
                const emailMatch = line.match(emailRegex);

                return (
                    <p key={idx} className="leading-relaxed">
                        {colonSplit.length > 1 ? (
                            <>
                                <strong>{colonSplit[0]}:</strong>
                                {colonSplit.slice(1).join(":")}
                            </>
                        ) : (
                            line
                        )}
                        {emailMatch && <strong>{emailMatch[0]}</strong>}
                    </p>
                );
            })}
        </section>
    );
}

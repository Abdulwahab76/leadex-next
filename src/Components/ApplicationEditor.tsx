"use client";

import { useState } from "react";
interface Props {
    title: string;
    items: string[];
    onChange: (items: string[]) => void;
}


export function ApplicationEditor({ title, items, onChange }: Props) {
    const [input, setInput] = useState("");

    function addItem() {
        if (!input.trim()) return;
        onChange([...items, input.trim()]);
        setInput("");
    }

    function removeItem(index: number) {
        onChange(items.filter((_, i) => i !== index));
    }

    return (
        <div className="border rounded p-3 mb-3">
            <h4 className="font-medium mb-2">{title}</h4>

            <div className="flex gap-2 mb-2">
                <input
                    className="border p-2 rounded flex-1"
                    placeholder={`Add ${title}`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addItem()}
                />
                <button onClick={addItem} className="bg-green-600 text-white px-3 rounded">
                    Add
                </button>
            </div>

            <ul className="space-y-1 text-sm">
                {items.map((item, i) => (
                    <li key={i} className="flex justify-between items-center">
                        <span>{item}</span>
                        <button
                            onClick={() => removeItem(i)}
                            className="text-red-500 text-xs"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

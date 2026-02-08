"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, KeyboardEvent } from "react";

export default function TagInput({
  value,
  onChange,
  placeholder = "Enter keyword and press Enter",
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag: string) => {
    if (!tag.trim()) return;
    if (value.includes(tag.trim())) return;

    onChange([...value, tag.trim()]);
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    }

    if (e.key === "Backspace" && !inputValue) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className="border rounded-md p-2 flex flex-wrap gap-2 min-h-[46px] cursor-text">
      {value.map((tag) => (
        <span
          key={tag}
          className="bg-gray-200 text-gray-800 px-2 py-1 rounded flex items-center gap-1"
        >
          {tag}
          <FontAwesomeIcon
            icon={faX}
            onClick={() => removeTag(tag)}
            className="hover:bg-gray-300 cursor-pointer transition-colors rounded-full p-1"
            size="sm"
          />
        </span>
      ))}

      <input
        className="flex-1 min-w-[120px] outline-none"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

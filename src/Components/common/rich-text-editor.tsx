"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";

export default function Editor({
  defaultValue = "",
  onChange,
}: {
  defaultValue?: string;
  onChange?: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      Underline,
      Link.configure({
        openOnClick: true,
      }),
      Highlight,
      Superscript,
      Subscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: defaultValue,
    immediatelyRender: false,
    onUpdate({ editor }) {
      if (onChange) onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-md p-3 pb-0">
      <div className="flex flex-wrap gap-2 mb-3 border-b pb-3">
        {/* Headings */}
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
                .run()
            }
            className="px-2 py-1 border rounded bg-primary text-white"
          >
            H{level}
          </button>
        ))}

        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-2 py-1 border rounded bg-primary text-white"
        >
          Bold
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-2 py-1 border rounded bg-primary text-white"
        >
          Italic
        </button>

        {/* Underline */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="px-2 py-1 border rounded bg-primary text-white"
        >
          Underline
        </button>

        {/* Strike */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="px-2 py-1 border rounded bg-primary text-white"
        >
          Strike
        </button>

        {/* Highlight */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className="px-2 py-1 border rounded bg-primary text-white"
        >
          HL
        </button>

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-2 py-1 border rounded bg-primary text-white"
        >
          • List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="px-2 py-1 border rounded bg-primary text-white"
        >
          1. List
        </button>

        {/* Blockquote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="px-2 py-1 border rounded bg-primary text-white"
        >
          Quote
        </button>

        {/* Code */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className="px-2 py-1 border rounded bg-primary text-white"
        >
          Code
        </button>

        {/* HR */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-2 py-1 border rounded bg-primary text-white"
        >
          HR
        </button>

        {/* Subscript & Superscript */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className="px-2 py-1 border rounded bg-primary text-white"
        >
          Sub
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className="px-2 py-1 border rounded bg-primary text-white"
        >
          Sup
        </button>

        {/* Alignment */}
        {["left", "center", "right", "justify"].map((alignment) => (
          <button
            key={alignment}
            type="button"
            onClick={() => editor.chain().focus().setTextAlign(alignment).run()}
            className="px-2 py-1 border rounded bg-primary text-white"
          >
            {alignment.charAt(0).toUpperCase() + alignment.slice(1)}
          </button>
        ))}

        {/* Link */}
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className="px-2 py-1 border rounded bg-primary text-white"
        >
          Link
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="px-2 py-1 border rounded bg-primary text-white"
        >
          Unlink
        </button>

        {/* Clear */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          className="px-2 py-1 border rounded bg-primary text-white"
        >
          Clear
        </button>

        {/* Undo/Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="px-2 py-1 border rounded bg-primary text-white"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="px-2 py-1 border rounded bg-primary text-white"
        >
          Redo
        </button>
      </div>

      <EditorContent editor={editor} className="prose" />
    </div>
  );
}

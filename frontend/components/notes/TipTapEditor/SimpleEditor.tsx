"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function SimpleTipTapEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none border border-gray-300 rounded-md p-4",
        placeholder: "Write something...",
      },
    },
  });

  return <EditorContent editor={editor} />;
}

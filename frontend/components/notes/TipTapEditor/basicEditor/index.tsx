"use client";

import React, { useMemo, useEffect } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Mention from "@tiptap/extension-mention";
import { Toolbar } from "./Toolbar";
import suggestion from "@/config/tiptap/suggestion/people";
import { peopleSuggestions, tagsSuggestions } from "@/config/tiptap/suggestion";

export interface TiptapEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
  editable?: boolean;
  minHeight?: number;
  maxHeight?: number;
}

// Main component export
export const BasicTiptapEditor = ({
  content = `<p>Hello <span data-type="mention" data-id="Jerry Hall" data-mention-suggestion-char="@">@Jerry Hall</span> </p>`,
  onChange,
  placeholder = "Start crafting your message...",
  className = "",
  editable = true,
  minHeight = 200,
  maxHeight = 500,
}: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      TextStyle,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline hover:text-blue-800 cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
      Mention.configure({
        // suggestion: suggestion,
        suggestions: [
          {
            char: "@",
            ...peopleSuggestions,
          },
          {
            char: "#",
            ...tagsSuggestions,
          },
        ],
        HTMLAttributes: {
          class: "bg-violet-400 text-white p-2 rounded-md",
        },
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
      console.log(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none p-4`,
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div
        className={`border border-border rounded-lg p-4 text-center text-muted-foreground ${className}`}
      >
        Loading editor...
      </div>
    );
  }

  return (
    <div
      className={`border border-border rounded-lg overflow-hidden bg-background ${className}`}
    >
      <Toolbar editor={editor} />
      <div className="relative">
        <EditorContent
          editor={editor}
          className="overflow-y-auto"
          style={{ minHeight: `${minHeight}px`, maxHeight: `${maxHeight}px` }}
        />
      </div>
    </div>
  );
};

// Export individual components for custom composition if needed
export { Toolbar } from "./Toolbar";
export { ToolbarButton } from "./ToolbarButton";
export { HeadingSelector } from "./HeadingSelector";

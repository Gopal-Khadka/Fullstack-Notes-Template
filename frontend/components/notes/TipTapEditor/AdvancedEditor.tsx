import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Unlink,
  Minus,
} from "lucide-react";

interface TiptapEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
}

const AdvancedEditor = ({
  content = "",
  onChange,
  placeholder = "Start crafting your outreach message...",
}: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextStyle,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline hover:text-blue-800",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
  });

  // Update content when prop changes
  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  const addLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl || "");

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="border-b border-border bg-muted/50 p-2">
        <div className="flex flex-wrap items-center gap-1">
          {/* Text Formatting Group */}
          <div className="flex items-center border-r border-border pr-2 mr-2">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8 hover:bg-accent hover:text-accent-foreground ${
                editor.isActive("bold")
                  ? "bg-accent text-accent-foreground"
                  : ""
              }`}
              title="Bold (Ctrl+B)"
            >
              <Bold className="h-4 w-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8 hover:bg-accent hover:text-accent-foreground ${
                editor.isActive("italic")
                  ? "bg-accent text-accent-foreground"
                  : ""
              }`}
              title="Italic (Ctrl+I)"
            >
              <Italic className="h-4 w-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8 hover:bg-accent hover:text-accent-foreground ${
                editor.isActive("strike")
                  ? "bg-accent text-accent-foreground"
                  : ""
              }`}
              title="Strikethrough"
            >
              <Strikethrough className="h-4 w-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8 hover:bg-accent hover:text-accent-foreground ${
                editor.isActive("code")
                  ? "bg-accent text-accent-foreground"
                  : ""
              }`}
              title="Inline Code"
            >
              <Code className="h-4 w-4" />
            </button>
          </div>

          {/* Heading Selector */}
          <div className="flex items-center border-r border-border pr-2 mr-2">
            <select
              onChange={(e) => {
                const level = parseInt(e.target.value);
                if (level === 0) {
                  editor.chain().focus().setParagraph().run();
                } else {
                  editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
                    .run();
                }
              }}
              value={
                editor.isActive("heading", { level: 1 })
                  ? 1
                  : editor.isActive("heading", { level: 2 })
                  ? 2
                  : editor.isActive("heading", { level: 3 })
                  ? 3
                  : 0
              }
              className="flex h-8 items-center justify-between rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value={0}>Paragraph</option>
              <option value={1}>H1</option>
              <option value={2}>H2</option>
              <option value={3}>H3</option>
            </select>
          </div>

          {/* Lists Group */}
          <div className="flex items-center border-r border-border pr-2 mr-2">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8 hover:bg-accent hover:text-accent-foreground ${
                editor.isActive("bulletList")
                  ? "bg-accent text-accent-foreground"
                  : ""
              }`}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8 hover:bg-accent hover:text-accent-foreground ${
                editor.isActive("orderedList")
                  ? "bg-accent text-accent-foreground"
                  : ""
              }`}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </button>
          </div>

          {/* Block Elements Group */}
          <div className="flex items-center border-r border-border pr-2 mr-2">
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8 hover:bg-accent hover:text-accent-foreground ${
                editor.isActive("blockquote")
                  ? "bg-accent text-accent-foreground"
                  : ""
              }`}
              title="Quote"
            >
              <Quote className="h-4 w-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8 hover:bg-accent hover:text-accent-foreground"
              title="Horizontal Rule"
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>

          {/* Link Group */}
          <div className="flex items-center border-r border-border pr-2 mr-2">
            <button
              onClick={addLink}
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8 hover:bg-accent hover:text-accent-foreground ${
                editor.isActive("link")
                  ? "bg-accent text-accent-foreground"
                  : ""
              }`}
              title="Add Link"
            >
              <LinkIcon className="h-4 w-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().unsetLink().run()}
              disabled={!editor.isActive("link")}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8 hover:bg-accent hover:text-accent-foreground"
              title="Remove Link"
            >
              <Unlink className="h-4 w-4" />
            </button>
          </div>

          {/* Undo/Redo Group */}
          <div className="flex items-center">
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8 hover:bg-accent hover:text-accent-foreground"
              title="Undo (Ctrl+Z)"
            >
              <Undo className="h-4 w-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8 hover:bg-accent hover:text-accent-foreground"
              title="Redo (Ctrl+Y)"
            >
              <Redo className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="relative">
        <EditorContent
          editor={editor}
          className="min-h-[200px] max-h-[500px] overflow-y-auto"
        />
      </div>
    </div>
  );
};

export default AdvancedEditor;

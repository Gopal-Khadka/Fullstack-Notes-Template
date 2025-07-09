import { useMemo } from "react";
import { type Editor } from "@tiptap/react";
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
  Minus,
  LucideProps,
} from "lucide-react";

interface ToolbarAction {
  group: string;
  items: ToolbarItem[];
}

interface ToolbarItem {
  id: string;
  action: () => void;
  isActive?: boolean;
  disabled: boolean;
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export const useToolbarActions = (editor: Editor): ToolbarAction[] => {
  const actions = useMemo(() => {
    return [
      {
        group: "formatting",
        items: [
          {
            id: "bold",
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive("bold"),
            disabled: !editor.can().toggleBold(),
            title: "Bold (Ctrl+B)",
            icon: Bold,
          },
          {
            id: "italic",
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive("italic"),
            disabled: !editor.can().toggleItalic(),
            title: "Italic (Ctrl+I)",
            icon: Italic,
          },
          {
            id: "strike",
            action: () => editor.chain().focus().toggleStrike().run(),
            isActive: editor.isActive("strike"),
            disabled: !editor.can().toggleStrike(),
            title: "Strikethrough",
            icon: Strikethrough,
          },
          {
            id: "code",
            action: () => editor.chain().focus().toggleCode().run(),
            isActive: editor.isActive("code"),
            disabled: !editor.can().toggleCode(),
            title: "Inline Code",
            icon: Code,
          },
        ],
      },
      {
        group: "lists",
        items: [
          {
            id: "bulletList",
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive("bulletList"),
            title: "Bullet List",
            icon: List,
            disabled: !editor.can().toggleBulletList(),
          },
          {
            id: "orderedList",
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive("orderedList"),
            title: "Numbered List",
            icon: ListOrdered,
            disabled: !editor.can().toggleOrderedList(),
          },
        ],
      },
      {
        group: "blocks",
        items: [
          {
            id: "blockquote",
            action: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: editor.isActive("blockquote"),
            title: "Quote",
            icon: Quote,
            disabled: !editor.can().toggleBlockquote(),
          },
          {
            id: "horizontalRule",
            action: () => editor.chain().focus().setHorizontalRule().run(),
            title: "Horizontal Rule",
            icon: Minus,
            disabled: !editor.can().setHorizontalRule(),
          },
        ],
      },
      {
        group: "history",
        items: [
          {
            id: "undo",
            action: () => editor.chain().focus().undo().run(),
            disabled: !editor.can().undo(),
            title: "Undo (Ctrl+Z)",
            icon: Undo,
            isActive: false,
          },
          {
            id: "redo",
            action: () => editor.chain().focus().redo().run(),
            disabled: !editor.can().redo(),
            title: "Redo (Ctrl+Y)",
            icon: Redo,
            isActive: false,
          },
        ],
      },
    ];
  }, [editor.state.selection, editor]); // Re-compute when selection or capabilities change

  return actions;
};

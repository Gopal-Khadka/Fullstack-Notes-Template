import React, { useCallback, useMemo } from "react";
import { type Editor } from "@tiptap/react";

interface HeadingSelectorProps {
  editor: Editor;
}

export const HeadingSelector = ({ editor }: HeadingSelectorProps) => {
  const currentLevel = useMemo(() => {
    if (editor.isActive("heading", { level: 1 })) return 1;
    if (editor.isActive("heading", { level: 2 })) return 2;
    if (editor.isActive("heading", { level: 3 })) return 3;
    return 0; // Represents Paragraph
  }, [editor.state.selection]); // More efficient dependency

  const handleHeadingChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const level = parseInt(e.target.value, 10) as 0 | 1 | 2 | 3;
      if (level === 0) {
        editor.chain().focus().setParagraph().run();
      } else {
        editor.chain().focus().toggleHeading({ level }).run();
      }
    },
    [editor]
  );

  return (
    <select
      onChange={handleHeadingChange}
      value={currentLevel}
      className="
        flex h-8 items-center justify-between rounded-md border border-input
        bg-transparent px-2 py-1 text-sm ring-offset-background
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
      "
    >
      <option value={0}>Paragraph</option>
      <option value={1}>H1</option>
      <option value={2}>H2</option>
      <option value={3}>H3</option>
    </select>
  );
};

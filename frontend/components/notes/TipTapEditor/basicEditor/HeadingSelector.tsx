import React, { useCallback, useMemo } from "react";
import { type Editor } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeadingSelectorProps {
  editor: Editor;
}

// Define options for clarity and easy mapping
const textStyleOptions = [
  { value: "0", label: "Paragraph" },
  { value: "1", label: "Heading 1" },
  { value: "2", label: "Heading 2" },
  { value: "3", label: "Heading 3" },
];

export const HeadingSelector = ({ editor }: HeadingSelectorProps) => {
  // 1. Determine the current active heading level
  const currentLevel = useMemo(() => {
    for (const option of textStyleOptions) {
      const level = parseInt(option.value, 10);
      if (level > 0 && editor.isActive("heading", { level })) {
        return level;
      }
    }
    return 0; // Default to Paragraph
  }, [editor.state.selection]);

  // 2. Handle value changes from the Select component
  const handleValueChange = useCallback(
    (value: string) => {
      const level = parseInt(value, 10) as 0 | 1 | 2 | 3;

      if (level === 0) {
        editor.chain().focus().setParagraph().run();
      } else {
        editor.chain().focus().toggleHeading({ level }).run();
      }
    },
    [editor]
  );

  return (
    <Select value={String(currentLevel)} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Select a style" />
      </SelectTrigger>
      <SelectContent>
        {textStyleOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

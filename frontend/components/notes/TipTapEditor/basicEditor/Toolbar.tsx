import React, { useCallback } from "react";
import { type Editor } from "@tiptap/react";
import { Link as LinkIcon, Unlink } from "lucide-react";
import { ToolbarButton } from "./ToolbarButton";
import { HeadingSelector } from "./HeadingSelector";
import { useToolbarActions } from "@/hooks/editor/useToolbarActions";

const ToolbarGroup = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`flex items-center border-r border-border pr-2 mr-2 ${className}`}
  >
    {children}
  </div>
);

interface ToolbarProps {
  editor: Editor;
}

export const Toolbar = ({ editor }: ToolbarProps) => {
  const toolbarActions = useToolbarActions(editor);

  const addLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="border-b border-border bg-muted/50 p-2">
      <div className="flex flex-wrap items-center gap-1">
        {toolbarActions.map((group) => (
          <ToolbarGroup key={group.group}>
            {group.items.map((item) => (
              <ToolbarButton
                key={item.id}
                onClick={item.action}
                isActive={item.isActive}
                disabled={item.disabled}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </ToolbarGroup>
        ))}

        <ToolbarGroup>
          <HeadingSelector editor={editor} />
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarButton
            onClick={addLink}
            isActive={editor.isActive("link")}
            title="Add Link"
            icon={LinkIcon}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}
            title="Remove Link"
            icon={Unlink}
          />
        </ToolbarGroup>
      </div>
    </div>
  );
};

"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

interface MentionListProps {
  items: any[];
  command: (item: any) => void;
}

export const MentionList = forwardRef<any, MentionListProps>(
  ({ items, command }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
      const item = items[index];
      if (item) {
        // Pass the complete item with metadata
        command({
          id: item.id,
          label: item.label,
          type: item.type,
          metadata: item.metadata || {}
        });
      }
    };

    const upHandler = () => {
      setSelectedIndex((selectedIndex + items.length - 1) % items.length);
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: any }) => {
        if (event.key === "ArrowUp") {
          upHandler();
          return true;
        }
        if (event.key === "ArrowDown") {
          downHandler();
          return true;
        }
        if (event.key === "Enter") {
          enterHandler();
          return true;
        }
        return false;
      },
    }));

    const getItemIcon = (type: string) => {
      switch (type) {
        case 'user': return '👤';
        case 'file': return '📄';
        case 'status': return '📋';
        default: return '•';
      }
    };

    return (
      <DropdownMenu open>
        <DropdownMenuTrigger asChild>
          <div style={{ display: "none" }} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          {items.length ? (
            items.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => selectItem(index)}
                className={index === selectedIndex ? "bg-accent text-accent-foreground" : ""}
              >
                <div className="flex items-center gap-2">
                  <span>{getItemIcon(item.type)}</span>
                  <div className="flex flex-col">
                    <span className="font-medium">{item.label}</span>
                    {item.metadata?.description && (
                      <span className="text-xs text-muted-foreground">
                        {item.metadata.description}
                      </span>
                    )}
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled>No result</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

MentionList.displayName = "MentionList";

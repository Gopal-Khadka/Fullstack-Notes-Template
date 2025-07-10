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
  items: string[];
  command: (item: any) => void;
}

export const MentionList = forwardRef<any, MentionListProps>(
  ({ items, command }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
      const item = items[index];
      if (item) {
        command({ id: item });
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

    return (
      <DropdownMenu open>
        <DropdownMenuTrigger asChild>
          {/* Hidden trigger just to meet the shadcn requirement */}
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
                {item}
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

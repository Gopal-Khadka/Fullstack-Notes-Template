"use client";
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
        command({
          id: item.id,
          label: item.label,
          type: item.type,
          metadata: item.metadata || {},
        });
      }
    };

    const upHandler = () => {
      setSelectedIndex(
        (prevIndex) => (prevIndex + items.length - 1) % items.length
      );
    };

    const downHandler = () => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
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
        case "user":
          return "👤";
        case "file":
          return "📄";
        case "status":
          return "📋";
        default:
          return "•";
      }
    };

    return (
      <div className="z-50 min-w-[256px] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
        {items.length > 0 ? (
          items.map((item, index) => (
            <button
              key={index}
              onClick={() => selectItem(index)}
              className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors ${
                index === selectedIndex
                  ? "bg-accent text-accent-foreground"
                  : ""
              }`}
            >
              <span>{getItemIcon(item.type)}</span>
              <div className="flex flex-col items-start">
                <span className="font-medium">{item.label}</span>
                {item.metadata?.description && (
                  <span className="text-xs text-muted-foreground">
                    {item.metadata.description}
                  </span>
                )}
              </div>
            </button>
          ))
        ) : (
          <div className="px-2 py-1.5 text-sm">No result</div>
        )}
      </div>
    );
  }
);

MentionList.displayName = "MentionList";

import { Editor, ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import { MentionList } from "./MentionList";
import type { MentionItem } from "./type";

// @type: Type
// @user_1: Jerry Hall

const people: MentionItem[] = [
  {
    id: "user_1",
    label: "Jerry Hall",
    type: "user",
    metadata: { email: "jerry@company.com", description: "Senior Developer" },
  },
  {
    id: "user_2",
    label: "Sarah Connor",
    type: "user",
    metadata: { email: "sarah@company.com", description: "Tech Lead" },
  },
];

const tags: MentionItem[] = [
  {
    id: "file_1",
    label: "UserService.ts",
    type: "file",
    metadata: {
      path: "/src/services/UserService.ts",
      description: "User management service",
    },
  },
  {
    id: "file_2",
    label: "README.md",
    type: "file",
    metadata: { path: "/README.md", description: "Project documentation" },
  },
  {
    id: "status_1",
    label: "draft",
    type: "status",
    metadata: { description: "Work in progress" },
  },
  {
    id: "status_2",
    label: "archived",
    type: "status",
    metadata: { description: "Completed or outdated" },
  },
];

export const createSuggestion = (char: string) => ({
  char,
  items: ({ query }: { query: string }) => {
    let items: MentionItem[] = [];
    if (char === "@") {
      items = people;
    } else if (char === "#") {
      items = tags;
    }

    if (!query) {
      return items;
    }
    return items.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  },
  decorationClass:"bg-yellow-500 text-red",
  decorationTag:"b",

  render: () => {
    let reactRenderer: any;
    let popup: any;

    return {
      onStart: (props: any) => {
        if (!props.clientRect) {
          return;
        }

        reactRenderer = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          content: reactRenderer.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props: any) {
        reactRenderer.updateProps(props);
        if (!props.clientRect) {
          return;
        }
        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props: any) {
        if (props.event.key === "Escape") {
          popup[0].hide();
          return true;
        }
        return reactRenderer.ref?.onKeyDown(props);
      },

      onExit() {
        popup[0].destroy();
        reactRenderer.destroy();
      },
    };
  },
});

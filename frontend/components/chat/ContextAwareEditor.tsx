"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import { useState } from "react";
import { createSuggestion } from "./suggestion";
import type { ParsedMessage, MentionItem } from "./type";

export default function ContextChatEditor() {
  const [parsedMessage, setParsedMessage] = useState<ParsedMessage | null>(
    null
  );
  const [response, setResponse] = useState<string>("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: "mention bg-green-100 text-green-800 px-2 py-1 rounded",
        },
        suggestions: [createSuggestion("@"), createSuggestion("#")],
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      // Extract mentions from editor content
      const json = editor.getJSON();
      const mentions = extractMentions(json);
      const text = editor.getText();

      setParsedMessage({
        text,
        mentions,
        rawContent: json,
      });

      console.log("parsedMessage", parsedMessage);
    },
    immediatelyRender: false,
  });

  const extractMentions = (content: any): MentionItem[] => {
    const mentions: MentionItem[] = [];

    const traverse = (node: any) => {
      if (node.type === "mention" && node.attrs) {
        mentions.push({
          id: node.attrs.id,
          label: node.attrs.label,
          type: node.type,
          metadata: node.attrs.metadata || {},
        });
      }
      if (node.content) {
        node.content.forEach(traverse);
        console.log("node.content", node.content);
      }
    };

    if (content.content) {
      content.content.forEach(traverse);
    }

    return mentions;
  };

  const handleSendMessage = async () => {
    if (!parsedMessage) return;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedMessage),
      });

      const result = await response.json();
      setResponse(result.responseMessage || "Message processed successfully!");
    } catch (error) {
      setResponse("Error: Could not process message");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Context-Aware Chat</h2>

        <div className="border rounded-md p-3 min-h-[100px] mb-4">
          <EditorContent editor={editor} />
        </div>

        <button
          onClick={handleSendMessage}
          disabled={!parsedMessage?.mentions.length}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Send Message
        </button>
      </div>

      {parsedMessage && parsedMessage.mentions.length > 0 && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Detected Mentions:</h3>
          <div className="space-y-2">
            {parsedMessage.mentions.map((mention, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="font-medium">{mention.label}</span>
                <span className="text-gray-500">({mention.type})</span>
                {mention.metadata?.description && (
                  <span className="text-gray-400">
                    - {mention.metadata.description}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {response && (
        <div className="border rounded-lg p-4 bg-green-50">
          <h3 className="font-semibold mb-2">Response:</h3>
          <p className="text-sm">{response}</p>
        </div>
      )}
    </div>
  );
}

export interface MentionItem {
  id: string;
  label: string;
  type: "user" | "file" | "status";
  metadata?: {
    email?: string;
    path?: string;
    description?: string;
  };
}

export interface ParsedMessage {
  text: string;
  mentions: MentionItem[];
  rawContent: any;
}

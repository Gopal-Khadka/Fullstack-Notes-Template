import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { theme } from "@/config/lexical/theme";
import "@/styles/lexical.css";
import { cn } from "@/lib/utils";
import type { EditorState } from "lexical";
import TreeViewPlugin from "@/plugins/TreeViewPlugin";

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

export default function LexicalMdEditor() {
  const initialConfig = {
    namespace: "NotesEditor",
    theme,
    onError,
  };

  const onChange = (editorState: EditorState) => {
    editorState.toJSON();
  };

  return (
    <div className="mt-5 border-2 border-gray-300 rounded-md p-4 min-w-[400px]">
      <LexicalComposer initialConfig={initialConfig}>
        <div className={cn("flex flex-col gap-4", "container")}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="contentEditable"
                aria-placeholder={"Enter some text..."}
                placeholder={
                  <div className="placeholder">Enter some text...</div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <OnChangePlugin onChange={onChange} />
          <TreeViewPlugin />
        </div>
      </LexicalComposer>
    </div>
  );
}

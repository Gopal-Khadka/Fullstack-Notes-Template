import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { theme } from "@/config/lexical/theme";


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

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<div className="flex flex-col gap-4">

			<RichTextPlugin
				contentEditable={
					<ContentEditable
						aria-placeholder={"Enter some text..."}
						placeholder={<div>Enter some text...</div>}
					/>
				}
				ErrorBoundary={LexicalErrorBoundary}
			/>
			<HistoryPlugin />
			<AutoFocusPlugin />
			</div>
		</LexicalComposer>
	);
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	useCreateNote,
	useDeleteNote,
	useNotes,
	useUpdateNote,
} from "@/hooks/useNote";
import type{ NoteCreate, NoteResponse, NoteUpdate } from "@/lib/client";

export default function NotesDemoPage() {
	const { data: notes, isLoading, isError } = useNotes();
	const createNote = useCreateNote();
	const updateNote = useUpdateNote();
	const deleteNote = useDeleteNote();

	const [selectedNote, setSelectedNote] = useState<NoteResponse | null>(null);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleEditClick = (note:NoteResponse) => {
		setSelectedNote(note);
		setTitle(note.title);
		try {
			const contentStr =
				typeof note.content === "string"
					? note.content
					: JSON.stringify(note.content, null, 2);
			setContent(contentStr);
		} catch (error) {
			console.error("Failed to stringify note content", error);
			setContent(String(note.content));
		}
	};

	const handleClearForm = () => {
		setSelectedNote(null);
		setTitle("");
		setContent("");
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let contentJSON: Record<string, any>;
		try {
			contentJSON = JSON.parse(content);
		} catch {
			alert("Invalid JSON content.");
			return;
		}

		if (selectedNote) {
			const updatedNote: NoteUpdate = { title, content: contentJSON };
			updateNote.mutate({ id: selectedNote.id, data: updatedNote });
		} else {
			const newNote: NoteCreate = { title, content: contentJSON };
			createNote.mutate(newNote);
		}
		handleClearForm();
	};

	const handleDeleteClick = (id: number) => {
		if (window.confirm("Are you sure you want to delete this note?")) {
			deleteNote.mutate(id);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Notes</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<h2 className="text-xl font-semibold mb-2">
						{selectedNote ? "Edit Note" : "Create Note"}
					</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label
								htmlFor="title"
								className="block text-sm font-medium text-gray-700"
							>
								Title
							</label>
							<input
								type="text"
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								required
							/>
						</div>
						<div>
							<label
								htmlFor="content"
								className="block text-sm font-medium text-gray-700"
							>
								Content (JSON)
							</label>
							<textarea
								id="content"
								value={content}
								onChange={(e) => setContent(e.target.value)}
								rows={10}
								className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								required
							/>
						</div>
						<div className="flex space-x-2">
							<Button type="submit">
								{selectedNote ? "Update Note" : "Create Note"}
							</Button>
							{selectedNote && (
								<Button
									type="button"
									variant="outline"
									onClick={handleClearForm}
								>
									Cancel
								</Button>
							)}
						</div>
					</form>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-2">Notes List</h2>
					{isLoading && <p>Loading...</p>}
					{isError && <p>Error loading notes.</p>}
					<ul className="space-y-2">
						{notes?.notes.map((note) => (
							<li key={note.id} className="p-4 border rounded-md shadow-sm">
								<h3 className="font-bold">{note.title}</h3>
								<pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">
									{typeof note.content === "string"
										? note.content
										: JSON.stringify(note.content, null, 2)}
								</pre>
								<div className="flex space-x-2 mt-2">
									<Button size="sm" onClick={() => handleEditClick(note)}>
										Edit
									</Button>
									<Button
										size="sm"
										variant="destructive"
										onClick={() => handleDeleteClick(note.id)}
									>
										Delete
									</Button>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

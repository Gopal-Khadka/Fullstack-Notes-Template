import type { Note, NoteCreate, NoteUpdate } from "@/types/note";
import { apiClient } from "./client";

export interface NotesResponse {
	notes: Note[];
	total: number;
}

export const notesApi = {
	async getAll(): Promise<NotesResponse> {
		const response = await apiClient.get<NotesResponse>("/api/notes/");
		return response.data;
	},
	async create(data: NoteCreate): Promise<Note> {
		const response = await apiClient.post<Note>("/api/notes/", data);
		return response.data;
	},
	async update(id: number, data: NoteUpdate): Promise<Note> {
		const response = await apiClient.put<Note>(`/api/notes/${id}`, data);
		return response.data;
	},
	async delete(id: number): Promise<void> {
		await apiClient.delete(`/api/notes/${id}`);
	},
};

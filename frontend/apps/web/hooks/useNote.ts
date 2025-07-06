import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notesApi } from "@/lib/api/notes";
import type { Note, NoteCreate, NoteUpdate } from "@/types/note";

export const useNotes = () =>
	useQuery({
		queryKey: ["notes"],
		queryFn: notesApi.getAll,
		staleTime: 5 * 60 * 1000,
	});

export const useCreateNote = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: NoteCreate) => notesApi.create(data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
	});
};

export const useUpdateNote = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: number; data: NoteUpdate }) =>
			notesApi.update(id, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
	});
};

export const useDeleteNote = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => notesApi.delete(id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
	});
};

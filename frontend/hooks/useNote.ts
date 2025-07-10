import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { NoteCreate, NoteUpdate } from "@/lib/client";
import {
	createNoteApiNotesPost,
	deleteNoteApiNotesNoteIdDelete,
	getNotesApiNotesGet,
	updateNoteApiNotesNoteIdPut,
} from "@/lib/client/sdk.gen";

export const useNotes = () =>
	useQuery({
		queryKey: ["notes"],
		queryFn: () => getNotesApiNotesGet().then((res) => res.data),
		staleTime: 5 * 60 * 1000,
	});

export const useCreateNote = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: NoteCreate) => createNoteApiNotesPost({ body: data }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
	});
};

export const useUpdateNote = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: number; data: NoteUpdate }) =>
			updateNoteApiNotesNoteIdPut({
				path: {
					note_id: id,
				},
				body: data,
			}),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
	});
};

export const useDeleteNote = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) =>
			deleteNoteApiNotesNoteIdDelete({
				path: {
					note_id: id,
				},
			}),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
	});
};

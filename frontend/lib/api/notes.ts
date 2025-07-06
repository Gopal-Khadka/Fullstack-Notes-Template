import {
	createNoteApiNotesPost,
	deleteNoteApiNotesNoteIdDelete,
	getNotesApiNotesGet,
	updateNoteApiNotesNoteIdPut,
} from "../client/sdk.gen";


export const notesApi = {
	async getAll() {
		const response = await getNotesApiNotesGet();
		return response.data;
	},
	async create(data) {
		const response = await createNoteApiNotesPost({
			body: data,
		});
		return response.data;
	},
	async update(id: number, data) {
		const response = await updateNoteApiNotesNoteIdPut({
			path: {
				note_id: id,
			},
			body: data,
		});
		return response.data;
	},
	async delete(id: number) {
		await deleteNoteApiNotesNoteIdDelete({
			path: {
				note_id: id,
			},
		});
	},
};

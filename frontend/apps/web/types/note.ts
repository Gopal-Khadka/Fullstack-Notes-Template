import type { paths, components } from "./schema";

// Schema Obj
export type NotesListResponse = components["schemas"]["NotesListResponse"];
export type Note = components["schemas"]["NoteResponse"];
export type NoteCreate = components["schemas"]["NoteCreate"];
export type NoteUpdate = components["schemas"]["NoteUpdate"];

export type NoteUpdateError = components["schemas"]["HTTPValidationError"];

// Old Schemas
// export interface Note {
//     id: number;
//     title: string;
//     content: Record<string, any>;
//     created_at: string;
//     updated_at: string;
//   }

//   export interface NoteCreate {
//     title: string;
//     content: Record<string, any>;
//   }

//   export interface NoteUpdate {
//     title: string;
//     content: Record<string, any>;
//   }

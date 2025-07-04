export interface Note {
    id: number;
    title: string;
    content: Record<string, any>;
    created_at: string;
    updated_at: string;
  }
  
  export interface NoteCreate {
    title: string;
    content: Record<string, any>;
  }
  
  export interface NoteUpdate {
    title: string;
    content: Record<string, any>;
  }
  
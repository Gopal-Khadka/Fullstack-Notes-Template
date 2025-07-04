# backend/app/schemas/note.py
"""Note Pydantic schemas for request/response validation."""

from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from typing import Dict, Any, List


class NoteBase(BaseModel):
    """Base note schema with common fields."""
    title: str = Field(..., min_length=1, max_length=255, description="Note title")
    content: Dict[str, Any] = Field(..., description="Lexical JSON content")


class NoteCreate(NoteBase):
    """Schema for creating a new note."""
    pass


class NoteUpdate(NoteBase):
    """Schema for updating an existing note."""
    pass


class NoteResponse(NoteBase):
    """Schema for note responses."""
    id: int
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class NotesListResponse(BaseModel):
    """Schema for notes list response."""
    notes: List[NoteResponse]
    total: int
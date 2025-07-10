# backend/app/schemas/note.py
"""Note Pydantic schemas for request/response validation."""

from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class NoteBase(BaseModel):
    """Base note schema with common fields."""

    title: str = Field(..., min_length=1, max_length=255, description="Note title")
    content: dict[str, Any] = Field(..., description="Lexical JSON content")


class NoteCreate(NoteBase):
    """Schema for creating a new note."""


class NoteUpdate(NoteBase):
    """Schema for updating an existing note."""


class NoteResponse(NoteBase):
    """Schema for note responses."""

    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class NotesListResponse(BaseModel):
    """Schema for notes list response."""

    notes: list[NoteResponse]
    total: int

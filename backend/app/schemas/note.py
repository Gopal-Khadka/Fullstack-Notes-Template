# schemas/note.py
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Dict, Any


class NoteCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    content: Dict[str, Any]  # Lexical JSON structure


class NoteUpdate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    content: Dict[str, Any]


class NoteResponse(BaseModel):
    id: int
    title: str
    content: Dict[str, Any]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

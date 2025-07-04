# backend/app/schemas/__init__.py
"""Pydantic schemas package."""

from .note import NoteCreate, NoteUpdate, NoteResponse, NotesListResponse

__all__ = ["NoteCreate", "NoteUpdate", "NoteResponse", "NotesListResponse"]
# backend/app/schemas/__init__.py
"""Pydantic schemas package."""

from .note import NoteCreate, NoteResponse, NotesListResponse, NoteUpdate

__all__ = ["NoteCreate", "NoteUpdate", "NoteResponse", "NotesListResponse"]

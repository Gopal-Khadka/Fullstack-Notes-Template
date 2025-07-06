# backend/app/routers/notes.py
"""Notes API router with CRUD operations."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.note import Note
from app.schemas.note import NoteCreate, NoteResponse, NotesListResponse, NoteUpdate

router = APIRouter(prefix="/api/notes", tags=["notes"])


@router.get("/", response_model=NotesListResponse)
async def get_notes(db: Session = Depends(get_db)) -> NotesListResponse:
    """Retrieve all notes."""
    notes = db.query(Note).order_by(Note.updated_at.desc()).all()
    return NotesListResponse(notes=notes, total=len(notes))


@router.post("/", response_model=NoteResponse, status_code=status.HTTP_201_CREATED)
async def create_note(
    note_data: NoteCreate, db: Session = Depends(get_db)
) -> NoteResponse:
    """Create a new note."""
    note = Note(title=note_data.title, content=note_data.content)
    db.add(note)
    db.commit()
    db.refresh(note)
    return NoteResponse.model_validate(note)


@router.put("/{note_id}", response_model=NoteResponse)
async def update_note(
    note_id: int, note_data: NoteUpdate, db: Session = Depends(get_db)
) -> NoteResponse:
    """Update an existing note."""
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Note with id {note_id} not found",
        )

    # Update fields
    note.title = note_data.title
    note.content = note_data.content

    db.commit()
    db.refresh(note)
    return NoteResponse.model_validate(note)


@router.delete("/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_note(note_id: int, db: Session = Depends(get_db)) -> None:
    """Delete a note."""
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Note with id {note_id} not found",
        )

    db.delete(note)
    db.commit()

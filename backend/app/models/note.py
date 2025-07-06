# models/note.py
from datetime import UTC, datetime

from sqlalchemy import JSON, Column, DateTime, Integer, String

from app.database import Base


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(JSON, nullable=False)  # Lexical JSON state
    created_at = Column(DateTime, default=datetime.now(UTC))
    updated_at = Column(
        DateTime,
        default=datetime.now(UTC),
        onupdate=datetime.now(UTC),
    )

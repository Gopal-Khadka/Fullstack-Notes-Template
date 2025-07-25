"""Database configuration and session management."""

import os
from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./notes.db")

# Create engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {},
    echo=False,  # Set to True for SQL debugging
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()


def get_db() -> Generator:
    """Database dependency for FastAPI."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_tables():
    """Create all database tables."""
    Base.metadata.create_all(bind=engine)

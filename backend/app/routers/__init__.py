# backend/app/routers/__init__.py
"""API routers package."""

from .notes import router as notes_router

__all__ = ["notes_router"]

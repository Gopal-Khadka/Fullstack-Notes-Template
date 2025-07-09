# backend/app/routers/__init__.py
"""API routers package."""

from .chat import router as chat_router
from .notes import router as notes_router

__all__ = ["chat_router", "notes_router"]

"""FastAPI application entry point."""

from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import create_tables
from app.routers import chat_router, notes_router


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None]:
    """Application lifespan events."""
    # Startup
    create_tables()
    print("✅ Database tables created")
    print("🚀 Notes API is ready!")

    yield

    # Shutdown
    print("👋 Shutting down Notes API")


# Create FastAPI application
app = FastAPI(
    title="Notes Management API",
    description="A modern REST API for managing notes with rich text content",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# Configure CORS for frontend development
app.add_middleware(
    # type: ignore[reportGeneralTypeIssues]
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(notes_router)
app.include_router(chat_router)


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Notes Management API",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc",
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "notes-api"}

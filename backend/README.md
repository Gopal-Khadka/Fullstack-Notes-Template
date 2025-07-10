# Notes Management API

A modern FastAPI backend for managing notes with rich text content support.

## Features

- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Rich Text Support**: Stores Lexical JSON content structure
- **Type Safety**: Full Pydantic validation and SQLAlchemy models
- **Database Migrations**: Alembic for schema management
- **Auto Documentation**: OpenAPI/Swagger docs at `/docs`
- **CORS Enabled**: Ready for frontend development

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app & configuration
│   ├── database.py          # Database connection & session
│   ├── models/
│   │   └── note.py          # SQLAlchemy models
│   ├── schemas/
│   │   └── note.py          # Pydantic schemas
│   └── routers/
│       └── notes.py         # API endpoints
├── alembic/                 # Database migrations
├── pyproject.toml           # Dependencies & configuration
└── dev.py                   # Development server
```

## Quick Start

1. **Install dependencies and activate the vitual environment**:
   ```bash
   uv sync
   ```

2. **Run development server**:
   ```bash
   python dev.py
   ```

3. **Access API**:
   - API: http://localhost:8000
   - Docs: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## API Endpoints

- `GET /api/notes` - List all notes
- `POST /api/notes` - Create a new note
- `PUT /api/notes/{id}` - Update a note
- `DELETE /api/notes/{id}` - Delete a note

## Database Migrations

```bash
# Generate migration
alembic revision --autogenerate -m "Add notes table"

# Apply migration
alembic upgrade head
```

## Development

- **Code Quality**: Configured with Ruff for linting
- **Type Safety**: Full TypeScript-compatible OpenAPI schema
- **Hot Reload**: Automatic server restart on code changes
- **CORS**: Pre-configured for frontend development

The API generates OpenAPI JSON at `/openapi.json` for frontend type generation.

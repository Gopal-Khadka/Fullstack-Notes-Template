# Notes Management Full-Stack Application

A modern, full-stack application for managing notes with a rich text editor. This project features a FastAPI backend and a Next.js frontend, demonstrating a clean architecture and modern development practices.

## Key Features

- **CRUD Operations**: Create, Read, Update, and Delete notes.
- **Rich Text Editor**: A (planned) sophisticated editor for formatting notes, using Lexical.
- **RESTful API**: A well-documented API built with FastAPI.
- **Type-Safe Client**: Auto-generated type-safe API client for the frontend.
- **Modern UI**: A sleek and responsive user interface built with Next.js and shadcn/ui.

## Technology Stack

### Backend

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **ASGI Server**: [Uvicorn](https://www.uvicorn.org/)
- **ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
- **Database Migrations**: [Alembic](https://alembic.sqlalchemy.org/)
- **Data Validation**: [Pydantic](https://pydantic-docs.helpmanual.io/)
- **Database**: [SQLite](https://www.sqlite.org/index.html)
- **Package Management**: [uv](https://github.com/astral-sh/uv)
- **Linting/Formatting**: [Ruff](https://github.com/astral-sh/ruff)
- **Git Hooks**: [pre-commit](https://pre-commit.com/)

### Frontend

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [React](https://reactjs.org/)
- **Data Fetching**: [React Query](https://tanstack.com/query/v5)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Component Library**: [shadcn/ui](https://ui.shadcn.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **API Client**: [openapi-ts](https://github.com/hey-api/openapi-ts) & [Axios](https://axios-http.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Editor**: [Lexical](https://lexical.dev/)

## Project Structure

The repository is a monorepo containing two main packages:

- `backend/`: The FastAPI application that serves the REST API.
- `frontend/`: The Next.js application for the user interface.

Both directories contain their own documentation, including Architectural Decision Records (ADRs) in their respective `docs/adr` folders.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Python](https://www.python.org/) 3.13+
- [Node.js](https://nodejs.org/en/) (v18 or newer)
- [pnpm](https://pnpm.io/installation)
- [uv](https://github.com/astral-sh/uv) (Python package installer)

### Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Gopal-Khadka/Fullstack-Notes-Template.git
    cd Fullstack-Notes-Template
    ```

2.  **Set up the Backend:**
    ```bash
    cd backend

    # Create a virtual environment and install dependencies
    uv venv
    uv pip install -r requirements.txt

    # Apply database migrations
    alembic upgrade head

    # Run the development server
    uv run python dev.py
    ```
    The backend API will be available at `http://localhost:8000`. You can access the API documentation at `http://localhost:8000/docs`.

3.  **Set up the Frontend:**
    *(In a new terminal)*
    ```bash
    cd frontend

    # Install dependencies
    pnpm install

    # Generate the type-safe API client (requires backend to be running)
    pnpm run openapi-ts

    # Run the development server
    pnpm run dev
    ```
    The frontend application will be available at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

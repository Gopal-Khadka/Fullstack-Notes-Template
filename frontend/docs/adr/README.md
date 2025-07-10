# Frontend Architecture Decision Records (ADRs)

This directory contains the Architecture Decision Records (ADRs) for the frontend of our Next.js application.

## What is an ADR?

An ADR is a document that captures a significant architectural decision, including the context of the decision and its consequences. The collection of these records provides a historical log of the technical evolution of our project, ensuring that the rationale behind key decisions is preserved and accessible to all team members, both present and future.

## ADRs

Here is the list of current architectural decisions for our frontend application:

*   [**ADR-001: Server State Management**](./001-server-state-management.md) - Documents the decision to use **TanStack Query** for managing server state, including data fetching, caching, and synchronization.
*   [**ADR-002: Typesafe API Client Generation**](./002-typesafe-api-client-generation.md) - Outlines the choice of **@hey-api/openapi-ts** for automatically generating a typesafe API client from our OpenAPI specification.
*   [**ADR-003: Package Manager**](./003-package-manager.md) - Describes the decision to adopt **pnpm** as the standard package manager for its efficiency in disk space usage and performance benefits.
*   [**ADR-004: Standard UI Components**](./004-standard-ui-components.md) - Details the selection of **Shadcn/ui** in conjunction with **Tailwind CSS v4** to build our standard component library.
*   [**ADR-005: Markdown Editor**](./005-markdown-editor.md) - Explains the reasoning for choosing **Lexical** from Meta as our rich-text and markdown editor framework for its extensibility and performance.
*   [**ADR-006: Client-Side Storage**](./006-client-side-storage.md) - Documents the use of **IndexedDB** with the **Dexie.js** wrapper for robust and scalable client-side storage needs.

## Process for Creating New ADRs

When a new architectural decision is required, the following process should be followed:

1.  **Create a New ADR File:** Copy the `template.md` to a new file in the `docs/adr/` directory. The filename must follow the convention `NNN-short-description.md`, where `NNN` is the next sequential number.
2.  **Draft the ADR:** Fill out the template with the context, considered options, and the proposed decision. The initial status should be set to "Proposed".
3.  **Submit for Review:** Create a pull request with the new ADR to facilitate discussion and review from the team.
4.  **Finalize the Decision:** Once consensus is reached, the ADR's status is updated to "Accepted" or, if rejected, moved to a "Rejected" state. The pull request can then be merged.

## ADR Statuses

*   **Proposed:** The decision is under review.
*   **Accepted:** The decision has been approved and should be implemented.
*   **Rejected:** The decision was proposed but not approved after review.
*   **Deprecated:** The decision was previously accepted but is no longer relevant.
*   **Superseded by [ADR-XXXX]:** The decision has been replaced by a more recent ADR.

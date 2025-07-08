# Architecture Decision Records (ADRs)

This directory contains the Architecture Decision Records (ADRs) for this project.

## What is an ADR?

An ADR is a document that captures an important architectural decision made along with its context and consequences. These records are intended to provide a clear history of the technical decisions and the rationale behind them.

## Context

This repository of ADRs documents the architectural decisions for our backend systems. The goal is to ensure that all stakeholders, both present and future, can understand the reasoning behind significant technical choices.

## ADRs

Here is a list of the current architectural decisions:

*   [ADR-001: Python Tooling](./001-python-tooling.md) - This ADR documents the decision to use `uv` for package management and `ruff` for linting and formatting in our Python projects.
*   [ADR-002: Database Migration Tool](./002-database-migration-tool.md) - This ADR outlines the selection of `alembic` as the database migration tool for our FastAPI applications.

## Process

When a new architectural decision needs to be made, the following process should be followed:

1.  **Create a new ADR:** Copy the template (`template.md`) to a new file in this directory. The filename should be in the format `NNN-short-description.md`, where `NNN` is the next sequential number.
2.  **Propose a decision:** Fill out the "Context", "Decision", and "Consequences" sections of the new ADR. The status should be set to "Proposed".
3.  **Review:** The proposed ADR will be reviewed and discussed by the team.
4.  **Accept or Reject:** Once a consensus is reached, the status of the ADR will be updated to "Accepted" or "Rejected".

## Status of ADRs

Each ADR has a status field, which can be one of the following:

*   **Proposed:** The decision is under consideration.
*   **Accepted:** The decision has been approved and should be followed.
*   **Deprecated:** The decision has been replaced by a newer one.
*   **Superseded by [ADR-XXXX]:** The decision has been replaced by a newer one, and a link to the new ADR is provided.

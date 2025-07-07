# ADR-001: Adopt `uv` and `Ruff` for Python Tooling

**Date**: 2025-07-07  
**Status**: Accepted  
**Deciders**: Backend Team, Product Manager

## Context

Our current Python development workflow relies on a collection of separate tools for dependency management (`pip`, `pip-tools`), linting (`Flake8`), and formatting (`Black`, `isort`). This fragmented toolchain leads to slower dependency installation, longer CI/CD pipeline times, and complex configuration scattered across multiple files. We need a faster, more cohesive, and simpler tooling experience to improve developer velocity and efficiency.

## Decision Drivers

* **Performance**: The speed of dependency installation, linting, and formatting is critical for local development and CI/CD pipelines.
* **Developer Experience**: A streamlined and simple workflow with minimal cognitive load is desired.
* **Configuration Simplicity**: Consolidating configuration into a single file (`pyproject.toml`) is preferred.
* **CI/CD Pipeline Speed**: Reducing the time and cost associated with running CI jobs.
* **Toolchain Consolidation**: A preference for a smaller, more integrated set of tools.

## Considered Options

* **`uv` and `Ruff`**: An extremely fast, Rust-based package installer, linter, and formatter from a single provider (Astral).
* **`pip` + `pip-tools` + `Flake8` + `Black` + `isort`**: The traditional, widely-used but fragmented toolset.
* **`Poetry`**: An all-in-one dependency management and packaging tool, but with slower performance for installation.
* **`PDM`**: A modern Python package manager with similar goals to Poetry.

## Decision Outcome

**Chosen option: `uv` and `Ruff`**.

We've chosen to adopt `uv` for dependency management and `Ruff` for linting and formatting. Their shared Rust foundation provides unparalleled performance, and their consolidation under the Astral ecosystem simplifies our toolchain significantly. This choice directly addresses our primary drivers of performance and configuration simplicity.

### Positive Consequences

* **Exceptional Performance**: Drastically faster dependency installation and linting/formatting (10-100x faster), leading to quicker local setups and CI runs.
* **Simplified Configuration**: Both tools are configured in `pyproject.toml`, reducing complexity and consolidating settings.
* **Reduced CI/CD Costs**: Faster pipeline execution directly translates to lower compute costs.
* **Improved Developer Experience**: A single, cohesive toolchain reduces cognitive load and streamlines the development process.
* **Modern Tooling**: Adopting a modern, actively developed toolset keeps our stack current.

### Negative Consequences

* **Tool Maturity**: `uv` is newer than `pip` and `Poetry`, which may present unforeseen edge cases during adoption.
* **Migration Effort**: Requires a one-time effort to migrate existing projects and update internal documentation and CI configurations.

## Compliance

Adoption will be enforced through updated `cookiecutter` project templates, modified CI/CD pipeline configurations, and revised developer onboarding documentation. All new Python projects must use `uv` and `Ruff`.
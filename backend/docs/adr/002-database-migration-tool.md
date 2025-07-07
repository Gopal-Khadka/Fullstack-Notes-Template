# ADR-002: Use Alembic for Database Migrations

**Date**: 2025-07-07  
**Status**: Accepted  
**Deciders**: Backend Team, DevOps Team  

## Context

Our application is built using the FastAPI framework and relies on SQLAlchemy as the Object Relational Mapper (ORM) for database interaction. As the application evolves, its database schema (tables, columns, indexes, etc.) will change frequently. We require a systematic, reliable, and version-controlled process to manage these schema changes across all environments, from local development machines to production servers.

## Decision Drivers

* **SQLAlchemy Integration**: The tool must integrate seamlessly with SQLAlchemy models to minimize friction.
* **Automation**: The ability to automatically generate migration scripts based on model changes is highly desirable to speed up development and reduce human error.
* **Version Control**: Migration scripts must be plain files that can be committed to our Git repository, providing a clear history of schema evolution.
* **Reliability & Production-Readiness**: The tool must be stable, well-maintained, and proven in production environments.
* **Developer Experience**: The workflow for creating, applying, and reverting migrations should be straightforward and well-documented.

## Considered Options

* **Alembic**: A database migration tool created by the author of SQLAlchemy, specifically for use with the SQLAlchemy Core and ORM.
* **Manual Raw SQL Scripts**: Manually writing and managing SQL scripts for every schema change. This approach lacks automation and is highly prone to errors.
* **ORM-Integrated Tools (e.g., Django Migrations)**: These are tightly coupled to their respective frameworks (like Django) and are not compatible with a standalone SQLAlchemy setup in FastAPI.

## Decision Outcome

**Chosen option: Alembic**.

Alembic is the definitive choice for managing database migrations in a SQLAlchemy-based project. Its core design purpose is to serve the SQLAlchemy ecosystem, providing an unparalleled level of integration. The ability to autogenerate migration scripts from model definitions is a key feature that directly aligns with our goal of improving developer velocity and reducing errors. As it is maintained by the SQLAlchemy project, we are assured of its long-term compatibility and support.

### Positive Consequences

* **Seamless Integration**: As the official migration tool for SQLAlchemy, it provides the tightest possible integration.
* **Increased Developer Velocity**: The `autogenerate` feature significantly reduces the manual effort required to write migration scripts.
* **Reliable and Auditable Changes**: Provides a version-controlled, auditable history of all schema modifications within our Git repository.
* **Production-Proven**: Alembic is a mature and widely-used tool, trusted in countless production environments.
* **Excellent Documentation**: The tool is well-documented with a large community, making it easy to learn and troubleshoot.

### Negative Consequences

* **Autogeneration Limitations**: The `autogenerate` feature cannot detect every possible schema change (e.g., server-side defaults, some constraint type changes) and requires careful review and occasional manual adjustment of the generated scripts.
* **Merge Conflict Complexity**: Resolving migration conflicts in Git when multiple feature branches modify the schema can be challenging and requires a clear team strategy.
* **Initial Learning Curve**: Developers unfamiliar with Alembic will need to invest time to understand its concepts and commands.


### Implementation Notes

**Technical Implementation:**
- Alembic initialization: `alembic init alembic` creates migration environment
- Database URL configuration in `alembic.ini` and `env.py` for multiple environments
- Migration generation: `alembic revision --autogenerate -m "description"`
- Migration execution: `alembic upgrade head` for applying migrations
- Integration with FastAPI startup event for automatic migration checks

**Patterns Used:**
- Version-based migrations: Sequential numbering with descriptive names
- Environment-specific configurations: Separate settings for dev, staging, prod
- SQLAlchemy integration: Direct integration with existing ORM models
- Rollback strategy: `alembic downgrade` commands for safe rollbacks

**Future Considerations:**
- Implement migration validation in CI/CD pipeline
- Consider data migration strategies for large datasets
- Plan for zero-downtime deployments with backward-compatible migrations
- Evaluate custom migration templates for common patterns

### References

- [Alembic Documentation](https://alembic.sqlalchemy.org/en/latest/)
- [FastAPI with Alembic Tutorial](https://fastapi.tiangolo.com/tutorial/sql-databases/#alembic-note)
- [SQLAlchemy Migration Guide](https://docs.sqlalchemy.org/en/20/core/migration.html)
- [Database Migration Best Practices](https://www.postgresql.org/docs/current/ddl-alter.html)

## Compliance

All database schema modifications must be implemented via Alembic migrations. Direct modifications to the database schema outside of the migration process are prohibited. Migration scripts will be a required part of the code review process for any feature that alters the database structure. Deployment pipelines will be configured to automatically apply pending migrations (`alembic upgrade head`) as a standard deployment step.
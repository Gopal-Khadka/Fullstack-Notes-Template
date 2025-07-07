
## ADR-003: Use PNPM as Package Manager for Frontend

Date: 2025-07-07
Status: Accepted
Deciders: Frontend Team

### Context

Our current Node.js package management approach using `npm` is leading to several issues: slow installation times, large `node_modules` directories consuming significant disk space, and inconsistent dependency resolution across different environments. With our growing frontend application and multiple developers working on the project, we need a more efficient package management solution that provides better performance and disk space utilization.

### Decision Drivers

* **Performance**: Faster installation and update times for dependencies
* **Disk Space Efficiency**: Reduce redundant package storage across projects
* **Monorepo Support**: Better support for our potential future monorepo structure
* **Dependency Resolution**: More predictable and strict dependency resolution
* **Developer Experience**: Improved caching and offline capabilities

### Considered Options

1. **PNPM**: Fast, disk space efficient package manager with content-addressable storage
2. **Yarn**: Alternative package manager with Plug'n'Play and workspace features
3. **NPM**: Continue with default Node.js package manager
4. **Bun**: Ultra-fast JavaScript runtime and package manager

### Decision Outcome

**Chosen option:** PNPM.
We have chosen PNPM because it provides significant performance improvements and disk space savings through its innovative content-addressable storage system. Unlike other package managers that duplicate packages across projects, PNPM creates a single store and uses hard links, resulting in faster installations and reduced disk usage.

### Positive Consequences

* **Faster Installation**: Up to 2x faster package installation compared to npm, especially for repeated installations
* **Disk Space Savings**: Significant reduction in disk usage as packages are stored once and hard-linked across projects
* **Strict Dependency Resolution**: Prevents phantom dependencies and ensures more predictable builds
* **Better Monorepo Support**: Excellent workspace support for potential future monorepo migration
* **Enhanced Security**: Stricter hoisting algorithm prevents access to unlisted dependencies
* **Improved CI/CD**: Faster dependency installation in continuous integration pipelines

### Negative Consequences

* **Learning Curve**: Team needs to learn PNPM-specific commands and workflows
* **Tool Compatibility**: Some tools may not be fully compatible with PNPM's symlink structure
* **Migration Effort**: Initial setup requires converting existing package-lock.json to pnpm-lock.yaml

### Implementation Notes

**Technical Implementation:**
- Install PNPM globally: `npm install -g pnpm`
- Initialize project: `pnpm install` to generate `pnpm-lock.yaml`
- Update package.json scripts to use `pnpm` instead of `npm`
- Configure `.npmrc` with PNPM-specific settings for consistent behavior
- Update Docker files to use PNPM for containerized builds

**Patterns Used:**
- Content-addressable storage: Single global store with hard links to project node_modules
- Workspace pattern: Configured for potential monorepo structure with `pnpm-workspace.yaml`
- Lockfile-first approach: Strict adherence to `pnpm-lock.yaml` for reproducible builds
- Layered caching: Separate layers for dependencies and application code in Docker

**Future Considerations:**
- Evaluate migration to monorepo structure leveraging PNPM workspaces
- Monitor PNPM ecosystem maturity and tool compatibility improvements
- Consider PNPM's experimental features like content-addressable storage for Docker layers
- Plan for potential team training on PNPM-specific troubleshooting

### Compliance

All frontend package management must be performed using PNPM. The `package-lock.json` file will be removed and replaced with `pnpm-lock.yaml`. CI/CD pipelines will be updated to use PNPM for dependency installation.

### References

- [PNPM Documentation](https://pnpm.io/)
- [PNPM vs NPM vs Yarn Benchmark](https://pnpm.io/benchmarks)
- [PNPM Workspace Guide](https://pnpm.io/workspaces)
- [Node.js Package Manager Comparison](https://nodejs.dev/en/learn/an-introduction-to-the-npm-package-manager/)

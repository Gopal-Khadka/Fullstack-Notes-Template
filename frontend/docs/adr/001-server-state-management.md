# ADR-001: Use TanStack Query for Server State Management

**Date**: 2025-07-07
**Status**: Accepted
**Deciders**: Frontend Team

## Context

Our Next.js application needs a robust and scalable method for fetching, caching, synchronizing, and updating data from our FastAPI backend. Managing server state manually with `useEffect` and `useState` often leads to complex, error-prone code, boilerplate, and a suboptimal user experience (e.g., unnecessary loading spinners, stale data). We require a dedicated library to handle the complexities of server state, which is fundamentally different from client state (e.g., form inputs, modal visibility).

## Decision Drivers

* **Developer Experience**: The solution must be intuitive, reduce boilerplate, and simplify the management of loading, error, and success states.
* **Performance & User Experience**: It must provide excellent caching, background data refetching, and stale-while-revalidate logic to make the application feel fast and responsive.
* **Code Quality & Maintainability**: It should encourage a clean separation of data-fetching logic from UI components and be easily testable.
* **Advanced Feature Set**: Out-of-the-box support for complex patterns like pagination, infinite scroll, and optimistic updates is crucial for building a modern UI.
* **Next.js Integration**: The tool must integrate seamlessly with the Next.js App Router, including Server Components and Client Components, to handle both server-side rendering (SSR) and client-side data fetching effectively.

## Considered Options

1.  **TanStack Query (React Query)**: A powerful, hook-based library for fetching, caching, and managing server state. It is highly configurable and comes with dedicated devtools.
2.  **SWR**: A popular data-fetching library from Vercel (the creators of Next.js). It is lightweight and focuses on the "stale-while-revalidate" caching strategy.
3.  **RTK Query (Redux Toolkit Query)**: A data-fetching and caching solution built into the Redux Toolkit. It is a good option for applications already heavily invested in the Redux ecosystem.
4.  **Manual `fetch` with `useEffect` and `useState`**: The default browser API combined with React hooks. This approach requires no external libraries but places the full burden of implementation and maintenance on the development team.

## Decision Outcome

**Chosen option: TanStack Query (React Query)**.

TanStack Query provides the most comprehensive and powerful solution for our needs. Its hook-based API (`useQuery`, `useMutation`) is highly declarative and significantly simplifies data-fetching logic. While SWR is an excellent and lightweight alternative, TanStack Query's more extensive feature set—including its powerful devtools, highly configurable caching, and first-class mutation support with optimistic updates—makes it better suited for the complex, interactive application we are building.

RTK Query would introduce the overhead of the entire Redux ecosystem, which is unnecessary as our primary need is server state management, not complex global client state. The manual `fetch` approach is not scalable and would inevitably lead to reinventing a less reliable version of TanStack Query.

### Positive Consequences

* **Drastically Reduced Boilerplate**: Eliminates the need for manual state management (`isLoading`, `error`, `data`) in components.
* **Superior User Experience**: Automatic caching and background refetching ensure the UI is fast and the data is fresh, minimizing perceived loading times.
* **Excellent Devtools**: Provides invaluable tools for debugging, allowing developers to visualize query states, cache contents, and query timings.
* **Simplified Complex UI Patterns**: Built-in hooks for pagination (`useInfiniteQuery`) and mutations (`useMutation`) make implementing advanced features straightforward.
* **Strong Separation of Concerns**: Encourages abstracting data-fetching logic into custom hooks, leading to cleaner and more maintainable component code.

### Negative Consequences

* **Learning Curve**: Developers new to the library will need to understand its core concepts, such as query keys, stale time vs. cache time, and the query lifecycle.
* **Bundle Size**: Adds a dependency to the client-side bundle. However, its benefits in terms of performance and developer experience far outweigh this cost.
* **Configuration Overhead**: Requires an initial setup to create and provide a `QueryClient` to the application, which can be slightly more involved than simpler libraries.

### Implementation Notes

**Technical Implementation:**
- Query client setup: `QueryClient` configured with default options for caching and retries
- Integration with generated API client: `useQuery` hooks wrapped around `openapi-ts` generated functions
- Custom hooks pattern: `useNotes()`, `useCreateNote()` for encapsulating query logic
- Optimistic updates: `useMutation` with `onMutate` for immediate UI feedback
- Cache invalidation: Strategic use of `queryClient.invalidateQueries()` after mutations

**Patterns Used:**
- Custom hooks abstraction: Encapsulate server state logic in reusable hooks
- Optimistic updates: Immediate UI feedback with rollback on failure
- Background refetching: Automatic data synchronization when user returns to tab
- Error boundaries: Centralized error handling for failed queries
- Implemented infinite queries for paginated data

**Future Considerations:**

- Consider query deduplication for high-frequency requests
- Plan for offline-first capabilities with persistence (with DexieJS and IndexDB)
- Evaluate React Server Components integration as Next.js evolves

### References

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Next.js Data Fetching Guide](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [React Query Best Practices](https://tkdodo.eu/blog/practical-react-query)
- [Server State vs Client State](https://kentcdodds.com/blog/application-state-management-with-react)

## Compliance

All asynchronous communication with the backend API (GET, POST, PUT, DELETE, etc.) must be handled through TanStack Query's hooks. A central `QueryClient` provider will be configured in the root layout of the application. To ensure consistency and reusability, developers will create custom hooks that encapsulate specific API interactions (e.g., `useNotes`, `useCreateNote`).
# ADR-005: Use Tiptap for Rich Text and Markdown Editing

**Date**: 2025-07-08
**Status**: Accepted
**Deciders**: Frontend Team

## Context and Problem Statement

Our Next.js application requires a rich text editor, primarily for a chat input component. A key requirement is the ability to handle contextual features, such as `@mentions` and `#hashtags`, similar to modern chat applications. As our development team is small, the chosen solution must have excellent documentation, a straightforward integration process, and a good balance between out-of-the-box functionality and customization. The editor needs to integrate seamlessly with our existing tech stack, including Next.js (App Router), TypeScript, and Shadcn/ui with Tailwind CSS.

## Decision Drivers

*   **Feature Completeness:** Native or simple extension support for mentions and hashtags.
*   **Developer Experience:** Ease of integration, quality of documentation, and a gentle learning curve are critical.
*   **Stack Compatibility:** Seamless integration with Next.js, TypeScript, and Tailwind CSS.
*   **Customization:** The ability to create a "headless" editor that can be styled to match our Shadcn/ui design system.
*   **Maintainability:** Backed by an active community and a stable release cycle.
*   **Development Velocity:** A solution that minimizes implementation time and effort for a small team.

## Considered Options

1.  **Tiptap:** A headless editor framework built on top of ProseMirror, known for its ease of use and excellent documentation.
2.  **Lexical:** A modern editor framework from Meta (Facebook), designed for reliability and performance with built-in support for features like mentions.
3.  **ProseMirror:** A highly modular and flexible low-level toolkit for building rich text editors.

## Decision Outcome

**Chosen option:** **Tiptap**, because it provides the ideal balance of ease of implementation, powerful features, and excellent documentation for our specific use case and team size. Its dedicated Next.js integration guides and headless nature allow for rapid development and full styling control, making it the most pragmatic and efficient choice.

### Positive Consequences

*   **Reduced Development Time:** Excellent documentation and an intuitive API will significantly speed up implementation compared to other options.
*   **Seamless Integration:** Dedicated guides and community support for Next.js and Tailwind CSS reduce integration friction.
*   **High-Quality UI:** As a headless editor, Tiptap gives us full control over the look and feel, ensuring consistency with our Shadcn/ui component library.
*   **Strong Community Support:** A large and active community provides a wealth of extensions, examples, and support.

### Negative Consequences

*   **Underlying Complexity:** Tiptap is built on ProseMirror, and its underlying complexity may surface in highly advanced or custom scenarios.
*   **Bundle Size:** May have a slightly larger bundle size than a bespoke ProseMirror implementation due to its included abstractions.
*   **Commercial Extensions:** Some highly advanced features are offered as paid extensions, which could be a consideration for future requirements.

## Pros and Cons of the Options

### Tiptap

*   **Pros:** Easy learning curve, excellent documentation, superior Next.js integration, active community, highly extensible.
*   **Cons:** Inherits ProseMirror's complexity underneath, some features are commercial, potentially larger bundle size.

### Lexical

*   **Pros:** Backed by Meta, strong performance and accessibility, native support for mentions/hashtags.
*   **Cons:** Documentation has gaps and is heavily React-focused, smaller community, newer framework with a moderate learning curve.

### ProseMirror

*   **Pros:** Maximum flexibility and performance, mature and stable core, large ecosystem of plugins.
*   **Cons:** Very steep learning curve, requires significant manual integration work for React/Next.js, high development overhead not suitable for a small team.

## Links

*   [Tiptap Documentation](https://tiptap.dev/docs/editor/introduction)
*   [Lexical Website](https://lexical.dev/)
*   [ProseMirror Website](https://prosemirror.net/)

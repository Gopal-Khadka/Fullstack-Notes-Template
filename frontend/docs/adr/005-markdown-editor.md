## ADR-005: Use Lexical Editor for Markdown Editor

Date: 2025-07-07  
Status: Accepted  
Deciders: Frontend Team

### Context

Our application requires a rich text editing experience that supports Markdown syntax while providing a modern, user-friendly interface. Current solutions like traditional textarea-based Markdown editors lack the interactive features users expect, while existing rich text editors often produce HTML that doesn't align with our Markdown-centric content strategy. We need an editor that bridges the gap between Markdown's simplicity and rich text editing capabilities.

### Decision Drivers

* **Modern UX**: Provide an intuitive, rich text editing experience
* **Markdown Support**: Native Markdown input and output capabilities
* **Extensibility**: Ability to add custom plugins and formatting options
* **Performance**: Smooth editing experience even with large documents
* **Framework Integration**: Seamless integration with React and TypeScript
* **Accessibility**: Built-in accessibility features and keyboard navigation

### Considered Options

1. **Lexical Editor**: Facebook's extensible text editor framework with Markdown support
2. **TipTap**: Headless editor built on ProseMirror with Vue and React support
3. **Draft.js**: Rich text editor framework built by Facebook (deprecated)
4. **Monaco Editor**: VS Code's editor with Markdown syntax highlighting
5. **React-MD-Editor**: Simple React Markdown editor with preview
6. **Quill.js**: Modular rich text editor with custom formats

### Decision Outcome

**Chosen option:** Lexical Editor.
We have chosen Lexical Editor because it provides a modern, extensible architecture specifically designed for rich text editing with excellent Markdown support. Built by Facebook's engineering team, it offers superior performance through its immutable editor state and provides the flexibility to create custom editing experiences while maintaining accessibility and framework integration.

### Positive Consequences

* **Superior Performance**: Immutable state management ensures consistent performance with large documents
* **Markdown Native**: Built-in Markdown serialization and deserialization capabilities
* **Extensible Architecture**: Plugin system allows for custom formatting, shortcuts, and behaviors
* **TypeScript First**: Excellent type safety and developer experience
* **Accessibility Built-in**: Comprehensive accessibility features and keyboard navigation
* **Framework Agnostic**: Works well with React while supporting other frameworks
* **Active Development**: Backed by Facebook with regular updates and improvements

### Negative Consequences

* **Learning Curve**: Complex architecture requires understanding of Lexical's concepts and patterns
* **Documentation**: Relatively new with evolving documentation and examples
* **Bundle Size**: Larger bundle size compared to simpler editor solutions

### Implementation Notes

**Technical Implementation:**
- Install Lexical packages: `pnpm add lexical @lexical/react @lexical/markdown`
- Configure editor with Markdown transformers and custom plugins
- Implement custom toolbar with formatting buttons and shortcuts
- Set up auto-save functionality with debounced updates
- Configure theme and styling through Lexical's theme system

**Patterns Used:**
- Command pattern: Editor commands for formatting and content manipulation
- Plugin architecture: Modular functionality through Lexical plugins
- Immutable state: Editor state management through immutable updates
- Observer pattern: State change notifications for real-time updates
- Transformer pattern: Content serialization between Markdown and editor state

**Future Considerations:**
- Implement collaborative editing features using Lexical's collaboration plugins
- Add custom plugins for application-specific formatting (e.g., mentions, embeds)
- Evaluate Lexical's experimental features as they become stable
- Consider implementing custom node types for rich content blocks

### Compliance

All rich text editing functionality must be implemented using Lexical Editor. Custom formatting and plugins should follow Lexical's architecture patterns and maintain compatibility with Markdown output.

### References

- [Lexical Documentation](https://lexical.dev/)
- [Lexical Playground](https://playground.lexical.dev/)
- [Lexical GitHub Repository](https://github.com/facebook/lexical)
- [Markdown Specification](https://commonmark.org/)
- [Rich Text Editing Best Practices](https://www.smashingmagazine.com/2022/03/designing-better-rich-text-editors/)
## ADR-004: Use Shadcn/ui + Tailwind CSS for UI Components

Date: 2025-07-07
Status: Accepted
Deciders: Frontend Team, Design Team

### Context

Our current UI development approach involves writing custom CSS components and managing design systems manually. This leads to inconsistent styling, duplicate code, and slower development cycles. We need a comprehensive UI component system that provides consistency, accessibility, and rapid development capabilities while maintaining design flexibility and customization options.

### Decision Drivers

* **Development Speed**: Rapid prototyping and development with pre-built components
* **Design Consistency**: Unified design system across the entire application
* **Accessibility**: Built-in accessibility features and ARIA compliance
* **Customization**: Easy theming and component customization capabilities
* **Type Safety**: Full TypeScript support for component props and styling
* **Bundle Size**: Optimized components with tree-shaking and minimal overhead

### Considered Options

1. **Shadcn/ui + Tailwind CSS**: Copy-paste component library with Tailwind CSS utility classes
2. **Chakra UI**: Simple, modular, and accessible component library
3. **Material-UI (MUI)**: Comprehensive React component library implementing Material Design
4. **Ant Design**: Enterprise-class UI design language and components
5. **Custom CSS Modules**: Build custom component library from scratch

### Decision Outcome

**Chosen option:** Shadcn/ui + Tailwind CSS.
We have chosen Shadcn/ui because it provides a perfect balance of pre-built components and customization flexibility. Unlike traditional component libraries, Shadcn/ui allows us to copy components directly into our codebase, giving us full control over styling and behavior while maintaining consistency through Tailwind CSS utility classes.

### Positive Consequences

* **Full Ownership**: Components are copied into our codebase, providing complete control over modifications
* **Consistent Design**: Unified design system with coherent spacing, typography, and color schemes
* **Accessibility First**: All components built with accessibility best practices and ARIA compliance
* **TypeScript Integration**: Full type safety with excellent IntelliSense support
* **Flexible Theming**: Easy customization through CSS variables and Tailwind configuration
* **Performance**: Optimized bundle size with tree-shaking and utility-first CSS
* **Developer Experience**: Excellent documentation and CLI for component installation

### Negative Consequences

* **Initial Setup**: Requires configuration of Tailwind CSS and Shadcn/ui CLI
* **Learning Curve**: Team needs to learn Tailwind utility classes and Shadcn/ui patterns
* **Maintenance**: Component updates require manual synchronization with upstream changes

### Implementation Notes

**Technical Implementation:**
- Install Shadcn/ui CLI: `pnpm dlx shadcn-ui@latest init`
- Configure Tailwind CSS with custom theme and design tokens
- Set up component aliases in `tsconfig.json` for clean imports
- Install components as needed: `pnpm dlx shadcn-ui@latest add button card dialog`
- Configure dark mode support with CSS variables and Tailwind classes

**Patterns Used:**
- Composition pattern: Building complex UI through component composition
- Utility-first CSS: Tailwind classes for consistent styling without custom CSS
- Design token system: Centralized color, spacing, and typography definitions
- Compound component pattern: Complex components built from smaller, focused components
- Polymorphic components: Components that can render as different HTML elements

**Future Considerations:**
- Implement custom design tokens for brand-specific styling
- Evaluate Shadcn/ui updates and plan for component synchronization
- Consider building custom components following Shadcn/ui patterns
- Plan for potential migration to Tailwind CSS v4 when available

### Compliance

All UI components must be built using Shadcn/ui components or follow Shadcn/ui patterns. Custom components should use Tailwind CSS utility classes and maintain consistency with the established design system.

### References

- [Shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
- [WAI-ARIA Design Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)

#### Additional Resources
- [Awesome ShadCN](https://github.com/birobirobiro/awesome-shadcn-ui)
- [Magic UI](https://magicui.design/docs/installation)
- [Aceternity UI](https://ui.aceternity.com/docs/cli)
- [ShadCN Extensions](https://shadcn-extension.vercel.app/docs/introduction)
- [Motion Primitives](https://motion-primitives.com/docs/installation)
- [Rigid UI](https://www.rigidui.com/docs/getting-started)
- [Easy UI](https://www.easyui.pro/component)
- [Extend UI](https://www.extend-ui.com/docs/components/stepper)
- [Auto Forms Generation By Zod Schema](https://autoform.vantezzen.io/)
- [Berlix UI](https://ui.rechesoares.com/docs)
- [Cult UI](https://www.cult-ui.com/docs)

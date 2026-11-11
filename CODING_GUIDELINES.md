# Coding Guidelines

The canonical standard for every change, by a person or an agent. `AGENTS.md`
holds the workflow and the quality gate; this file holds how the code is
written. Existing deviations are not precedent.

## Principles

- Prefer the least code that fully solves the task: platform features first,
  then an installed dependency, then new code. No speculative options.
- Comments explain why, never what.
- Every visible string goes through i18n, in English and Italian together.
- Accessible by default: semantic elements, labels on icon-only controls,
  visible focus, `rel="noopener noreferrer"` on external links, and motion
  that respects `prefers-reduced-motion`.

## Components

- Function components in `PascalCase.tsx`, with their styles in a sibling
  `PascalCase.scss`. One component per file.
- Atoms hold no resume data; organisms own a workspace panel; templates render
  a complete resume from the shared data model.
- Props are typed with an `interface` next to the component. JSX props are
  sorted (ESLint enforces it).
- Keep state in `src/context/`; components receive data and callbacks.

## TypeScript

- Strict mode. No `any` and no casts on external data: validate imported JSON
  before it enters the resume state.
- Import through the `@/` alias, never long relative paths.

## Styles

- SCSS with BEM class names. Spacing, font sizes, and colors come from the
  shared tokens in `src/styles/`; never hard-code them.

## Tooling

ESLint, Prettier, TypeScript, and Knip enforce most of this. `pnpm selfcheck`
runs the assert-based date checks.

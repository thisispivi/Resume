# Resume Builder

A browser-based resume builder that lets you customise templates, colours, fonts, and export to PDF. Supports multiple languages and dark mode.

**Live:** [resume.pivi.dev](https://resume.pivi.dev)

## Features

- **9 templates** — Modern, Classic, Minimal, Split, Executive, Creative, Compact, Elegant, Timeline
- **12 colour palettes** — Quickly switch the accent colours of your resume
- **Google Fonts** — Pick from a curated set of fonts loaded at runtime
- **Dark mode** — Toggle dark theme for the app and optionally for the PDF
- **i18n** — App UI available in English and Italian; resume content uses a separate locale picker
- **JSON import/export** — Upload a `data.json` to populate the editor or download your current data
- **PDF export** — Single-page PDF generated client-side with jsPDF + html2canvas
- **Responsive** — Mobile-friendly layout with a collapsible sidebar

## Tech Stack

| Layer     | Technology                   |
| --------- | ---------------------------- |
| Framework | React 19 + TypeScript        |
| Bundler   | Vite (rolldown-vite)         |
| Styles    | SCSS + CSS custom properties |
| i18n      | i18next / react-i18next      |
| PDF       | jsPDF + html2canvas          |
| Linting   | ESLint + Prettier            |
| Hooks     | Husky + lint-staged          |

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** (recommended)

### Install & Run

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Lint
pnpm lint

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
  assets/          # Static assets (icons, template JSON)
  components/
    atoms/         # Button, Toggle, Modal, TextInput, ...
    molecules/     # Avatar, ColorPalettePicker, FontPicker, ...
    organisms/     # Navbar, Sidebar, ResumePreview, ResumeEditorModal
    templates/     # TemplateModern, TemplateClassic, ... (PDF layouts)
  context/         # ThemeContext (dark mode)
  data/            # palettes, fonts, templates config
  i18n/            # i18next setup + en-US / it-IT locale files
  pages/           # ResumeBuilderPage
  styles/          # Global SCSS (variables, mixins, reset, animations)
  utils/           # PDF generation, resume helpers, validation
  types.ts         # Shared TypeScript interfaces
```

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `pnpm dev`      | Start development server with HMR    |
| `pnpm build`    | Type-check and build for production  |
| `pnpm lint`     | Run ESLint with zero-warning policy  |
| `pnpm lint:fix` | Auto-fix lint issues                 |
| `pnpm format`   | Format with Prettier                 |
| `pnpm preview`  | Preview the production build locally |
| `pnpm deploygh` | Deploy to GitHub Pages               |

## License

MIT

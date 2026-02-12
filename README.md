<div align="center">

# Resume Builder

A modern, customizable resume builder web app that lets you create professional resumes with multiple templates, color palettes, fonts, and multilingual support. Edit your data via forms or JSON, then export to PDF.

![React](https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-%23F69220.svg?style=for-the-badge&logo=pnpm&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

</div>

## Features

- **7 Professional Templates** — Modern, Classic, Minimal, Split, Executive, Creative, Compact
- **Live Preview** — See changes in real-time as you edit
- **Form Editor** — Edit resume data directly through modal forms
- **JSON Import/Export** — Upload or download resume data as JSON
- **5 Color Palettes** — Predefined themes plus custom color picker
- **30 Google Fonts** — Choose from a curated selection of fonts
- **Dark Mode** — Separate dark mode for the app and the PDF
- **Multilingual** — UI in English and Italian, with per-locale resume data
- **PDF Export** — Download your resume as a single-page PDF
- **Accessible** — Keyboard navigation, ARIA attributes, focus management

## Project Structure

```text
.
├── .husky/              # Git hooks (pre-commit)
├── resume/              # Main application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── atoms/       # Button, Dropdown, Modal, Toggle, etc.
│   │   │   ├── molecules/   # FontPicker, ResumeEditorModal, etc.
│   │   │   ├── organisms/   # Navbar, Sidebar, ResumePreview
│   │   │   └── templates/   # 7 resume templates
│   │   ├── context/         # Theme context (dark mode)
│   │   ├── data/            # Palettes, fonts, templates config
│   │   ├── i18n/            # i18next localization (en-US, it-IT)
│   │   ├── pages/           # ResumeBuilderPage
│   │   ├── styles/          # SCSS base (tokens, mixins, variables)
│   │   ├── utils/           # PDF generation, validation, helpers
│   │   ├── data.json        # Sample resume data
│   │   └── types.ts         # TypeScript types
│   ├── eslint.config.js
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
└── README.md
```

## How to Use

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/Resume.git
   ```

2. Navigate to the `resume` folder:

   ```bash
   cd Resume/resume
   ```

3. Install the dependencies:

   ```bash
   pnpm install
   ```

4. Run the app:

   ```bash
   pnpm dev
   ```

## How to Build

1. Navigate to the `resume` folder:

   ```bash
   cd resume
   ```

2. Run the build command:

   ```bash
   pnpm build
   ```

3. Preview the production build:

   ```bash
   pnpm preview
   ```

## Available Scripts

| Script         | Description                        |
| -------------- | ---------------------------------- |
| `pnpm dev`     | Start development server           |
| `pnpm build`   | Type-check and build for production|
| `pnpm preview` | Preview production build           |
| `pnpm lint`    | Run ESLint                         |
| `pnpm lint:fix`| Run ESLint with auto-fix           |
| `pnpm format`  | Format code with Prettier          |

<div align="center">
   <div style="display: flex;padding-block:40px;margin-bottom:20px;background-color:#1f1f1f">
      <picture>
         <source media="(prefers-color-scheme: dark)" srcset="./logos/logo_dark.png">
         <source media="(prefers-color-scheme: light)" srcset="./logos/logo_light.png">
         <img alt="logo" src="./logos/logo_dark.png" height="75">
      </picture>
   </div>
</div>

# [Resume Builder](https://resume.pivi.dev/)

A resume builder where you edit inline next to a live A4 preview, built with React, TypeScript, Vite, and SCSS. It has 15 templates, 55 palettes, 22 fonts, a data model that follows the Europass sections, and a multi-page PDF export. Everything runs in the browser, and the resume is stored in the browser's `localStorage`.

![React](https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![pnpm](https://img.shields.io/badge/pnpm-%23F69220.svg?style=for-the-badge&logo=pnpm&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) ![i18next](https://img.shields.io/badge/i18next-26A69A.svg?style=for-the-badge&logo=i18next&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black) ![GitHub Pages](https://img.shields.io/badge/github_pages-222222.svg?style=for-the-badge&logo=github&logoColor=white)

The app runs at <https://resume.pivi.dev/>.

## Tech Stack

- **App**: React 19 and TypeScript, built with Vite.
- **Styling**: SCSS with shared tokens and mixins.
- **Internationalization**: i18next and react-i18next, with English and Italian interfaces.
- **PDF export**: jsPDF and html2canvas.
- **Photos**: react-avatar-editor for cropping and positioning.
- **Quality**: ESLint, Prettier, Knip, TypeScript, and an assert-based date self-check, with husky and lint-staged for the pre-commit hook.
- **Hosting**: GitHub Pages.

## Features

### Workspace

The left side has three tabs, and the right side shows the page you will export.

| Tab         | What it holds                                                                      |
| ----------- | ---------------------------------------------------------------------------------- |
| **Content** | Every resume section as a collapsible form. Edits land in the preview as you type. |
| **Design**  | Template gallery, palette grid, custom colors, font, and the dark-resume switch.   |
| **Export**  | Language variants, JSON import/export, the annotated starter file, and a reset.    |

Phones and tablets have no room for two panes, so a bottom bar switches between Content, Design, Export, and Preview, and each one fills the viewport. The preview scales to fit and has its own zoom control.

There is no save button. The app writes every change to `localStorage` shortly after you stop typing, and you can export the whole document as JSON at any time.

### Editing

- Inline editing with no modal and no save step. The preview is the source of truth.
- Sections for experience, education, skills, languages, projects, certifications, awards, publications, training, volunteering, interests, references, and your own custom sections.
- A month picker per entry, formatted per locale, with an "I am still here" switch.
- A bullet list of achievements per role, project, or qualification, next to the prose description.
- Photo upload with in-app cropping and positioning. The photo is stored inline, so CORS never breaks the PDF export.

### Design

- 15 templates: Modern, Classic, Minimal, Split, Executive, Creative, Compact, Elegant, Timeline, Portfolio, Editorial, Bold, Banner, Geometric, Neo.
- 55 palettes in classic and bold groups, or six custom color values of your own.
- 22 Google Fonts, loaded on demand.
- Dark mode for the app and, separately, for the resume itself.

### Export and languages

- Multi-page PDF. Content taller than one page flows onto more pages instead of being cropped, and the preview marks the page breaks.
- Contact and project URLs stay clickable in the PDF.
- The interface is in English and Italian, and each language keeps its own version of the resume.

### Accessibility

- Native disclosure widgets, keyboard navigation, ARIA attributes, and focus management.

## Getting Started

You need [Node.js](https://nodejs.org/) 24 (the version CI uses) and [pnpm](https://pnpm.io/) 11.8.0, the version pinned in `resume/package.json`. Every `pnpm` command runs from `resume/`.

```bash
git clone https://github.com/thisispivi/Resume.git
cd Resume/resume
pnpm install
pnpm dev
```

To build and preview the production version:

```bash
pnpm build
pnpm preview
```

`mine.json` at the repository root holds the owner's personal resume data. It is gitignored and never committed.

## Development checks

Run the full quality gate from `resume/` before pushing:

```bash
pnpm lint && pnpm format:check && pnpm knip && pnpm selfcheck && pnpm build && pnpm audit
```

| Script              | Description                                |
| ------------------- | ------------------------------------------ |
| `pnpm dev`          | Start development server                   |
| `pnpm build`        | Type-check and build for production        |
| `pnpm preview`      | Preview production build                   |
| `pnpm lint`         | Run ESLint                                 |
| `pnpm lint:fix`     | Run ESLint with auto-fix                   |
| `pnpm format`       | Format code with Prettier                  |
| `pnpm format:check` | Verify formatting without writing          |
| `pnpm selfcheck`    | Run the date parsing/formatting assertions |

### Continuous integration

`.github/workflows/ci.yml` runs on every push to `main`, on every pull request, and on demand. It runs the dependency audit, the peer dependency check, the format check, lint, Knip, the date self-check, and finally the type-check and build.

`.github/dependabot.yml` opens grouped dependency PRs every week, and every month for the actions themselves, and CI has to pass on each one. Two majors are held back on purpose:

- ESLint 10: `eslint-plugin-react@7.37.5` crashes on it (`contextOrFilename.getFilename is not a function`).
- TypeScript 7: `typescript-eslint` [does not support the TS 7 compiler yet](https://github.com/typescript-eslint/typescript-eslint/issues/10940). `tsc` passes, but `pnpm lint` refuses to run.

### Accepted advisory

`pnpm audit` reports one high-severity finding it cannot fix, so `pnpm-workspace.yaml` ignores it under `auditConfig.ignoreGhsas`, with the reasoning inline.

[GHSA-mh99-v99m-4gvg](https://github.com/advisories/GHSA-mh99-v99m-4gvg) is a DoS in `brace-expansion`. The vulnerable 1.x copy arrives only through `minimatch@3`, which both `eslint@9` and `eslint-plugin-react@7.37.5` hard-depend on. No patched 1.x exists (`1.1.16` is the head of `maintenance-v1`), and `brace-expansion@5` changed its CommonJS export from a function to an object, so forcing it with an override makes `minimatch@3` throw. The package is dev-only: `pnpm audit --prod` is clean and the package never reaches `dist/`. The ignore can go once `eslint-plugin-react` supports ESLint 10, which pulls in `minimatch@10` and the patched `brace-expansion@5` with it.

## Deployment

Deployment is automatic. When a new version reaches `main` and CI passes, the Release workflow builds `resume/` and deploys it to GitHub Pages at <https://resume.pivi.dev/>. There is no manual deploy command.

## Resume data format

The document is a JSON object keyed by locale. Only `name`, `jobTitle`, and `contact` are required. Every other field and section is optional, and import ignores unknown keys.

```json
{
  "en-US": {
    "name": "Jane Doe",
    "jobTitle": "Full-Stack Developer",
    "contact": [{ "type": "email", "value": "jane.doe@example.com" }],
    "experience": [
      {
        "position": "Senior Developer",
        "company": "Acme Corp.",
        "location": "Berlin, Germany",
        "employmentType": "Full-time",
        "startDate": "2022-01",
        "isCurrent": true,
        "description": "One or two sentences framing the role.",
        "highlights": ["A quantified achievement."],
        "technologies": ["React", "TypeScript"]
      }
    ]
  }
}
```

Dates are stored as `YYYY-MM` or `YYYY` and reformatted for the resume's locale. Anything else renders verbatim, so imported free text like `"Summer 2019"` survives. Set `isCurrent` instead of an `endDate` for ongoing entries.

**Export → Starter JSON** downloads an annotated file with every supported field filled in. Files from earlier versions still load: the legacy `duration` string is split into `startDate`/`endDate`, and the old fixed contact object is converted to the `ContactLink[]` form.

## Versioning and releases

Releases are automatic and follow [Semantic Versioning](https://semver.org/).
Every pull request that changes code bumps the version in `resume/package.json`, as
[AGENTS.md](./AGENTS.md#versioning-and-releases) describes. When CI passes on
`main`, the Release workflow tags the new version, publishes the
[GitHub release](https://github.com/thisispivi/Resume/releases), and deploys the app to GitHub Pages.
Dependabot alerts and security updates are on, and the `fix-vulnerabilities` skill
triages them.

## Documentation

| Document                                    | Covers                                                   |
| ------------------------------------------- | -------------------------------------------------------- |
| [AGENTS.md](./AGENTS.md)                    | Workflow, quality gate, versioning, and commit rules     |
| [Coding guidelines](./CODING_GUIDELINES.md) | The coding standard for components, TypeScript, and SCSS |
| [App README](./resume/README.md)            | Short setup notes for the React app in `resume/`         |

## Project Structure

```text
.
├── .husky/              # Git hooks (pre-commit)
├── logos/               # Logo assets
├── mine.json            # The owner's personal resume data (gitignored)
├── resume/              # Main application
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── icons/
│   │   │   └── template/data.json    # Bundled example resume
│   │   ├── components/
│   │   │   ├── atoms/       # Button, CollapsibleSection, MonthInput, StringListInput, …
│   │   │   ├── molecules/   # EntryList, EntryFields, TemplateGallery, ResumeExtraSections, …
│   │   │   ├── organisms/   # Navbar, Workspace, ContentPanel, DesignPanel, ExportPanel, PreviewStage
│   │   │   └── templates/   # 15 resume templates
│   │   ├── context/         # Theme context (dark mode)
│   │   ├── data/            # Palettes, fonts, templates, contact types, section registry
│   │   ├── i18n/            # i18next localization (en-US, it-IT)
│   │   ├── pages/           # ResumeBuilderPage
│   │   ├── styles/          # SCSS base (tokens, mixins, variables)
│   │   ├── utils/           # Dates, PDF generation, validation, helpers
│   │   └── types.ts         # Shared TypeScript types
│   ├── eslint.config.js
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
└── README.md
```

### Adding a resume section

Repeatable sections are declared once in `src/data/resumeSections.ts`, each with an id, a title key, a blank entry, and a list of typed fields. That one entry gives you the editor form, the add, remove, and reorder controls, and the collapsed header. `ResumeExtraSections` renders the section, and every template appends it, so a new section needs no change in any of the 15 template components.

## License

[MIT](./LICENSE)

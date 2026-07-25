<div align="center">
   <div style="display: flex;padding-block:40px;margin-bottom:20px;background-color:#1f1f1f">
      <picture>
         <source media="(prefers-color-scheme: dark)" srcset="./logos/logo_dark.png">
         <source media="(prefers-color-scheme: light)" srcset="./logos/logo_light.png">
         <img alt="logo" src="./logos/logo_dark.png" height="75">
      </picture>
   </div>
</div>

# Resume Builder

A resume builder that edits inline against a live A4 preview. Fifteen templates, fifty-five palettes, thirty fonts, a Europass-grade data model, and a multi-page PDF export — all client-side, with your data kept in your own browser.

![React](https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-%23F69220.svg?style=for-the-badge&logo=pnpm&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

</div>

## The workflow

Three tabs on the left, the page you are actually exporting on the right.

| Tab         | What it holds                                                                      |
| ----------- | ---------------------------------------------------------------------------------- |
| **Content** | Every resume section as a collapsible form. Edits land in the preview as you type. |
| **Design**  | Template gallery, palette grid, custom colors, font, and the dark-resume switch.   |
| **Export**  | Language variants, JSON import/export, the annotated starter file, and a reset.    |

On phones and tablets the two panes cannot sit side by side, so a bottom bar switches between **Content**, **Design**, **Export**, and **Preview**, each taking the full viewport. The preview scales to fit and has its own zoom control.

There is no save button. Every change is written to `localStorage` shortly after you stop typing, and the whole document can be exported as JSON at any time.

## Features

- **15 templates** — Modern, Classic, Minimal, Split, Executive, Creative, Compact, Elegant, Timeline, Portfolio, Editorial, Bold, Banner, Geometric, Neo
- **Live inline editing** — no modal, no save step; the preview is the source of truth
- **Rich data model** — experience, education, skills, languages, projects, certifications, awards, publications, training, volunteering, interests, references, and your own custom sections
- **Structured dates** — a month picker per entry, formatted per locale, with an "I am still here" switch
- **Achievement bullets** — a bullet list per role, project, or qualification, alongside the prose description
- **Multi-page PDF** — content taller than one page flows onto further pages instead of being cropped; page breaks are marked in the preview
- **Clickable links in the PDF** — contact and project URLs stay live in the export
- **55 palettes + custom colors** — grouped into classic and bold, or dial in your own six values
- **30 Google Fonts** — loaded on demand
- **Dark mode** — for the app and, separately, for the resume itself
- **Multilingual** — UI in English and Italian, with an independent resume version per language
- **Photo upload** — crop and position in-app; stored inline so the PDF export never breaks on CORS
- **Accessible** — native disclosure widgets, keyboard navigation, ARIA attributes, focus management

## Resume data format

The document is a JSON object keyed by locale. Only `name`, `jobTitle`, and `contact` are required — every other field and section is optional, and unknown keys are ignored on import.

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

Dates are stored as `YYYY-MM` or `YYYY` and reformatted for the resume's locale; anything else is rendered verbatim, so imported free text like `"Summer 2019"` survives. Set `isCurrent` instead of an `endDate` for ongoing entries.

**Export → Starter JSON** downloads an annotated file with every supported field filled in. Files written by earlier versions still load: the legacy `duration` string is split into `startDate`/`endDate`, and the old fixed contact object is converted to the `ContactLink[]` form.

## Project structure

```text
.
├── .husky/              # Git hooks (pre-commit)
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

Repeatable sections are declared once in `src/data/resumeSections.ts` — an id, a title key, a blank entry, and a list of typed fields. That single entry gives you the editor form, the add/remove/reorder controls, and the collapsed header. Rendering comes from `ResumeExtraSections`, which every template appends, so a new section needs no changes in any of the fifteen template components.

## How to use

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

## How to build

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

## Continuous integration

`.github/workflows/ci.yml` runs on every push to `main`, every pull request, and on demand. It checks formatting, lints, runs the date self-check, then type-checks and builds — the same four commands you can run locally.

On `main`, a second job publishes `resume/dist` to GitHub Pages via the official `upload-pages-artifact` / `deploy-pages` actions, so a broken build never ships. The custom domain comes from `resume/public/CNAME`.

> **One-time setup:** in **Settings → Pages**, set the build source to **GitHub Actions**. Until you do, the deploy job fails and the site keeps serving whatever the `gh-pages` branch last held. The manual `pnpm deploygh` path still works if you prefer it.

`.github/dependabot.yml` opens grouped weekly dependency PRs (and monthly ones for the actions themselves), which CI then gates. Two majors are pinned back on purpose:

- **ESLint 10** — `eslint-plugin-react@7.37.5` crashes on it (`contextOrFilename.getFilename is not a function`).
- **TypeScript 7** — `typescript-eslint` [does not support the TS 7 compiler yet](https://github.com/typescript-eslint/typescript-eslint/issues/10940); `tsc` passes but `pnpm lint` refuses to run.

## Available scripts

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
| `pnpm deploygh`     | Build and publish to the `gh-pages` branch |

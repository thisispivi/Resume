<div align="center">
   <div style="display: flex;padding-block:40px;margin-bottom:20px;background-color:#1f1f1f">
      <picture>
         <source media="(prefers-color-scheme: dark)" srcset="../logos/logo_dark.png">
         <source media="(prefers-color-scheme: light)" srcset="../logos/logo_light.png">
         <img alt="logo" src="../logos/logo_dark.png" height="75">
      </picture>
   </div>
</div>

# [Resume Builder](https://resume.pivi.dev/)

Resume Builder is a web app for writing and styling a resume. It has 15 templates, 55 colour palettes, and 22 Google Fonts, plus dark mode and internationalization. You can import and export the resume data as JSON and generate a PDF from the app. It runs at <https://resume.pivi.dev/>.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Getting Started

```bash
git clone https://github.com/thisispivi/Resume.git
cd resume
pnpm i
pnpm dev
```

## Deployment

The Release workflow builds this folder and deploys it to GitHub Pages when a new version reaches `main`. See the [root README](../README.md#deployment).

## Project Structure

```text
.
├── logos     Assets used in the app
└── resume    The React app for Resume Builder
```

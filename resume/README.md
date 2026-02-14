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

Resume Builder is a web app that allows users to create and customize their resumes with ease. It offers a variety of templates (9 to be precise), colour palettes, and fonts (25 google fonts) to choose from, enabling users to create a professional-looking resume that stands out. The app also supports dark mode and internationalization, making it accessible to a wider audience. Users can import and export their resume data in JSON format, and generate a PDF version of their resume directly from the app. The project is available at this [link](https://resume.pivi.dev/)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Project structure

```text
.
├── logos
└── resume
```

- `logos`: Contains all the assets used in the app.
- `resume`: houses the React app for the Resume Builder project.

## How to use it

1. Clone the repository

   ```bash
   git clone https://github.com/thisispivi/ResumeBuilder.git
   ```

2. Navigate to the `resume` folder

   ```bash
   cd resume
   ```

3. Install the dependencies with:

   ```bash
   pnpm i
   ```

4. Run the app with

   ```bash
   pnpm dev
   ```

## How to deploy

1. Navigate to the `resume` folder

   ```bash
   cd resume
   ```

2. Run the deploy command

   ```bash
   pnpm run deploygh
   ```

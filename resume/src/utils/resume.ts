import type { ResumeData, ResumeDataMap } from "@/types";

/**
 * Returns a template ResumeDataMap with example values for every supported
 * field.  "_comment" keys provide guidance — they are ignored by the app
 * validator and can be removed before uploading.
 */
export const buildResumeTemplate = (): Record<string, unknown> => ({
  _comment: "Each top-level key is a locale code (e.g. en-US). Add as many locales as you need.",
  "en-US": {
    _comment: "Required fields: name, jobTitle, contact. All other sections are optional.",
    name: "Jane Doe",
    jobTitle: "Full-Stack Developer",
    photo: "",
    contact: [
      { type: "email", value: "jane.doe@example.com" },
      { type: "phone", value: "+1 555 123 4567" },
      { type: "linkedin", value: "https://www.linkedin.com/in/janedoe" },
      { type: "github", value: "https://github.com/janedoe" },
      { type: "website", value: "https://www.janedoe.dev" },
      { type: "custom", value: "https://example.com/blog", label: "My Blog" },
    ],
    personalDetails: {
      location: "Berlin, Germany",
      birthDate: "1995-04-12",
      age: "31",
      nationality: "Italian",
      drivingLicense: "B",
      workAuthorization: "EU citizen",
      availability: "30 days",
      pronouns: "she/her",
    },
    summary: "Brief professional summary highlighting your key skills and experience.",
    experience: [
      {
        company: "Acme Corp.",
        position: "Senior Developer",
        duration: "2022 - Present",
        description: "Describe your responsibilities and achievements in this role.",
      },
      {
        company: "StartUp Inc.",
        position: "Junior Developer",
        duration: "2019 - 2022",
        description: "Describe your responsibilities and achievements in this role.",
      },
    ],
    education: [
      {
        institution: "State University",
        degree: "Master's Degree in Computer Science",
        duration: "2017 - 2019",
        grades: "3.9/4.0",
        thesis: "Optional — title of your thesis or final project",
      },
      {
        institution: "State University",
        degree: "Bachelor's Degree in Computer Science",
        duration: "2013 - 2017",
        grades: "3.8/4.0",
      },
    ],
    skills: [
      {
        category: "Frontend",
        items: ["React", "TypeScript", "HTML", "CSS"],
      },
      {
        category: "Backend",
        items: ["Node.js", "Python", "PostgreSQL"],
      },
    ],
    languages: [
      { language: "English", proficiency: "Native" },
      { language: "Spanish", proficiency: "Intermediate (B1)" },
    ],
    projects: [
      {
        name: "Project Name",
        description: "Short description of the project and your contributions.",
        technologies: ["React", "Node.js", "PostgreSQL"],
        link: "https://github.com/janedoe/project",
      },
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023",
      },
    ],
  },
});

/** An empty but valid resume, used for the "start blank" onboarding flow. */
export const buildBlankResumeData = (): ResumeData => ({
  name: "",
  jobTitle: "",
  contact: [],
});

/** Serializes data to JSON and triggers a browser file download. */
export const downloadJsonFile = (data: unknown, fileName: string) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};

/** Extracts up to two uppercase initials from a full name. */
export const getInitials = (name: string) => {
  if (!name) return "";
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

/** Returns the first locale key in the map, or the fallback if the map is empty. */
export const getFirstLocale = (resumeDataMap: ResumeDataMap, fallback: string) => {
  const locales = Object.keys(resumeDataMap);
  return locales.length > 0 ? locales[0] : fallback;
};

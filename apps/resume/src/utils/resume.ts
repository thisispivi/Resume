import type { PersonalDetails, ResumeData, ResumeDataMap } from "@/types";

/** Returns true if any personal-details field has a non-empty value. */
export const hasPersonalDetails = (details?: PersonalDetails) =>
  Boolean(details && Object.values(details).some(Boolean));

/**
 * Returns a starter ResumeDataMap with example values for every supported
 * field. `_comment` keys provide guidance — they are ignored by the app
 * validator and can be removed before uploading.
 */
export const buildResumeTemplate = (): Record<string, unknown> => ({
  _comment: "Each top-level key is a locale code (e.g. en-US). Add as many locales as you need.",
  "en-US": {
    _comment:
      "Only name, jobTitle and contact are required. Dates use YYYY-MM or YYYY; set isCurrent to true instead of an endDate for ongoing entries.",
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
      birthPlace: "Milan, Italy",
      age: "31",
      nationality: "Italian",
      gender: "Female",
      maritalStatus: "Single",
      drivingLicense: "B",
      workAuthorization: "EU citizen",
      availability: "Immediate",
      noticePeriod: "30 days",
      willingToRelocate: "Yes, within the EU",
      desiredSalary: "€70,000",
      pronouns: "she/her",
    },
    summary: "Brief professional summary highlighting your key skills and experience.",
    experience: [
      {
        company: "Acme Corp.",
        position: "Senior Developer",
        location: "Berlin, Germany",
        employmentType: "Full-time",
        startDate: "2022-01",
        isCurrent: true,
        description: "One or two sentences framing the role and its scope.",
        highlights: [
          "Quantified achievement — what changed and by how much.",
          "A second achievement, ideally with a number attached.",
        ],
        technologies: ["React", "TypeScript", "Node.js"],
      },
      {
        company: "StartUp Inc.",
        position: "Junior Developer",
        startDate: "2019-06",
        endDate: "2021-12",
        description: "Describe your responsibilities and achievements in this role.",
      },
    ],
    education: [
      {
        institution: "State University",
        degree: "Master's Degree",
        field: "Computer Science",
        location: "Milan, Italy",
        startDate: "2017-09",
        endDate: "2019-07",
        grades: "110/110 cum laude",
        thesis: "Optional — title of your thesis or final project",
        highlights: ["Optional bullet points, e.g. relevant coursework or honours."],
      },
    ],
    skills: [
      { category: "Frontend", items: ["React", "TypeScript", "HTML", "CSS"] },
      { category: "Backend", items: ["Node.js", "Python", "PostgreSQL"] },
    ],
    languages: [
      { language: "Italian", proficiency: "Native" },
      { language: "English", proficiency: "C1", certificate: "IELTS 7.5" },
    ],
    projects: [
      {
        name: "Project Name",
        role: "Creator and maintainer",
        startDate: "2023-02",
        isCurrent: true,
        description: "Short description of the project and your contributions.",
        highlights: ["Notable outcome, e.g. 2k GitHub stars."],
        technologies: ["React", "Node.js", "PostgreSQL"],
        link: "https://github.com/janedoe/project",
      },
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023-05",
        expiryDate: "2026-05",
        credentialId: "ABC-123456",
        link: "https://www.credly.com/badges/example",
      },
    ],
    awards: [
      {
        title: "Employee of the Year",
        issuer: "Acme Corp.",
        date: "2024-12",
        description: "Optional context about why the award was given.",
      },
    ],
    publications: [
      {
        title: "A Paper, Article, or Talk",
        publisher: "Conference or Journal",
        date: "2024-03",
        link: "https://example.com/paper",
        description: "Optional abstract or one-line summary.",
      },
    ],
    courses: [
      {
        name: "Advanced Kubernetes",
        institution: "Linux Foundation",
        date: "2023-09",
        description: "Optional description of what the course covered.",
      },
    ],
    volunteering: [
      {
        organization: "Local Coding Club",
        role: "Mentor",
        location: "Berlin, Germany",
        startDate: "2021-01",
        isCurrent: true,
        description: "What you do and who it helps.",
        highlights: ["Optional bullet points."],
      },
    ],
    interests: ["Photography", "Trail running", "Open source"],
    references: [
      {
        name: "John Smith",
        role: "Engineering Manager",
        organization: "Acme Corp.",
        contact: "john.smith@example.com",
        note: "Optional note about the working relationship.",
      },
    ],
    referencesOnRequest: false,
    customSections: [
      {
        title: "Speaking",
        entries: [
          {
            title: "Talk title",
            subtitle: "Conference name",
            date: "2024",
            description: "Optional description.",
            highlights: ["Optional bullet points."],
          },
        ],
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

/** Builds a safe PDF file name from the resume owner's name. */
export const buildPdfFileName = (name: string) =>
  name.trim() ? `${name.trim().replace(/\s+/g, "_")}_Resume.pdf` : "Resume.pdf";

/**
 * Rough completeness score (0-100) used by the editor's progress meter.
 * Weighted towards the sections recruiters expect on every resume.
 */
export const getCompleteness = (data: ResumeData): number => {
  const checks: boolean[] = [
    Boolean(data.name),
    Boolean(data.jobTitle),
    data.contact.length > 0,
    Boolean(data.summary),
    (data.experience?.length ?? 0) > 0,
    (data.education?.length ?? 0) > 0,
    (data.skills?.length ?? 0) > 0,
    (data.languages?.length ?? 0) > 0,
  ];

  const met = checks.filter(Boolean).length;
  return Math.round((met / checks.length) * 100);
};

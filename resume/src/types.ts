export interface Contact {
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  grades?: string;
  thesis?: string;
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies?: string[];
  link?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
}

export interface ResumeData {
  name: string;
  jobTitle: string;
  photo?: string;
  contact: Contact;
  summary?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: SkillCategory[];
  languages?: Language[];
  projects?: Project[];
  certifications?: Certification[];
}

export type ResumeDataMap = Record<string, ResumeData>;

export type TemplateId = "modern" | "classic" | "minimal" | "split";

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

export interface ThemePalette {
  id: string;
  name: string;
  colors: ThemeColors;
}

export interface TemplateOption {
  id: TemplateId;
  labelKey: string;
  fallbackLabel: string;
}

export interface UiCopy {
  appTitle: string;
  templateLabel: string;
  paletteLabel: string;
  customColorsLabel: string;
  primaryColorLabel: string;
  secondaryColorLabel: string;
  accentColorLabel: string;
  backgroundColorLabel: string;
  surfaceColorLabel: string;
  textColorLabel: string;
  localeLabel: string;
  uploadLabel: string;
  uploadHint: string;
  downloadLabel: string;
  generatingLabel: string;
  uploadErrorInvalid: string;
  uploadErrorMissing: string;
  templateNames: Record<TemplateId, string>;
  sectionTitles: {
    profile: string;
    experience: string;
    education: string;
    projects: string;
    certifications: string;
    skills: string;
    languages: string;
    contact: string;
  };
  fieldLabels: {
    grade: string;
    thesis: string;
  };
}

export interface ValidationResult {
  data?: ResumeDataMap;
  errors: string[];
}

/** Contact information fields for the resume. */
export interface Contact {
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

/** A single work experience entry. */
export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

/** A single education entry with optional grades and thesis. */
export interface Education {
  institution: string;
  degree: string;
  duration: string;
  grades?: string;
  thesis?: string;
}

/** A spoken language and its proficiency level. */
export interface Language {
  language: string;
  proficiency: string;
}

/** A named group of skills (e.g. "Frontend", "Backend"). */
export interface SkillCategory {
  category: string;
  items: string[];
}

/** A portfolio or side project entry. */
export interface Project {
  name: string;
  description: string;
  technologies?: string[];
  link?: string;
}

/** A professional certification or credential. */
export interface Certification {
  name: string;
  issuer: string;
  date?: string;
}

/** Complete resume data for a single locale. */
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

/** Map of locale codes to their corresponding resume data. */
export type ResumeDataMap = Record<string, ResumeData>;

/** Identifier for one of the available resume templates. */
export type TemplateId =
  | "modern"
  | "classic"
  | "minimal"
  | "split"
  | "executive"
  | "creative"
  | "compact";

/** Color values used to style the resume theme. */
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

/** A named color palette with an id and a set of theme colors. */
export interface ThemePalette {
  id: string;
  name: string;
  colors: ThemeColors;
}

/** Metadata for a selectable resume template option. */
export interface TemplateOption {
  id: TemplateId;
  labelKey: string;
  fallbackLabel: string;
}

/** Result of validating a ResumeDataMap, containing parsed data or error messages. */
export interface ValidationResult {
  data?: ResumeDataMap;
  errors: string[];
}

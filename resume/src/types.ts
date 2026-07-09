/** Identifier for a contact link's platform/kind. */
export type ContactType =
  | "email"
  | "phone"
  | "location"
  | "website"
  | "linkedin"
  | "github"
  | "x"
  | "instagram"
  | "telegram"
  | "whatsapp"
  | "youtube"
  | "behance"
  | "dribbble"
  | "stackoverflow"
  | "medium"
  | "mastodon"
  | "custom";

/** A single contact entry: a platform/kind, its value, and an optional display label. */
export interface ContactLink {
  type: ContactType;
  value: string;
  label?: string;
}

/** Optional personal details commonly needed for localized resume formats. */
export interface PersonalDetails {
  location?: string;
  birthDate?: string;
  age?: string;
  nationality?: string;
  drivingLicense?: string;
  workAuthorization?: string;
  availability?: string;
  pronouns?: string;
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
  contact: ContactLink[];
  personalDetails?: PersonalDetails;
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
  | "compact"
  | "elegant"
  | "timeline"
  | "portfolio"
  | "editorial"
  | "bold"
  | "banner"
  | "geometric"
  | "neo";

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
  group?: "bold";
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

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

/**
 * Optional personal facts commonly required by localized resume formats.
 * European and Middle-Eastern employers routinely expect several of these;
 * US-style resumes usually omit all of them.
 */
export interface PersonalDetails {
  location?: string;
  birthDate?: string;
  birthPlace?: string;
  age?: string;
  nationality?: string;
  gender?: string;
  maritalStatus?: string;
  drivingLicense?: string;
  workAuthorization?: string;
  availability?: string;
  noticePeriod?: string;
  willingToRelocate?: string;
  desiredSalary?: string;
  pronouns?: string;
}

/**
 * Start/end of a timed entry. Dates are stored as `YYYY-MM` or `YYYY` so they
 * can be reformatted per locale; any other string is rendered verbatim.
 * `isCurrent` replaces `endDate` with a localized "Present" label.
 */
export interface DateRange {
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
}

/** A single work experience entry. */
export interface Experience extends DateRange {
  company: string;
  position: string;
  location?: string;
  employmentType?: string;
  description?: string;
  highlights?: string[];
  technologies?: string[];
}

/** A single education entry with optional field of study, grades, and thesis. */
export interface Education extends DateRange {
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  grades?: string;
  thesis?: string;
  highlights?: string[];
}

/** A spoken language, its proficiency level, and an optional certificate. */
export interface Language {
  language: string;
  proficiency: string;
  certificate?: string;
}

/** A named group of skills (e.g. "Frontend", "Backend"). */
export interface SkillCategory {
  category: string;
  items: string[];
}

/** A portfolio or side project entry. */
export interface Project extends DateRange {
  name: string;
  role?: string;
  description?: string;
  technologies?: string[];
  highlights?: string[];
  link?: string;
}

/** A professional certification or credential. */
export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  expiryDate?: string;
  credentialId?: string;
  link?: string;
}

/** An award, prize, or formal recognition. */
export interface Award {
  title: string;
  issuer?: string;
  date?: string;
  description?: string;
}

/** A paper, article, book, or talk. */
export interface Publication {
  title: string;
  publisher?: string;
  date?: string;
  link?: string;
  description?: string;
}

/** A training course or workshop (Europass "Training" section). */
export interface Course {
  name: string;
  institution?: string;
  date?: string;
  description?: string;
}

/** An unpaid or community role. */
export interface Volunteering extends DateRange {
  organization: string;
  role: string;
  location?: string;
  description?: string;
  highlights?: string[];
}

/** A professional reference. */
export interface Reference {
  name: string;
  role?: string;
  organization?: string;
  contact?: string;
  note?: string;
}

/** One entry of a user-defined section, shaped like a generic timeline item. */
export interface CustomEntry {
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  highlights?: string[];
}

/** A user-defined section rendered after the built-in ones. */
export interface CustomSection {
  title: string;
  entries: CustomEntry[];
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
  awards?: Award[];
  publications?: Publication[];
  courses?: Course[];
  volunteering?: Volunteering[];
  interests?: string[];
  references?: Reference[];
  referencesOnRequest?: boolean;
  customSections?: CustomSection[];
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

/** Coarse page structure of a template, used to draw its gallery thumbnail. */
export type TemplateLayout = "sidebar-left" | "sidebar-right" | "columns" | "single" | "banner";

/** Metadata for a selectable resume template option. */
export interface TemplateOption {
  id: TemplateId;
  labelKey: string;
  fallbackLabel: string;
  layout: TemplateLayout;
}

/** Result of validating a ResumeDataMap, containing parsed data or error messages. */
export interface ValidationResult {
  data?: ResumeDataMap;
  errors: string[];
}

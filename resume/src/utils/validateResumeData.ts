import type {
  Award,
  Certification,
  ContactLink,
  ContactType,
  Course,
  CustomEntry,
  CustomSection,
  DateRange,
  Education,
  Experience,
  Language,
  PersonalDetails,
  Project,
  Publication,
  Reference,
  ResumeData,
  ResumeDataMap,
  SkillCategory,
  ValidationResult,
  Volunteering,
} from "@/types";
import { CONTACT_TYPES } from "@/data/contactTypes";
import { parseDurationString } from "@/utils/dates";

const CONTACT_TYPE_VALUES = new Set<string>(CONTACT_TYPES.map((config) => config.type));

/** Legacy fixed-object contact keys (pre-v3), kept only to migrate old data on load. */
const LEGACY_CONTACT_KEYS: ContactType[] = ["email", "phone", "linkedin", "github", "website"];

const PERSONAL_DETAIL_KEYS: (keyof PersonalDetails)[] = [
  "location",
  "birthDate",
  "birthPlace",
  "age",
  "nationality",
  "gender",
  "maritalStatus",
  "drivingLicense",
  "workAuthorization",
  "availability",
  "noticePeriod",
  "willingToRelocate",
  "desiredSalary",
  "pronouns",
];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** Returns a trimmed string, or undefined for anything that is not a usable string. */
const readString = (value: unknown): string | undefined => {
  if (typeof value === "number") return String(value);
  if (typeof value !== "string") return undefined;
  return value.length > 0 ? value : undefined;
};

/** Returns a required string field, defaulting to "" so a partial resume still loads. */
const readRequiredString = (value: unknown): string => readString(value) ?? "";

/** Keeps only the string members of an array, dropping the field when nothing remains. */
const readStringArray = (value: unknown): string[] | undefined => {
  if (!Array.isArray(value)) return undefined;
  const items = value.map(readString).filter((item): item is string => item !== undefined);
  return items.length > 0 ? items : undefined;
};

const readBoolean = (value: unknown): boolean | undefined =>
  typeof value === "boolean" ? value : undefined;

/**
 * Maps the object members of an array through a normalizer, dropping entries
 * that are not objects. Returns undefined when the section ends up empty so it
 * never renders as a bare heading.
 */
const readEntries = <T>(value: unknown, normalize: (raw: Record<string, unknown>) => T) => {
  if (!Array.isArray(value)) return undefined;
  const entries = value.filter(isRecord).map(normalize);
  return entries.length > 0 ? entries : undefined;
};

/**
 * Reads structured start/end dates, falling back to splitting a legacy
 * free-text `duration` field written by earlier versions of the app.
 */
const readDateRange = (raw: Record<string, unknown>): DateRange => {
  const startDate = readString(raw.startDate);
  const endDate = readString(raw.endDate);
  const isCurrent = readBoolean(raw.isCurrent);

  if (!startDate && !endDate && !isCurrent) {
    const duration = readString(raw.duration);
    if (duration) return parseDurationString(duration);
  }

  return { startDate, endDate, isCurrent };
};

/** Converts a legacy `{ email, phone, ... }` contact object into a ContactLink[]. */
const readContact = (value: unknown): ContactLink[] => {
  if (Array.isArray(value)) {
    return value.filter(isRecord).flatMap((raw) => {
      const type = readString(raw.type);
      const linkValue = readString(raw.value);
      if (!type || !linkValue || !CONTACT_TYPE_VALUES.has(type)) return [];
      const label = readString(raw.label);
      return [{ type: type as ContactType, value: linkValue, ...(label ? { label } : {}) }];
    });
  }

  if (!isRecord(value)) return [];

  return LEGACY_CONTACT_KEYS.flatMap((type) => {
    const fieldValue = readString(value[type]);
    return fieldValue ? [{ type, value: fieldValue }] : [];
  });
};

const readPersonalDetails = (value: unknown): PersonalDetails | undefined => {
  if (!isRecord(value)) return undefined;

  const details: PersonalDetails = {};
  PERSONAL_DETAIL_KEYS.forEach((key) => {
    const fieldValue = readString(value[key]);
    if (fieldValue) details[key] = fieldValue;
  });

  return Object.keys(details).length > 0 ? details : undefined;
};

const readExperience = (raw: Record<string, unknown>): Experience => ({
  company: readRequiredString(raw.company),
  position: readRequiredString(raw.position),
  location: readString(raw.location),
  employmentType: readString(raw.employmentType),
  description: readString(raw.description),
  highlights: readStringArray(raw.highlights),
  technologies: readStringArray(raw.technologies),
  ...readDateRange(raw),
});

const readEducation = (raw: Record<string, unknown>): Education => ({
  institution: readRequiredString(raw.institution),
  degree: readRequiredString(raw.degree),
  field: readString(raw.field),
  location: readString(raw.location),
  grades: readString(raw.grades),
  thesis: readString(raw.thesis),
  highlights: readStringArray(raw.highlights),
  ...readDateRange(raw),
});

const readSkillCategory = (raw: Record<string, unknown>): SkillCategory => ({
  category: readRequiredString(raw.category),
  items: readStringArray(raw.items) ?? [],
});

const readLanguage = (raw: Record<string, unknown>): Language => ({
  language: readRequiredString(raw.language),
  proficiency: readRequiredString(raw.proficiency),
  certificate: readString(raw.certificate),
});

const readProject = (raw: Record<string, unknown>): Project => ({
  name: readRequiredString(raw.name),
  role: readString(raw.role),
  description: readString(raw.description),
  technologies: readStringArray(raw.technologies),
  highlights: readStringArray(raw.highlights),
  link: readString(raw.link),
  ...readDateRange(raw),
});

const readCertification = (raw: Record<string, unknown>): Certification => ({
  name: readRequiredString(raw.name),
  issuer: readRequiredString(raw.issuer),
  date: readString(raw.date),
  expiryDate: readString(raw.expiryDate),
  credentialId: readString(raw.credentialId),
  link: readString(raw.link),
});

const readAward = (raw: Record<string, unknown>): Award => ({
  title: readRequiredString(raw.title),
  issuer: readString(raw.issuer),
  date: readString(raw.date),
  description: readString(raw.description),
});

const readPublication = (raw: Record<string, unknown>): Publication => ({
  title: readRequiredString(raw.title),
  publisher: readString(raw.publisher),
  date: readString(raw.date),
  link: readString(raw.link),
  description: readString(raw.description),
});

const readCourse = (raw: Record<string, unknown>): Course => ({
  name: readRequiredString(raw.name),
  institution: readString(raw.institution),
  date: readString(raw.date),
  description: readString(raw.description),
});

const readVolunteering = (raw: Record<string, unknown>): Volunteering => ({
  organization: readRequiredString(raw.organization),
  role: readRequiredString(raw.role),
  location: readString(raw.location),
  description: readString(raw.description),
  highlights: readStringArray(raw.highlights),
  ...readDateRange(raw),
});

const readReference = (raw: Record<string, unknown>): Reference => ({
  name: readRequiredString(raw.name),
  role: readString(raw.role),
  organization: readString(raw.organization),
  contact: readString(raw.contact),
  note: readString(raw.note),
});

const readCustomEntry = (raw: Record<string, unknown>): CustomEntry => ({
  title: readRequiredString(raw.title),
  subtitle: readString(raw.subtitle),
  date: readString(raw.date),
  description: readString(raw.description),
  highlights: readStringArray(raw.highlights),
});

const readCustomSection = (raw: Record<string, unknown>): CustomSection => ({
  title: readRequiredString(raw.title),
  entries: readEntries(raw.entries, readCustomEntry) ?? [],
});

/**
 * Normalizes one locale's payload into ResumeData.
 *
 * Unknown and malformed optional fields are dropped rather than rejected, so a
 * hand-written or partially filled JSON file still loads; only `name`,
 * `jobTitle` and `contact` are structurally required.
 */
const readResumeData = (raw: Record<string, unknown>): ResumeData => ({
  name: readRequiredString(raw.name),
  jobTitle: readRequiredString(raw.jobTitle),
  photo: readString(raw.photo),
  contact: readContact(raw.contact),
  personalDetails: readPersonalDetails(raw.personalDetails),
  summary: readString(raw.summary),
  experience: readEntries(raw.experience, readExperience),
  education: readEntries(raw.education, readEducation),
  skills: readEntries(raw.skills, readSkillCategory),
  languages: readEntries(raw.languages, readLanguage),
  projects: readEntries(raw.projects, readProject),
  certifications: readEntries(raw.certifications, readCertification),
  awards: readEntries(raw.awards, readAward),
  publications: readEntries(raw.publications, readPublication),
  courses: readEntries(raw.courses, readCourse),
  volunteering: readEntries(raw.volunteering, readVolunteering),
  interests: readStringArray(raw.interests),
  references: readEntries(raw.references, readReference),
  referencesOnRequest: readBoolean(raw.referencesOnRequest),
  customSections: readEntries(raw.customSections, readCustomSection),
});

/**
 * Validates an unknown payload as a locale-keyed ResumeDataMap.
 *
 * Keys starting with `_` (such as the `_comment` hints in the downloadable
 * starter template) are ignored so that annotated files import cleanly.
 */
export const validateResumeDataMap = (payload: unknown): ValidationResult => {
  if (!isRecord(payload)) {
    return { errors: ["Payload must be an object keyed by locale."] };
  }

  const locales = Object.keys(payload).filter((locale) => !locale.startsWith("_"));
  if (locales.length === 0) {
    return { errors: ["No locale entries found."] };
  }

  const errors: string[] = [];
  const dataMap: ResumeDataMap = {};

  locales.forEach((locale) => {
    const raw = payload[locale];
    if (!isRecord(raw)) {
      errors.push(`Invalid resume data for locale: ${locale}`);
      return;
    }
    dataMap[locale] = readResumeData(raw);
  });

  if (errors.length > 0) return { errors };

  return { data: dataMap, errors: [] };
};

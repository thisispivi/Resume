import type {
  Certification,
  ContactLink,
  ContactType,
  Education,
  Experience,
  Language,
  PersonalDetails,
  Project,
  ResumeData,
  ResumeDataMap,
  SkillCategory,
  ValidationResult,
} from "@/types";
import { CONTACT_TYPES } from "@/data/contactTypes";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isString = (value: unknown): value is string => typeof value === "string";

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const CONTACT_TYPE_VALUES = new Set<string>(CONTACT_TYPES.map((config) => config.type));

/** Legacy fixed-object contact keys (pre-v3), kept only to migrate old data on load. */
const LEGACY_CONTACT_KEYS: ContactType[] = ["email", "phone", "linkedin", "github", "website"];

/** Converts a legacy `{ email, phone, ... }` contact object into a ContactLink[]; passes arrays through. */
const migrateContactField = (value: unknown): unknown => {
  if (Array.isArray(value)) return value;
  if (!isRecord(value)) return value;

  const links: ContactLink[] = [];
  LEGACY_CONTACT_KEYS.forEach((type) => {
    const fieldValue = value[type];
    if (typeof fieldValue === "string" && fieldValue.trim())
      links.push({ type, value: fieldValue });
  });
  return links;
};

const validateContactLink = (value: unknown): value is ContactLink =>
  isRecord(value) &&
  isString(value.type) &&
  CONTACT_TYPE_VALUES.has(value.type) &&
  isString(value.value) &&
  (value.label === undefined || isString(value.label));

const validateContact = (value: unknown): value is ContactLink[] =>
  Array.isArray(value) && value.every(validateContactLink);

const validatePersonalDetails = (value: unknown): value is PersonalDetails => {
  if (!isRecord(value)) return false;
  const fields = [
    "location",
    "birthDate",
    "age",
    "nationality",
    "drivingLicense",
    "workAuthorization",
    "availability",
    "pronouns",
  ] as const;
  return fields.every((field) => (value[field] === undefined ? true : isString(value[field])));
};

const validateExperience = (value: unknown): value is Experience =>
  isRecord(value) &&
  isString(value.company) &&
  isString(value.position) &&
  isString(value.duration) &&
  isString(value.description);

const validateEducation = (value: unknown): value is Education =>
  isRecord(value) &&
  isString(value.institution) &&
  isString(value.degree) &&
  isString(value.duration) &&
  (value.grades === undefined || isString(value.grades)) &&
  (value.thesis === undefined || isString(value.thesis));

const validateLanguage = (value: unknown): value is Language =>
  isRecord(value) && isString(value.language) && isString(value.proficiency);

const validateSkillCategory = (value: unknown): value is SkillCategory =>
  isRecord(value) && isString(value.category) && isStringArray(value.items);

const validateProject = (value: unknown): value is Project =>
  isRecord(value) &&
  isString(value.name) &&
  isString(value.description) &&
  (value.technologies === undefined || isStringArray(value.technologies)) &&
  (value.link === undefined || isString(value.link));

const validateCertification = (value: unknown): value is Certification =>
  isRecord(value) &&
  isString(value.name) &&
  isString(value.issuer) &&
  (value.date === undefined || isString(value.date));

const validateResumeData = (value: unknown): value is ResumeData => {
  if (!isRecord(value)) return false;
  if (!isString(value.name) || !isString(value.jobTitle)) return false;
  if (!validateContact(value.contact)) return false;
  if (value.personalDetails !== undefined && !validatePersonalDetails(value.personalDetails)) {
    return false;
  }
  if (value.photo !== undefined && !isString(value.photo)) return false;
  if (value.summary !== undefined && !isString(value.summary)) return false;
  if (
    value.experience !== undefined &&
    (!Array.isArray(value.experience) || !value.experience.every(validateExperience))
  ) {
    return false;
  }
  if (
    value.education !== undefined &&
    (!Array.isArray(value.education) || !value.education.every(validateEducation))
  ) {
    return false;
  }
  if (
    value.skills !== undefined &&
    (!Array.isArray(value.skills) || !value.skills.every(validateSkillCategory))
  ) {
    return false;
  }
  if (
    value.languages !== undefined &&
    (!Array.isArray(value.languages) || !value.languages.every(validateLanguage))
  ) {
    return false;
  }
  if (
    value.projects !== undefined &&
    (!Array.isArray(value.projects) || !value.projects.every(validateProject))
  ) {
    return false;
  }
  if (
    value.certifications !== undefined &&
    (!Array.isArray(value.certifications) || !value.certifications.every(validateCertification))
  ) {
    return false;
  }

  return true;
};

/** Validates an unknown payload as a locale-keyed ResumeDataMap, returning parsed data or errors. */
export const validateResumeDataMap = (payload: unknown): ValidationResult => {
  const errors: string[] = [];

  if (!isRecord(payload)) {
    return { errors: ["Payload must be an object keyed by locale."] };
  }

  const locales = Object.keys(payload);
  if (locales.length === 0) {
    return { errors: ["No locale entries found."] };
  }

  const dataMap: ResumeDataMap = {};

  locales.forEach((locale) => {
    const raw = payload[locale];
    const localeValue = isRecord(raw) ? { ...raw, contact: migrateContactField(raw.contact) } : raw;
    if (!validateResumeData(localeValue)) {
      errors.push(`Invalid resume data for locale: ${locale}`);
      return;
    }
    dataMap[locale] = localeValue;
  });

  if (errors.length > 0) {
    return { errors };
  }

  return { data: dataMap, errors: [] };
};

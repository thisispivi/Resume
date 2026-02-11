import type {
  Certification,
  Contact,
  Education,
  Experience,
  Language,
  Project,
  ResumeData,
  ResumeDataMap,
  SkillCategory,
  ValidationResult,
} from "../types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isString = (value: unknown): value is string => typeof value === "string";

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const validateContact = (value: unknown): value is Contact => {
  if (!isRecord(value)) return false;
  const fields = ["email", "phone", "linkedin", "github", "website"] as const;
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
    const localeValue = payload[locale];
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

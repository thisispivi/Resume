/**
 * How a single entry field is rendered by the content editor.
 *
 * - `month` uses a native month picker, degrading to free text for imported
 *   values that are not `YYYY-MM`.
 * - `tags` edits a `string[]` as a comma-separated line.
 * - `bullets` edits a `string[]` as one line per bullet.
 */
type FieldKind = "text" | "textarea" | "month" | "tags" | "bullets" | "checkbox";

/** Declarative description of one editable field inside a list entry. */
export interface FieldDef {
  key: string;
  kind: FieldKind;
  labelKey: string;
  placeholderKey?: string;
  /** Hidden while the named sibling boolean field is true (e.g. "still working here"). */
  hiddenWhenTrue?: string;
  /** Renders across both columns of the two-column field grid. */
  isWide?: boolean;
}

/** Keys of ResumeData that hold a repeatable list of entries. */
export type ListSectionId =
  | "experience"
  | "education"
  | "skills"
  | "languages"
  | "projects"
  | "certifications"
  | "awards"
  | "publications"
  | "courses"
  | "volunteering"
  | "references";

/** Declarative description of one repeatable resume section. */
export interface ListSectionDef {
  id: ListSectionId;
  titleKey: string;
  fields: FieldDef[];
  /** Blank entry inserted by the "add" action. */
  emptyEntry: Record<string, unknown>;
  /** Fields used, in order, to build the collapsed entry header. */
  headerFields: string[];
}

const DATE_FIELDS: FieldDef[] = [
  { key: "startDate", kind: "month", labelKey: "editor.startDate" },
  { key: "endDate", kind: "month", labelKey: "editor.endDate", hiddenWhenTrue: "isCurrent" },
  { key: "isCurrent", kind: "checkbox", labelKey: "editor.isCurrent" },
];

/**
 * Every repeatable section the editor knows how to render, in the order they
 * appear in the sidebar. Adding a section here wires up its editor, its blank
 * entry, and its collapsed header without touching any component.
 */
export const LIST_SECTIONS: ListSectionDef[] = [
  {
    id: "experience",
    titleKey: "sectionTitles.experience",
    headerFields: ["position", "company"],
    emptyEntry: { company: "", position: "" },
    fields: [
      { key: "position", kind: "text", labelKey: "editor.position" },
      { key: "company", kind: "text", labelKey: "editor.company" },
      { key: "location", kind: "text", labelKey: "editor.entryLocation" },
      {
        key: "employmentType",
        kind: "text",
        labelKey: "editor.employmentType",
        placeholderKey: "editor.employmentTypePlaceholder",
      },
      ...DATE_FIELDS,
      { key: "description", kind: "textarea", labelKey: "editor.description", isWide: true },
      {
        key: "highlights",
        kind: "bullets",
        labelKey: "editor.highlights",
        placeholderKey: "editor.highlightsPlaceholder",
        isWide: true,
      },
      {
        key: "technologies",
        kind: "tags",
        labelKey: "editor.technologies",
        placeholderKey: "editor.technologiesPlaceholder",
        isWide: true,
      },
    ],
  },
  {
    id: "education",
    titleKey: "sectionTitles.education",
    headerFields: ["degree", "institution"],
    emptyEntry: { institution: "", degree: "" },
    fields: [
      { key: "degree", kind: "text", labelKey: "editor.degree" },
      { key: "institution", kind: "text", labelKey: "editor.institution" },
      { key: "field", kind: "text", labelKey: "editor.fieldOfStudy" },
      { key: "location", kind: "text", labelKey: "editor.entryLocation" },
      ...DATE_FIELDS,
      { key: "grades", kind: "text", labelKey: "fieldLabels.grade" },
      { key: "thesis", kind: "text", labelKey: "fieldLabels.thesis", isWide: true },
      {
        key: "highlights",
        kind: "bullets",
        labelKey: "editor.highlights",
        placeholderKey: "editor.highlightsPlaceholder",
        isWide: true,
      },
    ],
  },
  {
    id: "skills",
    titleKey: "sectionTitles.skills",
    headerFields: ["category"],
    emptyEntry: { category: "", items: [] },
    fields: [
      { key: "category", kind: "text", labelKey: "editor.category" },
      {
        key: "items",
        kind: "tags",
        labelKey: "editor.skillItems",
        placeholderKey: "editor.skillItemsPlaceholder",
        isWide: true,
      },
    ],
  },
  {
    id: "languages",
    titleKey: "sectionTitles.languages",
    headerFields: ["language", "proficiency"],
    emptyEntry: { language: "", proficiency: "" },
    fields: [
      { key: "language", kind: "text", labelKey: "editor.language" },
      {
        key: "proficiency",
        kind: "text",
        labelKey: "editor.proficiency",
        placeholderKey: "editor.proficiencyPlaceholder",
      },
      { key: "certificate", kind: "text", labelKey: "editor.certificate", isWide: true },
    ],
  },
  {
    id: "projects",
    titleKey: "sectionTitles.projects",
    headerFields: ["name", "role"],
    emptyEntry: { name: "" },
    fields: [
      { key: "name", kind: "text", labelKey: "editor.projectName" },
      { key: "role", kind: "text", labelKey: "editor.role" },
      ...DATE_FIELDS,
      { key: "description", kind: "textarea", labelKey: "editor.description", isWide: true },
      {
        key: "highlights",
        kind: "bullets",
        labelKey: "editor.highlights",
        placeholderKey: "editor.highlightsPlaceholder",
        isWide: true,
      },
      {
        key: "technologies",
        kind: "tags",
        labelKey: "editor.technologies",
        placeholderKey: "editor.technologiesPlaceholder",
        isWide: true,
      },
      { key: "link", kind: "text", labelKey: "editor.link", isWide: true },
    ],
  },
  {
    id: "certifications",
    titleKey: "sectionTitles.certifications",
    headerFields: ["name", "issuer"],
    emptyEntry: { name: "", issuer: "" },
    fields: [
      { key: "name", kind: "text", labelKey: "editor.certName" },
      { key: "issuer", kind: "text", labelKey: "editor.issuer" },
      { key: "date", kind: "month", labelKey: "editor.date" },
      { key: "expiryDate", kind: "month", labelKey: "editor.expiryDate" },
      { key: "credentialId", kind: "text", labelKey: "editor.credentialId" },
      { key: "link", kind: "text", labelKey: "editor.link" },
    ],
  },
  {
    id: "awards",
    titleKey: "sectionTitles.awards",
    headerFields: ["title", "issuer"],
    emptyEntry: { title: "" },
    fields: [
      { key: "title", kind: "text", labelKey: "editor.awardTitle" },
      { key: "issuer", kind: "text", labelKey: "editor.issuer" },
      { key: "date", kind: "month", labelKey: "editor.date" },
      { key: "description", kind: "textarea", labelKey: "editor.description", isWide: true },
    ],
  },
  {
    id: "publications",
    titleKey: "sectionTitles.publications",
    headerFields: ["title", "publisher"],
    emptyEntry: { title: "" },
    fields: [
      { key: "title", kind: "text", labelKey: "editor.publicationTitle" },
      { key: "publisher", kind: "text", labelKey: "editor.publisher" },
      { key: "date", kind: "month", labelKey: "editor.date" },
      { key: "link", kind: "text", labelKey: "editor.link" },
      { key: "description", kind: "textarea", labelKey: "editor.description", isWide: true },
    ],
  },
  {
    id: "courses",
    titleKey: "sectionTitles.courses",
    headerFields: ["name", "institution"],
    emptyEntry: { name: "" },
    fields: [
      { key: "name", kind: "text", labelKey: "editor.courseName" },
      { key: "institution", kind: "text", labelKey: "editor.institution" },
      { key: "date", kind: "month", labelKey: "editor.date" },
      { key: "description", kind: "textarea", labelKey: "editor.description", isWide: true },
    ],
  },
  {
    id: "volunteering",
    titleKey: "sectionTitles.volunteering",
    headerFields: ["role", "organization"],
    emptyEntry: { organization: "", role: "" },
    fields: [
      { key: "role", kind: "text", labelKey: "editor.role" },
      { key: "organization", kind: "text", labelKey: "editor.organization" },
      { key: "location", kind: "text", labelKey: "editor.entryLocation" },
      ...DATE_FIELDS,
      { key: "description", kind: "textarea", labelKey: "editor.description", isWide: true },
      {
        key: "highlights",
        kind: "bullets",
        labelKey: "editor.highlights",
        placeholderKey: "editor.highlightsPlaceholder",
        isWide: true,
      },
    ],
  },
  {
    id: "references",
    titleKey: "sectionTitles.references",
    headerFields: ["name", "organization"],
    emptyEntry: { name: "" },
    fields: [
      { key: "name", kind: "text", labelKey: "editor.name" },
      { key: "role", kind: "text", labelKey: "editor.role" },
      { key: "organization", kind: "text", labelKey: "editor.organization" },
      { key: "contact", kind: "text", labelKey: "editor.referenceContact" },
      { key: "note", kind: "textarea", labelKey: "editor.note", isWide: true },
    ],
  },
];

/** Fields of a user-defined section entry, shared by every custom section. */
export const CUSTOM_ENTRY_FIELDS: FieldDef[] = [
  { key: "title", kind: "text", labelKey: "editor.entryTitle" },
  { key: "subtitle", kind: "text", labelKey: "editor.entrySubtitle" },
  { key: "date", kind: "text", labelKey: "editor.date" },
  { key: "description", kind: "textarea", labelKey: "editor.description", isWide: true },
  {
    key: "highlights",
    kind: "bullets",
    labelKey: "editor.highlights",
    placeholderKey: "editor.highlightsPlaceholder",
    isWide: true,
  },
];

/** Personal-details fields, in the order Europass-style resumes list them. */
export const PERSONAL_DETAIL_FIELDS: FieldDef[] = [
  { key: "location", kind: "text", labelKey: "fieldLabels.location" },
  { key: "birthDate", kind: "text", labelKey: "fieldLabels.birthDate" },
  { key: "birthPlace", kind: "text", labelKey: "fieldLabels.birthPlace" },
  { key: "age", kind: "text", labelKey: "fieldLabels.age" },
  { key: "nationality", kind: "text", labelKey: "fieldLabels.nationality" },
  { key: "gender", kind: "text", labelKey: "fieldLabels.gender" },
  { key: "maritalStatus", kind: "text", labelKey: "fieldLabels.maritalStatus" },
  { key: "drivingLicense", kind: "text", labelKey: "fieldLabels.drivingLicense" },
  { key: "workAuthorization", kind: "text", labelKey: "fieldLabels.workAuthorization" },
  { key: "availability", kind: "text", labelKey: "fieldLabels.availability" },
  { key: "noticePeriod", kind: "text", labelKey: "fieldLabels.noticePeriod" },
  { key: "willingToRelocate", kind: "text", labelKey: "fieldLabels.willingToRelocate" },
  { key: "desiredSalary", kind: "text", labelKey: "fieldLabels.desiredSalary" },
  { key: "pronouns", kind: "text", labelKey: "fieldLabels.pronouns" },
];

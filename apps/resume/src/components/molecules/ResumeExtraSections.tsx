import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import ResumeHighlights from "@/components/molecules/ResumeHighlights";
import type { ResumeData } from "@/types";
import { formatPeriod, formatSingleDate } from "@/utils/resumeFormat";

interface ResumeExtraSectionsProps {
  data: ResumeData;
  pdfLocale: string;
  /** Lets a template pass its own section-heading class instead of the shared one. */
  titleClassName?: string;
}

interface GenericEntry {
  key: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  highlights?: string[];
  link?: string;
}

/** Joins the non-empty parts of a subtitle line, e.g. "Issuer · Location". */
const joinParts = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(" · ");

/** Renders a run of generic entries; shared by every section below. */
const renderEntries = (entries: GenericEntry[]) =>
  entries.map((entry) => (
    <div className="resume-entry" key={entry.key}>
      <div className="resume-entry__header">
        <h3 className="resume-entry__title">{entry.title}</h3>
        {entry.date ? <span className="resume-entry__date">{entry.date}</span> : null}
      </div>
      {entry.subtitle ? <p className="resume-entry__subtitle">{entry.subtitle}</p> : null}
      {entry.description ? <p className="resume-entry__body">{entry.description}</p> : null}
      <ResumeHighlights items={entry.highlights} />
      {entry.link ? (
        <a className="resume-entry__link" href={entry.link} rel="noreferrer" target="_blank">
          {entry.link}
        </a>
      ) : null}
    </div>
  ));

/**
 * Renders the resume sections that no template lays out by hand — volunteering,
 * awards, publications, courses, interests, references, and user-defined
 * sections. Every template appends this once, so adding a section to the data
 * model never requires touching the fifteen template components.
 */
function ResumeExtraSections({
  data,
  pdfLocale,
  titleClassName = "resume-section__title",
}: ResumeExtraSectionsProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(pdfLocale);

  const renderSection = (title: string, key: string, children: ReactNode) => (
    <section className="resume-section" key={key}>
      <h2 className={titleClassName}>{title}</h2>
      {children}
    </section>
  );

  const sections: ReactNode[] = [];

  if (data.volunteering && data.volunteering.length > 0) {
    sections.push(
      renderSection(
        t("sectionTitles.volunteering"),
        "volunteering",
        renderEntries(
          data.volunteering.map((entry, index) => ({
            key: `volunteering-${String(index)}`,
            title: entry.role,
            subtitle: joinParts(entry.organization, entry.location),
            date: formatPeriod(entry, pdfLocale, t),
            description: entry.description,
            highlights: entry.highlights,
          })),
        ),
      ),
    );
  }

  if (data.awards && data.awards.length > 0) {
    sections.push(
      renderSection(
        t("sectionTitles.awards"),
        "awards",
        renderEntries(
          data.awards.map((entry, index) => ({
            key: `award-${String(index)}`,
            title: entry.title,
            subtitle: entry.issuer,
            date: formatSingleDate(entry.date, pdfLocale),
            description: entry.description,
          })),
        ),
      ),
    );
  }

  if (data.publications && data.publications.length > 0) {
    sections.push(
      renderSection(
        t("sectionTitles.publications"),
        "publications",
        renderEntries(
          data.publications.map((entry, index) => ({
            key: `publication-${String(index)}`,
            title: entry.title,
            subtitle: entry.publisher,
            date: formatSingleDate(entry.date, pdfLocale),
            description: entry.description,
            link: entry.link,
          })),
        ),
      ),
    );
  }

  if (data.courses && data.courses.length > 0) {
    sections.push(
      renderSection(
        t("sectionTitles.courses"),
        "courses",
        renderEntries(
          data.courses.map((entry, index) => ({
            key: `course-${String(index)}`,
            title: entry.name,
            subtitle: entry.institution,
            date: formatSingleDate(entry.date, pdfLocale),
            description: entry.description,
          })),
        ),
      ),
    );
  }

  if (data.customSections && data.customSections.length > 0) {
    data.customSections.forEach((section, sectionIndex) => {
      if (section.entries.length === 0) return;
      sections.push(
        renderSection(
          section.title,
          `custom-${String(sectionIndex)}`,
          renderEntries(
            section.entries.map((entry, index) => ({
              key: `custom-${String(sectionIndex)}-${String(index)}`,
              title: entry.title,
              subtitle: entry.subtitle,
              date: entry.date,
              description: entry.description,
              highlights: entry.highlights,
            })),
          ),
        ),
      );
    });
  }

  if (data.interests && data.interests.length > 0) {
    sections.push(
      renderSection(
        t("sectionTitles.interests"),
        "interests",
        <div className="resume-tags">
          {data.interests.map((interest) => (
            <span className="resume-tag" key={interest}>
              {interest}
            </span>
          ))}
        </div>,
      ),
    );
  }

  const hasReferences = data.references && data.references.length > 0;
  if (hasReferences || data.referencesOnRequest) {
    sections.push(
      renderSection(
        t("sectionTitles.references"),
        "references",
        data.referencesOnRequest && !hasReferences ? (
          <p className="resume-section__body">{t("fieldLabels.referencesOnRequest")}</p>
        ) : (
          renderEntries(
            (data.references ?? []).map((entry, index) => ({
              key: `reference-${String(index)}`,
              title: entry.name,
              subtitle: joinParts(entry.role, entry.organization),
              date: entry.contact,
              description: entry.note,
            })),
          )
        ),
      ),
    );
  }

  if (sections.length === 0) return null;

  return sections;
}

export default ResumeExtraSections;

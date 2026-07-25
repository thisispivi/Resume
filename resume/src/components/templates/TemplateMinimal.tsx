import { useTranslation } from "react-i18next";
import ContactList from "@/components/molecules/ContactList";
import PersonalDetailsList from "@/components/molecules/PersonalDetailsList";
import ResumeHighlights from "@/components/molecules/ResumeHighlights";
import EducationDetails from "@/components/molecules/EducationDetails";
import ResumeExtraSections from "@/components/molecules/ResumeExtraSections";
import { formatPeriod, joinMeta } from "@/utils/resumeFormat";
import { hasPersonalDetails } from "@/utils/resume";
import type { ResumeData } from "@/types";

interface TemplateMinimalProps {
  data: ResumeData;
  pdfLocale: string;
}

/** Minimal resume layout with reduced visual elements for an understated look. */
function TemplateMinimal({ data, pdfLocale }: TemplateMinimalProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(pdfLocale);

  return (
    <div className="template template--minimal">
      <header className="template-minimal__header">
        <div>
          <h1 className="template-minimal__name">{data.name}</h1>
          <p className="template-minimal__title">{data.jobTitle}</p>
        </div>
        <ContactList contact={data.contact} />
        {hasPersonalDetails(data.personalDetails) ? (
          <PersonalDetailsList compact details={data.personalDetails} pdfLocale={pdfLocale} />
        ) : null}
      </header>

      {data.summary ? (
        <section className="resume-section">
          <h2 className="resume-section__title">{t("sectionTitles.profile")}</h2>
          <p className="resume-section__body">{data.summary}</p>
        </section>
      ) : null}

      {data.experience && data.experience.length > 0 ? (
        <section className="resume-section">
          <h2 className="resume-section__title">{t("sectionTitles.experience")}</h2>
          {data.experience.map((experience, index) => (
            <div className="resume-entry" key={`${experience.company}-${index}`}>
              <div className="resume-entry__header">
                <h3 className="resume-entry__title">{experience.position}</h3>
                <span className="resume-entry__date">{formatPeriod(experience, pdfLocale, t)}</span>
              </div>
              <p className="resume-entry__subtitle">
                {joinMeta(experience.company, experience.location, experience.employmentType)}
              </p>
              {experience.description ? (
                <p className="resume-entry__body">{experience.description}</p>
              ) : null}
              <ResumeHighlights items={experience.highlights} />
            </div>
          ))}
        </section>
      ) : null}

      {data.education && data.education.length > 0 ? (
        <section className="resume-section">
          <h2 className="resume-section__title">{t("sectionTitles.education")}</h2>
          {data.education.map((education, index) => (
            <div className="resume-entry" key={`${education.institution}-${index}`}>
              <div className="resume-entry__header">
                <h3 className="resume-entry__title">{education.degree}</h3>
                <span className="resume-entry__date">{formatPeriod(education, pdfLocale, t)}</span>
              </div>
              <p className="resume-entry__subtitle">
                {joinMeta(education.institution, education.location)}
              </p>
              <EducationDetails education={education} pdfLocale={pdfLocale} />
            </div>
          ))}
        </section>
      ) : null}

      {data.projects && data.projects.length > 0 ? (
        <section className="resume-section">
          <h2 className="resume-section__title">{t("sectionTitles.projects")}</h2>
          {data.projects.map((project, index) => (
            <div className="resume-entry" key={`${project.name}-${index}`}>
              <div className="resume-entry__header">
                <h3 className="resume-entry__title">{project.name}</h3>
                <span className="resume-entry__date">{formatPeriod(project, pdfLocale, t)}</span>
              </div>
              {project.role ? <p className="resume-entry__subtitle">{project.role}</p> : null}
              {project.description ? (
                <p className="resume-entry__body">{project.description}</p>
              ) : null}
              <ResumeHighlights items={project.highlights} />
              {project.link ? (
                <a
                  className="resume-entry__link"
                  href={project.link}
                  rel="noreferrer"
                  target="_blank"
                >
                  {project.link}
                </a>
              ) : null}
            </div>
          ))}
        </section>
      ) : null}

      {data.skills && data.skills.length > 0 ? (
        <section className="resume-section">
          <h2 className="resume-section__title">{t("sectionTitles.skills")}</h2>
          <div className="resume-tags">
            {data.skills.flatMap((category) =>
              category.items.map((item) => (
                <span className="resume-tag" key={`${category.category}-${item}`}>
                  {item}
                </span>
              )),
            )}
          </div>
        </section>
      ) : null}

      {data.languages && data.languages.length > 0 ? (
        <section className="resume-section">
          <h2 className="resume-section__title">{t("sectionTitles.languages")}</h2>
          <ul className="template-minimal__languages">
            {data.languages.map((language) => (
              <li key={language.language}>
                {language.language} - {joinMeta(language.proficiency, language.certificate)}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <ResumeExtraSections data={data} pdfLocale={pdfLocale} />
    </div>
  );
}

export default TemplateMinimal;

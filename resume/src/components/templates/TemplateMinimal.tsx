import { useTranslation } from "react-i18next";
import ContactList from "@/components/molecules/ContactList";
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
                <span className="resume-entry__date">{experience.duration}</span>
              </div>
              <p className="resume-entry__subtitle">{experience.company}</p>
              <p className="resume-entry__body">{experience.description}</p>
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
                <span className="resume-entry__date">{education.duration}</span>
              </div>
              <p className="resume-entry__subtitle">{education.institution}</p>
              {education.grades ? (
                <p className="resume-entry__detail">
                  {t("fieldLabels.grade")}: {education.grades}
                </p>
              ) : null}
            </div>
          ))}
        </section>
      ) : null}

      {data.projects && data.projects.length > 0 ? (
        <section className="resume-section">
          <h2 className="resume-section__title">{t("sectionTitles.projects")}</h2>
          {data.projects.map((project, index) => (
            <div className="resume-entry" key={`${project.name}-${index}`}>
              <h3 className="resume-entry__title">{project.name}</h3>
              <p className="resume-entry__body">{project.description}</p>
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
                {language.language} - {language.proficiency}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

export default TemplateMinimal;

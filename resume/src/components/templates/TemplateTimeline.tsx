import { useTranslation } from "react-i18next";
import ContactList from "@/components/molecules/ContactList";
import PersonalDetailsList, {
  hasPersonalDetails,
} from "@/components/molecules/PersonalDetailsList";
import type { ResumeData } from "@/types";

interface TemplateTimelineProps {
  data: ResumeData;
  pdfLocale: string;
}

/** Timeline template with vertical timeline markers for experience and education entries. */
function TemplateTimeline({ data, pdfLocale }: TemplateTimelineProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(pdfLocale);

  return (
    <div className="template template--timeline">
      <header className="template-timeline__header">
        <div>
          <h1 className="template-timeline__name">{data.name}</h1>
          <p className="template-timeline__title">{data.jobTitle}</p>
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
        <section className="template-timeline__section">
          <h2 className="template-timeline__section-title">{t("sectionTitles.experience")}</h2>
          <div className="template-timeline__entries">
            {data.experience.map((experience, index) => (
              <div className="template-timeline__entry" key={`${experience.company}-${index}`}>
                <div className="resume-entry__header">
                  <h3 className="template-timeline__entry-title">{experience.position}</h3>
                  <span className="template-timeline__entry-date">{experience.duration}</span>
                </div>
                <p className="template-timeline__entry-subtitle">{experience.company}</p>
                <p className="template-timeline__entry-body">{experience.description}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.education && data.education.length > 0 ? (
        <section className="template-timeline__section">
          <h2 className="template-timeline__section-title">{t("sectionTitles.education")}</h2>
          <div className="template-timeline__entries">
            {data.education.map((education, index) => (
              <div className="template-timeline__entry" key={`${education.institution}-${index}`}>
                <div className="resume-entry__header">
                  <h3 className="template-timeline__entry-title">{education.degree}</h3>
                  <span className="template-timeline__entry-date">{education.duration}</span>
                </div>
                <p className="template-timeline__entry-subtitle">{education.institution}</p>
                {education.grades ? (
                  <p className="resume-entry__detail">
                    {t("fieldLabels.grade")}: {education.grades}
                  </p>
                ) : null}
                {education.thesis ? (
                  <p className="resume-entry__detail">
                    {t("fieldLabels.thesis")}: {education.thesis}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.projects && data.projects.length > 0 ? (
        <section className="resume-section">
          <h2 className="resume-section__title">{t("sectionTitles.projects")}</h2>
          {data.projects.map((project, index) => (
            <div className="resume-entry" key={`${project.name}-${index}`}>
              <h3 className="resume-entry__title">{project.name}</h3>
              <p className="resume-entry__body">{project.description}</p>
              {project.technologies && project.technologies.length > 0 ? (
                <div className="resume-tags">
                  {project.technologies.map((tech) => (
                    <span className="resume-tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
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
          <div className="template-timeline__skills-grid">
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
          <ul className="template-timeline__languages">
            {data.languages.map((language) => (
              <li key={language.language}>
                {language.language} — {language.proficiency}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {data.certifications && data.certifications.length > 0 ? (
        <section className="resume-section">
          <h2 className="resume-section__title">{t("sectionTitles.certifications")}</h2>
          {data.certifications.map((certification, index) => (
            <div className="resume-entry" key={`${certification.name}-${index}`}>
              <div className="resume-entry__header">
                <h3 className="resume-entry__title">{certification.name}</h3>
                {certification.date ? (
                  <span className="resume-entry__date">{certification.date}</span>
                ) : null}
              </div>
              <p className="resume-entry__subtitle">{certification.issuer}</p>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}

export default TemplateTimeline;

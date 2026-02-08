import { useTranslation } from "react-i18next";
import Avatar from "../molecules/Avatar";
import ContactList from "../molecules/ContactList";
import type { ResumeData } from "../../types";

interface TemplateModernProps {
  data: ResumeData;
  pdfLocale: string;
}

function TemplateModern({ data, pdfLocale }: TemplateModernProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(pdfLocale);

  return (
    <div className="template template--modern">
      <aside className="template-modern__sidebar">
        <div className="template-modern__header">
          <Avatar
            name={data.name}
            photo={data.photo}
            className="template-modern__avatar"
          />
          <h1 className="template-modern__name">{data.name}</h1>
          <p className="template-modern__title">{data.jobTitle}</p>
        </div>

        <div className="template-modern__section">
          <h2 className="template-modern__section-title">
            {t("sectionTitles.contact")}
          </h2>
          <ContactList contact={data.contact} />
        </div>

        {data.skills && data.skills.length > 0 && (
          <div className="template-modern__section">
            <h2 className="template-modern__section-title">
              {t("sectionTitles.skills")}
            </h2>
            <div className="template-modern__skills">
              {data.skills.map((category) => (
                <div key={category.category} className="template-modern__skill">
                  <h3 className="template-modern__skill-name">
                    {category.category}
                  </h3>
                  <p className="template-modern__skill-items">
                    {category.items.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.languages && data.languages.length > 0 && (
          <div className="template-modern__section">
            <h2 className="template-modern__section-title">
              {t("sectionTitles.languages")}
            </h2>
            <ul className="template-modern__languages">
              {data.languages.map((language) => (
                <li
                  key={language.language}
                  className="template-modern__language"
                >
                  <span className="template-modern__language-name">
                    {language.language}
                  </span>
                  <span className="template-modern__language-level">
                    {language.proficiency}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <main className="template-modern__main">
        {data.summary && (
          <section className="resume-section">
            <h2 className="resume-section__title">
              {t("sectionTitles.profile")}
            </h2>
            <p className="resume-section__body">{data.summary}</p>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section__title">
              {t("sectionTitles.experience")}
            </h2>
            {data.experience.map((experience, index) => (
              <div
                key={`${experience.company}-${index}`}
                className="resume-entry"
              >
                <div className="resume-entry__header">
                  <h3 className="resume-entry__title">{experience.position}</h3>
                  <span className="resume-entry__date">
                    {experience.duration}
                  </span>
                </div>
                <p className="resume-entry__subtitle">{experience.company}</p>
                <p className="resume-entry__body">{experience.description}</p>
              </div>
            ))}
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section__title">
              {t("sectionTitles.education")}
            </h2>
            {data.education.map((education, index) => (
              <div
                key={`${education.institution}-${index}`}
                className="resume-entry"
              >
                <div className="resume-entry__header">
                  <h3 className="resume-entry__title">{education.degree}</h3>
                  <span className="resume-entry__date">
                    {education.duration}
                  </span>
                </div>
                <p className="resume-entry__subtitle">
                  {education.institution}
                </p>
                {education.grades && (
                  <p className="resume-entry__detail">
                    {t("fieldLabels.grade")}: {education.grades}
                  </p>
                )}
                {education.thesis && (
                  <p className="resume-entry__detail">
                    {t("fieldLabels.thesis")}: {education.thesis}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {data.projects && data.projects.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section__title">
              {t("sectionTitles.projects")}
            </h2>
            {data.projects.map((project, index) => (
              <div key={`${project.name}-${index}`} className="resume-entry">
                <h3 className="resume-entry__title">{project.name}</h3>
                <p className="resume-entry__body">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="resume-tags">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="resume-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    className="resume-entry__link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.link}
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {data.certifications && data.certifications.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section__title">
              {t("sectionTitles.certifications")}
            </h2>
            {data.certifications.map((certification, index) => (
              <div
                key={`${certification.name}-${index}`}
                className="resume-entry"
              >
                <div className="resume-entry__header">
                  <h3 className="resume-entry__title">{certification.name}</h3>
                  {certification.date && (
                    <span className="resume-entry__date">
                      {certification.date}
                    </span>
                  )}
                </div>
                <p className="resume-entry__subtitle">{certification.issuer}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default TemplateModern;

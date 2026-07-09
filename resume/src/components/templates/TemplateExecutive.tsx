import { useTranslation } from "react-i18next";
import ContactList from "@/components/molecules/ContactList";
import PersonalDetailsList, {
  hasPersonalDetails,
} from "@/components/molecules/PersonalDetailsList";
import type { ResumeData } from "@/types";

interface TemplateExecutiveProps {
  data: ResumeData;
  pdfLocale: string;
}

/** Executive resume layout with a clean single-column design for senior roles. */
function TemplateExecutive({ data, pdfLocale }: TemplateExecutiveProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(pdfLocale);

  return (
    <div className="template template--executive">
      <header className="template-executive__header">
        <h1 className="template-executive__name">{data.name}</h1>
        <p className="template-executive__title">{data.jobTitle}</p>
        <div className="template-executive__contact">
          <ContactList contact={data.contact} />
          {hasPersonalDetails(data.personalDetails) ? (
            <PersonalDetailsList compact details={data.personalDetails} pdfLocale={pdfLocale} />
          ) : null}
        </div>
      </header>

      <main className="template-executive__body">
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
                {education.thesis ? (
                  <p className="resume-entry__detail">
                    {t("fieldLabels.thesis")}: {education.thesis}
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

        <div className="template-executive__footer-grid">
          {data.skills && data.skills.length > 0 ? (
            <section className="resume-section">
              <h2 className="resume-section__title">{t("sectionTitles.skills")}</h2>
              <div className="template-executive__skills">
                {data.skills.map((category) => (
                  <p className="template-executive__skill-row" key={category.category}>
                    <span className="template-executive__skill-name">{category.category}:</span>{" "}
                    <span className="template-executive__skill-items">
                      {category.items.join(", ")}
                    </span>
                  </p>
                ))}
              </div>
            </section>
          ) : null}

          {data.languages && data.languages.length > 0 ? (
            <section className="resume-section">
              <h2 className="resume-section__title">{t("sectionTitles.languages")}</h2>
              <ul className="template-executive__languages">
                {data.languages.map((language) => (
                  <li key={language.language}>
                    {language.language} - {language.proficiency}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default TemplateExecutive;

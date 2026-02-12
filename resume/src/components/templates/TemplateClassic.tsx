import { useTranslation } from "react-i18next";
import Avatar from "../molecules/Avatar";
import ContactList from "../molecules/ContactList";
import type { ResumeData } from "../../types";

interface TemplateClassicProps {
  data: ResumeData;
  pdfLocale: string;
}

function TemplateClassic({ data, pdfLocale }: TemplateClassicProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(pdfLocale);

  return (
    <div className="template template--classic">
      <header className="template-classic__header">
        <div className="template-classic__identity">
          <Avatar className="template-classic__avatar" name={data.name} photo={data.photo} />
          <div>
            <h1 className="template-classic__name">{data.name}</h1>
            <p className="template-classic__title">{data.jobTitle}</p>
          </div>
        </div>
        <ContactList contact={data.contact} />
      </header>

      <div className="template-classic__body">
        <div className="template-classic__column">
          {data.summary ? <section className="resume-section">
              <h2 className="resume-section__title">{t("sectionTitles.profile")}</h2>
              <p className="resume-section__body">{data.summary}</p>
            </section> : null}

          {data.skills && data.skills.length > 0 ? <section className="resume-section">
              <h2 className="resume-section__title">{t("sectionTitles.skills")}</h2>
              <div className="resume-section__body">
                {data.skills.map((category) => (
                  <div className="resume-entry" key={category.category}>
                    <h3 className="resume-entry__title">{category.category}</h3>
                    <p className="resume-entry__body">{category.items.join(", ")}</p>
                  </div>
                ))}
              </div>
            </section> : null}

          {data.languages && data.languages.length > 0 ? <section className="resume-section">
              <h2 className="resume-section__title">{t("sectionTitles.languages")}</h2>
              <ul className="template-classic__languages">
                {data.languages.map((language) => (
                  <li key={language.language}>
                    {language.language} - {language.proficiency}
                  </li>
                ))}
              </ul>
            </section> : null}
        </div>

        <div className="template-classic__column">
          {data.experience && data.experience.length > 0 ? <section className="resume-section">
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
            </section> : null}

          {data.education && data.education.length > 0 ? <section className="resume-section">
              <h2 className="resume-section__title">{t("sectionTitles.education")}</h2>
              {data.education.map((education, index) => (
                <div className="resume-entry" key={`${education.institution}-${index}`}>
                  <div className="resume-entry__header">
                    <h3 className="resume-entry__title">{education.degree}</h3>
                    <span className="resume-entry__date">{education.duration}</span>
                  </div>
                  <p className="resume-entry__subtitle">{education.institution}</p>
                  {education.grades ? <p className="resume-entry__detail">
                      {t("fieldLabels.grade")}: {education.grades}
                    </p> : null}
                </div>
              ))}
            </section> : null}

          {data.projects && data.projects.length > 0 ? <section className="resume-section">
              <h2 className="resume-section__title">{t("sectionTitles.projects")}</h2>
              {data.projects.map((project, index) => (
                <div className="resume-entry" key={`${project.name}-${index}`}>
                  <h3 className="resume-entry__title">{project.name}</h3>
                  <p className="resume-entry__body">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 ? <div className="resume-tags">
                      {project.technologies.map((tech) => (
                        <span className="resume-tag" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div> : null}
                </div>
              ))}
            </section> : null}

          {data.certifications && data.certifications.length > 0 ? <section className="resume-section">
              <h2 className="resume-section__title">{t("sectionTitles.certifications")}</h2>
              {data.certifications.map((certification, index) => (
                <div className="resume-entry" key={`${certification.name}-${index}`}>
                  <div className="resume-entry__header">
                    <h3 className="resume-entry__title">{certification.name}</h3>
                    {certification.date ? <span className="resume-entry__date">{certification.date}</span> : null}
                  </div>
                  <p className="resume-entry__subtitle">{certification.issuer}</p>
                </div>
              ))}
            </section> : null}
        </div>
      </div>
    </div>
  );
}

export default TemplateClassic;

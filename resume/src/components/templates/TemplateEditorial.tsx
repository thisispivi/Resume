import { useTranslation } from "react-i18next";
import ContactList from "@/components/molecules/ContactList";
import PersonalDetailsList from "@/components/molecules/PersonalDetailsList";
import type { ResumeData } from "@/types";

interface TemplateEditorialProps {
  data: ResumeData;
  pdfLocale: string;
}

/** Editorial resume layout with magazine-style hierarchy and dense scannable columns. */
function TemplateEditorial({ data, pdfLocale }: TemplateEditorialProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(pdfLocale);

  return (
    <div className="template template--editorial">
      <header className="template-editorial__masthead">
        <div>
          <p className="template-editorial__role">{data.jobTitle}</p>
          <h1 className="template-editorial__name">{data.name}</h1>
        </div>
        <div className="template-editorial__contact">
          <ContactList contact={data.contact} />
        </div>
      </header>

      <main className="template-editorial__grid">
        <section className="template-editorial__lead">
          <h2>{t("sectionTitles.profile")}</h2>
          {data.summary ? <p>{data.summary}</p> : null}
          <PersonalDetailsList compact details={data.personalDetails} pdfLocale={pdfLocale} />
        </section>

        <section className="template-editorial__column template-editorial__column--wide">
          {data.experience && data.experience.length > 0 ? (
            <div className="resume-section">
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
            </div>
          ) : null}

          {data.projects && data.projects.length > 0 ? (
            <div className="resume-section">
              <h2 className="resume-section__title">{t("sectionTitles.projects")}</h2>
              {data.projects.map((project, index) => (
                <div className="resume-entry" key={`${project.name}-${index}`}>
                  <h3 className="resume-entry__title">{project.name}</h3>
                  <p className="resume-entry__body">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 ? (
                    <div className="resume-tags">
                      {project.technologies.map((tech) => (
                        <span className="resume-tag" key={`${project.name}-${tech}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </section>

        <aside className="template-editorial__column">
          {data.skills && data.skills.length > 0 ? (
            <section className="template-editorial__side-section">
              <h2>{t("sectionTitles.skills")}</h2>
              {data.skills.map((category) => (
                <div className="template-editorial__skill" key={category.category}>
                  <h3>{category.category}</h3>
                  <p>{category.items.join(", ")}</p>
                </div>
              ))}
            </section>
          ) : null}

          {data.education && data.education.length > 0 ? (
            <section className="template-editorial__side-section">
              <h2>{t("sectionTitles.education")}</h2>
              {data.education.map((education, index) => (
                <div className="template-editorial__mini-entry" key={`${education.institution}-${index}`}>
                  <h3>{education.degree}</h3>
                  <p>{education.institution}</p>
                  <span>{education.duration}</span>
                </div>
              ))}
            </section>
          ) : null}

          {data.languages && data.languages.length > 0 ? (
            <section className="template-editorial__side-section">
              <h2>{t("sectionTitles.languages")}</h2>
              <ul className="template-editorial__languages">
                {data.languages.map((language) => (
                  <li key={language.language}>
                    <span>{language.language}</span>
                    <strong>{language.proficiency}</strong>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {data.certifications && data.certifications.length > 0 ? (
            <section className="template-editorial__side-section">
              <h2>{t("sectionTitles.certifications")}</h2>
              {data.certifications.map((certification, index) => (
                <div className="template-editorial__mini-entry" key={`${certification.name}-${index}`}>
                  <h3>{certification.name}</h3>
                  <p>{certification.issuer}</p>
                  {certification.date ? <span>{certification.date}</span> : null}
                </div>
              ))}
            </section>
          ) : null}
        </aside>
      </main>
    </div>
  );
}

export default TemplateEditorial;

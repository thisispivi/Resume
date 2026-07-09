import { useTranslation } from "react-i18next";
import Avatar from "@/components/molecules/Avatar";
import ContactList from "@/components/molecules/ContactList";
import PersonalDetailsList, {
  hasPersonalDetails,
} from "@/components/molecules/PersonalDetailsList";
import type { ResumeData } from "@/types";

interface TemplatePortfolioProps {
  data: ResumeData;
  pdfLocale: string;
}

/** Portfolio-style resume for design, product, tech, and project-led profiles. */
function TemplatePortfolio({ data, pdfLocale }: TemplatePortfolioProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(pdfLocale);
  const featuredProjects = data.projects?.slice(0, 3) ?? [];

  return (
    <div className="template template--portfolio">
      <header className="template-portfolio__hero">
        <div className="template-portfolio__identity">
          <p className="template-portfolio__eyebrow">{data.jobTitle}</p>
          <h1 className="template-portfolio__name">{data.name}</h1>
          {data.summary ? <p className="template-portfolio__summary">{data.summary}</p> : null}
        </div>
        <Avatar className="template-portfolio__avatar" name={data.name} photo={data.photo} />
      </header>

      <div className="template-portfolio__body">
        <aside className="template-portfolio__sidebar">
          <section className="template-portfolio__section">
            <h2 className="template-portfolio__section-title">{t("sectionTitles.contact")}</h2>
            <ContactList contact={data.contact} />
          </section>

          {hasPersonalDetails(data.personalDetails) ? (
            <section className="template-portfolio__section">
              <h2 className="template-portfolio__section-title">{t("sectionTitles.details")}</h2>
              <PersonalDetailsList details={data.personalDetails} pdfLocale={pdfLocale} />
            </section>
          ) : null}

          {data.skills && data.skills.length > 0 ? (
            <section className="template-portfolio__section">
              <h2 className="template-portfolio__section-title">{t("sectionTitles.skills")}</h2>
              <div className="template-portfolio__skills">
                {data.skills.map((category) => (
                  <div className="template-portfolio__skill-group" key={category.category}>
                    <h3>{category.category}</h3>
                    <div className="resume-tags">
                      {category.items.map((item) => (
                        <span className="resume-tag" key={`${category.category}-${item}`}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {data.languages && data.languages.length > 0 ? (
            <section className="template-portfolio__section">
              <h2 className="template-portfolio__section-title">{t("sectionTitles.languages")}</h2>
              <ul className="template-portfolio__languages">
                {data.languages.map((language) => (
                  <li key={language.language}>
                    <span>{language.language}</span>
                    <strong>{language.proficiency}</strong>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>

        <main className="template-portfolio__main">
          {featuredProjects.length > 0 ? (
            <section className="template-portfolio__feature">
              <h2>{t("sectionTitles.projects")}</h2>
              <div className="template-portfolio__project-grid">
                {featuredProjects.map((project, index) => (
                  <article className="template-portfolio__project" key={`${project.name}-${index}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    {project.technologies && project.technologies.length > 0 ? (
                      <small>{project.technologies.join(" / ")}</small>
                    ) : null}
                  </article>
                ))}
              </div>
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
        </main>
      </div>
    </div>
  );
}

export default TemplatePortfolio;

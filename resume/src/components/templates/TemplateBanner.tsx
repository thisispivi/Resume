import { useTranslation } from "react-i18next";
import Avatar from "@/components/molecules/Avatar";
import ContactList from "@/components/molecules/ContactList";
import PersonalDetailsList, { hasPersonalDetails } from "@/components/molecules/PersonalDetailsList";
import type { ResumeData } from "@/types";

interface TemplateBannerProps {
  data: ResumeData;
  pdfLocale: string;
}

/** Banner resume layout with a full-width colored header band and a slim sidebar. */
function TemplateBanner({ data, pdfLocale }: TemplateBannerProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(pdfLocale);

  return (
    <div className="template template--banner">
      <header className="template-banner__header">
        <Avatar className="template-banner__avatar" name={data.name} photo={data.photo} />
        <div>
          <h1 className="template-banner__name">{data.name}</h1>
          <p className="template-banner__title">{data.jobTitle}</p>
        </div>
        <div className="template-banner__meta">
          <ContactList contact={data.contact} />
          {hasPersonalDetails(data.personalDetails) ? (
            <PersonalDetailsList compact details={data.personalDetails} pdfLocale={pdfLocale} />
          ) : null}
        </div>
      </header>

      <div className="template-banner__body">
        <aside className="template-banner__side">
          {data.skills && data.skills.length > 0 ? (
            <section className="template-banner__section">
              <h2 className="template-banner__section-title">{t("sectionTitles.skills")}</h2>
              <div className="template-banner__skills">
                {data.skills.map((category) => (
                  <div key={category.category}>
                    <h3 className="template-banner__skill-name">{category.category}</h3>
                    <p className="template-banner__skill-items">{category.items.join(", ")}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {data.languages && data.languages.length > 0 ? (
            <section className="template-banner__section">
              <h2 className="template-banner__section-title">{t("sectionTitles.languages")}</h2>
              <ul className="template-banner__languages">
                {data.languages.map((language) => (
                  <li className="template-banner__language" key={language.language}>
                    <span>{language.language}</span>
                    <span>{language.proficiency}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {data.certifications && data.certifications.length > 0 ? (
            <section className="template-banner__section">
              <h2 className="template-banner__section-title">{t("sectionTitles.certifications")}</h2>
              {data.certifications.map((certification, index) => (
                <div className="resume-entry" key={`${certification.name}-${index}`}>
                  <h3 className="resume-entry__title">{certification.name}</h3>
                  <p className="resume-entry__subtitle">{certification.issuer}</p>
                  {certification.date ? (
                    <span className="resume-entry__date">{certification.date}</span>
                  ) : null}
                </div>
              ))}
            </section>
          ) : null}
        </aside>

        <main className="template-banner__main">
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
                  {project.technologies && project.technologies.length > 0 ? (
                    <div className="resume-tags">
                      {project.technologies.map((tech) => (
                        <span className="resume-tag" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default TemplateBanner;

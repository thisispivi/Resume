import { useTranslation } from "react-i18next";
import Avatar from "@/components/molecules/Avatar";
import ContactList from "@/components/molecules/ContactList";
import PersonalDetailsList, {
  hasPersonalDetails,
} from "@/components/molecules/PersonalDetailsList";
import ResumeHighlights from "@/components/molecules/ResumeHighlights";
import EducationDetails from "@/components/molecules/EducationDetails";
import ResumeExtraSections from "@/components/molecules/ResumeExtraSections";
import { formatCertificationPeriod, formatPeriod, joinMeta } from "@/utils/resumeFormat";
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
                    <strong>{joinMeta(language.proficiency, language.certificate)}</strong>
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
                    {project.description ? <p>{project.description}</p> : null}
                    <ResumeHighlights items={project.highlights} />
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
                    <span className="resume-entry__date">
                      {formatPeriod(experience, pdfLocale, t)}
                    </span>
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
                    <span className="resume-entry__date">
                      {formatPeriod(education, pdfLocale, t)}
                    </span>
                  </div>
                  <p className="resume-entry__subtitle">
                    {joinMeta(education.institution, education.location)}
                  </p>
                  <EducationDetails education={education} pdfLocale={pdfLocale} />
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
                      <span className="resume-entry__date">
                        {formatCertificationPeriod(certification, pdfLocale)}
                      </span>
                    ) : null}
                  </div>
                  <p className="resume-entry__subtitle">
                    {joinMeta(certification.issuer, certification.credentialId)}
                  </p>
                </div>
              ))}
            </section>
          ) : null}
          <ResumeExtraSections data={data} pdfLocale={pdfLocale} />
        </main>
      </div>
    </div>
  );
}

export default TemplatePortfolio;

import { useTranslation } from "react-i18next";
import ContactList from "@/components/molecules/ContactList";
import PersonalDetailsList from "@/components/molecules/PersonalDetailsList";
import ResumeHighlights from "@/components/molecules/ResumeHighlights";
import EducationDetails from "@/components/molecules/EducationDetails";
import ResumeExtraSections from "@/components/molecules/ResumeExtraSections";
import { formatCertificationPeriod, formatPeriod, joinMeta } from "@/utils/resumeFormat";
import { hasPersonalDetails } from "@/utils/resume";
import type { ResumeData } from "@/types";

interface TemplateElegantProps {
  data: ResumeData;
  pdfLocale: string;
}

/** Elegant template with centered header, decorative line, and balanced two-column layout. */
function TemplateElegant({ data, pdfLocale }: TemplateElegantProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(pdfLocale);

  return (
    <div className="template template--elegant">
      <header className="template-elegant__header">
        <h1 className="template-elegant__name">{data.name}</h1>
        <div className="template-elegant__divider" />
        <p className="template-elegant__title">{data.jobTitle}</p>
        <div className="template-elegant__contact">
          <ContactList contact={data.contact} />
          {hasPersonalDetails(data.personalDetails) ? (
            <PersonalDetailsList compact details={data.personalDetails} pdfLocale={pdfLocale} />
          ) : null}
        </div>
      </header>

      <div className="template-elegant__body">
        <main className="template-elegant__main">
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

          {data.projects && data.projects.length > 0 ? (
            <section className="resume-section">
              <h2 className="resume-section__title">{t("sectionTitles.projects")}</h2>
              {data.projects.map((project, index) => (
                <div className="resume-entry" key={`${project.name}-${index}`}>
                  <div className="resume-entry__header">
                    <h3 className="resume-entry__title">{project.name}</h3>
                    <span className="resume-entry__date">
                      {formatPeriod(project, pdfLocale, t)}
                    </span>
                  </div>
                  {project.role ? <p className="resume-entry__subtitle">{project.role}</p> : null}
                  {project.description ? (
                    <p className="resume-entry__body">{project.description}</p>
                  ) : null}
                  <ResumeHighlights items={project.highlights} />
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
          <ResumeExtraSections data={data} pdfLocale={pdfLocale} />
        </main>

        <aside className="template-elegant__side">
          {data.skills && data.skills.length > 0 ? (
            <section className="resume-section">
              <h2 className="resume-section__title">{t("sectionTitles.skills")}</h2>
              <div className="template-elegant__skills">
                {data.skills.map((category) => (
                  <div className="template-elegant__skill" key={category.category}>
                    <h3 className="template-elegant__skill-name">{category.category}</h3>
                    <p className="template-elegant__skill-items">{category.items.join(", ")}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {data.languages && data.languages.length > 0 ? (
            <section className="resume-section">
              <h2 className="resume-section__title">{t("sectionTitles.languages")}</h2>
              <ul className="template-elegant__languages">
                {data.languages.map((language) => (
                  <li className="template-elegant__language" key={language.language}>
                    <span className="template-elegant__language-name">{language.language}</span>
                    <span className="template-elegant__language-level">
                      {joinMeta(language.proficiency, language.certificate)}
                    </span>
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
        </aside>
      </div>
    </div>
  );
}

export default TemplateElegant;

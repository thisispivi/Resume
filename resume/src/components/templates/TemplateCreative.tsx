import { useTranslation } from "react-i18next";
import Avatar from "@/components/molecules/Avatar";
import ContactList from "@/components/molecules/ContactList";
import PersonalDetailsList from "@/components/molecules/PersonalDetailsList";
import ResumeHighlights from "@/components/molecules/ResumeHighlights";
import EducationDetails from "@/components/molecules/EducationDetails";
import ResumeExtraSections from "@/components/molecules/ResumeExtraSections";
import { formatCertificationPeriod, formatPeriod, joinMeta } from "@/utils/resumeFormat";
import { hasPersonalDetails } from "@/utils/resume";
import type { ResumeData } from "@/types";

interface TemplateCreativeProps {
  data: ResumeData;
  pdfLocale: string;
}

/** Creative resume layout with a bold banner header and colored sidebar for skills. */
function TemplateCreative({ data, pdfLocale }: TemplateCreativeProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(pdfLocale);

  return (
    <div className="template template--creative">
      <header className="template-creative__banner">
        <Avatar className="template-creative__avatar" name={data.name} photo={data.photo} />
        <h1 className="template-creative__name">{data.name}</h1>
        <p className="template-creative__title">{data.jobTitle}</p>
        <div className="template-creative__contact">
          <ContactList contact={data.contact} />
        </div>
      </header>

      <div className="template-creative__body">
        <aside className="template-creative__sidebar">
          {data.skills && data.skills.length > 0 ? (
            <section className="template-creative__section">
              <h2 className="template-creative__section-title">{t("sectionTitles.skills")}</h2>
              <div className="template-creative__skills">
                {data.skills.map((category) => (
                  <div key={category.category}>
                    <h3 className="template-creative__skill-name">{category.category}</h3>
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

          {hasPersonalDetails(data.personalDetails) ? (
            <section className="template-creative__section">
              <h2 className="template-creative__section-title">{t("sectionTitles.details")}</h2>
              <PersonalDetailsList details={data.personalDetails} pdfLocale={pdfLocale} />
            </section>
          ) : null}

          {data.languages && data.languages.length > 0 ? (
            <section className="template-creative__section">
              <h2 className="template-creative__section-title">{t("sectionTitles.languages")}</h2>
              <ul className="template-creative__languages">
                {data.languages.map((language) => (
                  <li className="template-creative__language" key={language.language}>
                    <span className="template-creative__language-name">{language.language}</span>
                    <span className="template-creative__language-level">
                      {joinMeta(language.proficiency, language.certificate)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>

        <main className="template-creative__main">
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

export default TemplateCreative;

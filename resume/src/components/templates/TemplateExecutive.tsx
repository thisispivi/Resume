import { useTranslation } from "react-i18next";
import ContactList from "@/components/molecules/ContactList";
import PersonalDetailsList, {
  hasPersonalDetails,
} from "@/components/molecules/PersonalDetailsList";
import ResumeHighlights from "@/components/molecules/ResumeHighlights";
import EducationDetails from "@/components/molecules/EducationDetails";
import ResumeExtraSections from "@/components/molecules/ResumeExtraSections";
import { formatCertificationPeriod, formatPeriod, joinMeta } from "@/utils/resumeFormat";
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
                  <span className="resume-entry__date">{formatPeriod(project, pdfLocale, t)}</span>
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
                    {language.language} - {joinMeta(language.proficiency, language.certificate)}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
        <ResumeExtraSections data={data} pdfLocale={pdfLocale} />
      </main>
    </div>
  );
}

export default TemplateExecutive;

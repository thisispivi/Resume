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
                    <span>{joinMeta(language.proficiency, language.certificate)}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {data.certifications && data.certifications.length > 0 ? (
            <section className="template-banner__section">
              <h2 className="template-banner__section-title">
                {t("sectionTitles.certifications")}
              </h2>
              {data.certifications.map((certification, index) => (
                <div className="resume-entry" key={`${certification.name}-${index}`}>
                  <h3 className="resume-entry__title">{certification.name}</h3>
                  <p className="resume-entry__subtitle">
                    {joinMeta(certification.issuer, certification.credentialId)}
                  </p>
                  {certification.date ? (
                    <span className="resume-entry__date">
                      {formatCertificationPeriod(certification, pdfLocale)}
                    </span>
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

export default TemplateBanner;

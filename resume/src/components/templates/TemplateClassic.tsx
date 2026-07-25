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

interface TemplateClassicProps {
  data: ResumeData;
  pdfLocale: string;
}

/** Classic resume layout with a centered header, avatar, and two-column body. */
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
        {hasPersonalDetails(data.personalDetails) ? (
          <PersonalDetailsList compact details={data.personalDetails} pdfLocale={pdfLocale} />
        ) : null}
      </header>

      <div className="template-classic__body">
        <div className="template-classic__column">
          {data.summary ? (
            <section className="resume-section">
              <h2 className="resume-section__title">{t("sectionTitles.profile")}</h2>
              <p className="resume-section__body">{data.summary}</p>
            </section>
          ) : null}

          {data.skills && data.skills.length > 0 ? (
            <section className="resume-section">
              <h2 className="resume-section__title">{t("sectionTitles.skills")}</h2>
              <div className="resume-section__body">
                {data.skills.map((category) => (
                  <div className="resume-entry" key={category.category}>
                    <h3 className="resume-entry__title">{category.category}</h3>
                    <p className="resume-entry__body">{category.items.join(", ")}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {data.languages && data.languages.length > 0 ? (
            <section className="resume-section">
              <h2 className="resume-section__title">{t("sectionTitles.languages")}</h2>
              <ul className="template-classic__languages">
                {data.languages.map((language) => (
                  <li key={language.language}>
                    {language.language} - {joinMeta(language.proficiency, language.certificate)}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <div className="template-classic__column">
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
        </div>
      </div>
    </div>
  );
}

export default TemplateClassic;

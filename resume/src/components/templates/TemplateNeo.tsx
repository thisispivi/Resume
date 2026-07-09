import { useTranslation } from "react-i18next";
import Avatar from "@/components/molecules/Avatar";
import ContactList from "@/components/molecules/ContactList";
import PersonalDetailsList, {
  hasPersonalDetails,
} from "@/components/molecules/PersonalDetailsList";
import type { ResumeData } from "@/types";

interface TemplateNeoProps {
  data: ResumeData;
  pdfLocale: string;
}

/** Neo resume layout with a gradient hero header and card-style entries. */
function TemplateNeo({ data, pdfLocale }: TemplateNeoProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(pdfLocale);

  return (
    <div className="template template--neo">
      <header className="template-neo__hero">
        <Avatar className="template-neo__avatar" name={data.name} photo={data.photo} />
        <h1 className="template-neo__name">{data.name}</h1>
        <p className="template-neo__title">{data.jobTitle}</p>
        <div className="template-neo__meta">
          <ContactList contact={data.contact} />
          {hasPersonalDetails(data.personalDetails) ? (
            <PersonalDetailsList compact details={data.personalDetails} pdfLocale={pdfLocale} />
          ) : null}
        </div>
      </header>

      <div className="template-neo__body">
        {data.summary ? (
          <section className="template-neo__card">
            <h2 className="template-neo__card-title">{t("sectionTitles.profile")}</h2>
            <p className="resume-section__body">{data.summary}</p>
          </section>
        ) : null}

        {data.experience && data.experience.length > 0 ? (
          <section className="template-neo__card">
            <h2 className="template-neo__card-title">{t("sectionTitles.experience")}</h2>
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

        <div className="template-neo__grid">
          {data.education && data.education.length > 0 ? (
            <section className="template-neo__card">
              <h2 className="template-neo__card-title">{t("sectionTitles.education")}</h2>
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

          {data.skills && data.skills.length > 0 ? (
            <section className="template-neo__card">
              <h2 className="template-neo__card-title">{t("sectionTitles.skills")}</h2>
              <div className="resume-tags">
                {data.skills.flatMap((category) =>
                  category.items.map((item) => (
                    <span className="resume-tag" key={`${category.category}-${item}`}>
                      {item}
                    </span>
                  )),
                )}
              </div>
            </section>
          ) : null}
        </div>

        {data.projects && data.projects.length > 0 ? (
          <section className="template-neo__card">
            <h2 className="template-neo__card-title">{t("sectionTitles.projects")}</h2>
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

        <div className="template-neo__grid">
          {data.languages && data.languages.length > 0 ? (
            <section className="template-neo__card">
              <h2 className="template-neo__card-title">{t("sectionTitles.languages")}</h2>
              <ul className="template-neo__languages">
                {data.languages.map((language) => (
                  <li key={language.language}>
                    {language.language} — {language.proficiency}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {data.certifications && data.certifications.length > 0 ? (
            <section className="template-neo__card">
              <h2 className="template-neo__card-title">{t("sectionTitles.certifications")}</h2>
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
        </div>
      </div>
    </div>
  );
}

export default TemplateNeo;

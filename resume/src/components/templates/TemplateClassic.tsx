import Avatar from "../molecules/Avatar";
import ContactList from "../molecules/ContactList";
import type { ResumeData, UiCopy } from "../../types";

interface TemplateClassicProps {
  data: ResumeData;
  copy: UiCopy;
}

function TemplateClassic({ data, copy }: TemplateClassicProps) {
  return (
    <div className="template template--classic">
      <header className="template-classic__header">
        <div className="template-classic__identity">
          <Avatar
            name={data.name}
            photo={data.photo}
            className="template-classic__avatar"
          />
          <div>
            <h1 className="template-classic__name">{data.name}</h1>
            <p className="template-classic__title">{data.jobTitle}</p>
          </div>
        </div>
        <ContactList contact={data.contact} />
      </header>

      <div className="template-classic__body">
        <div className="template-classic__column">
          {data.summary && (
            <section className="resume-section">
              <h2 className="resume-section__title">
                {copy.sectionTitles.profile}
              </h2>
              <p className="resume-section__body">{data.summary}</p>
            </section>
          )}

          {data.skills && data.skills.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section__title">
                {copy.sectionTitles.skills}
              </h2>
              <div className="resume-section__body">
                {data.skills.map((category) => (
                  <div key={category.category} className="resume-entry">
                    <h3 className="resume-entry__title">{category.category}</h3>
                    <p className="resume-entry__body">
                      {category.items.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.languages && data.languages.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section__title">
                {copy.sectionTitles.languages}
              </h2>
              <ul className="template-classic__languages">
                {data.languages.map((language) => (
                  <li key={language.language}>
                    {language.language} - {language.proficiency}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="template-classic__column">
          {data.experience && data.experience.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section__title">
                {copy.sectionTitles.experience}
              </h2>
              {data.experience.map((experience, index) => (
                <div
                  key={`${experience.company}-${index}`}
                  className="resume-entry"
                >
                  <div className="resume-entry__header">
                    <h3 className="resume-entry__title">
                      {experience.position}
                    </h3>
                    <span className="resume-entry__date">
                      {experience.duration}
                    </span>
                  </div>
                  <p className="resume-entry__subtitle">{experience.company}</p>
                  <p className="resume-entry__body">{experience.description}</p>
                </div>
              ))}
            </section>
          )}

          {data.education && data.education.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section__title">
                {copy.sectionTitles.education}
              </h2>
              {data.education.map((education, index) => (
                <div
                  key={`${education.institution}-${index}`}
                  className="resume-entry"
                >
                  <div className="resume-entry__header">
                    <h3 className="resume-entry__title">{education.degree}</h3>
                    <span className="resume-entry__date">
                      {education.duration}
                    </span>
                  </div>
                  <p className="resume-entry__subtitle">
                    {education.institution}
                  </p>
                  {education.grades && (
                    <p className="resume-entry__detail">
                      {copy.fieldLabels.grade}: {education.grades}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {data.projects && data.projects.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section__title">
                {copy.sectionTitles.projects}
              </h2>
              {data.projects.map((project, index) => (
                <div key={`${project.name}-${index}`} className="resume-entry">
                  <h3 className="resume-entry__title">{project.name}</h3>
                  <p className="resume-entry__body">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="resume-tags">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="resume-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section__title">
                {copy.sectionTitles.certifications}
              </h2>
              {data.certifications.map((certification, index) => (
                <div
                  key={`${certification.name}-${index}`}
                  className="resume-entry"
                >
                  <div className="resume-entry__header">
                    <h3 className="resume-entry__title">
                      {certification.name}
                    </h3>
                    {certification.date && (
                      <span className="resume-entry__date">
                        {certification.date}
                      </span>
                    )}
                  </div>
                  <p className="resume-entry__subtitle">
                    {certification.issuer}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default TemplateClassic;

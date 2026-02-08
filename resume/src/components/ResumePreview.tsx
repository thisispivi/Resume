import { useState } from "react";
import type { ResumeData } from "../types";
import "./ResumePreview.css";

interface ResumePreviewProps {
  data: ResumeData;
}

function ResumePreview({ data }: ResumePreviewProps) {
  const [photoError, setPhotoError] = useState(false);

  const initials = data.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const showPhoto = data.photo && !photoError;

  return (
    <div id="resume-preview" className="resume-page">
      <aside className="resume-sidebar">
        <div className="sidebar-header">
          {showPhoto ? (
            <div className="photo-container">
              <img
                src={data.photo}
                alt={data.name}
                className="photo-img"
                onError={() => setPhotoError(true)}
              />
            </div>
          ) : (
            <div className="photo-placeholder">
              <span>{initials}</span>
            </div>
          )}
          <h1 className="resume-name">{data.name}</h1>
          <p className="resume-title">{data.jobTitle}</p>
        </div>

        {data.contact && (
          <div className="sidebar-section">
            <h2 className="sidebar-section-title">Contact</h2>
            <ul className="contact-list">
              {data.contact.email && (
                <li className="contact-item">
                  <svg
                    className="contact-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>{data.contact.email}</span>
                </li>
              )}
              {data.contact.phone && (
                <li className="contact-item">
                  <svg
                    className="contact-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{data.contact.phone}</span>
                </li>
              )}
              {data.contact.linkedin && (
                <li className="contact-item">
                  <svg
                    className="contact-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <a
                    href={data.contact.linkedin}
                    className="contact-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {data.contact.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                </li>
              )}
              {data.contact.github && (
                <li className="contact-item">
                  <svg
                    className="contact-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <a
                    href={data.contact.github}
                    className="contact-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {data.contact.github.replace(/^https?:\/\//, "")}
                  </a>
                </li>
              )}
              {data.contact.website && (
                <li className="contact-item">
                  <svg
                    className="contact-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <a
                    href={data.contact.website}
                    className="contact-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {data.contact.website.replace(/^https?:\/\//, "")}
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}

        {data.skills && data.skills.length > 0 && (
          <div className="sidebar-section">
            <h2 className="sidebar-section-title">Skills</h2>
            <div className="skill-categories">
              {data.skills.map((cat) => (
                <div key={cat.category} className="skill-category">
                  <h3 className="skill-category-name">{cat.category}</h3>
                  <p className="skill-category-items">{cat.items.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.languages && data.languages.length > 0 && (
          <div className="sidebar-section">
            <h2 className="sidebar-section-title">Languages</h2>
            <ul className="languages-list">
              {data.languages.map((lang) => (
                <li key={lang.language} className="language-item">
                  <span className="language-name">{lang.language}</span>
                  <span className="language-prof">{lang.proficiency}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <main className="resume-main">
        {data.summary && (
          <section className="main-section">
            <h2 className="section-title">Profile</h2>
            <p className="summary-text">{data.summary}</p>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section className="main-section">
            <h2 className="section-title">Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="entry">
                <div className="entry-header">
                  <h3 className="entry-title">{exp.position}</h3>
                  <span className="entry-date">{exp.duration}</span>
                </div>
                <p className="entry-subtitle">{exp.company}</p>
                <p className="entry-body">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section className="main-section">
            <h2 className="section-title">Education</h2>
            {data.education.map((edu, i) => (
              <div key={i} className="entry">
                <div className="entry-header">
                  <h3 className="entry-title">{edu.degree}</h3>
                  <span className="entry-date">{edu.duration}</span>
                </div>
                <p className="entry-subtitle">{edu.institution}</p>
                {edu.grades && (
                  <p className="entry-detail">Grade: {edu.grades}</p>
                )}
                {edu.thesis && (
                  <p className="entry-detail">Thesis: {edu.thesis}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {data.projects && data.projects.length > 0 && (
          <section className="main-section">
            <h2 className="section-title">Projects</h2>
            {data.projects.map((proj, i) => (
              <div key={i} className="entry">
                <h3 className="entry-title">{proj.name}</h3>
                <p className="entry-body">{proj.description}</p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="tech-tags">
                    {proj.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {proj.link && (
                  <a
                    href={proj.link}
                    className="entry-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {proj.link}
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {data.certifications && data.certifications.length > 0 && (
          <section className="main-section">
            <h2 className="section-title">Certifications</h2>
            {data.certifications.map((cert, i) => (
              <div key={i} className="entry">
                <div className="entry-header">
                  <h3 className="entry-title">{cert.name}</h3>
                  {cert.date && <span className="entry-date">{cert.date}</span>}
                </div>
                <p className="entry-subtitle">{cert.issuer}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default ResumePreview;

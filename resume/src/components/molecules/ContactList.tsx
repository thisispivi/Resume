import type { Contact } from "../../types";

interface ContactListProps {
  contact: Contact;
}

/** Renders a list of contact entries (email, phone, links) from resume data. */
function ContactList({ contact }: ContactListProps) {
  return (
    <ul className="contact-list">
      {contact.email ? <li className="contact-item">
          <span className="contact-icon">@</span>
          <span>{contact.email}</span>
        </li> : null}
      {contact.phone ? <li className="contact-item">
          <span className="contact-icon">tel</span>
          <span>{contact.phone}</span>
        </li> : null}
      {contact.linkedin ? <li className="contact-item">
          <span className="contact-icon">in</span>
          <a className="contact-link" href={contact.linkedin} rel="noreferrer" target="_blank">
            {contact.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        </li> : null}
      {contact.github ? <li className="contact-item">
          <span className="contact-icon">gh</span>
          <a className="contact-link" href={contact.github} rel="noreferrer" target="_blank">
            {contact.github.replace(/^https?:\/\//, "")}
          </a>
        </li> : null}
      {contact.website ? <li className="contact-item">
          <span className="contact-icon">web</span>
          <a className="contact-link" href={contact.website} rel="noreferrer" target="_blank">
            {contact.website.replace(/^https?:\/\//, "")}
          </a>
        </li> : null}
    </ul>
  );
}

export default ContactList;

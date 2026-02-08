import type { Contact } from "../../types";

interface ContactListProps {
  contact: Contact;
}

function ContactList({ contact }: ContactListProps) {
  return (
    <ul className="contact-list">
      {contact.email && (
        <li className="contact-item">
          <span className="contact-icon">@</span>
          <span>{contact.email}</span>
        </li>
      )}
      {contact.phone && (
        <li className="contact-item">
          <span className="contact-icon">tel</span>
          <span>{contact.phone}</span>
        </li>
      )}
      {contact.linkedin && (
        <li className="contact-item">
          <span className="contact-icon">in</span>
          <a
            href={contact.linkedin}
            className="contact-link"
            target="_blank"
            rel="noreferrer"
          >
            {contact.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        </li>
      )}
      {contact.github && (
        <li className="contact-item">
          <span className="contact-icon">gh</span>
          <a
            href={contact.github}
            className="contact-link"
            target="_blank"
            rel="noreferrer"
          >
            {contact.github.replace(/^https?:\/\//, "")}
          </a>
        </li>
      )}
      {contact.website && (
        <li className="contact-item">
          <span className="contact-icon">web</span>
          <a
            href={contact.website}
            className="contact-link"
            target="_blank"
            rel="noreferrer"
          >
            {contact.website.replace(/^https?:\/\//, "")}
          </a>
        </li>
      )}
    </ul>
  );
}

export default ContactList;

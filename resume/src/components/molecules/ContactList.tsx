import type { Contact } from "../../types";
import MailIcon from "../../assets/icons/mail.svg?react";
import PhoneIcon from "../../assets/icons/phone.svg?react";
import LinkedInIcon from "../../assets/icons/linkedin.svg?react";
import GitHubIcon from "../../assets/icons/github.svg?react";
import GlobeIcon from "../../assets/icons/globe.svg?react";

interface ContactListProps {
  contact: Contact;
}

/** Renders a list of contact entries with SVG icons and clickable mailto/tel/href links. */
function ContactList({ contact }: ContactListProps) {
  return (
    <ul className="contact-list">
      {contact.email ? (
        <li className="contact-item">
          <span className="contact-icon">
            <MailIcon aria-hidden="true" height={14} width={14} />
          </span>
          <a className="contact-link" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </li>
      ) : null}
      {contact.phone ? (
        <li className="contact-item">
          <span className="contact-icon">
            <PhoneIcon aria-hidden="true" height={14} width={14} />
          </span>
          <a className="contact-link" href={`tel:${contact.phone.replace(/\s+/g, "")}`}>
            {contact.phone}
          </a>
        </li>
      ) : null}
      {contact.linkedin ? (
        <li className="contact-item">
          <span className="contact-icon">
            <LinkedInIcon aria-hidden="true" height={14} width={14} />
          </span>
          <a className="contact-link" href={contact.linkedin} rel="noreferrer" target="_blank">
            {contact.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        </li>
      ) : null}
      {contact.github ? (
        <li className="contact-item">
          <span className="contact-icon">
            <GitHubIcon aria-hidden="true" height={14} width={14} />
          </span>
          <a className="contact-link" href={contact.github} rel="noreferrer" target="_blank">
            {contact.github.replace(/^https?:\/\//, "")}
          </a>
        </li>
      ) : null}
      {contact.website ? (
        <li className="contact-item">
          <span className="contact-icon">
            <GlobeIcon aria-hidden="true" height={14} width={14} />
          </span>
          <a className="contact-link" href={contact.website} rel="noreferrer" target="_blank">
            {contact.website.replace(/^https?:\/\//, "")}
          </a>
        </li>
      ) : null}
    </ul>
  );
}

export default ContactList;

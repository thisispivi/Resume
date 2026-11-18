import type { ContactLink } from "@/types";
import { getContactTypeConfig } from "@/data/contactTypes";

interface ContactListProps {
  contact: ContactLink[];
}

/** Renders a list of contact entries with icons and clickable mailto/tel/href links. */
function ContactList({ contact }: ContactListProps) {
  return (
    <ul className="contact-list">
      {contact
        .filter((link) => link.value)
        .map((link, index) => {
          const config = getContactTypeConfig(link.type);
          const Icon = config.icon;
          const href = config.buildHref?.(link.value);
          const isExternal = href?.startsWith("http");
          const text =
            link.type === "custom" && link.label
              ? link.label
              : (config.formatDisplay?.(link.value) ?? link.value);

          return (
            <li className="contact-item" key={`${link.type}-${String(index)}`}>
              <span className="contact-icon">
                <Icon aria-hidden="true" height={14} width={14} />
              </span>
              {href ? (
                <a
                  className="contact-link"
                  href={href}
                  rel={isExternal ? "noreferrer" : undefined}
                  target={isExternal ? "_blank" : undefined}
                >
                  {text}
                </a>
              ) : (
                <span className="contact-link">{text}</span>
              )}
            </li>
          );
        })}
    </ul>
  );
}

export default ContactList;

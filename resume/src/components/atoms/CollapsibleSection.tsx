import type { ReactNode } from "react";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg?react";

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  /** Small counter shown next to the title, e.g. the number of entries. */
  badge?: number;
  isOpenByDefault?: boolean;
}

/**
 * Disclosure panel for one editor section, built on native `<details>` so
 * keyboard access, screen-reader semantics, and find-in-page all work without
 * extra state.
 */
function CollapsibleSection({
  badge,
  children,
  isOpenByDefault = false,
  title,
}: CollapsibleSectionProps) {
  return (
    <details className="collapsible" open={isOpenByDefault}>
      <summary className="collapsible__summary">
        <ChevronDownIcon aria-hidden="true" className="collapsible__marker" height={6} width={10} />
        <span className="collapsible__title">{title}</span>
        {badge ? <span className="collapsible__badge">{badge}</span> : null}
      </summary>
      <div className="collapsible__body">{children}</div>
    </details>
  );
}

export default CollapsibleSection;

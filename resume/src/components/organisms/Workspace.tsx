import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

/** The three editing surfaces of the workspace panel. */
export type WorkspaceTab = "content" | "design" | "export";

export const WORKSPACE_TABS: { id: WorkspaceTab; labelKey: string }[] = [
  { id: "content", labelKey: "workspace.content" },
  { id: "design", labelKey: "workspace.design" },
  { id: "export", labelKey: "workspace.export" },
];

interface WorkspaceProps {
  activeTab: WorkspaceTab;
  onTabChange: (tab: WorkspaceTab) => void;
  children: ReactNode;
  /** Hides the panel on small screens while the preview is showing. */
  isHiddenOnMobile: boolean;
}

/** Left-hand editing panel with the content, design, and export tabs. */
function Workspace({ activeTab, children, isHiddenOnMobile, onTabChange }: WorkspaceProps) {
  const { t } = useTranslation();

  return (
    <aside className={`workspace${isHiddenOnMobile ? " workspace--hidden-mobile" : ""}`}>
      <div className="workspace__tabs" role="tablist">
        {WORKSPACE_TABS.map((tab) => (
          <button
            aria-selected={activeTab === tab.id}
            className={`workspace__tab${activeTab === tab.id ? " workspace__tab--active" : ""}`}
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            role="tab"
            type="button"
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>
      <div className="workspace__content">{children}</div>
    </aside>
  );
}

export default Workspace;

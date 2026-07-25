import { useTranslation } from "react-i18next";
import { WORKSPACE_TABS } from "@/data/workspaceTabs";
import type { WorkspaceTab } from "@/data/workspaceTabs";

interface MobileNavProps {
  activeTab: WorkspaceTab;
  isPreviewVisible: boolean;
  onSelectTab: (tab: WorkspaceTab) => void;
  onSelectPreview: () => void;
}

/**
 * Bottom navigation shown on small screens, where the editor and the preview
 * cannot sit side by side. Selecting an editing tab hides the preview and
 * vice versa, so each surface gets the full viewport.
 */
function MobileNav({ activeTab, isPreviewVisible, onSelectPreview, onSelectTab }: MobileNavProps) {
  const { t } = useTranslation();

  return (
    <nav className="mobile-nav">
      {WORKSPACE_TABS.map((tab) => {
        const isActive = !isPreviewVisible && activeTab === tab.id;
        return (
          <button
            aria-current={isActive}
            className={`mobile-nav__item${isActive ? " mobile-nav__item--active" : ""}`}
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            type="button"
          >
            {t(tab.labelKey)}
          </button>
        );
      })}
      <button
        aria-current={isPreviewVisible}
        className={`mobile-nav__item${isPreviewVisible ? " mobile-nav__item--active" : ""}`}
        onClick={onSelectPreview}
        type="button"
      >
        {t("workspace.preview")}
      </button>
    </nav>
  );
}

export default MobileNav;

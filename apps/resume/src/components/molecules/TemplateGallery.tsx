import { useTranslation } from "react-i18next";
import type { TemplateId, TemplateLayout, TemplateOption } from "@/types";

interface TemplateGalleryProps {
  templates: TemplateOption[];
  value: TemplateId;
  onChange: (value: TemplateId) => void;
}

/** Placeholder text lines inside a thumbnail. */
const lines = (count: number) =>
  Array.from({ length: count }, (_, index) => (
    <span className="template-thumb__line" key={index} />
  ));

/** Schematic preview of a template's page structure, drawn from theme colors. */
function TemplateThumb({ layout }: { layout: TemplateLayout }) {
  return (
    <span aria-hidden="true" className={`template-thumb template-thumb--${layout}`}>
      {layout === "banner" ? <span className="template-thumb__banner" /> : null}
      <span className="template-thumb__body">
        {layout === "sidebar-left" || layout === "sidebar-right" ? (
          <span className="template-thumb__aside">{lines(4)}</span>
        ) : null}
        <span className="template-thumb__main">
          {layout === "banner" ? null : <span className="template-thumb__heading" />}
          {lines(layout === "single" ? 6 : 5)}
        </span>
        {layout === "columns" ? <span className="template-thumb__column">{lines(4)}</span> : null}
      </span>
    </span>
  );
}

/** Visual grid of resume layouts, replacing the former template dropdown. */
function TemplateGallery({ onChange, templates, value }: TemplateGalleryProps) {
  const { t } = useTranslation();

  return (
    <div className="template-gallery">
      {templates.map((template) => {
        const label = t(`templateNames.${template.id}`, template.fallbackLabel);
        const isActive = template.id === value;

        return (
          <button
            aria-pressed={isActive}
            className={`template-gallery__card${isActive ? " template-gallery__card--active" : ""}`}
            key={template.id}
            onClick={() => onChange(template.id)}
            title={label}
            type="button"
          >
            <TemplateThumb layout={template.layout} />
            <span className="template-gallery__label">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default TemplateGallery;

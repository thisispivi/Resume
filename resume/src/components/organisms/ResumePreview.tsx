import TemplateClassic from "../templates/TemplateClassic";
import TemplateMinimal from "../templates/TemplateMinimal";
import TemplateModern from "../templates/TemplateModern";
import TemplateSplit from "../templates/TemplateSplit";
import TemplateExecutive from "../templates/TemplateExecutive";
import TemplateCreative from "../templates/TemplateCreative";
import TemplateCompact from "../templates/TemplateCompact";
import type { ResumeData, TemplateId } from "../../types";

interface ResumePreviewProps {
  data: ResumeData;
  templateId: TemplateId;
  pdfLocale: string;
}

const templateMap = {
  modern: TemplateModern,
  classic: TemplateClassic,
  minimal: TemplateMinimal,
  split: TemplateSplit,
  executive: TemplateExecutive,
  creative: TemplateCreative,
  compact: TemplateCompact,
};

/** Renders the selected resume template inside a preview container. */
function ResumePreview({ data, templateId, pdfLocale }: ResumePreviewProps) {
  const Template = templateMap[templateId] ?? TemplateModern;

  return (
    <div className="resume-preview">
      <div
        className={`resume-preview__page resume-preview__page--${templateId}`}
        id="resume-preview"
      >
        <Template data={data} pdfLocale={pdfLocale} />
      </div>
    </div>
  );
}

export default ResumePreview;

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

function ResumePreview({ data, templateId, pdfLocale }: ResumePreviewProps) {
  const Template = templateMap[templateId] ?? TemplateModern;

  return (
    <div className="resume-preview">
      <div
        id="resume-preview"
        className={`resume-preview__page resume-preview__page--${templateId}`}
      >
        <Template data={data} pdfLocale={pdfLocale} />
      </div>
    </div>
  );
}

export default ResumePreview;

import TemplateClassic from "../templates/TemplateClassic";
import TemplateMinimal from "../templates/TemplateMinimal";
import TemplateModern from "../templates/TemplateModern";
import TemplateSplit from "../templates/TemplateSplit";
import type { ResumeData, TemplateId } from "../../types";

interface ResumePreviewProps {
  data: ResumeData;
  templateId: TemplateId;
}

const templateMap = {
  modern: TemplateModern,
  classic: TemplateClassic,
  minimal: TemplateMinimal,
  split: TemplateSplit,
};

function ResumePreview({ data, templateId }: ResumePreviewProps) {
  const Template = templateMap[templateId] ?? TemplateModern;

  return (
    <div className="resume-preview">
      <div
        id="resume-preview"
        className={`resume-preview__page resume-preview__page--${templateId}`}
      >
        <Template data={data} />
      </div>
    </div>
  );
}

export default ResumePreview;

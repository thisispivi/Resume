import TemplateClassic from "@/components/templates/TemplateClassic";
import TemplateMinimal from "@/components/templates/TemplateMinimal";
import TemplateModern from "@/components/templates/TemplateModern";
import TemplateSplit from "@/components/templates/TemplateSplit";
import TemplateExecutive from "@/components/templates/TemplateExecutive";
import TemplateCreative from "@/components/templates/TemplateCreative";
import TemplateCompact from "@/components/templates/TemplateCompact";
import TemplateElegant from "@/components/templates/TemplateElegant";
import TemplateTimeline from "@/components/templates/TemplateTimeline";
import TemplatePortfolio from "@/components/templates/TemplatePortfolio";
import TemplateEditorial from "@/components/templates/TemplateEditorial";
import TemplateBold from "@/components/templates/TemplateBold";
import TemplateBanner from "@/components/templates/TemplateBanner";
import TemplateGeometric from "@/components/templates/TemplateGeometric";
import TemplateNeo from "@/components/templates/TemplateNeo";
import type { ResumeData, TemplateId } from "@/types";

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
  elegant: TemplateElegant,
  timeline: TemplateTimeline,
  portfolio: TemplatePortfolio,
  editorial: TemplateEditorial,
  bold: TemplateBold,
  banner: TemplateBanner,
  geometric: TemplateGeometric,
  neo: TemplateNeo,
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

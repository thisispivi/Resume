import { useTranslation } from "react-i18next";
import ResumeHighlights from "@/components/molecules/ResumeHighlights";
import type { Education } from "@/types";

interface EducationDetailsProps {
  education: Education;
  pdfLocale: string;
}

/** Grade, thesis, and achievement bullets shown under an education entry. */
function EducationDetails({ education, pdfLocale }: EducationDetailsProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(pdfLocale);

  return (
    <>
      {education.field ? <p className="resume-entry__detail">{education.field}</p> : null}
      {education.grades ? (
        <p className="resume-entry__detail">
          {t("fieldLabels.grade")}: {education.grades}
        </p>
      ) : null}
      {education.thesis ? (
        <p className="resume-entry__detail">
          {t("fieldLabels.thesis")}: {education.thesis}
        </p>
      ) : null}
      <ResumeHighlights items={education.highlights} />
    </>
  );
}

export default EducationDetails;

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Dropdown from "@/components/atoms/Dropdown";
import type { TemplateId, TemplateOption } from "@/types";

interface TemplatePickerProps {
  templates: TemplateOption[];
  value: TemplateId;
  onChange: (value: TemplateId) => void;
}

/** Dropdown for selecting a resume layout template. */
function TemplatePicker({ templates, value, onChange }: TemplatePickerProps) {
  const { t } = useTranslation();

  const options = useMemo(
    () =>
      templates.map((template) => ({
        value: template.id,
        label: t(`templateNames.${template.id}`, template.fallbackLabel),
      })),
    [templates, t],
  );

  return (
    <Dropdown
      label={t("templateLabel")}
      onChange={(v) => onChange(v as TemplateId)}
      options={options}
      value={value}
    />
  );
}

export default TemplatePicker;

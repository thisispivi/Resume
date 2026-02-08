import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Dropdown from "../atoms/Dropdown";
import type { TemplateId, TemplateOption } from "../../types";

interface TemplatePickerProps {
  templates: TemplateOption[];
  value: TemplateId;
  onChange: (value: TemplateId) => void;
}

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
      options={options}
      value={value}
      onChange={(v) => onChange(v as TemplateId)}
    />
  );
}

export default TemplatePicker;

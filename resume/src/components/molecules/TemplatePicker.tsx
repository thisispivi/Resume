import { useTranslation } from "react-i18next";
import Select from "../atoms/Select";
import type { TemplateId, TemplateOption } from "../../types";

interface TemplatePickerProps {
  templates: TemplateOption[];
  value: TemplateId;
  onChange: (value: TemplateId) => void;
}

function TemplatePicker({ templates, value, onChange }: TemplatePickerProps) {
  const { t } = useTranslation();

  return (
    <Select
      label={t("templateLabel")}
      value={value}
      onChange={(event) => onChange(event.target.value as TemplateId)}
    >
      {templates.map((template) => (
        <option key={template.id} value={template.id}>
          {t(`templateNames.${template.id}`, template.fallbackLabel)}
        </option>
      ))}
    </Select>
  );
}

export default TemplatePicker;

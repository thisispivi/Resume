import Select from "../atoms/Select";
import type { TemplateId, TemplateOption, UiCopy } from "../../types";

interface TemplatePickerProps {
  templates: TemplateOption[];
  value: TemplateId;
  copy: UiCopy;
  onChange: (value: TemplateId) => void;
}

function TemplatePicker({
  templates,
  value,
  copy,
  onChange,
}: TemplatePickerProps) {
  return (
    <Select
      label={copy.templateLabel}
      value={value}
      onChange={(event) => onChange(event.target.value as TemplateId)}
    >
      {templates.map((template) => (
        <option key={template.id} value={template.id}>
          {copy.templateNames[template.id] ?? template.fallbackLabel}
        </option>
      ))}
    </Select>
  );
}

export default TemplatePicker;

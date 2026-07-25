import { useTranslation } from "react-i18next";
import Checkbox from "@/components/atoms/Checkbox";
import MonthInput from "@/components/atoms/MonthInput";
import StringListInput from "@/components/atoms/StringListInput";
import TextArea from "@/components/atoms/TextArea";
import TextInput from "@/components/atoms/TextInput";
import type { FieldDef } from "@/data/resumeSections";

/** An entry being edited, addressed by the string keys declared in its FieldDef list. */
export type EditableEntry = Record<string, unknown>;

interface EntryFieldsProps {
  fields: FieldDef[];
  entry: EditableEntry;
  onChange: (key: string, value: unknown) => void;
}

const readText = (value: unknown) => (typeof value === "string" ? value : "");
const readList = (value: unknown) =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

/**
 * Renders the editable fields of a single entry from its declarative FieldDef
 * list, so every resume section shares one form implementation.
 */
function EntryFields({ entry, fields, onChange }: EntryFieldsProps) {
  const { t } = useTranslation();

  return (
    <div className="entry-fields">
      {fields.map((field) => {
        if (field.hiddenWhenTrue && entry[field.hiddenWhenTrue] === true) return null;

        const label = t(field.labelKey);
        const placeholder = field.placeholderKey ? t(field.placeholderKey) : undefined;
        const className = `entry-fields__field${field.isWide ? " entry-fields__field--wide" : ""}`;

        return (
          <div className={className} key={field.key}>
            {field.kind === "text" ? (
              <TextInput
                label={label}
                onChange={(event) => onChange(field.key, event.target.value)}
                placeholder={placeholder}
                value={readText(entry[field.key])}
              />
            ) : null}

            {field.kind === "textarea" ? (
              <TextArea
                label={label}
                onChange={(event) => onChange(field.key, event.target.value)}
                placeholder={placeholder}
                rows={3}
                value={readText(entry[field.key])}
              />
            ) : null}

            {field.kind === "month" ? (
              <MonthInput
                label={label}
                onChange={(value) => onChange(field.key, value)}
                value={readText(entry[field.key])}
              />
            ) : null}

            {field.kind === "tags" || field.kind === "bullets" ? (
              <StringListInput
                label={label}
                onChange={(value) => onChange(field.key, value)}
                placeholder={placeholder}
                value={readList(entry[field.key])}
                variant={field.kind === "bullets" ? "line" : "comma"}
              />
            ) : null}

            {field.kind === "checkbox" ? (
              <Checkbox
                isChecked={entry[field.key] === true}
                label={label}
                onChange={(isChecked) => onChange(field.key, isChecked)}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default EntryFields;

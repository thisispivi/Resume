import { useId } from "react";

interface MonthInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

/** Matches the `YYYY-MM` value a native month picker can hold. */
const MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

/**
 * Month picker for entry dates.
 *
 * Falls back to a plain text field whenever the stored value is not `YYYY-MM`
 * — imported resumes often carry free text like "Summer 2019", and a native
 * month input would silently discard it.
 */
function MonthInput({ label, value, onChange }: MonthInputProps) {
  const id = useId();
  const isFreeText = value.length > 0 && !MONTH_PATTERN.test(value);

  return (
    <div className="text-input">
      <label className="text-input__label" htmlFor={id}>
        {label}
      </label>
      <input
        className="text-input__field"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        type={isFreeText ? "text" : "month"}
        value={value}
      />
    </div>
  );
}

export default MonthInput;

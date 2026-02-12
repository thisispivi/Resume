import type { ChangeEvent } from "react";

interface ColorInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

/** Labeled color picker input that displays the selected hex value. */
function ColorInput({ id, label, value, onChange }: ColorInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <label className="color-input" htmlFor={id}>
      <span className="color-input__label">{label}</span>
      <input
        className="color-input__field"
        id={id}
        onChange={handleChange}
        type="color"
        value={value}
      />
      <span className="color-input__value">{value}</span>
    </label>
  );
}

export default ColorInput;

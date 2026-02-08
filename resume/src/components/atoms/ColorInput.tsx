import type { ChangeEvent } from "react";

interface ColorInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorInput({ id, label, value, onChange }: ColorInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <label className="color-input" htmlFor={id}>
      <span className="color-input__label">{label}</span>
      <input
        id={id}
        className="color-input__field"
        type="color"
        value={value}
        onChange={handleChange}
      />
      <span className="color-input__value">{value}</span>
    </label>
  );
}

export default ColorInput;

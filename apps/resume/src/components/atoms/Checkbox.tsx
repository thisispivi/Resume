import { useId } from "react";

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

/** Labeled checkbox used for boolean entry fields such as "I currently work here". */
function Checkbox({ label, isChecked, onChange }: CheckboxProps) {
  const id = useId();

  return (
    <div className="checkbox">
      <input
        checked={isChecked}
        className="checkbox__input"
        id={id}
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <label className="checkbox__label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default Checkbox;

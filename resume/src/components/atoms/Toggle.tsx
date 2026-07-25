import { useId } from "react";

interface ToggleProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

/**
 * Labeled on/off switch. The control is a `role="switch"` button rather than a
 * checkbox, so it is named via `aria-labelledby` — a wrapping `<label>` would
 * not associate with it.
 */
function Toggle({ label, isChecked, onChange }: ToggleProps) {
  const labelId = useId();

  return (
    <div className="toggle">
      <span className="toggle__label" id={labelId}>
        {label}
      </span>
      <button
        aria-checked={isChecked}
        aria-labelledby={labelId}
        className={`toggle__track${isChecked ? " toggle__track--on" : ""}`}
        onClick={onChange}
        role="switch"
        type="button"
      >
        <span className="toggle__thumb" />
      </button>
    </div>
  );
}

export default Toggle;

interface ToggleProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

/** Labeled on/off switch rendered as an accessible role="switch" button. */
function Toggle({ label, isChecked, onChange }: ToggleProps) {
  return (
    <label className="toggle">
      <span className="toggle__label">{label}</span>
      <button
        aria-checked={isChecked}
        className={`toggle__track${isChecked ? " toggle__track--on" : ""}`}
        onClick={onChange}
        role="switch"
        type="button"
      >
        <span className="toggle__thumb" />
      </button>
    </label>
  );
}

export default Toggle;

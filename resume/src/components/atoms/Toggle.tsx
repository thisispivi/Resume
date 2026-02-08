interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label className="toggle">
      <span className="toggle__label">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`toggle__track${checked ? " toggle__track--on" : ""}`}
        onClick={onChange}
      >
        <span className="toggle__thumb" />
      </button>
    </label>
  );
}

export default Toggle;

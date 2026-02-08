import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

function Select({ label, className = "", ...props }: SelectProps) {
  return (
    <label className={`select ${className}`.trim()}>
      {label && <span className="select__label">{label}</span>}
      <select className="select__field" {...props} />
    </label>
  );
}

export default Select;

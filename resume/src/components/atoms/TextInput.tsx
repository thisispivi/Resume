import { useId } from "react";
import type { InputHTMLAttributes } from "react";

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

/** Labeled text input field styled consistently with the app theme. */
function TextInput({ label, ...props }: TextInputProps) {
  const id = useId();

  return (
    <div className="text-input">
      <label className="text-input__label" htmlFor={id}>
        {label}
      </label>
      <input {...props} className="text-input__field" id={id} type="text" />
    </div>
  );
}

export default TextInput;

import { useId } from "react";
import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

/** Labeled textarea field for multi-line content like summaries and descriptions. */
function TextArea({ label, ...props }: TextAreaProps) {
  const id = useId();

  return (
    <div className="text-input">
      <label className="text-input__label" htmlFor={id}>
        {label}
      </label>
      <textarea {...props} className="text-input__field text-input__field--textarea" id={id} />
    </div>
  );
}

export default TextArea;

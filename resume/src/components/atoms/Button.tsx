import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  variant?: "primary" | "ghost" | "brand";
  size?: "sm" | "md";
}

/** Renders a clickable button with primary, ghost, or brand (fixed app color) variant. */
function Button({ variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`btn btn--${variant} btn--${size} ${className}`.trim()}
      type="button"
    />
  );
}

export default Button;

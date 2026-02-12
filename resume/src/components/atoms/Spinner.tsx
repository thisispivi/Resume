interface SpinnerProps {
  size?: number;
}

/** Animated SVG loading spinner with configurable size. */
function Spinner({ size = 32 }: SpinnerProps) {
  return (
    <svg
      aria-label="Loading"
      className="spinner"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <circle
        className="spinner__track"
        cx="12"
        cy="12"
        opacity="0.2"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle
        className="spinner__arc"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeDasharray="31.4 31.4"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}

export default Spinner;

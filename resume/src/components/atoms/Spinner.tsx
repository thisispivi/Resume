interface SpinnerProps {
  size?: number;
}

function Spinner({ size = 32 }: SpinnerProps) {
  return (
    <svg
      className="spinner"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Loading"
    >
      <circle
        className="spinner__track"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.2"
      />
      <circle
        className="spinner__arc"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="31.4 31.4"
      />
    </svg>
  );
}

export default Spinner;

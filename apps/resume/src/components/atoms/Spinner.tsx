import SpinnerIcon from "@/assets/icons/spinner.svg?react";

interface SpinnerProps {
  size?: number;
}

/** Animated SVG loading spinner with configurable size. */
function Spinner({ size = 32 }: SpinnerProps) {
  return <SpinnerIcon aria-label="Loading" className="spinner" height={size} width={size} />;
}

export default Spinner;

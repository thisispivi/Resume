import CheckIcon from "@/assets/icons/check.svg?react";

interface SwatchProps {
  colors: string[];
  isActive: boolean;
  label: string;
  onClick: () => void;
}

/** Small rounded color chip button used for palette selection. */
function Swatch({ colors, isActive, label, onClick }: SwatchProps) {
  const stops = colors.map(
    (color, index) => `${color} ${(index * 100) / colors.length}% ${((index + 1) * 100) / colors.length}%`,
  );

  return (
    <button
      aria-label={label}
      aria-pressed={isActive}
      className={`swatch${isActive ? " swatch--active" : ""}`}
      onClick={onClick}
      style={{ background: `linear-gradient(135deg, ${stops.join(", ")})` }}
      title={label}
      type="button"
    >
      {isActive ? (
        <span className="swatch__check">
          <CheckIcon aria-hidden="true" height={12} width={12} />
        </span>
      ) : null}
    </button>
  );
}

export default Swatch;

interface SwatchProps {
  color: string;
  isActive: boolean;
  label: string;
  onClick: () => void;
}

/** Small colored circle button used for palette selection. */
function Swatch({ color, isActive, label, onClick }: SwatchProps) {
  return (
    <button
      aria-label={label}
      className={`swatch${isActive ? " swatch--active" : ""}`}
      onClick={onClick}
      style={{ backgroundColor: color }}
      title={label}
      type="button"
    />
  );
}

export default Swatch;

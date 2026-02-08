interface SwatchProps {
  color: string;
  isActive: boolean;
  label: string;
  onClick: () => void;
}

function Swatch({ color, isActive, label, onClick }: SwatchProps) {
  return (
    <button
      type="button"
      className={`swatch${isActive ? " swatch--active" : ""}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
      title={label}
      aria-label={label}
    />
  );
}

export default Swatch;

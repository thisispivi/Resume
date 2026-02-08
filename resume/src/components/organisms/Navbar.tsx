import type { UiCopy } from "../../types";

interface NavbarProps {
  copy: UiCopy;
}

function Navbar({ copy }: NavbarProps) {
  return (
    <header className="navbar">
      <h1 className="navbar__title">{copy.appTitle}</h1>
    </header>
  );
}

export default Navbar;

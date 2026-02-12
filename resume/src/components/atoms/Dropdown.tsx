import { useId, useRef, useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg?react";

/** A single option within a Dropdown, holding a value and display label. */
export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/** Accessible custom dropdown (combobox) with keyboard navigation and portal-based menu. */
function Dropdown({ label, options, value, onChange, className = "" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number; width: number } | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const reactId = useId();
  const labelId = `dropdown-label-${reactId}`;
  const listboxId = `dropdown-listbox-${reactId}`;

  const selectedOption = options.find((opt) => opt.value === value);
  const selectedLabel = selectedOption ? selectedOption.label : "";

  const optionId = useCallback((index: number) => `${listboxId}-option-${index}`, [listboxId]);

  const close = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
    setMenuPos(null);
  }, []);

  const open = useCallback(() => {
    const idx = options.findIndex((opt) => opt.value === value);
    setHighlightedIndex(idx >= 0 ? idx : 0);
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }
    setIsOpen(true);
  }, [options, value]);

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, close, open]);

  const selectOption = useCallback(
    (optionValue: string) => {
      onChange(optionValue);
      close();
      triggerRef.current?.focus();
    },
    [onChange, close],
  );

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target) &&
        listRef.current &&
        !listRef.current.contains(target)
      ) {
        close();
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, close]);

  // Reposition on scroll/resize while open
  useEffect(() => {
    if (!isOpen) return;

    function updatePosition() {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setMenuPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
      }
    }

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  const handleTriggerKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "Enter":
        case " ": {
          event.preventDefault();
          toggleMenu();
          break;
        }
        case "ArrowDown": {
          event.preventDefault();
          if (!isOpen) {
            open();
          } else {
            setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : prev));
          }
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          if (isOpen) {
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          }
          break;
        }
        case "Escape": {
          event.preventDefault();
          close();
          break;
        }
        case "Tab": {
          close();
          break;
        }
        default:
          break;
      }
    },
    [isOpen, options.length, toggleMenu, open, close],
  );

  const handleOptionKeyDown = useCallback(
    (event: React.KeyboardEvent, optionValue: string) => {
      switch (event.key) {
        case "Enter": {
          event.preventDefault();
          selectOption(optionValue);
          break;
        }
        case "ArrowDown": {
          event.preventDefault();
          setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : prev));
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        }
        case "Escape": {
          event.preventDefault();
          close();
          triggerRef.current?.focus();
          break;
        }
        case "Tab": {
          close();
          break;
        }
        default:
          break;
      }
    },
    [options.length, selectOption, close],
  );

  // Scroll highlighted option into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      const highlighted = listRef.current.children[highlightedIndex] as HTMLElement | undefined;
      highlighted?.scrollIntoView({ block: "nearest" });
    }
  }, [isOpen, highlightedIndex]);

  const activeDescendant = isOpen && highlightedIndex >= 0 ? optionId(highlightedIndex) : undefined;

  const menuStyle = useMemo(
    () =>
      menuPos
        ? { position: "fixed" as const, top: menuPos.top, left: menuPos.left, width: menuPos.width }
        : undefined,
    [menuPos],
  );

  const menu =
    isOpen && menuStyle
      ? createPortal(
          <ul
            aria-labelledby={label ? labelId : undefined}
            className="dropdown__menu"
            id={listboxId}
            ref={listRef}
            role="listbox"
            style={menuStyle}
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isHighlighted = index === highlightedIndex;
              let optionClass = "dropdown__option";
              if (isSelected) optionClass += " dropdown__option--active";
              if (isHighlighted) optionClass += " dropdown__option--highlighted";

              return (
                <li
                  aria-selected={isSelected}
                  className={optionClass}
                  id={optionId(index)}
                  key={option.value}
                  onClick={() => selectOption(option.value)}
                  onKeyDown={(e) => handleOptionKeyDown(e, option.value)}
                  role="option"
                  tabIndex={isHighlighted ? 0 : -1}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>,
          document.body,
        )
      : null;

  return (
    <div
      className={`dropdown${isOpen ? " dropdown--open" : ""} ${className}`.trim()}
      ref={wrapperRef}
    >
      {label ? (
        <span className="dropdown__label" id={labelId}>
          {label}
        </span>
      ) : null}
      <button
        aria-activedescendant={activeDescendant}
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={label ? labelId : undefined}
        className="dropdown__trigger"
        onClick={toggleMenu}
        onKeyDown={handleTriggerKeyDown}
        ref={triggerRef}
        role="combobox"
        type="button"
      >
        <span>{selectedLabel}</span>
        <ChevronDownIcon aria-hidden="true" className="dropdown__chevron" height={6} width={10} />
      </button>
      {menu}
    </div>
  );
}

export default Dropdown;

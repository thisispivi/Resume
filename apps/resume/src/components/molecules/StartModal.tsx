import { useRef } from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/components/atoms/Modal";

interface StartOption {
  id: "example" | "blank" | "import";
  titleKey: string;
  bodyKey: string;
}

/** The three ways to begin, in the order they are offered. */
const START_OPTIONS: StartOption[] = [
  { id: "example", titleKey: "welcome.useExample", bodyKey: "welcome.useExampleBody" },
  { id: "blank", titleKey: "welcome.startBlank", bodyKey: "welcome.startBlankBody" },
  { id: "import", titleKey: "welcome.import", bodyKey: "welcome.importBody" },
];

interface StartModalProps {
  isOpen: boolean;
  onStartBlank: () => void;
  onUseExample: () => void;
  onImport: (file: File | null) => void;
}

/** First-run choice between the bundled example, a blank resume, or a JSON import. */
function StartModal({ isOpen, onImport, onStartBlank, onUseExample }: StartModalProps) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (id: StartOption["id"]) => {
    if (id === "example") onUseExample();
    else if (id === "blank") onStartBlank();
    else fileInputRef.current?.click();
  };

  return (
    <Modal isOpen={isOpen} onClose={onUseExample} title={t("welcome.title")}>
      <div className="start-modal">
        <p className="start-modal__body">{t("welcome.body")}</p>
        <div className="start-modal__options">
          {START_OPTIONS.map((option) => (
            <button
              className="start-modal__option"
              key={option.id}
              onClick={() => handleSelect(option.id)}
              type="button"
            >
              <span className="start-modal__option-title">{t(option.titleKey)}</span>
              <span className="start-modal__option-body">{t(option.bodyKey)}</span>
            </button>
          ))}
        </div>
        <input
          accept=".json,application/json"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            event.target.value = "";
            onImport(file);
          }}
          ref={fileInputRef}
          type="file"
        />
      </div>
    </Modal>
  );
}

export default StartModal;

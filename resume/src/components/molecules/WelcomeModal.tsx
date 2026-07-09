import { useTranslation } from "react-i18next";
import Modal from "@/components/atoms/Modal";
import Button from "@/components/atoms/Button";

interface WelcomeModalProps {
  isOpen: boolean;
  onStartBlank: () => void;
  onUseExample: () => void;
}

/** First-run choice between starting from a blank resume or editing the bundled example. */
function WelcomeModal({ isOpen, onStartBlank, onUseExample }: WelcomeModalProps) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onUseExample} title={t("welcome.title")}>
      <div className="welcome-modal">
        <p className="welcome-modal__body">{t("welcome.body")}</p>
        <div className="welcome-modal__actions">
          <Button onClick={onUseExample}>{t("welcome.useExample")}</Button>
          <Button onClick={onStartBlank} variant="ghost">
            {t("welcome.startBlank")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default WelcomeModal;

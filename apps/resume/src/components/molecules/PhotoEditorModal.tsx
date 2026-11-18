import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import type { AvatarEditorRef } from "react-avatar-editor";
import { useTranslation } from "react-i18next";
import Modal from "@/components/atoms/Modal";
import Button from "@/components/atoms/Button";

const EDITOR_SIZE = 240;
const MIN_SCALE = 1;
const MAX_SCALE = 3;

interface PhotoEditorModalProps {
  image: File | string;
  isOpen: boolean;
  onCancel: () => void;
  onSave: (dataUrl: string) => void;
}

/** Modal for positioning and zooming an uploaded photo into a circular avatar, saved as base64. */
function PhotoEditorModal({ image, isOpen, onCancel, onSave }: PhotoEditorModalProps) {
  const { t } = useTranslation();
  const [scale, setScale] = useState(1.2);
  const editorRef = useRef<AvatarEditorRef>(null);

  const handleSave = () => {
    const dataUrl = editorRef.current?.getImageScaledToCanvas().toDataURL("image/png");
    if (dataUrl) onSave(dataUrl);
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={t("editor.positionPhoto")}>
      <div className="photo-editor">
        <AvatarEditor
          border={20}
          borderRadius={EDITOR_SIZE}
          color={[0, 0, 0, 0.5]}
          height={EDITOR_SIZE}
          image={image}
          ref={editorRef}
          scale={scale}
          width={EDITOR_SIZE}
        />

        <label className="photo-editor__zoom">
          <span>{t("editor.zoom")}</span>
          <input
            max={MAX_SCALE}
            min={MIN_SCALE}
            onChange={(e) => setScale(Number(e.target.value))}
            step={0.05}
            type="range"
            value={scale}
          />
        </label>

        <div className="modal__footer">
          <Button onClick={onCancel} variant="ghost">
            {t("editor.cancel")}
          </Button>
          <Button onClick={handleSave}>{t("editor.save")}</Button>
        </div>
      </div>
    </Modal>
  );
}

export default PhotoEditorModal;

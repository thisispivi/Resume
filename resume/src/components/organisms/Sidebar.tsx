import { useTranslation } from "react-i18next";
import Button from "../atoms/Button";
import Toggle from "../atoms/Toggle";
import ColorPalettePicker from "../molecules/ColorPalettePicker";
import FileUploader from "../molecules/FileUploader";
import FontPicker from "../molecules/FontPicker";
import LocalePicker from "../molecules/LocalePicker";
import TemplatePicker from "../molecules/TemplatePicker";
import ThemeCustomizer from "../molecules/ThemeCustomizer";
import type {
  TemplateId,
  TemplateOption,
  ThemeColors,
  ThemePalette,
} from "../../types";
import type { GoogleFont } from "../../data/fonts";
import { buildResumeTemplate, downloadJsonFile } from "../../utils/resume";

interface SidebarProps {
  templates: TemplateOption[];
  templateId: TemplateId;
  onTemplateChange: (value: TemplateId) => void;
  palettes: ThemePalette[];
  paletteId: string;
  onPaletteChange: (palette: ThemePalette) => void;
  colors: ThemeColors;
  onColorsChange: (colors: ThemeColors) => void;
  pdfLocale: string;
  onPdfLocaleChange: (value: string) => void;
  uploadError: string | null;
  onUploadData: (file: File | null) => void;
  isPdfDark: boolean;
  onTogglePdfDark: () => void;
  fontFamily: string;
  onFontChange: (font: GoogleFont) => void;
}

function Sidebar({
  templates,
  templateId,
  onTemplateChange,
  palettes,
  paletteId,
  onPaletteChange,
  colors,
  onColorsChange,
  pdfLocale,
  onPdfLocaleChange,
  uploadError,
  onUploadData,
  isPdfDark,
  onTogglePdfDark,
  fontFamily,
  onFontChange,
}: SidebarProps) {
  const { t } = useTranslation();

  const handleDownloadTemplate = () => {
    downloadJsonFile(buildResumeTemplate(), "resume-template.json");
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar__content">
        <section className="sidebar__section sidebar__actions">
          <Button variant="ghost" onClick={handleDownloadTemplate}>
            {t("downloadTemplateLabel")}
          </Button>
        </section>

        <section className="sidebar__section">
          <FileUploader
            label={t("uploadLabel")}
            hint={t("uploadHint")}
            onFileSelect={onUploadData}
          />
          {uploadError && <span className="sidebar__error">{uploadError}</span>}
        </section>

        <section className="sidebar__section">
          <Toggle
            label={t("pdfDarkModeLabel")}
            checked={isPdfDark}
            onChange={onTogglePdfDark}
          />
        </section>

        <section className="sidebar__section">
          <TemplatePicker
            templates={templates}
            value={templateId}
            onChange={onTemplateChange}
          />
        </section>

        <section className="sidebar__section">
          <FontPicker value={fontFamily} onChange={onFontChange} />
        </section>

        <section className="sidebar__section">
          <LocalePicker
            label={t("pdfLanguageLabel")}
            value={pdfLocale}
            onChange={onPdfLocaleChange}
          />
        </section>

        <section className="sidebar__section">
          <ColorPalettePicker
            label={t("paletteLabel")}
            palettes={palettes}
            selectedId={paletteId}
            onSelect={onPaletteChange}
          />
        </section>

        <section className="sidebar__section">
          <ThemeCustomizer colors={colors} onChange={onColorsChange} />
        </section>
      </nav>
    </aside>
  );
}

export default Sidebar;

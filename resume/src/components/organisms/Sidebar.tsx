import { useTranslation } from "react-i18next";
import Button from "@/components/atoms/Button";
import Toggle from "@/components/atoms/Toggle";
import ColorPalettePicker from "@/components/molecules/ColorPalettePicker";
import FileUploader from "@/components/molecules/FileUploader";
import FontPicker from "@/components/molecules/FontPicker";
import LocalePicker from "@/components/molecules/LocalePicker";
import TemplatePicker from "@/components/molecules/TemplatePicker";
import ThemeCustomizer from "@/components/molecules/ThemeCustomizer";
import type { TemplateId, TemplateOption, ThemeColors, ThemePalette } from "@/types";
import type { GoogleFont } from "@/data/fonts";
import { buildResumeTemplate, downloadJsonFile } from "@/utils/resume";

interface SidebarProps {
  availableLocales: string[];
  colors: ThemeColors;
  fontFamily: string;
  isSidebarOpen: boolean;
  isPdfDark: boolean;
  onCloseSidebar: () => void;
  onColorsChange: (colors: ThemeColors) => void;
  onEditResume: () => void;
  onDownloadData: () => void;
  onFontChange: (font: GoogleFont) => void;
  onPaletteChange: (palette: ThemePalette) => void;
  onPdfLocaleChange: (value: string) => void;
  onTemplateChange: (value: TemplateId) => void;
  onTogglePdfDark: () => void;
  onUploadData: (file: File | null) => void;
  paletteId: string;
  palettes: ThemePalette[];
  pdfLocale: string;
  templateId: TemplateId;
  templates: TemplateOption[];
  uploadError: string | null;
}

/** Side panel containing all resume customization controls (template, palette, font, upload, etc.). */
function Sidebar({
  availableLocales,
  colors,
  fontFamily,
  isSidebarOpen,
  isPdfDark,
  onCloseSidebar,
  onColorsChange,
  onDownloadData,
  onEditResume,
  onFontChange,
  onPaletteChange,
  onPdfLocaleChange,
  onTemplateChange,
  onTogglePdfDark,
  onUploadData,
  paletteId,
  palettes,
  pdfLocale,
  templateId,
  templates,
  uploadError,
}: SidebarProps) {
  const { t } = useTranslation();

  const handleDownloadTemplate = () => {
    downloadJsonFile(buildResumeTemplate(), "resume-template.json");
  };

  return (
    <>
      {isSidebarOpen ? <div className="sidebar-overlay" onClick={onCloseSidebar} /> : null}
      <aside className={`sidebar${isSidebarOpen ? " sidebar--open" : ""}`}>
        <nav className="sidebar__content">
          <section className="sidebar__section sidebar__actions">
            <Button onClick={onEditResume} variant="brand">
              {t("editResumeLabel")}
            </Button>
          </section>

          <section className="sidebar__section">
            <TemplatePicker onChange={onTemplateChange} templates={templates} value={templateId} />
          </section>

          <section className="sidebar__section">
            <FontPicker onChange={onFontChange} value={fontFamily} />
          </section>

          <section className="sidebar__section">
            <ColorPalettePicker
              label={t("paletteLabel")}
              onSelect={onPaletteChange}
              palettes={palettes}
              selectedId={paletteId}
            />
          </section>

          <section className="sidebar__section">
            <ThemeCustomizer colors={colors} onChange={onColorsChange} />
          </section>

          <section className="sidebar__section">
            <Toggle
              isChecked={isPdfDark}
              label={t("pdfDarkModeLabel")}
              onChange={onTogglePdfDark}
            />
          </section>

          <section className="sidebar__section">
            <LocalePicker
              label={t("pdfLanguageLabel")}
              locales={availableLocales}
              onChange={onPdfLocaleChange}
              value={pdfLocale}
            />
          </section>

          <section className="sidebar__section">
            <FileUploader
              hint={t("uploadHint")}
              label={t("uploadLabel")}
              onFileSelect={onUploadData}
            />
            {uploadError ? <span className="sidebar__error">{uploadError}</span> : null}
          </section>

          <section className="sidebar__section sidebar__actions">
            <Button onClick={onDownloadData} variant="ghost">
              {t("downloadDataLabel")}
            </Button>
            <Button onClick={handleDownloadTemplate} variant="ghost">
              {t("downloadTemplateLabel")}
            </Button>
          </section>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;

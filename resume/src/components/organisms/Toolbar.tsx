import { useState } from "react";
import Button from "../atoms/Button";
import ColorPalettePicker from "../molecules/ColorPalettePicker";
import FileUploader from "../molecules/FileUploader";
import LocalePicker from "../molecules/LocalePicker";
import TemplatePicker from "../molecules/TemplatePicker";
import ThemeCustomizer from "../molecules/ThemeCustomizer";
import type {
  TemplateId,
  TemplateOption,
  ThemeColors,
  ThemePalette,
  UiCopy,
} from "../../types";
import { generateSinglePagePdf } from "../../utils/pdf";

interface ToolbarProps {
  copy: UiCopy;
  templates: TemplateOption[];
  templateId: TemplateId;
  onTemplateChange: (value: TemplateId) => void;
  palettes: ThemePalette[];
  paletteId: string;
  onPaletteChange: (palette: ThemePalette) => void;
  colors: ThemeColors;
  onColorsChange: (colors: ThemeColors) => void;
  locales: string[];
  locale: string;
  onLocaleChange: (value: string) => void;
  resumeName: string;
  uploadError: string | null;
  onUploadData: (file: File | null) => void;
}

function Toolbar({
  copy,
  templates,
  templateId,
  onTemplateChange,
  palettes,
  paletteId,
  onPaletteChange,
  colors,
  onColorsChange,
  locales,
  locale,
  onLocaleChange,
  resumeName,
  uploadError,
  onUploadData,
}: ToolbarProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const fileName = resumeName
        ? `${resumeName.replace(/\s+/g, "_")}_Resume.pdf`
        : "Resume.pdf";
      await generateSinglePagePdf({
        elementId: "resume-preview",
        fileName,
      });
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <header className="toolbar">
      <div className="toolbar__brand">
        <h1 className="toolbar__title">{copy.appTitle}</h1>
      </div>
      <div className="toolbar__controls">
        <TemplatePicker
          templates={templates}
          value={templateId}
          copy={copy}
          onChange={onTemplateChange}
        />
        <ColorPalettePicker
          label={copy.paletteLabel}
          palettes={palettes}
          selectedId={paletteId}
          onSelect={onPaletteChange}
        />
        <ThemeCustomizer
          colors={colors}
          copy={copy}
          onChange={onColorsChange}
        />
        <LocalePicker
          locales={locales}
          value={locale}
          copy={copy}
          onChange={onLocaleChange}
        />
        <FileUploader
          label={copy.uploadLabel}
          hint={copy.uploadHint}
          onFileSelect={onUploadData}
        />
        {uploadError && <span className="toolbar__error">{uploadError}</span>}
      </div>
      <div className="toolbar__actions">
        <Button onClick={handleDownload} disabled={downloading}>
          {downloading ? copy.generatingLabel : copy.downloadLabel}
        </Button>
      </div>
    </header>
  );
}

export default Toolbar;

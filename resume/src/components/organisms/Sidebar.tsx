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
import { buildResumeTemplate, downloadJsonFile } from "../../utils/resume";

interface SidebarProps {
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
  uploadError: string | null;
  onUploadData: (file: File | null) => void;
}

function Sidebar({
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
  uploadError,
  onUploadData,
}: SidebarProps) {
  const handleDownloadTemplate = () => {
    downloadJsonFile(buildResumeTemplate(), "resume-template.json");
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar__content">
        <section className="sidebar__section sidebar__actions">
          <Button variant="ghost" onClick={handleDownloadTemplate}>
            {copy.downloadTemplateLabel}
          </Button>
        </section>

        <section className="sidebar__section">
          <FileUploader
            label={copy.uploadLabel}
            hint={copy.uploadHint}
            onFileSelect={onUploadData}
          />
          {uploadError && (
            <span className="sidebar__error">{uploadError}</span>
          )}
        </section>

        <section className="sidebar__section">
          <TemplatePicker
            templates={templates}
            value={templateId}
            copy={copy}
            onChange={onTemplateChange}
          />
        </section>

        <section className="sidebar__section">
          <LocalePicker
            locales={locales}
            value={locale}
            copy={copy}
            onChange={onLocaleChange}
          />
        </section>

        <section className="sidebar__section">
          <ColorPalettePicker
            label={copy.paletteLabel}
            palettes={palettes}
            selectedId={paletteId}
            onSelect={onPaletteChange}
          />
        </section>

        <section className="sidebar__section">
          <ThemeCustomizer
            colors={colors}
            copy={copy}
            onChange={onColorsChange}
          />
        </section>
      </nav>
    </aside>
  );
}

export default Sidebar;

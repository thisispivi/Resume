import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import rawData from "../data.json";
import ResumePreview from "../components/organisms/ResumePreview";
import Toolbar from "../components/organisms/Toolbar";
import { THEME_PALETTES } from "../data/palettes";
import { TEMPLATE_OPTIONS } from "../data/templates";
import { DEFAULT_LOCALE, UI_COPY } from "../i18n/copy";
import type {
  ResumeDataMap,
  TemplateId,
  ThemeColors,
  ThemePalette,
} from "../types";
import { getFirstLocale } from "../utils/resume";
import { validateResumeDataMap } from "../utils/validateResumeData";

const DEFAULT_DATA = rawData as ResumeDataMap;

const getLocaleCopy = (locale: string) =>
  UI_COPY[locale] ?? UI_COPY[DEFAULT_LOCALE];

function ResumeBuilderPage() {
  const [resumeDataMap, setResumeDataMap] =
    useState<ResumeDataMap>(DEFAULT_DATA);
  const [locale, setLocale] = useState<string>(
    getFirstLocale(DEFAULT_DATA, DEFAULT_LOCALE),
  );
  const [templateId, setTemplateId] = useState<TemplateId>("modern");
  const [paletteId, setPaletteId] = useState(THEME_PALETTES[0].id);
  const [colors, setColors] = useState<ThemeColors>(THEME_PALETTES[0].colors);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const availableLocales = useMemo(
    () => Object.keys(resumeDataMap),
    [resumeDataMap],
  );

  const activeLocale = availableLocales.includes(locale)
    ? locale
    : getFirstLocale(resumeDataMap, DEFAULT_LOCALE);

  const resumeData =
    resumeDataMap[activeLocale] ?? resumeDataMap[availableLocales[0]];

  const copy = getLocaleCopy(activeLocale);

  const themeStyle = {
    "--color-primary": colors.primary,
    "--color-secondary": colors.secondary,
    "--color-accent": colors.accent,
    "--color-background": colors.background,
    "--color-surface": colors.surface,
    "--color-text": colors.text,
  } as CSSProperties;

  const handlePaletteChange = (palette: ThemePalette) => {
    setPaletteId(palette.id);
    setColors(palette.colors);
  };

  const handleColorsChange = (nextColors: ThemeColors) => {
    setPaletteId("custom");
    setColors(nextColors);
  };

  const handleUpload = async (file: File | null) => {
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as unknown;
      const validation = validateResumeDataMap(parsed);
      if (validation.errors.length > 0 || !validation.data) {
        setUploadError(copy.uploadErrorInvalid);
        return;
      }
      setUploadError(null);
      setResumeDataMap(validation.data);
      setLocale(getFirstLocale(validation.data, DEFAULT_LOCALE));
    } catch (error) {
      console.error("Failed to parse uploaded JSON:", error);
      setUploadError(copy.uploadErrorInvalid);
    }
  };

  return (
    <div className="app" style={themeStyle}>
      <Toolbar
        copy={copy}
        templates={TEMPLATE_OPTIONS}
        templateId={templateId}
        onTemplateChange={setTemplateId}
        palettes={THEME_PALETTES}
        paletteId={paletteId}
        onPaletteChange={handlePaletteChange}
        colors={colors}
        onColorsChange={handleColorsChange}
        locales={availableLocales}
        locale={activeLocale}
        onLocaleChange={setLocale}
        resumeName={resumeData?.name ?? ""}
        uploadError={uploadError}
        onUploadData={handleUpload}
      />
      <div className="preview-container">
        {resumeData ? (
          <ResumePreview
            data={resumeData}
            templateId={templateId}
            copy={copy}
          />
        ) : (
          <div className="preview-empty">{copy.uploadErrorMissing}</div>
        )}
      </div>
    </div>
  );
}

export default ResumeBuilderPage;

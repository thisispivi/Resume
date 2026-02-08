import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import rawData from "../data.json";
import Navbar from "../components/organisms/Navbar";
import Sidebar from "../components/organisms/Sidebar";
import ResumePreview from "../components/organisms/ResumePreview";
import Button from "../components/atoms/Button";
import { THEME_PALETTES } from "../data/palettes";
import { TEMPLATE_OPTIONS } from "../data/templates";
import { DEFAULT_LOCALE } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import type {
  ResumeDataMap,
  TemplateId,
  ThemeColors,
  ThemePalette,
} from "../types";
import { getFirstLocale } from "../utils/resume";
import { generateSinglePagePdf } from "../utils/pdf";
import { validateResumeDataMap } from "../utils/validateResumeData";

const DEFAULT_DATA = rawData as ResumeDataMap;

const DARK_OVERRIDES = {
  background: "#0f172a",
  surface: "#1e293b",
  text: "#e2e8f0",
};

function ResumeBuilderPage() {
  const { t, i18n } = useTranslation();
  const [resumeDataMap, setResumeDataMap] =
    useState<ResumeDataMap>(DEFAULT_DATA);
  const [locale, setLocale] = useState<string>(
    getFirstLocale(DEFAULT_DATA, DEFAULT_LOCALE),
  );
  const [templateId, setTemplateId] = useState<TemplateId>("modern");
  const [paletteId, setPaletteId] = useState(THEME_PALETTES[0].id);
  const [colors, setColors] = useState<ThemeColors>(THEME_PALETTES[0].colors);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const { isDark, toggleDark } = useTheme();

  const availableLocales = useMemo(
    () => Object.keys(resumeDataMap),
    [resumeDataMap],
  );

  const activeLocale = availableLocales.includes(locale)
    ? locale
    : getFirstLocale(resumeDataMap, DEFAULT_LOCALE);

  const resumeData =
    resumeDataMap[activeLocale] ?? resumeDataMap[availableLocales[0]];

  const effectiveColors = isDark
    ? { ...colors, ...DARK_OVERRIDES }
    : colors;

  const themeStyle = {
    "--color-primary": effectiveColors.primary,
    "--color-secondary": effectiveColors.secondary,
    "--color-accent": effectiveColors.accent,
    "--color-background": effectiveColors.background,
    "--color-surface": effectiveColors.surface,
    "--color-text": effectiveColors.text,
  } as CSSProperties;

  const handleLocaleChange = (nextLocale: string) => {
    setLocale(nextLocale);
    i18n.changeLanguage(nextLocale);
  };

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
        setUploadError(t("uploadErrorInvalid"));
        return;
      }
      setUploadError(null);
      setResumeDataMap(validation.data);
      const newLocale = getFirstLocale(validation.data, DEFAULT_LOCALE);
      setLocale(newLocale);
      i18n.changeLanguage(newLocale);
    } catch (error) {
      console.error("Failed to parse uploaded JSON:", error);
      setUploadError(t("uploadErrorInvalid"));
    }
  };

  const handleDownloadPdf = async () => {
    setDownloading(true);
    try {
      const fileName = resumeData?.name
        ? `${resumeData.name.replace(/\s+/g, "_")}_Resume.pdf`
        : "Resume.pdf";
      await generateSinglePagePdf({
        elementId: "resume-preview",
        fileName,
        backgroundColor: effectiveColors.surface,
      });
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="app" style={themeStyle}>
      <Navbar />

      <Sidebar
        templates={TEMPLATE_OPTIONS}
        templateId={templateId}
        onTemplateChange={setTemplateId}
        palettes={THEME_PALETTES}
        paletteId={paletteId}
        onPaletteChange={handlePaletteChange}
        colors={colors}
        onColorsChange={handleColorsChange}
        locale={activeLocale}
        onLocaleChange={handleLocaleChange}
        uploadError={uploadError}
        onUploadData={handleUpload}
        isDark={isDark}
        onToggleDark={toggleDark}
      />

      <div className="preview-container">
        {resumeData ? (
          <ResumePreview
            data={resumeData}
            templateId={templateId}
          />
        ) : (
          <div className="preview-empty">{t("uploadErrorMissing")}</div>
        )}
      </div>

      <div className="fab-download">
        <Button onClick={handleDownloadPdf} disabled={downloading}>
          {downloading ? t("generatingLabel") : t("downloadLabel")}
        </Button>
      </div>
    </div>
  );
}

export default ResumeBuilderPage;

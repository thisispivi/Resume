import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import rawData from "../data.json";
import Navbar from "../components/organisms/Navbar";
import Sidebar from "../components/organisms/Sidebar";
import ResumePreview from "../components/organisms/ResumePreview";
import Button from "../components/atoms/Button";
import Spinner from "../components/atoms/Spinner";
import { THEME_PALETTES } from "../data/palettes";
import { TEMPLATE_OPTIONS } from "../data/templates";
import { GOOGLE_FONTS, loadGoogleFont, buildFontFamily } from "../data/fonts";
import type { GoogleFont } from "../data/fonts";
import { DEFAULT_LOCALE } from "../i18n";
import { useTheme } from "../context/useTheme";
import type { ResumeDataMap, TemplateId, ThemeColors, ThemePalette } from "../types";
import { getFirstLocale } from "../utils/resume";
import { generateSinglePagePdf } from "../utils/pdf";
import { validateResumeDataMap } from "../utils/validateResumeData";

const DEFAULT_DATA = rawData as ResumeDataMap;

const DARK_OVERRIDES = {
  background: "#0f172a",
  surface: "#1e293b",
  text: "#e2e8f0",
};

const DEFAULT_FONT = GOOGLE_FONTS[0];

function ResumeBuilderPage() {
  const { t, i18n } = useTranslation();
  const [resumeDataMap, setResumeDataMap] = useState<ResumeDataMap>(DEFAULT_DATA);
  const [pdfLocale, setPdfLocale] = useState<string>(getFirstLocale(DEFAULT_DATA, DEFAULT_LOCALE));
  const [templateId, setTemplateId] = useState<TemplateId>("modern");
  const [paletteId, setPaletteId] = useState(THEME_PALETTES[0].id);
  const [colors, setColors] = useState<ThemeColors>(THEME_PALETTES[0].colors);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [isPdfDark, setIsPdfDark] = useState(false);
  const [resumeFont, setResumeFont] = useState<GoogleFont>(DEFAULT_FONT);
  const [fontLoading, setFontLoading] = useState(false);
  const { isDark, toggleDark } = useTheme();

  const appLocale = i18n.language;

  useEffect(() => {
    setFontLoading(true);
    loadGoogleFont(resumeFont).then(() => setFontLoading(false));
  }, [resumeFont]);

  const availableLocales = useMemo(() => Object.keys(resumeDataMap), [resumeDataMap]);

  const activePdfLocale = availableLocales.includes(pdfLocale)
    ? pdfLocale
    : getFirstLocale(resumeDataMap, DEFAULT_LOCALE);

  const resumeData = resumeDataMap[activePdfLocale] ?? resumeDataMap[availableLocales[0]];

  const effectiveColors = isPdfDark ? { ...colors, ...DARK_OVERRIDES } : colors;

  const appThemeStyle = {
    "--color-primary": colors.primary,
    "--color-secondary": colors.secondary,
    "--color-accent": colors.accent,
  } as CSSProperties;

  const pdfThemeStyle = {
    "--color-primary": colors.primary,
    "--color-secondary": colors.secondary,
    "--color-accent": colors.accent,
    "--color-background": effectiveColors.background,
    "--color-surface": effectiveColors.surface,
    "--color-text": effectiveColors.text,
    "--font-sans": buildFontFamily(resumeFont),
  } as CSSProperties;

  const handleAppLocaleChange = (nextLocale: string) => {
    i18n.changeLanguage(nextLocale);
  };

  const handlePdfLocaleChange = (nextLocale: string) => {
    setPdfLocale(nextLocale);
  };

  const togglePdfDark = () => setIsPdfDark((prev) => !prev);

  const handlePaletteChange = (palette: ThemePalette) => {
    setPaletteId(palette.id);
    setColors(palette.colors);
  };

  const handleColorsChange = (nextColors: ThemeColors) => {
    setPaletteId("custom");
    setColors(nextColors);
  };

  const handleFontChange = (font: GoogleFont) => {
    setResumeFont(font);
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
      setPdfLocale(newLocale);
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
    <div className="app" style={appThemeStyle}>
      <Navbar
        appLocale={appLocale}
        onAppLocaleChange={handleAppLocaleChange}
        isDark={isDark}
        onToggleDark={toggleDark}
      />

      <Sidebar
        templates={TEMPLATE_OPTIONS}
        templateId={templateId}
        onTemplateChange={setTemplateId}
        palettes={THEME_PALETTES}
        paletteId={paletteId}
        onPaletteChange={handlePaletteChange}
        colors={colors}
        onColorsChange={handleColorsChange}
        pdfLocale={activePdfLocale}
        onPdfLocaleChange={handlePdfLocaleChange}
        uploadError={uploadError}
        onUploadData={handleUpload}
        isPdfDark={isPdfDark}
        onTogglePdfDark={togglePdfDark}
        fontFamily={resumeFont.family}
        onFontChange={handleFontChange}
      />

      <div className="preview-container">
        {resumeData ? (
          <div
            className="preview-wrapper"
            style={pdfThemeStyle}
            data-theme={isPdfDark ? "dark" : "light"}
          >
            {fontLoading && (
              <div className="font-loading-overlay">
                <Spinner size={40} />
              </div>
            )}
            <ResumePreview data={resumeData} templateId={templateId} pdfLocale={activePdfLocale} />
          </div>
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

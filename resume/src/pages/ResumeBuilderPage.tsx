import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import rawData from "@/assets/template/data.json";
import Navbar from "@/components/organisms/Navbar";
import Sidebar from "@/components/organisms/Sidebar";
import ResumePreview from "@/components/organisms/ResumePreview";
import ResumeEditorModal from "@/components/molecules/ResumeEditorModal";
import WelcomeModal from "@/components/molecules/WelcomeModal";
import Button from "@/components/atoms/Button";
import Spinner from "@/components/atoms/Spinner";
import { THEME_PALETTES } from "@/data/palettes";
import { TEMPLATE_OPTIONS } from "@/data/templates";
import { GOOGLE_FONTS, loadGoogleFont, buildFontFamily } from "@/data/fonts";
import type { GoogleFont } from "@/data/fonts";
import { DEFAULT_LOCALE } from "@/i18n";
import { useTheme } from "@/context/useTheme";
import type { ResumeData, ResumeDataMap, TemplateId, ThemeColors, ThemePalette } from "@/types";
import { buildBlankResumeData, downloadJsonFile, getFirstLocale } from "@/utils/resume";
import { generateSinglePagePdf } from "@/utils/pdf";
import { validateResumeDataMap } from "@/utils/validateResumeData";

const DEFAULT_DATA = rawData as ResumeDataMap;
const STORAGE_KEY = "resume-builder-state-v2";

const DARK_OVERRIDES = {
  background: "#0f172a",
  surface: "#1e293b",
  text: "#e2e8f0",
};

const DEFAULT_FONT = GOOGLE_FONTS[0];

/** A4 page width in px — must match $resume-width in _variables.scss */
const A4_WIDTH = 794;
/** A4 page height in px — must match $resume-height in _variables.scss */
const A4_HEIGHT = 1123;

interface PersistedBuilderState {
  resumeDataMap?: ResumeDataMap;
  pdfLocale?: string;
  templateId?: TemplateId;
  paletteId?: string;
  colors?: ThemeColors;
  isPdfDark?: boolean;
  resumeFont?: GoogleFont;
}

const isThemeColors = (value: unknown): value is ThemeColors => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const colors = value as Record<keyof ThemeColors, unknown>;
  return ["primary", "secondary", "accent", "background", "surface", "text"].every(
    (key) => typeof colors[key as keyof ThemeColors] === "string",
  );
};

const isTemplateId = (value: unknown): value is TemplateId =>
  typeof value === "string" && TEMPLATE_OPTIONS.some((template) => template.id === value);

const findFont = (value: unknown) => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return undefined;
  const candidate = value as Partial<GoogleFont>;
  return GOOGLE_FONTS.find((font) => font.family === candidate.family);
};

const readPersistedState = (): PersistedBuilderState => {
  if (typeof window === "undefined") return {};

  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY);
    if (!rawState) return {};

    const parsed = JSON.parse(rawState) as Record<string, unknown>;
    const state: PersistedBuilderState = {};
    const resumeValidation = validateResumeDataMap(parsed.resumeDataMap);
    if (resumeValidation.data) state.resumeDataMap = resumeValidation.data;
    if (typeof parsed.pdfLocale === "string") state.pdfLocale = parsed.pdfLocale;
    if (isTemplateId(parsed.templateId)) state.templateId = parsed.templateId;
    if (
      typeof parsed.paletteId === "string" &&
      THEME_PALETTES.some((palette) => palette.id === parsed.paletteId)
    ) {
      state.paletteId = parsed.paletteId;
    }
    if (isThemeColors(parsed.colors)) state.colors = parsed.colors;
    if (typeof parsed.isPdfDark === "boolean") state.isPdfDark = parsed.isPdfDark;
    state.resumeFont = findFont(parsed.resumeFont);
    return state;
  } catch (error) {
    console.warn("Failed to restore saved resume builder state:", error);
    return {};
  }
};

/** Main page orchestrating resume data, theming, template selection, and PDF export. */
function ResumeBuilderPage() {
  const { t, i18n } = useTranslation();
  const [initialState] = useState(readPersistedState);
  const initialDataMap = initialState.resumeDataMap ?? DEFAULT_DATA;
  const [resumeDataMap, setResumeDataMap] = useState<ResumeDataMap>(initialDataMap);
  const [pdfLocale, setPdfLocale] = useState<string>(
    initialState.pdfLocale ?? getFirstLocale(initialDataMap, DEFAULT_LOCALE),
  );
  const [templateId, setTemplateId] = useState<TemplateId>(initialState.templateId ?? "modern");
  const [paletteId, setPaletteId] = useState(initialState.paletteId ?? THEME_PALETTES[0].id);
  const [colors, setColors] = useState<ThemeColors>(
    initialState.colors ?? THEME_PALETTES[0].colors,
  );
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPdfDark, setIsPdfDark] = useState(initialState.isPdfDark ?? false);
  const [resumeFont, setResumeFont] = useState<GoogleFont>(initialState.resumeFont ?? DEFAULT_FONT);
  const [isFontLoading, setIsFontLoading] = useState(false);
  const [prevFont, setPrevFont] = useState<GoogleFont | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(() => !initialState.resumeDataMap);
  const { isDark, toggleDark } = useTheme();
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);

  const appLocale = i18n.language;

  // Flag loading as soon as the font changes, before the async load effect below runs.
  if (resumeFont !== prevFont) {
    setPrevFont(resumeFont);
    setIsFontLoading(true);
  }

  useEffect(() => {
    loadGoogleFont(resumeFont).then(() => setIsFontLoading(false));
  }, [resumeFont]);

  // Scale the A4 preview to fit the container on smaller screens
  useEffect(() => {
    const container = previewContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const availableWidth = entry.contentRect.width;
      setPreviewScale(Math.min(1, availableWidth / A4_WIDTH));
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const availableLocales = useMemo(() => Object.keys(resumeDataMap), [resumeDataMap]);

  const activePdfLocale = availableLocales.includes(pdfLocale)
    ? pdfLocale
    : getFirstLocale(resumeDataMap, DEFAULT_LOCALE);

  const resumeData = resumeDataMap[activePdfLocale] ?? resumeDataMap[availableLocales[0]];

  const effectiveColors = isPdfDark ? { ...colors, ...DARK_OVERRIDES } : colors;

  useEffect(() => {
    const state: PersistedBuilderState = {
      resumeDataMap,
      pdfLocale: activePdfLocale,
      templateId,
      paletteId,
      colors,
      isPdfDark,
      resumeFont,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [activePdfLocale, colors, isPdfDark, paletteId, resumeDataMap, resumeFont, templateId]);

  // Set on :root (not .app) so portaled dropdowns/modals inherit the palette too
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--color-primary", colors.primary);
    root.setProperty("--color-secondary", colors.secondary);
    root.setProperty("--color-accent", colors.accent);
  }, [colors]);

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

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleEditResume = useCallback(() => {
    setIsEditorOpen(true);
  }, []);

  const handleUseExample = useCallback(() => {
    setIsWelcomeOpen(false);
  }, []);

  const handleStartBlank = useCallback(() => {
    const blankLocale = getFirstLocale(resumeDataMap, DEFAULT_LOCALE);
    setResumeDataMap({ [blankLocale]: buildBlankResumeData() });
    setPdfLocale(blankLocale);
    setIsWelcomeOpen(false);
    setIsEditorOpen(true);
  }, [resumeDataMap]);

  const handleDownloadData = useCallback(() => {
    downloadJsonFile(resumeDataMap, "resume-data.json");
  }, [resumeDataMap]);

  const handleEditorSave = useCallback(
    (updatedData: ResumeData) => {
      setResumeDataMap((prev) => ({
        ...prev,
        [activePdfLocale]: updatedData,
      }));
    },
    [activePdfLocale],
  );

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
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
      setIsDownloading(false);
    }
  };

  return (
    <div className="app">
      <Navbar
        appLocale={appLocale}
        isDark={isDark}
        onAppLocaleChange={handleAppLocaleChange}
        onToggleDark={toggleDark}
        onToggleSidebar={handleToggleSidebar}
      />

      <Sidebar
        availableLocales={availableLocales}
        colors={colors}
        fontFamily={resumeFont.family}
        isPdfDark={isPdfDark}
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={handleCloseSidebar}
        onColorsChange={handleColorsChange}
        onDownloadData={handleDownloadData}
        onEditResume={handleEditResume}
        onFontChange={handleFontChange}
        onPaletteChange={handlePaletteChange}
        onPdfLocaleChange={handlePdfLocaleChange}
        onTemplateChange={setTemplateId}
        onTogglePdfDark={togglePdfDark}
        onUploadData={handleUpload}
        paletteId={paletteId}
        palettes={THEME_PALETTES}
        pdfLocale={activePdfLocale}
        templateId={templateId}
        templates={TEMPLATE_OPTIONS}
        uploadError={uploadError}
      />

      <div className="preview-container" ref={previewContainerRef}>
        {resumeData ? (
          <div
            className="preview-wrapper"
            data-theme={isPdfDark ? "dark" : "light"}
            style={{
              ...pdfThemeStyle,
              ...(previewScale < 1
                ? {
                    transform: `scale(${previewScale})`,
                    transformOrigin: "top center",
                    width: A4_WIDTH,
                    height: A4_HEIGHT * previewScale,
                  }
                : {}),
            }}
          >
            {isFontLoading ? (
              <div className="font-loading-overlay">
                <Spinner size={40} />
              </div>
            ) : null}
            <ResumePreview data={resumeData} pdfLocale={activePdfLocale} templateId={templateId} />
          </div>
        ) : (
          <div className="preview-empty">{t("uploadErrorMissing")}</div>
        )}
      </div>

      <div className="fab-download">
        <Button disabled={isDownloading} onClick={handleDownloadPdf} variant="brand">
          {isDownloading ? <Spinner size={24} /> : t("downloadLabel")}
        </Button>
      </div>

      {resumeData ? (
        <ResumeEditorModal
          data={resumeData}
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleEditorSave}
        />
      ) : null}

      <WelcomeModal
        isOpen={isWelcomeOpen}
        onStartBlank={handleStartBlank}
        onUseExample={handleUseExample}
      />
    </div>
  );
}

export default ResumeBuilderPage;

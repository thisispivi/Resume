import { useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import rawData from "@/assets/template/data.json";
import ContentPanel from "@/components/organisms/ContentPanel";
import DesignPanel from "@/components/organisms/DesignPanel";
import ExportPanel from "@/components/organisms/ExportPanel";
import MobileNav from "@/components/organisms/MobileNav";
import Navbar from "@/components/organisms/Navbar";
import PreviewStage from "@/components/organisms/PreviewStage";
import ResumePreview from "@/components/organisms/ResumePreview";
import Workspace from "@/components/organisms/Workspace";
import type { WorkspaceTab } from "@/data/workspaceTabs";
import StartModal from "@/components/molecules/StartModal";
import { THEME_PALETTES } from "@/data/palettes";
import { TEMPLATE_OPTIONS } from "@/data/templates";
import { GOOGLE_FONTS, loadGoogleFont, buildFontFamily } from "@/data/fonts";
import type { GoogleFont } from "@/data/fonts";
import { DEFAULT_LOCALE } from "@/i18n";
import { useTheme } from "@/context/useTheme";
import type { ResumeData, ResumeDataMap, TemplateId, ThemeColors, ThemePalette } from "@/types";
import {
  buildBlankResumeData,
  buildPdfFileName,
  buildResumeTemplate,
  downloadJsonFile,
  getFirstLocale,
} from "@/utils/resume";
import { generateResumePdf } from "@/utils/pdf";
import { validateResumeDataMap } from "@/utils/validateResumeData";

const DEFAULT_DATA = rawData as ResumeDataMap;
const STORAGE_KEY = "resume-builder-state-v3";

/** Delay before persisting to localStorage, so typing does not write on every keystroke. */
const PERSIST_DELAY_MS = 400;

const DARK_OVERRIDES = {
  background: "#0f172a",
  surface: "#1e293b",
  text: "#e2e8f0",
};

const DEFAULT_FONT = GOOGLE_FONTS[0];

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
  const [resumeFont, setResumeFont] = useState<GoogleFont>(initialState.resumeFont ?? DEFAULT_FONT);
  const [isPdfDark, setIsPdfDark] = useState(initialState.isPdfDark ?? false);

  const [workspaceTab, setWorkspaceTab] = useState<WorkspaceTab>("content");
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFontLoading, setIsFontLoading] = useState(false);
  const [prevFont, setPrevFont] = useState<GoogleFont | null>(null);
  const [isStartOpen, setIsStartOpen] = useState(() => !initialState.resumeDataMap);

  const { isDark, toggleDark } = useTheme();
  const appLocale = i18n.language;

  // Flag loading as soon as the font changes, before the async load effect below runs.
  if (resumeFont !== prevFont) {
    setPrevFont(resumeFont);
    setIsFontLoading(true);
  }

  useEffect(() => {
    loadGoogleFont(resumeFont).then(() => setIsFontLoading(false));
  }, [resumeFont]);

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
    const timer = window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, PERSIST_DELAY_MS);

    return () => window.clearTimeout(timer);
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

  const importJson = useCallback(
    async (file: File | null) => {
      if (!file) return false;
      try {
        const parsed = JSON.parse(await file.text()) as unknown;
        const validation = validateResumeDataMap(parsed);
        if (validation.errors.length > 0 || !validation.data) {
          setUploadError(t("uploadErrorInvalid"));
          return false;
        }
        setUploadError(null);
        setResumeDataMap(validation.data);
        setPdfLocale(getFirstLocale(validation.data, DEFAULT_LOCALE));
        return true;
      } catch (error) {
        console.error("Failed to parse uploaded JSON:", error);
        setUploadError(t("uploadErrorInvalid"));
        return false;
      }
    },
    [t],
  );

  const handleResumeChange = useCallback(
    (updated: ResumeData) => {
      setResumeDataMap((prev) => ({ ...prev, [activePdfLocale]: updated }));
    },
    [activePdfLocale],
  );

  const handlePaletteChange = useCallback((palette: ThemePalette) => {
    setPaletteId(palette.id);
    setColors(palette.colors);
  }, []);

  const handleColorsChange = useCallback((nextColors: ThemeColors) => {
    setPaletteId("custom");
    setColors(nextColors);
  }, []);

  const handleAddLocale = useCallback(
    (locale: string) => {
      if (!locale || resumeDataMap[locale]) return;
      setResumeDataMap((prev) => ({
        ...prev,
        [locale]: structuredClone(prev[activePdfLocale] ?? buildBlankResumeData()),
      }));
      setPdfLocale(locale);
    },
    [activePdfLocale, resumeDataMap],
  );

  const handleRemoveLocale = useCallback(
    (locale: string) => {
      if (Object.keys(resumeDataMap).length <= 1) return;

      const next = { ...resumeDataMap };
      delete next[locale];
      setResumeDataMap(next);
      setPdfLocale(getFirstLocale(next, DEFAULT_LOCALE));
    },
    [resumeDataMap],
  );

  const handleReset = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setResumeDataMap(DEFAULT_DATA);
    setPdfLocale(getFirstLocale(DEFAULT_DATA, DEFAULT_LOCALE));
    setIsStartOpen(true);
  }, []);

  const handleStartBlank = useCallback(() => {
    const blankLocale = getFirstLocale(resumeDataMap, DEFAULT_LOCALE);
    setResumeDataMap({ [blankLocale]: buildBlankResumeData() });
    setPdfLocale(blankLocale);
    setIsStartOpen(false);
    setWorkspaceTab("content");
  }, [resumeDataMap]);

  const handleStartImport = useCallback(
    async (file: File | null) => {
      if (await importJson(file)) setIsStartOpen(false);
    },
    [importJson],
  );

  const handleDownloadPdf = useCallback(async () => {
    setIsDownloading(true);
    try {
      await generateResumePdf({
        elementId: "resume-preview",
        fileName: buildPdfFileName(resumeData?.name ?? ""),
        backgroundColor: effectiveColors.surface,
      });
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsDownloading(false);
    }
  }, [effectiveColors.surface, resumeData]);

  const handleSelectTab = useCallback((tab: WorkspaceTab) => {
    setWorkspaceTab(tab);
    setIsPreviewVisible(false);
  }, []);

  return (
    <div className="app">
      <Navbar
        appLocale={appLocale}
        isDark={isDark}
        isDownloading={isDownloading}
        onAppLocaleChange={(locale) => void i18n.changeLanguage(locale)}
        onDownloadPdf={() => void handleDownloadPdf()}
        onToggleDark={toggleDark}
      />

      <div className="app__body">
        <Workspace
          activeTab={workspaceTab}
          isHiddenOnMobile={isPreviewVisible}
          onTabChange={setWorkspaceTab}
        >
          {workspaceTab === "content" && resumeData ? (
            <ContentPanel data={resumeData} onChange={handleResumeChange} />
          ) : null}

          {workspaceTab === "design" ? (
            <DesignPanel
              colors={colors}
              fontFamily={resumeFont.family}
              isPdfDark={isPdfDark}
              onColorsChange={handleColorsChange}
              onFontChange={setResumeFont}
              onPaletteChange={handlePaletteChange}
              onTemplateChange={setTemplateId}
              onTogglePdfDark={() => setIsPdfDark((prev) => !prev)}
              paletteId={paletteId}
              palettes={THEME_PALETTES}
              templateId={templateId}
              templates={TEMPLATE_OPTIONS}
            />
          ) : null}

          {workspaceTab === "export" ? (
            <ExportPanel
              availableLocales={availableLocales}
              onAddLocale={handleAddLocale}
              onDownloadData={() => downloadJsonFile(resumeDataMap, "resume-data.json")}
              onDownloadTemplate={() =>
                downloadJsonFile(buildResumeTemplate(), "resume-template.json")
              }
              onPdfLocaleChange={setPdfLocale}
              onRemoveLocale={handleRemoveLocale}
              onReset={handleReset}
              onUploadData={(file) => void importJson(file)}
              pdfLocale={activePdfLocale}
              uploadError={uploadError}
            />
          ) : null}
        </Workspace>

        <main className={`app__preview${isPreviewVisible ? " app__preview--mobile-visible" : ""}`}>
          {resumeData ? (
            <PreviewStage
              isFontLoading={isFontLoading}
              isPdfDark={isPdfDark}
              themeStyle={pdfThemeStyle}
            >
              <ResumePreview
                data={resumeData}
                pdfLocale={activePdfLocale}
                templateId={templateId}
              />
            </PreviewStage>
          ) : (
            <div className="preview-empty">{t("uploadErrorMissing")}</div>
          )}
        </main>
      </div>

      <MobileNav
        activeTab={workspaceTab}
        isPreviewVisible={isPreviewVisible}
        onSelectPreview={() => setIsPreviewVisible(true)}
        onSelectTab={handleSelectTab}
      />

      <StartModal
        isOpen={isStartOpen}
        onImport={(file) => void handleStartImport(file)}
        onStartBlank={handleStartBlank}
        onUseExample={() => setIsStartOpen(false)}
      />
    </div>
  );
}

export default ResumeBuilderPage;

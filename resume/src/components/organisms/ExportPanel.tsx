import { useTranslation } from "react-i18next";
import Button from "@/components/atoms/Button";
import CollapsibleSection from "@/components/atoms/CollapsibleSection";
import Dropdown from "@/components/atoms/Dropdown";
import FileUploader from "@/components/molecules/FileUploader";
import LocalePicker from "@/components/molecules/LocalePicker";
import { SUPPORTED_LOCALES } from "@/i18n";

interface ExportPanelProps {
  availableLocales: string[];
  onAddLocale: (locale: string) => void;
  onDownloadData: () => void;
  onDownloadTemplate: () => void;
  onPdfLocaleChange: (value: string) => void;
  onRemoveLocale: (locale: string) => void;
  onReset: () => void;
  onUploadData: (file: File | null) => void;
  pdfLocale: string;
  uploadError: string | null;
}

/**
 * Export tab of the workspace: resume language variants, JSON import/export,
 * and the destructive reset action.
 */
function ExportPanel({
  availableLocales,
  onAddLocale,
  onDownloadData,
  onDownloadTemplate,
  onPdfLocaleChange,
  onRemoveLocale,
  onReset,
  onUploadData,
  pdfLocale,
  uploadError,
}: ExportPanelProps) {
  const { t } = useTranslation();

  const addableLocales = SUPPORTED_LOCALES.filter((locale) => !availableLocales.includes(locale));

  return (
    <div className="export-panel">
      <CollapsibleSection isOpenByDefault title={t("pdfLanguageLabel")}>
        <p className="panel-hint">{t("localesHint")}</p>
        <LocalePicker
          label={t("pdfLanguageLabel")}
          locales={availableLocales}
          onChange={onPdfLocaleChange}
          value={pdfLocale}
        />

        {addableLocales.length > 0 ? (
          <Dropdown
            label={t("addLocaleLabel")}
            onChange={onAddLocale}
            options={[
              { value: "", label: t("addLocalePlaceholder") },
              ...addableLocales.map((locale) => ({
                value: locale,
                label: t(`localeNames.${locale}`, { defaultValue: locale }),
              })),
            ]}
            value=""
          />
        ) : null}

        {availableLocales.length > 1 ? (
          <Button onClick={() => onRemoveLocale(pdfLocale)} size="sm" variant="ghost">
            {t("removeLocaleLabel")}
          </Button>
        ) : null}
      </CollapsibleSection>

      <CollapsibleSection isOpenByDefault title={t("dataLabel")}>
        <FileUploader hint={t("uploadHint")} label={t("uploadLabel")} onFileSelect={onUploadData} />
        {uploadError ? <span className="panel-error">{uploadError}</span> : null}

        <div className="export-panel__actions">
          <Button onClick={onDownloadData} variant="ghost">
            {t("downloadDataLabel")}
          </Button>
          <Button onClick={onDownloadTemplate} variant="ghost">
            {t("downloadTemplateLabel")}
          </Button>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title={t("dangerZoneLabel")}>
        <p className="panel-hint">{t("resetHint")}</p>
        <Button onClick={onReset} variant="ghost">
          {t("resetLabel")}
        </Button>
      </CollapsibleSection>
    </div>
  );
}

export default ExportPanel;

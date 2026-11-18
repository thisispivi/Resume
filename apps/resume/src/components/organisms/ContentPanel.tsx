import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import CollapsibleSection from "@/components/atoms/CollapsibleSection";
import Button from "@/components/atoms/Button";
import Dropdown from "@/components/atoms/Dropdown";
import StringListInput from "@/components/atoms/StringListInput";
import TextArea from "@/components/atoms/TextArea";
import TextInput from "@/components/atoms/TextInput";
import Toggle from "@/components/atoms/Toggle";
import Avatar from "@/components/molecules/Avatar";
import EntryFields from "@/components/molecules/EntryFields";
import type { EditableEntry } from "@/components/molecules/EntryFields";
import EntryList from "@/components/molecules/EntryList";
import PhotoEditorModal from "@/components/molecules/PhotoEditorModal";
import { CONTACT_TYPES } from "@/data/contactTypes";
import { CUSTOM_ENTRY_FIELDS, LIST_SECTIONS, PERSONAL_DETAIL_FIELDS } from "@/data/resumeSections";
import type { ListSectionId } from "@/data/resumeSections";
import type { ContactLink, CustomSection, ResumeData } from "@/types";
import { getCompleteness } from "@/utils/resume";

interface ContentPanelProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const EMPTY_CONTACT: ContactLink = { type: "email", value: "" };
const EMPTY_CUSTOM_SECTION: CustomSection = { title: "", entries: [] };

/** Joins an entry's header fields into the label shown while it is collapsed. */
const buildHeader = (entry: EditableEntry, keys: string[]) =>
  keys
    .map((key) => entry[key])
    .filter((value): value is string => typeof value === "string" && value.length > 0)
    .join(" · ");

/**
 * Content tab of the workspace: every resume section, edited inline against the
 * live preview. Repeatable sections are driven by the declarative registry in
 * `data/resumeSections.ts`, so the form here stays the same size as the app
 * grows new sections.
 */
function ContentPanel({ data, onChange }: ContentPanelProps) {
  const { t } = useTranslation();
  const [pendingPhoto, setPendingPhoto] = useState<File | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const completeness = getCompleteness(data);

  const updateField = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    onChange({ ...data, [key]: value });
  };

  const updateSection = (id: ListSectionId, entries: EditableEntry[]) => {
    onChange({ ...data, [id]: entries } as ResumeData);
  };

  const updatePersonalDetail = (key: string, value: unknown) => {
    onChange({
      ...data,
      personalDetails: { ...data.personalDetails, [key]: value },
    });
  };

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";
    if (file) setPendingPhoto(file);
  };

  const contactOptions = CONTACT_TYPES.map((config) => ({
    value: config.type,
    label: t(config.labelKey, config.fallbackLabel),
  }));

  return (
    <div className="content-panel">
      <div className="content-panel__progress">
        <div className="content-panel__progress-head">
          <span>{t("editor.completeness")}</span>
          <span className="content-panel__progress-value">{completeness}%</span>
        </div>
        <div className="content-panel__progress-track">
          <div
            className="content-panel__progress-bar"
            style={{ width: `${String(completeness)}%` }}
          />
        </div>
      </div>

      <CollapsibleSection isOpenByDefault title={t("editor.basics")}>
        <div className="entry-fields">
          <div className="entry-fields__field">
            <TextInput
              label={t("editor.name")}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder={t("editor.namePlaceholder")}
              value={data.name}
            />
          </div>
          <div className="entry-fields__field">
            <TextInput
              label={t("editor.jobTitle")}
              onChange={(event) => updateField("jobTitle", event.target.value)}
              placeholder={t("editor.jobTitlePlaceholder")}
              value={data.jobTitle}
            />
          </div>
          <div className="entry-fields__field entry-fields__field--wide">
            <TextArea
              label={t("editor.summary")}
              onChange={(event) => updateField("summary", event.target.value)}
              placeholder={t("editor.summaryPlaceholder")}
              rows={4}
              value={data.summary ?? ""}
            />
          </div>
          <div className="entry-fields__field entry-fields__field--wide">
            <span className="text-input__label">{t("editor.photo")}</span>
            <div className="content-panel__photo">
              <Avatar name={data.name} photo={data.photo} />
              <div className="content-panel__photo-actions">
                <Button onClick={() => photoInputRef.current?.click()} size="sm" variant="ghost">
                  {t("editor.uploadPhoto")}
                </Button>
                {data.photo ? (
                  <Button onClick={() => updateField("photo", "")} size="sm" variant="ghost">
                    {t("editor.removePhoto")}
                  </Button>
                ) : null}
              </div>
            </div>
            <input
              accept="image/*"
              hidden
              onChange={handlePhotoSelect}
              ref={photoInputRef}
              type="file"
            />
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection badge={data.contact.length} title={t("sectionTitles.contact")}>
        <EntryList<EditableEntry>
          addLabel={t("editor.addContact")}
          emptyEntry={EMPTY_CONTACT as unknown as EditableEntry}
          emptyMessage={t("editor.emptyContact")}
          entries={data.contact as unknown as EditableEntry[]}
          getHeader={(entry) => buildHeader(entry, ["value", "label"])}
          onChange={(entries) => updateField("contact", entries as unknown as ContactLink[])}
          renderFields={(entry, onFieldChange) => (
            <div className="entry-fields">
              <div className="entry-fields__field">
                <Dropdown
                  label={t("editor.contactType")}
                  onChange={(value) => onFieldChange("type", value)}
                  options={contactOptions}
                  value={typeof entry.type === "string" ? entry.type : "email"}
                />
              </div>
              <div className="entry-fields__field">
                <TextInput
                  label={t("editor.contactValue")}
                  onChange={(event) => onFieldChange("value", event.target.value)}
                  value={typeof entry.value === "string" ? entry.value : ""}
                />
              </div>
              {entry.type === "custom" ? (
                <div className="entry-fields__field entry-fields__field--wide">
                  <TextInput
                    label={t("editor.contactLabel")}
                    onChange={(event) => onFieldChange("label", event.target.value)}
                    placeholder={t("editor.contactLabelPlaceholder")}
                    value={typeof entry.label === "string" ? entry.label : ""}
                  />
                </div>
              ) : null}
            </div>
          )}
        />
      </CollapsibleSection>

      <CollapsibleSection title={t("editor.details")}>
        <EntryFields
          entry={(data.personalDetails ?? {}) as EditableEntry}
          fields={PERSONAL_DETAIL_FIELDS}
          onChange={updatePersonalDetail}
        />
      </CollapsibleSection>

      {LIST_SECTIONS.map((section) => {
        const entries = (data[section.id] ?? []) as unknown as EditableEntry[];

        return (
          <CollapsibleSection badge={entries.length} key={section.id} title={t(section.titleKey)}>
            {section.id === "references" ? (
              <div className="content-panel__inline-toggle">
                <Toggle
                  isChecked={data.referencesOnRequest ?? false}
                  label={t("editor.referencesOnRequest")}
                  onChange={() => updateField("referencesOnRequest", !data.referencesOnRequest)}
                />
              </div>
            ) : null}

            <EntryList<EditableEntry>
              addLabel={t(`editor.add.${section.id}`)}
              emptyEntry={section.emptyEntry}
              emptyMessage={t(`editor.empty.${section.id}`)}
              entries={entries}
              getHeader={(entry) => buildHeader(entry, section.headerFields)}
              onChange={(next) => updateSection(section.id, next)}
              renderFields={(entry, onFieldChange) => (
                <EntryFields entry={entry} fields={section.fields} onChange={onFieldChange} />
              )}
            />
          </CollapsibleSection>
        );
      })}

      <CollapsibleSection badge={data.interests?.length ?? 0} title={t("sectionTitles.interests")}>
        <div className="entry-fields">
          <div className="entry-fields__field entry-fields__field--wide">
            <StringListInput
              label={t("sectionTitles.interests")}
              onChange={(value) => updateField("interests", value)}
              placeholder={t("editor.interestsPlaceholder")}
              value={data.interests ?? []}
              variant="comma"
            />
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        badge={data.customSections?.length ?? 0}
        title={t("editor.customSections")}
      >
        <EntryList<EditableEntry>
          addLabel={t("editor.addCustomSection")}
          emptyEntry={EMPTY_CUSTOM_SECTION as unknown as EditableEntry}
          emptyMessage={t("editor.emptyCustomSections")}
          entries={(data.customSections ?? []) as unknown as EditableEntry[]}
          getHeader={(entry) => buildHeader(entry, ["title"])}
          onChange={(entries) =>
            updateField("customSections", entries as unknown as CustomSection[])
          }
          renderFields={(entry, onFieldChange) => (
            <div className="entry-fields">
              <div className="entry-fields__field entry-fields__field--wide">
                <TextInput
                  label={t("editor.sectionTitle")}
                  onChange={(event) => onFieldChange("title", event.target.value)}
                  placeholder={t("editor.sectionTitlePlaceholder")}
                  value={typeof entry.title === "string" ? entry.title : ""}
                />
              </div>
              <div className="entry-fields__field entry-fields__field--wide">
                <EntryList<EditableEntry>
                  addLabel={t("editor.addEntry")}
                  emptyEntry={{ title: "" }}
                  emptyMessage={t("editor.emptyCustomEntries")}
                  entries={Array.isArray(entry.entries) ? (entry.entries as EditableEntry[]) : []}
                  getHeader={(nested) => buildHeader(nested, ["title", "subtitle"])}
                  onChange={(nested) => onFieldChange("entries", nested)}
                  renderFields={(nested, onNestedChange) => (
                    <EntryFields
                      entry={nested}
                      fields={CUSTOM_ENTRY_FIELDS}
                      onChange={onNestedChange}
                    />
                  )}
                />
              </div>
            </div>
          )}
        />
      </CollapsibleSection>

      {pendingPhoto ? (
        <PhotoEditorModal
          image={pendingPhoto}
          isOpen
          onCancel={() => setPendingPhoto(null)}
          onSave={(dataUrl) => {
            updateField("photo", dataUrl);
            setPendingPhoto(null);
          }}
        />
      ) : null}
    </div>
  );
}

export default ContentPanel;

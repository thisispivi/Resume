/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/components/atoms/Modal";
import TextInput from "@/components/atoms/TextInput";
import TextArea from "@/components/atoms/TextArea";
import Button from "@/components/atoms/Button";
import Dropdown from "@/components/atoms/Dropdown";
import Avatar from "@/components/molecules/Avatar";
import PhotoEditorModal from "@/components/molecules/PhotoEditorModal";
import { CONTACT_TYPES } from "@/data/contactTypes";
import type {
  Certification,
  ContactLink,
  Education,
  Experience,
  Language,
  PersonalDetails,
  Project,
  ResumeData,
  SkillCategory,
} from "@/types";
import TrashIcon from "@/assets/icons/trash.svg?react";

type SectionId =
  | "personal"
  | "details"
  | "contact"
  | "experience"
  | "education"
  | "skills"
  | "languages"
  | "projects"
  | "certifications";

interface ResumeEditorModalProps {
  data: ResumeData;
  onClose: () => void;
  onSave: (data: ResumeData) => void;
  isOpen: boolean;
}

const EMPTY_EXPERIENCE: Experience = {
  company: "",
  description: "",
  duration: "",
  position: "",
};

const EMPTY_EDUCATION: Education = {
  degree: "",
  duration: "",
  institution: "",
};

const EMPTY_CONTACT: ContactLink = { type: "email", value: "" };
const EMPTY_SKILL: SkillCategory = { category: "", items: [] };
const EMPTY_LANGUAGE: Language = { language: "", proficiency: "" };
const EMPTY_PROJECT: Project = { description: "", name: "" };
const EMPTY_CERTIFICATION: Certification = { issuer: "", name: "" };

/** Modal with tabbed form sections for editing all resume data fields. */
function ResumeEditorModal({ data, isOpen, onClose, onSave }: ResumeEditorModalProps) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState<ResumeData>(() => structuredClone(data));
  const [activeSection, setActiveSection] = useState<SectionId>("personal");

  // Re-sync draft whenever external data changes (e.g. JSON upload or locale switch).
  const [prevData, setPrevData] = useState(data);
  if (data !== prevData) {
    setPrevData(data);
    setDraft(structuredClone(data));
  }

  const updateField = useCallback(<K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updatePersonalDetails = useCallback((key: keyof PersonalDetails, value: string) => {
    setDraft((prev) => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [key]: value },
    }));
  }, []);

  const handleSave = useCallback(() => {
    onSave(draft);
    onClose();
  }, [draft, onSave, onClose]);

  const sections: { id: SectionId; labelKey: string }[] = [
    { id: "personal", labelKey: "editor.personal" },
    { id: "details", labelKey: "editor.details" },
    { id: "contact", labelKey: "editor.contact" },
    { id: "experience", labelKey: "sectionTitles.experience" },
    { id: "education", labelKey: "sectionTitles.education" },
    { id: "skills", labelKey: "sectionTitles.skills" },
    { id: "languages", labelKey: "sectionTitles.languages" },
    { id: "projects", labelKey: "sectionTitles.projects" },
    { id: "certifications", labelKey: "sectionTitles.certifications" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("editor.title")}>
      <div className="resume-editor">
        <nav className="resume-editor__tabs">
          {sections.map(({ id, labelKey }) => (
            <button
              className={`resume-editor__tab${activeSection === id ? " resume-editor__tab--active" : ""}`}
              key={id}
              onClick={() => setActiveSection(id)}
              type="button"
            >
              {t(labelKey)}
            </button>
          ))}
        </nav>

        <div className="resume-editor__content">
          {activeSection === "personal" ? (
            <PersonalSection draft={draft} onUpdate={updateField} />
          ) : null}

          {activeSection === "details" ? (
            <PersonalDetailsSection
              details={draft.personalDetails ?? {}}
              onUpdate={updatePersonalDetails}
            />
          ) : null}

          {activeSection === "contact" ? (
            <ListSection<ContactLink>
              emptyItem={EMPTY_CONTACT}
              items={draft.contact}
              onUpdate={(items) => updateField("contact", items)}
              renderItem={(item, index, onChange) => (
                <ContactFields index={index} item={item} onChange={onChange} />
              )}
              sectionKey="contact"
            />
          ) : null}

          {activeSection === "experience" ? (
            <ListSection<Experience>
              emptyItem={EMPTY_EXPERIENCE}
              items={draft.experience ?? []}
              onUpdate={(items) => updateField("experience", items)}
              renderItem={(item, index, onChange) => (
                <ExperienceFields index={index} item={item} onChange={onChange} />
              )}
              sectionKey="experience"
            />
          ) : null}

          {activeSection === "education" ? (
            <ListSection<Education>
              emptyItem={EMPTY_EDUCATION}
              items={draft.education ?? []}
              onUpdate={(items) => updateField("education", items)}
              renderItem={(item, index, onChange) => (
                <EducationFields index={index} item={item} onChange={onChange} />
              )}
              sectionKey="education"
            />
          ) : null}

          {activeSection === "skills" ? (
            <ListSection<SkillCategory>
              emptyItem={EMPTY_SKILL}
              items={draft.skills ?? []}
              onUpdate={(items) => updateField("skills", items)}
              renderItem={(item, index, onChange) => (
                <SkillFields index={index} item={item} onChange={onChange} />
              )}
              sectionKey="skills"
            />
          ) : null}

          {activeSection === "languages" ? (
            <ListSection<Language>
              emptyItem={EMPTY_LANGUAGE}
              items={draft.languages ?? []}
              onUpdate={(items) => updateField("languages", items)}
              renderItem={(item, index, onChange) => (
                <LanguageFields index={index} item={item} onChange={onChange} />
              )}
              sectionKey="languages"
            />
          ) : null}

          {activeSection === "projects" ? (
            <ListSection<Project>
              emptyItem={EMPTY_PROJECT}
              items={draft.projects ?? []}
              onUpdate={(items) => updateField("projects", items)}
              renderItem={(item, index, onChange) => (
                <ProjectFields index={index} item={item} onChange={onChange} />
              )}
              sectionKey="projects"
            />
          ) : null}

          {activeSection === "certifications" ? (
            <ListSection<Certification>
              emptyItem={EMPTY_CERTIFICATION}
              items={draft.certifications ?? []}
              onUpdate={(items) => updateField("certifications", items)}
              renderItem={(item, index, onChange) => (
                <CertificationFields index={index} item={item} onChange={onChange} />
              )}
              sectionKey="certifications"
            />
          ) : null}
        </div>

        <div className="modal__footer">
          <Button onClick={onClose} variant="ghost">
            {t("editor.cancel")}
          </Button>
          <Button onClick={handleSave}>{t("editor.save")}</Button>
        </div>
      </div>
    </Modal>
  );
}

/* ── Section sub-components ── */

function PersonalSection({
  draft,
  onUpdate,
}: {
  draft: ResumeData;
  onUpdate: <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => void;
}) {
  const { t } = useTranslation();
  const [pendingPhoto, setPendingPhoto] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    e.target.value = "";
    if (file) setPendingPhoto(file);
  };

  const handlePhotoSave = (dataUrl: string) => {
    onUpdate("photo", dataUrl);
    setPendingPhoto(null);
  };

  return (
    <div className="resume-editor__fields">
      <TextInput
        label={t("editor.name")}
        onChange={(e) => onUpdate("name", e.target.value)}
        placeholder={t("editor.namePlaceholder")}
        value={draft.name}
      />
      <TextInput
        label={t("editor.jobTitle")}
        onChange={(e) => onUpdate("jobTitle", e.target.value)}
        placeholder={t("editor.jobTitlePlaceholder")}
        value={draft.jobTitle}
      />

      <div className="resume-editor__photo">
        <span className="text-input__label">{t("editor.photo")}</span>
        <div className="resume-editor__photo-row">
          <Avatar name={draft.name} photo={draft.photo} />
          <div className="resume-editor__photo-actions">
            <Button onClick={() => fileInputRef.current?.click()} size="sm" variant="ghost">
              {t("editor.uploadPhoto")}
            </Button>
            {draft.photo ? (
              <Button onClick={() => onUpdate("photo", "")} size="sm" variant="ghost">
                {t("editor.removePhoto")}
              </Button>
            ) : null}
          </div>
        </div>
        <input accept="image/*" hidden onChange={handleFileSelect} ref={fileInputRef} type="file" />
      </div>

      <TextArea
        label={t("editor.summary")}
        onChange={(e) => onUpdate("summary", e.target.value)}
        placeholder={t("editor.summaryPlaceholder")}
        rows={4}
        value={draft.summary ?? ""}
      />

      {pendingPhoto ? (
        <PhotoEditorModal
          image={pendingPhoto}
          isOpen={Boolean(pendingPhoto)}
          onCancel={() => setPendingPhoto(null)}
          onSave={handlePhotoSave}
        />
      ) : null}
    </div>
  );
}

function PersonalDetailsSection({
  details,
  onUpdate,
}: {
  details: PersonalDetails;
  onUpdate: (key: keyof PersonalDetails, value: string) => void;
}) {
  const { t } = useTranslation();
  const fields: { key: keyof PersonalDetails; labelKey: string }[] = [
    { key: "location", labelKey: "editor.location" },
    { key: "birthDate", labelKey: "editor.birthDate" },
    { key: "age", labelKey: "editor.age" },
    { key: "nationality", labelKey: "editor.nationality" },
    { key: "drivingLicense", labelKey: "editor.drivingLicense" },
    { key: "workAuthorization", labelKey: "editor.workAuthorization" },
    { key: "availability", labelKey: "editor.availability" },
    { key: "pronouns", labelKey: "editor.pronouns" },
  ];

  return (
    <div className="resume-editor__fields">
      {fields.map(({ key, labelKey }) => (
        <TextInput
          key={key}
          label={t(labelKey)}
          onChange={(e) => onUpdate(key, e.target.value)}
          value={details[key] ?? ""}
        />
      ))}
    </div>
  );
}

/* ── Generic list section ── */

interface ListSectionProps<T> {
  emptyItem: T;
  items: T[];
  onUpdate: (items: T[]) => void;
  renderItem: (item: T, index: number, onChange: (updated: T) => void) => React.ReactNode;
  sectionKey: string;
}

function ListSection<T>({
  emptyItem,
  items,
  onUpdate,
  renderItem,
  sectionKey,
}: ListSectionProps<T>) {
  const { t } = useTranslation();

  const handleAdd = () => {
    onUpdate([...items, structuredClone(emptyItem)]);
  };

  const handleRemove = (index: number) => {
    onUpdate(items.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, updated: T) => {
    const next = [...items];
    next[index] = updated;
    onUpdate(next);
  };

  return (
    <div className="resume-editor__list">
      {items.map((item, index) => (
        <div className="resume-editor__list-item" key={`${sectionKey}-${String(index)}`}>
          <div className="resume-editor__list-item-header">
            <span className="resume-editor__list-item-number">#{index + 1}</span>
            <button
              aria-label={t("editor.remove")}
              className="resume-editor__remove-btn"
              onClick={() => handleRemove(index)}
              type="button"
            >
              <TrashIcon aria-hidden="true" height={14} width={14} />
            </button>
          </div>
          <div className="resume-editor__fields">
            {renderItem(item, index, (updated) => handleChange(index, updated))}
          </div>
        </div>
      ))}
      <Button onClick={handleAdd} size="sm" variant="ghost">
        + {t("editor.add")}
      </Button>
    </div>
  );
}

/* ── Field groups ── */

function ContactFields({
  index: _index,
  item,
  onChange,
}: {
  index: number;
  item: ContactLink;
  onChange: (updated: ContactLink) => void;
}) {
  const { t } = useTranslation();
  const typeOptions = CONTACT_TYPES.map((config) => ({
    value: config.type,
    label: t(config.labelKey, config.fallbackLabel),
  }));

  return (
    <>
      <Dropdown
        label={t("editor.contactType")}
        onChange={(value) => onChange({ ...item, type: value as ContactLink["type"] })}
        options={typeOptions}
        value={item.type}
      />
      <TextInput
        label={t("editor.contactValue")}
        onChange={(e) => onChange({ ...item, value: e.target.value })}
        value={item.value}
      />
      {item.type === "custom" ? (
        <TextInput
          label={t("editor.contactLabel")}
          onChange={(e) => onChange({ ...item, label: e.target.value })}
          placeholder={t("editor.contactLabelPlaceholder")}
          value={item.label ?? ""}
        />
      ) : null}
    </>
  );
}

function ExperienceFields({
  index: _index,
  item,
  onChange,
}: {
  index: number;
  item: Experience;
  onChange: (updated: Experience) => void;
}) {
  const { t } = useTranslation();
  return (
    <>
      <TextInput
        label={t("editor.company")}
        onChange={(e) => onChange({ ...item, company: e.target.value })}
        value={item.company}
      />
      <TextInput
        label={t("editor.position")}
        onChange={(e) => onChange({ ...item, position: e.target.value })}
        value={item.position}
      />
      <TextInput
        label={t("editor.duration")}
        onChange={(e) => onChange({ ...item, duration: e.target.value })}
        value={item.duration}
      />
      <TextArea
        label={t("editor.description")}
        onChange={(e) => onChange({ ...item, description: e.target.value })}
        rows={3}
        value={item.description}
      />
    </>
  );
}

function EducationFields({
  index: _index,
  item,
  onChange,
}: {
  index: number;
  item: Education;
  onChange: (updated: Education) => void;
}) {
  const { t } = useTranslation();
  return (
    <>
      <TextInput
        label={t("editor.institution")}
        onChange={(e) => onChange({ ...item, institution: e.target.value })}
        value={item.institution}
      />
      <TextInput
        label={t("editor.degree")}
        onChange={(e) => onChange({ ...item, degree: e.target.value })}
        value={item.degree}
      />
      <TextInput
        label={t("editor.duration")}
        onChange={(e) => onChange({ ...item, duration: e.target.value })}
        value={item.duration}
      />
      <TextInput
        label={t("fieldLabels.grade")}
        onChange={(e) => onChange({ ...item, grades: e.target.value })}
        value={item.grades ?? ""}
      />
      <TextInput
        label={t("fieldLabels.thesis")}
        onChange={(e) => onChange({ ...item, thesis: e.target.value })}
        value={item.thesis ?? ""}
      />
    </>
  );
}

function SkillFields({
  index: _index,
  item,
  onChange,
}: {
  index: number;
  item: SkillCategory;
  onChange: (updated: SkillCategory) => void;
}) {
  const { t } = useTranslation();
  return (
    <>
      <TextInput
        label={t("editor.category")}
        onChange={(e) => onChange({ ...item, category: e.target.value })}
        value={item.category}
      />
      <TextInput
        label={t("editor.skillItems")}
        onChange={(e) =>
          onChange({
            ...item,
            items: e.target.value.split(",").map((s) => s.trim()),
          })
        }
        placeholder={t("editor.skillItemsPlaceholder")}
        value={item.items.join(", ")}
      />
    </>
  );
}

function LanguageFields({
  index: _index,
  item,
  onChange,
}: {
  index: number;
  item: Language;
  onChange: (updated: Language) => void;
}) {
  const { t } = useTranslation();
  return (
    <>
      <TextInput
        label={t("editor.language")}
        onChange={(e) => onChange({ ...item, language: e.target.value })}
        value={item.language}
      />
      <TextInput
        label={t("editor.proficiency")}
        onChange={(e) => onChange({ ...item, proficiency: e.target.value })}
        value={item.proficiency}
      />
    </>
  );
}

function ProjectFields({
  index: _index,
  item,
  onChange,
}: {
  index: number;
  item: Project;
  onChange: (updated: Project) => void;
}) {
  const { t } = useTranslation();
  return (
    <>
      <TextInput
        label={t("editor.projectName")}
        onChange={(e) => onChange({ ...item, name: e.target.value })}
        value={item.name}
      />
      <TextArea
        label={t("editor.description")}
        onChange={(e) => onChange({ ...item, description: e.target.value })}
        rows={3}
        value={item.description}
      />
      <TextInput
        label={t("editor.technologies")}
        onChange={(e) =>
          onChange({
            ...item,
            technologies: e.target.value.split(",").map((s) => s.trim()),
          })
        }
        placeholder={t("editor.technologiesPlaceholder")}
        value={(item.technologies ?? []).join(", ")}
      />
      <TextInput
        label={t("editor.link")}
        onChange={(e) => onChange({ ...item, link: e.target.value })}
        value={item.link ?? ""}
      />
    </>
  );
}

function CertificationFields({
  index: _index,
  item,
  onChange,
}: {
  index: number;
  item: Certification;
  onChange: (updated: Certification) => void;
}) {
  const { t } = useTranslation();
  return (
    <>
      <TextInput
        label={t("editor.certName")}
        onChange={(e) => onChange({ ...item, name: e.target.value })}
        value={item.name}
      />
      <TextInput
        label={t("editor.issuer")}
        onChange={(e) => onChange({ ...item, issuer: e.target.value })}
        value={item.issuer}
      />
      <TextInput
        label={t("editor.date")}
        onChange={(e) => onChange({ ...item, date: e.target.value })}
        value={item.date ?? ""}
      />
    </>
  );
}

export default ResumeEditorModal;

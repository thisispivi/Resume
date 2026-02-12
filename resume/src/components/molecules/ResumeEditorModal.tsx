/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/components/atoms/Modal";
import TextInput from "@/components/atoms/TextInput";
import TextArea from "@/components/atoms/TextArea";
import Button from "@/components/atoms/Button";
import type {
  Certification,
  Contact,
  Education,
  Experience,
  Language,
  Project,
  ResumeData,
  SkillCategory,
} from "@/types";
import TrashIcon from "@/assets/icons/trash.svg?react";

type SectionId =
  | "personal"
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

const EMPTY_SKILL: SkillCategory = { category: "", items: [] };
const EMPTY_LANGUAGE: Language = { language: "", proficiency: "" };
const EMPTY_PROJECT: Project = { description: "", name: "" };
const EMPTY_CERTIFICATION: Certification = { issuer: "", name: "" };

/** Modal with tabbed form sections for editing all resume data fields. */
function ResumeEditorModal({ data, isOpen, onClose, onSave }: ResumeEditorModalProps) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState<ResumeData>(structuredClone(data));
  const [activeSection, setActiveSection] = useState<SectionId>("personal");

  const updateField = useCallback(<K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateContact = useCallback((key: keyof Contact, value: string) => {
    setDraft((prev) => ({
      ...prev,
      contact: { ...prev.contact, [key]: value },
    }));
  }, []);

  const handleSave = useCallback(() => {
    onSave(draft);
    onClose();
  }, [draft, onSave, onClose]);

  const sections: { id: SectionId; labelKey: string }[] = [
    { id: "personal", labelKey: "editor.personal" },
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

          {activeSection === "contact" ? (
            <ContactSection contact={draft.contact} onUpdate={updateContact} />
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
      <TextInput
        label={t("editor.photo")}
        onChange={(e) => onUpdate("photo", e.target.value)}
        placeholder={t("editor.photoPlaceholder")}
        value={draft.photo ?? ""}
      />
      <TextArea
        label={t("editor.summary")}
        onChange={(e) => onUpdate("summary", e.target.value)}
        placeholder={t("editor.summaryPlaceholder")}
        rows={4}
        value={draft.summary ?? ""}
      />
    </div>
  );
}

function ContactSection({
  contact,
  onUpdate,
}: {
  contact: Contact;
  onUpdate: (key: keyof Contact, value: string) => void;
}) {
  const { t } = useTranslation();
  const fields: { key: keyof Contact; labelKey: string }[] = [
    { key: "email", labelKey: "editor.email" },
    { key: "phone", labelKey: "editor.phone" },
    { key: "linkedin", labelKey: "editor.linkedin" },
    { key: "github", labelKey: "editor.github" },
    { key: "website", labelKey: "editor.website" },
  ];

  return (
    <div className="resume-editor__fields">
      {fields.map(({ key, labelKey }) => (
        <TextInput
          key={key}
          label={t(labelKey)}
          onChange={(e) => onUpdate(key, e.target.value)}
          value={contact[key] ?? ""}
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

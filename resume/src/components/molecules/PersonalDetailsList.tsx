import { useTranslation } from "react-i18next";
import type { PersonalDetails } from "@/types";

interface PersonalDetailsListProps {
  details?: PersonalDetails;
  pdfLocale: string;
  compact?: boolean;
}

const detailFields: { key: keyof PersonalDetails; labelKey: string }[] = [
  { key: "location", labelKey: "fieldLabels.location" },
  { key: "birthDate", labelKey: "fieldLabels.birthDate" },
  { key: "age", labelKey: "fieldLabels.age" },
  { key: "nationality", labelKey: "fieldLabels.nationality" },
  { key: "drivingLicense", labelKey: "fieldLabels.drivingLicense" },
  { key: "workAuthorization", labelKey: "fieldLabels.workAuthorization" },
  { key: "availability", labelKey: "fieldLabels.availability" },
  { key: "pronouns", labelKey: "fieldLabels.pronouns" },
];

/** Returns true if any personal-details field has a non-empty value. */
export const hasPersonalDetails = (details?: PersonalDetails) =>
  Boolean(details && Object.values(details).some((value) => value));

/** Renders optional personal facts such as location, license, age, and availability. */
function PersonalDetailsList({ compact = false, details, pdfLocale }: PersonalDetailsListProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(pdfLocale);
  const entries = detailFields
    .map(({ key, labelKey }) => ({ key, label: t(labelKey), value: details?.[key] }))
    .filter((entry) => entry.value);

  if (entries.length === 0) return null;

  return (
    <dl className={`personal-details${compact ? " personal-details--compact" : ""}`}>
      {entries.map((entry) => (
        <div className="personal-details__item" key={entry.key}>
          <dt className="personal-details__label">{entry.label}</dt>
          <dd className="personal-details__value">{entry.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default PersonalDetailsList;

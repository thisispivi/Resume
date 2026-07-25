import type { TFunction } from "i18next";
import type { Certification, DateRange } from "@/types";
import { formatDateRange, formatDateValue } from "@/utils/dates";

/**
 * Formats an entry's start/end dates for a resume template, using the resume's
 * own locale for both the month names and the "Present" label.
 */
export const formatPeriod = (range: DateRange, locale: string, t: TFunction): string =>
  formatDateRange(range, locale, t("fieldLabels.present"));

/** Formats a single date field (award, publication, course) for display. */
export const formatSingleDate = (value: string | undefined, locale: string): string =>
  formatDateValue(value, locale);

/** Formats a certification's issue date, extended with its expiry when present. */
export const formatCertificationPeriod = (certification: Certification, locale: string): string => {
  const issued = formatDateValue(certification.date, locale);
  const expires = formatDateValue(certification.expiryDate, locale);
  if (issued && expires) return `${issued} – ${expires}`;
  return issued || expires;
};

/**
 * Joins the secondary facts of an entry into one subtitle line, e.g.
 * "Acme Corp. · Berlin, Germany · Full-time". Empty parts are dropped.
 */
export const joinMeta = (...parts: (string | undefined)[]): string =>
  parts.filter(Boolean).join(" · ");

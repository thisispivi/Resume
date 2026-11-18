import type { DateRange } from "@/types";

/** Matches the `YYYY-MM` shape produced by `<input type="month">`. */
const MONTH_PATTERN = /^(\d{4})-(0[1-9]|1[0-2])$/;

/** Matches the `MM/YYYY` shape commonly written by hand in imported resumes. */
const SLASH_MONTH_PATTERN = /^(0?[1-9]|1[0-2])\/(\d{4})$/;

/**
 * Separators between the two halves of a legacy free-text duration. A plain
 * hyphen must be surrounded by whitespace, otherwise an already-structured
 * "2018-09" would be torn apart.
 */
const RANGE_SEPARATOR = /\s*[–—]\s*|\s+-{1,2}\s+|\s+(?:to|a)\s+/i;

/** Words that mean "still ongoing" in the locales this app ships data for. */
const PRESENT_WORDS = [
  "present",
  "current",
  "now",
  "today",
  "ongoing",
  "presente",
  "attuale",
  "oggi",
  "in corso",
];

/** Formatters are expensive to construct and a resume renders dozens of dates. */
const monthFormatters = new Map<string, Intl.DateTimeFormat>();

const getMonthFormatter = (locale: string) => {
  let formatter = monthFormatters.get(locale);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" });
    monthFormatters.set(locale, formatter);
  }
  return formatter;
};

/**
 * Renders a single stored date for display.
 *
 * `YYYY-MM` is reformatted to a localized short month and year, a bare year is
 * returned unchanged, and any other string (imported free text such as
 * "Summer 2019") passes through verbatim so nothing is ever lost.
 */
export const formatDateValue = (value: string | undefined, locale: string): string => {
  if (!value) return "";

  const monthMatch = MONTH_PATTERN.exec(value.trim());
  if (!monthMatch) return value;

  const [, year, month] = monthMatch;
  const date = new Date(Number(year), Number(month) - 1, 1);
  return getMonthFormatter(locale).format(date);
};

/**
 * Renders a start/end pair as a single display string, e.g. "Mar 2021 – Present".
 * Returns an empty string when the entry carries no dates at all.
 */
export const formatDateRange = (range: DateRange, locale: string, presentLabel: string): string => {
  const start = formatDateValue(range.startDate, locale);
  const end = range.isCurrent ? presentLabel : formatDateValue(range.endDate, locale);

  if (start && end) return `${start} – ${end}`;
  return start || end;
};

/** True when a free-text end date means the entry is still ongoing. */
const isPresentWord = (value: string) => PRESENT_WORDS.includes(value.trim().toLowerCase());

/** Rewrites `MM/YYYY` as `YYYY-MM` so it can be localized; leaves anything else alone. */
const normalizeDateToken = (value: string): string => {
  const match = SLASH_MONTH_PATTERN.exec(value.trim());
  if (!match) return value.trim();

  const [, month, year] = match;
  return `${year}-${month.padStart(2, "0")}`;
};

/**
 * Converts a legacy free-text `duration` ("2021 - Present", "07/2022 - in corso")
 * into a structured DateRange. Unparseable input is kept whole as the start date
 * so it still renders, rather than being silently dropped.
 */
export const parseDurationString = (duration: string): DateRange => {
  const trimmed = duration.trim();
  if (!trimmed) return {};

  const parts = trimmed.split(RANGE_SEPARATOR).filter(Boolean);
  if (parts.length < 2) return { startDate: normalizeDateToken(trimmed) };

  const [startDate, ...rest] = parts;
  const endDate = rest.join(" ");
  if (isPresentWord(endDate)) return { startDate: normalizeDateToken(startDate), isCurrent: true };
  return { startDate: normalizeDateToken(startDate), endDate: normalizeDateToken(endDate) };
};

import { format, intervalToDuration } from "date-fns";
import { enGB } from "date-fns/locale";

export const formatDateRangeinYearsAndMonths = (start: Date, end?: Date) => {
  return `${format(start, "MMMM yyyy", { locale: enGB })} - ${
    end ? format(end, "MMMM yyyy", { locale: enGB }) : "Present"
  }`;
};

export const formatDurationinYearsAndMonths = (
  start: Date,
  end: Date = new Date(),
) => {
  const { years = 0, months = 0 } = intervalToDuration({ start, end });

  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  }

  return parts.join(" ") || "less than a month";
};

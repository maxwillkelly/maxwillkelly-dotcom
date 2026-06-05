import { format, intervalToDuration } from "date-fns";
import { enGB } from "date-fns/locale";
import { nonFalsey } from "./utils";

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

  const formatDurationPart = (value: number, unit: string) => {
    switch (value) {
      case 0:
        return undefined;
      case 1:
        return `1 ${unit}`;
      default:
        return `${value} ${unit}s`;
    }
  };

  const parts = [
    formatDurationPart(years, "yr"),
    formatDurationPart(months, "mo"),
  ].filter(nonFalsey);

  return parts.join(" ") ?? "less than a month";
};

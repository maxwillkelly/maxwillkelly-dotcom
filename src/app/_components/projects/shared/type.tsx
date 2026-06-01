export type Project = {
  title: string;
  summary: string;
  contentSource: string;
  chips: {
    label: string;
    icon?: string;
    href?: string;
  }[];
  icon: "zap";
  href?: string;
  hrefLabel?: string;
  colSpan?: string;
};

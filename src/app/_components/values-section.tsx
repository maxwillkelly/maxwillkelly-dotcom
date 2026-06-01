import { Accordion } from "@heroui/react";
import { MarkdownContent } from "@/components/ui/markdown-content";
import {
  Brain,
  ChevronDown,
  CodeXml,
  FlaskConical,
  RefreshCw,
} from "lucide-react";

const iconClassName = "mr-3 size-4 shrink-0 text-muted";

const slugify = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

type Value = {
  title: string;
  icon: "code" | "refresh" | "flask" | "brain";
  contentSource: string;
};

const getIcon = (icon: Value["icon"]) => {
  switch (icon) {
    case "code":
      return <CodeXml className={iconClassName} />;
    case "refresh":
      return <RefreshCw className={iconClassName} />;
    case "flask":
      return <FlaskConical className={iconClassName} />;
    case "brain":
      return <Brain className={iconClassName} />;
  }
};

export const ValuesSection = ({ values }: { values: Value[] }) => {
  return (
    <section id="values">
      <h2 className="text-xl font-bold">Values</h2>
      <Accordion className="mt-4 w-full print:hidden">
        {values.map((value) => (
          <Accordion.Item
            key={value.title}
            id={slugify(value.title)}
            className="first:**:data-[slot=accordion-trigger]:rounded-t-3xl last:[&:not(:has([data-slot=accordion-trigger][aria-expanded='true']))_[data-slot=accordion-trigger]]:rounded-b-3xl"
          >
            <Accordion.Heading>
              <Accordion.Trigger className="text-base text-foreground">
                {getIcon(value.icon)}
                {value.title}
                <Accordion.Indicator>
                  <ChevronDown />
                </Accordion.Indicator>
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body className="text-base text-foreground">
                <MarkdownContent source={value.contentSource} />
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
      <div className="hidden flex-col gap-4 print:flex">
        {values.map((value) => (
          <div key={value.title} className="flex flex-col gap-2 py-2">
            <h3 className="flex items-center text-lg text-foreground">
              {value.title}
            </h3>
            <MarkdownContent source={value.contentSource} />
          </div>
        ))}
      </div>
    </section>
  );
};

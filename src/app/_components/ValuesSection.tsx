import { Accordion } from "@heroui/react";
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

const values = [
  {
    title: "Write clean maintainable code",
    icon: <CodeXml className={iconClassName} />,
    content:
      "I write code that is clean and maintainable so that any developer can pick up, read and understand it. I am obsessed with naming things, how files and directories are organised and abstractions that are self-evident. The best code doesn't need any comments to be understood, it should document itself.",
  },
  {
    title: "Iterate with an open mind",
    icon: <RefreshCw className={iconClassName} />,
    content:
      "I hold my opinions loosely and I am not afraid to change my mind if the evidence points to another conclusion. I am not afraid to admit when I have been proven wrong and I am always open to feedback and suggestions.",
  },
  {
    title: "Strive for perfection",
    icon: <FlaskConical className={iconClassName} />,
    content:
      "Today's new exciting thing is tomorrow's tech debt. I don't believe in the adage \"if it ain't broke, don't fix it\", I believe that everything can always be improved and that we should always strive towards perfection.",
  },
  {
    title: "AI Agents should augment human thinking",
    icon: <Brain className={iconClassName} />,
    content:
      "No one doubts that Large Language Models (LLMs) have revolutionised the way we write code from simple autocompletion in IDEs to creating fully functional solutions with tools like Claude Code. When you work with an agent you should always evaluate its work, take what's good and discard everything else. For everything going into a critical system it's important to read and understand every line.",
  },
];

export const ValuesSection = () => {
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
                {value.icon}
                {value.title}
                <Accordion.Indicator>
                  <ChevronDown />
                </Accordion.Indicator>
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body className="text-base text-foreground">
                {value.content}
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
            <p className="text-base">{value.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

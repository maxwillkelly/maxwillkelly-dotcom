import { Link } from "@heroui/react";
import MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";
import type { ReactNode } from "react";

const markdown = new MarkdownIt({
  html: false,
  linkify: false,
  typographer: false,
});

const renderInlineTokens = (tokens: Token[]): ReactNode[] => {
  const nodes: ReactNode[] = [];

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];

    if (token.type === "text" || token.type === "code_inline") {
      nodes.push(token.content);
      continue;
    }

    if (token.type === "softbreak" || token.type === "hardbreak") {
      nodes.push(<br key={`br-${index}`} />);
      continue;
    }

    if (token.type === "link_open") {
      const href = token.attrGet("href") ?? "#";
      const children: Token[] = [];

      index += 1;
      while (index < tokens.length && tokens[index].type !== "link_close") {
        children.push(tokens[index]);
        index += 1;
      }

      nodes.push(
        <Link
          key={`${href}-${index}`}
          className="text-base no-underline hover:underline"
          href={href}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          target={href.startsWith("http") ? "_blank" : undefined}
        >
          {renderInlineTokens(children)}
          <Link.Icon />
        </Link>,
      );
    }
  }

  return nodes;
};

const renderInline = (source: string) => {
  const [inlineToken] = markdown.parseInline(source, {});

  return renderInlineTokens(inlineToken.children ?? []);
};

export const MarkdownContent = ({ source }: { source: string }) => {
  const paragraphs = source
    .trim()
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\n/g, " ").trim())
    .filter(Boolean);

  return (
    <div className="content-copy">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{renderInline(paragraph)}</p>
      ))}
    </div>
  );
};

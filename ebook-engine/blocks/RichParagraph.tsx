import type { RichParagraphBlock } from "@/ebook-engine/types/ebook";

// ── Inline Markdown tokenizer ─────────────────────────────────────────────────
// Supports: **bold**, *italic*, `code`, [text](url)

type InlineToken = { kind: "text"; value: string } | { kind: "bold"; value: string } | { kind: "italic"; value: string } | { kind: "code"; value: string } | { kind: "link"; text: string; href: string };

function tokenizeInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  // Bold (**) must be checked before italic (*) to avoid greedy mismatch
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ kind: "text", value: text.slice(lastIndex, match.index) });
    }

    if (match[1] !== undefined) {
      tokens.push({ kind: "bold", value: match[1] });
    } else if (match[2] !== undefined) {
      tokens.push({ kind: "italic", value: match[2] });
    } else if (match[3] !== undefined) {
      tokens.push({ kind: "code", value: match[3] });
    } else if (match[4] !== undefined) {
      const href = match[5];
      // Only allow safe URL schemes to prevent XSS via javascript: URLs
      const safe = /^(https?:|mailto:|\/|#)/.test(href);
      tokens.push({ kind: "link", text: match[4], href: safe ? href : "#" });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    tokens.push({ kind: "text", value: text.slice(lastIndex) });
  }

  return tokens;
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  block: RichParagraphBlock;
}

export default function RichParagraph({ block }: Props) {
  const tokens = tokenizeInline(block.content);

  return (
    <p className="ebook-rich-paragraph">
      {tokens.map((token, i) => {
        switch (token.kind) {
          case "text":
            return token.value;
          case "bold":
            return <strong key={i}>{token.value}</strong>;
          case "italic":
            return <em key={i}>{token.value}</em>;
          case "code":
            return (
              <code
                key={i}
                className="ebook-inline-code"
              >
                {token.value}
              </code>
            );
          case "link":
            return (
              <a
                key={i}
                href={token.href}
                className="ebook-link"
              >
                {token.text}
              </a>
            );
        }
      })}
    </p>
  );
}

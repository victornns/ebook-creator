import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { RichParagraphBlock } from "@/ebook-engine/types/ebook";

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  block: RichParagraphBlock;
}

export default function RichParagraph({ block }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Render the paragraph with the ebook class instead of a plain <p>
        p: ({ children }) => <p className="ebook-rich-paragraph">{children}</p>,
        // Sanitize link hrefs — only allow safe URL schemes
        a: ({ href, children }) => {
          const safe = /^(https?:|mailto:|\/|#)/.test(href ?? "");
          return (
            <a
              href={safe ? href : "#"}
              className="ebook-link"
            >
              {children}
            </a>
          );
        },
        code: ({ children }) => <code className="ebook-inline-code">{children}</code>,
      }}
    >
      {block.content}
    </ReactMarkdown>
  );
}

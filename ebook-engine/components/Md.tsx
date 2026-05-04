import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  children: string;
  /** CSS class applied to each rendered `<p>` element. */
  paragraphClass?: string;
}

/**
 * Renders a string as block-level Markdown.
 * Supports **bold**, *italic*, `code`, [links](url), strikethrough, and tables (GFM).
 */
export default function Md({ children, paragraphClass }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children: c }) => <p className={paragraphClass}>{c}</p>,
        a: ({ href, children: c }) => {
          const safe = /^(https?:|mailto:|\/|#)/.test(href ?? "");
          return (
            <a
              href={safe ? href : "#"}
              className="ebook-link"
            >
              {c}
            </a>
          );
        },
        code: ({ children: c }) => <code className="ebook-inline-code">{c}</code>,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  children: string;
}

/**
 * Renders a string as inline-only Markdown (bold, italic, code, links, strikethrough).
 * Block elements (paragraphs, headings, lists) are unwrapped so only their inline
 * content is emitted — safe to use inside `<li>`, `<td>`, `<th>`, `<h*>`, etc.
 */
export default function MdInline({ children }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      allowedElements={["strong", "em", "code", "a", "del", "s"]}
      unwrapDisallowed
      components={{
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

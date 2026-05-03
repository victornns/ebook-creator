import Link from "next/link";
import { notFound } from "next/navigation";
import { ebookRegistry } from "@/ebooks";
import PaginatedEbookRenderer from "@/ebook-engine/renderer/PaginatedEbookRenderer";

interface Props {
  params: Promise<{ ebook: string }>;
}

export function generateStaticParams() {
  return Object.keys(ebookRegistry).map((id) => ({ ebook: id }));
}

export default async function PreviewPage({ params }: Props) {
  const { ebook: ebookId } = await params;
  const entry = ebookRegistry[ebookId];

  if (!entry) notFound();

  return (
    <>
      <Link
        href="/"
        className="fixed top-5 left-5 z-50 text-stone-400 hover:text-stone-800 transition-colors print:hidden"
        title="Back to home"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </Link>
      <PaginatedEbookRenderer
        ebook={entry.ebook}
        theme={entry.theme}
      />
    </>
  );
}

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
    <PaginatedEbookRenderer
      ebook={entry.ebook}
      theme={entry.theme}
    />
  );
}

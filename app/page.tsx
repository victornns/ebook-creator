import Link from "next/link";
import { ebookRegistry } from "@/ebooks";

export default function Home() {
  const ebooks = Object.entries(ebookRegistry);

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="max-w-2xl mx-auto px-6 py-24">
        <div className="mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-stone-400">Ebook Creator</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-stone-800 leading-tight">Create e-books by code.</h1>
          <p className="mt-4 text-stone-400 leading-relaxed">Define content and theme in TypeScript, preview in the browser, export to PDF/EPUB.</p>
        </div>

        <ul className="space-y-3">
          {ebooks.map(([id, entry]) => (
            <li
              key={id}
              className="bg-white border border-stone-200 rounded-sm p-6 shadow-sm"
            >
              <div className="min-w-0">
                <p className="font-semibold text-stone-800 text-lg leading-snug">{entry.ebook.title}</p>
                {entry.ebook.subtitle && <p className="text-stone-600 mt-1 leading-snug text-sm">{entry.ebook.subtitle}</p>}
                <p className="text-stone-400 text-sm mt-2">by {entry.ebook.author}</p>
              </div>

              <div className="flex gap-2 mt-5">
                <Link
                  href={`/preview/${id}`}
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-stone-800 text-stone-50 hover:bg-stone-700 transition-colors"
                >
                  Preview
                </Link>
                <Link
                  href={`/output/${id}.pdf`}
                  className="text-sm font-medium px-4 py-2 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-colors"
                  target="_blank"
                >
                  View PDF
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

import Link from "next/link";
import { ebookRegistry } from "@/ebooks";

export default function Home() {
  const ebooks = Object.entries(ebookRegistry);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-zinc-400">Ebook Creator</span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">Create e-books by code.</h1>
          <p className="mt-4 text-zinc-500 leading-relaxed text-sm max-w-lg">Type your content, apply a theme, export to PDF — simple and scalable.</p>
        </div>

        {/* Ebook list */}
        <ul className="space-y-3">
          {ebooks.map(([id, entry]) => (
            <li
              key={id}
              className="bg-white border border-zinc-200 rounded-xl p-5"
            >
              <p className="font-semibold text-zinc-900">{entry.ebook.title}</p>
              {entry.ebook.subtitle && <p className="text-zinc-500 text-sm mt-0.5 leading-snug">{entry.ebook.subtitle}</p>}
              <p className="text-zinc-400 text-xs mt-1">por {entry.ebook.author}</p>

              <div className="flex gap-3 mt-4">
                <Link
                  href={`/preview/${id}`}
                  className="text-xs font-medium px-3 py-1.5 rounded-md bg-zinc-900 text-white hover:opacity-80 transition-opacity"
                >
                  Preview
                </Link>
                <Link
                  href={`/output/${id}.pdf`}
                  className="text-xs font-medium px-3 py-1.5 rounded-md border border-zinc-200 text-zinc-600 hover:border-zinc-400 transition-colors"
                  target="_blank"
                >
                  Visualizar PDF
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

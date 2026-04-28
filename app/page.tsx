import Link from "next/link";
import { ebookRegistry } from "@/ebooks";

export default function Home() {
  const ebooks = Object.entries(ebookRegistry);

  return (
    <main className="min-h-screen p-12 max-w-3xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">E-book Creator</h1>
      <p className="text-zinc-500 mb-10">Selecione um e-book para visualizar o preview.</p>

      <ul className="space-y-4">
        {ebooks.map(([id, entry]) => (
          <li
            key={id}
            className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
          >
            <Link
              href={`/preview/${id}`}
              className="block"
            >
              <p className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">{entry.ebook.title}</p>
              {entry.ebook.subtitle && <p className="text-zinc-500 text-sm mt-1">{entry.ebook.subtitle}</p>}
              <p className="text-zinc-400 text-sm mt-1">por {entry.ebook.author}</p>
              <p className="text-xs text-zinc-400 mt-2">/preview/{id}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

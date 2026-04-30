import type { TableBlock } from "@/ebook-engine/types/ebook";

interface Props {
  block: TableBlock;
}

export default function Table({ block }: Props) {
  return (
    <figure className="ebook-table-figure">
      <table className="ebook-table">
        <thead>
          <tr>
            {block.headers.map((header, i) => (
              <th
                key={i}
                className="ebook-table-th"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr
              key={ri}
              className="ebook-table-tr"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="ebook-table-td"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {block.caption && <figcaption className="ebook-table-caption">{block.caption}</figcaption>}
    </figure>
  );
}

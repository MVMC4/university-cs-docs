import type { ReactNode } from 'react';

interface Column {
  header: string;
  key: string;
}

interface Row {
  [key: string]: ReactNode;
}

/** A table built from data. It looks exactly like a Markdown table; `highlightCol` marks one column. */
export function ComparisonTable({
  columns,
  rows,
  highlightCol,
}: {
  columns: Column[];
  rows: Row[];
  highlightCol?: string;
}) {
  return (
    <div className="ui-table">
      <table>
        <thead>
          <tr>
            {columns.map((col) => <th key={col.key}>{col.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.key} className={col.key === highlightCol ? 'ui-table-hl' : undefined}>
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

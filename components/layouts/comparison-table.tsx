'use client';

import React from 'react';

interface Column {
  header: string;
  key: string;
}

interface Row {
  [key: string]: React.ReactNode;
}

export function ComparisonTable({ 
  columns, 
  rows,
  highlightCol 
}: { 
  columns: Column[]; 
  rows: Row[];
  highlightCol?: string;
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-fd-border">
      <table className="w-full text-sm text-left">
        <thead className="bg-fd-muted text-fd-muted-foreground font-semibold uppercase text-xs tracking-wider">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 border-b border-fd-border">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-fd-border bg-fd-background">
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-fd-muted/30 transition-colors">
              {columns.map((col) => (
                <td 
                  key={col.key} 
                  className={`px-4 py-3 ${col.key === highlightCol ? 'bg-fd-primary/5 font-medium text-fd-primary' : 'text-fd-foreground'}`}
                >
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
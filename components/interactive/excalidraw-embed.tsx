'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Loader2, AlertCircle } from 'lucide-react';

// 1. Dynamically import Excalidraw to prevent SSR build crashes
const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-fd-muted/30 rounded-xl border border-fd-border">
        <Loader2 className="h-6 w-6 animate-spin text-fd-muted-foreground" />
      </div>
    ),
  }
);

// 2. Import Excalidraw's required CSS
import '@excalidraw/excalidraw/index.css';

type ExcalidrawEmbedProps = {
  src: string; // Path to the .excalidraw file in /public
  height?: string;
  title?: string;
};

export function ExcalidrawEmbed({ src, height = '500px', title }: ExcalidrawEmbedProps) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  // 3. Fetch the diagram JSON from the public folder
  useEffect(() => {
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load diagram: ${src}`);
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message));
  }, [src]);

  if (error) {
    return (
      <div className="my-8 flex items-center gap-3 p-4 text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="my-8 flex items-center justify-center bg-fd-muted/30 rounded-xl border border-fd-border" style={{ height }}>
        <Loader2 className="h-6 w-6 animate-spin text-fd-muted-foreground" />
      </div>
    );
  }

  // 4. Sync Excalidraw's theme with Fumadocs (next-themes)
  const excalidrawTheme = theme === 'dark' ? 'dark' : 'light';

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-fd-border shadow-sm bg-white dark:bg-[#121212]">
      {title && (
        <div className="px-4 py-2 border-b border-fd-border bg-fd-muted/50 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-fd-foreground">{title}</h4>
          <span className="text-xs text-fd-muted-foreground italic">Interactive: Drag nodes to explore</span>
        </div>
      )}
      <div style={{ height }}>
        <Excalidraw
          initialData={data}
          theme={excalidrawTheme}
          viewModeEnabled={false} // Allow students to play with the diagram!
          zenModeEnabled={false}
          gridModeEnabled={false}
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
            },
          }}
        />
      </div>
    </div>
  );
}

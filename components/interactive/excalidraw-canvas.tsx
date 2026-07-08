'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Loader2, AlertCircle, Maximize2, Minimize2, X, Map } from 'lucide-react';

// Dynamically import to prevent SSR crashes
const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-fd-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-fd-muted-foreground" />
      </div>
    ),
  }
);

// Import Excalidraw CSS
import '@excalidraw/excalidraw/index.css';

export function ExcalidrawCanvas({ src, title }: { src: string; title: string }) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load canvas: ${src}`);
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message));
  }, [src]);

  const excalidrawTheme = theme === 'dark' ? 'dark' : 'light';

  if (error) {
    return (
      <div className="my-8 flex items-center gap-3 p-4 text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">{error}</p>
      </div>
    );
  }

  // Shared Wrapper for both Normal and Fullscreen states
  const CanvasWrapper = ({ children }: { children: React.ReactNode }) => (
    <div 
      className={
        isFullscreen 
          ? "fixed inset-0 z-50 bg-white dark:bg-[#121212] flex flex-col" 
          : "my-8 overflow-hidden rounded-xl border border-fd-border shadow-sm bg-white dark:bg-[#121212] flex flex-col"
      }
    >
      {/* Header Bar */}
      <div className="px-4 py-3 border-b border-fd-border bg-fd-muted/50 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Map className="h-4 w-4 text-fd-primary" />
          <h4 className="text-sm font-bold text-fd-foreground">{title}</h4>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-fd-muted-foreground italic hidden sm:block">
            Pan, Zoom, and Select text
          </span>
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-md hover:bg-fd-border transition-colors text-fd-muted-foreground hover:text-fd-foreground"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          {isFullscreen && (
            <button 
              onClick={() => setIsFullscreen(false)}
              className="p-1.5 rounded-md hover:bg-fd-border transition-colors text-fd-muted-foreground hover:text-red-500"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* Canvas Area */}
      <div className={isFullscreen ? "flex-1 w-full" : "h-[600px] w-full"}>
        {children}
      </div>
    </div>
  );

  if (!data) {
    return (
      <CanvasWrapper>
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-fd-muted-foreground" />
        </div>
      </CanvasWrapper>
    );
  }

  return (
    <CanvasWrapper>
      <Excalidraw
        initialData={data}
        theme={excalidrawTheme}
        // View mode prevents students from accidentally dragging your notes around, 
        // but still allows them to pan, zoom, and highlight/copy text!
        viewModeEnabled={true} 
        zenModeEnabled={false}
        gridModeEnabled={false}
        UIOptions={{
          canvasActions: {
            saveToActiveFile: false,
            loadScene: false,
            export: false,
            changeViewBackgroundColor: false,
          },
        }}
      />
    </CanvasWrapper>
  );
}
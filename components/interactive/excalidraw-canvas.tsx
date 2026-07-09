'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import { Loader2, AlertCircle, Maximize2, Minimize2, X, Map, RefreshCw } from 'lucide-react';

const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  { ssr: false }
);

import '@excalidraw/excalidraw/index.css';

type Status = 'idle' | 'loading' | 'error' | 'ready';

export function ExcalidrawCanvas({ src, title }: { src: string; title: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [data, setData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const { resolvedTheme } = useTheme();
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const triggerLoad = () => {
      setStatus((prev) => (prev === 'idle' ? 'loading' : prev));
    };

    const rect = node.getBoundingClientRect();
    const isAlreadyVisible = rect.top < window.innerHeight + 300 && rect.bottom > -300;
    
    if (isAlreadyVisible) {
      triggerLoad();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerLoad();
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (status !== 'loading') return;

    let isMounted = true;
    const controller = new AbortController();

    fetch(src, { 
      signal: controller.signal,
      cache: 'no-store'
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: File not found`);
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          setData(json);
          setStatus('ready');
        }
      })
      .catch((err) => {
        if (!isMounted || err.name === 'AbortError') return;
        setErrorMsg(err.message || 'Failed to load canvas data.');
        setStatus('error');
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [status, src, retryKey]);

  const handleRetry = () => {
    setErrorMsg('');
    setData(null);
    setRetryKey((k) => k + 1);
    setStatus('loading');
  };

  const excalidrawTheme = resolvedTheme === 'dark' ? 'dark' : 'light';

  const CanvasWrapper = ({ children }: { children: React.ReactNode }) => (
    <div 
      ref={containerRef}
      className={
        isFullscreen 
          ? "fixed inset-0 z-50 bg-white dark:bg-[#121212] flex flex-col" 
          : "my-8 overflow-hidden rounded-xl border border-fd-border shadow-sm bg-white dark:bg-[#121212] flex flex-col"
      }
    >
      {/* FIX: Thinner padding (py-2), perfect alignment (leading-none, items-center) */}
      <div className="px-3 py-2 border-b border-fd-border bg-fd-muted/50 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Map className="h-4 w-4 text-fd-primary shrink-0" />
          <h4 className="text-sm font-semibold text-fd-foreground leading-none">{title}</h4>
        </div>
        <div className="flex items-center gap-2">
          {status === 'ready' && (
            <span className="text-xs text-fd-muted-foreground italic hidden sm:block">
              Pan, Zoom, Select
            </span>
          )}
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
      
      <div className={isFullscreen ? "flex-1 w-full relative" : "h-[600px] w-full relative"}>
        {children}
      </div>
    </div>
  );

  if (status === 'idle') {
    return (
      <CanvasWrapper>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-fd-muted/20 animate-pulse">
          <Map className="h-12 w-12 text-fd-muted-foreground mb-3" />
          <p className="text-sm font-medium text-fd-muted-foreground">Interactive Canvas</p>
          <p className="text-xs text-fd-muted-foreground mt-1">Scroll to load diagram...</p>
        </div>
      </CanvasWrapper>
    );
  }

  if (status === 'error') {
    return (
      <CanvasWrapper>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 dark:bg-red-950/20 p-6 text-center">
          <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
          <h4 className="text-lg font-bold text-red-700 dark:text-red-400 mb-1">Failed to Load Canvas</h4>
          <p className="text-sm text-red-600 dark:text-red-300 mb-4 max-w-md">
            {errorMsg || "We couldn't fetch the diagram data. Please check your connection and try again."}
          </p>
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-sm"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </CanvasWrapper>
    );
  }

  const initialData = data ? {
    elements: data.elements || [],
    appState: {
      ...(data.appState || {}),
      scrollToContent: true,
      viewBackgroundColor: data.appState?.viewBackgroundColor || (excalidrawTheme === 'dark' ? '#121212' : '#ffffff'),
    },
    files: data.files || null,
  } : null;

  if (status === 'loading' && !data) {
    return (
      <CanvasWrapper>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-fd-muted/30">
          <Loader2 className="h-8 w-8 animate-spin text-fd-primary mb-3" />
          <p className="text-sm font-medium text-fd-foreground">Loading Interactive Diagram...</p>
          <p className="text-xs text-fd-muted-foreground mt-1">Parsing canvas data</p>
        </div>
      </CanvasWrapper>
    );
  }

  return (
    <CanvasWrapper>
      <div className="absolute inset-0 flex items-center justify-center bg-fd-muted/10 z-0">
         <Loader2 className="h-6 w-6 animate-spin text-fd-muted-foreground" />
      </div>
      
      <div className="absolute inset-0 z-10">
        {initialData && (
          <Excalidraw
            initialData={initialData}
            theme={excalidrawTheme}
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
        )}
      </div>
    </CanvasWrapper>
  );
}
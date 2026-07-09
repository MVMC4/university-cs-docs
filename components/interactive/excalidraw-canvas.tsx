'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import { Loader2, AlertCircle, Maximize2, Minimize2, X, Map, RefreshCw, Download, Sun, Moon } from 'lucide-react';

const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-fd-background z-20">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-fd-primary" />
          <p className="text-xs text-fd-muted-foreground">Loading Excalidraw Engine...</p>
        </div>
      </div>
    )
  }
);

import '@excalidraw/excalidraw/index.css';

type Status = 'idle' | 'downloading' | 'parsing' | 'error' | 'ready';

export function ExcalidrawCanvas({ src, title }: { src: string; title: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const { resolvedTheme } = useTheme();
  
  const [localTheme, setLocalTheme] = useState<'light' | 'dark' | null>(null);
  const excalidrawTheme = localTheme || (resolvedTheme === 'dark' ? 'dark' : 'light');
  
  const [progress, setProgress] = useState(0);
  const [loadedBytes, setLoadedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);
  
  const dataRef = useRef<any>(null);
  const downloadIdRef = useRef(0);
  const [showCanvas, setShowCanvas] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const triggerLoad = () => {
      setStatus((prev) => (prev === 'idle' ? 'downloading' : prev));
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
    if (status !== 'downloading') return;

    const currentId = ++downloadIdRef.current;
    const controller = new AbortController();

    const downloadAndParse = async () => {
      try {
        const response = await fetch(src, { 
          signal: controller.signal,
          cache: 'no-store'
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}: File not found`);

        const contentLength = response.headers.get('Content-Length');
        const total = contentLength ? parseInt(contentLength, 10) : 0;
        if (currentId === downloadIdRef.current) setTotalBytes(total);

        const reader = response.body!.getReader();
        const chunks: Uint8Array[] = [];
        let loaded = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          chunks.push(value);
          loaded += value.length;
          
          if (currentId === downloadIdRef.current) {
            setLoadedBytes(loaded);
            if (total > 0) {
              setProgress(Math.round((loaded / total) * 100));
            }
          }
        }

        if (currentId === downloadIdRef.current) setStatus('parsing');
        await new Promise(resolve => setTimeout(resolve, 50));

        try {
          const blob = new Blob(chunks);
          const json = await new Response(blob).json(); 
          
          dataRef.current = json;
          await new Promise(resolve => setTimeout(resolve, 100));
          
          if (currentId === downloadIdRef.current) {
            setStatus('ready');
          }
        } catch (parseError: any) {
          if (currentId === downloadIdRef.current) {
            setErrorMsg('File downloaded, but failed to parse.');
            setStatus('error');
          }
        }
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        if (currentId === downloadIdRef.current) {
          setErrorMsg(err.message || 'Failed to load canvas data.');
          setStatus('error');
        }
      }
    };

    downloadAndParse();

    return () => {
      controller.abort();
    };
  }, [status, src, retryKey]);

  useEffect(() => {
    if (status === 'ready' && dataRef.current) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setShowCanvas(true);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    } else {
      setShowCanvas(false);
    }
  }, [status]);

  const handleRetry = () => {
    setErrorMsg('');
    dataRef.current = null;
    setProgress(0);
    setLoadedBytes(0);
    setTotalBytes(0);
    setRetryKey((k) => k + 1);
    setStatus('downloading');
  };

  const handleDownloadSource = () => {
    const a = document.createElement('a');
    a.href = src;
    a.download = src.split('/').pop() || 'canvas.excalidraw';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const initialData = dataRef.current ? {
    elements: dataRef.current.elements || [],
    appState: {
      ...(dataRef.current.appState || {}),
      scrollToContent: true,
      viewBackgroundColor: dataRef.current.appState?.viewBackgroundColor || (excalidrawTheme === 'dark' ? '#121212' : '#ffffff'),
    },
    files: dataRef.current.files || null,
  } : null;

  const CanvasWrapper = ({ children }: { children: React.ReactNode }) => (
    <div 
      ref={containerRef}
      className={
        isFullscreen 
          ? "fixed inset-0 z-50 bg-white dark:bg-[#121212] flex flex-col" 
          : "my-8 overflow-hidden rounded-xl border border-fd-border  bg-white dark:bg-[#121212] flex flex-col"
      }
    >
      <div className="h-15 px-3 border-b border-fd-border bg-fd-muted/50 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">

          <h4 className="text-sm font-semibold text-fd-foreground leading-none">{title}</h4>
        </div>
        
        <div className="flex items-center gap-1">
          {status === 'ready' && showCanvas && (
            <span className="">
             
            </span>
          )}
          
          <button 
            onClick={() => setLocalTheme(excalidrawTheme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded-md hover:bg-fd-border transition-colors text-fd-muted-foreground hover:text-fd-foreground"
            title="Toggle Canvas Theme"
          >
            {excalidrawTheme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          <button 
            onClick={handleDownloadSource}
            className="p-1.5 rounded-md hover:bg-fd-border transition-colors text-fd-muted-foreground hover:text-fd-foreground"
            title="Download .excalidraw file"
          >
            <Download className="h-3.5 w-3.5" />
          </button>

          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-md hover:bg-fd-border transition-colors text-fd-muted-foreground hover:text-fd-foreground"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
          
        
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
            {errorMsg || "We couldn't fetch the diagram data."}
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

  if (status === 'downloading' || status === 'parsing') {
    const loadedMB = (loadedBytes / (1024 * 1024)).toFixed(1);
    const totalMB = totalBytes > 0 ? (totalBytes / (1024 * 1024)).toFixed(1) : null;

    return (
      <CanvasWrapper>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-fd-muted/30 p-6">
          <Loader2 className="h-8 w-8 animate-spin text-fd-primary mb-4" />
          <p className="text-sm font-semibold text-fd-foreground mb-3">
            {status === 'parsing' ? 'Parsing Diagram Data...' : `Downloading Map... ${totalBytes > 0 ? progress + '%' : ''}`}
          </p>
          <div className="w-full max-w-xs h-2 bg-fd-border rounded-full overflow-hidden mb-2">
            <div 
              className={`h-full bg-fd-primary transition-all duration-150 ease-out ${totalBytes === 0 && status === 'downloading' ? 'w-1/3 animate-pulse' : ''}`}
              style={{ width: totalBytes > 0 ? `${progress}%` : (status === 'parsing' ? '100%' : '33%') }}
            />
          </div>
          <p className="text-xs text-fd-muted-foreground">
            {loadedMB} MB {totalMB ? `/ ${totalMB} MB` : 'downloaded'}
          </p>
          {status === 'parsing' && (
            <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-4 italic text-center max-w-xs font-medium">
              Processing large file. The tab may freeze briefly, please do not refresh.
            </p>
          )}
        </div>
      </CanvasWrapper>
    );
  }

  return (
    <CanvasWrapper>
      {!showCanvas && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-fd-background z-20">
          <Loader2 className="h-8 w-8 animate-spin text-fd-primary mb-2" />
          <p className="text-xs text-fd-muted-foreground">Initializing Canvas Engine...</p>
        </div>
      )}
      
      <div className={`absolute inset-0 z-10 transition-opacity duration-300 ${showCanvas ? 'opacity-100' : 'opacity-0'}`}>
        {showCanvas && initialData && (
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
                export: { saveFileToDisk: true },
                changeViewBackgroundColor: false,
              },
            }}
          />
        )}
      </div>
    </CanvasWrapper>
  );
}
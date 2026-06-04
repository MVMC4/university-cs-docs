"use client";

import { Sandpack } from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";

export function Playground({ code, title = "Runnable Example" }: { code: string; title?: string }) {
  const [mounted, setMounted] = useState(false);
  
  // Only render Sandpack after client mount to avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  
  if (!mounted) {
    return (
      <div className="my-6 rounded-xl border border-fd-border bg-fd-muted/20 animate-pulse h-[400px]" />
    );
  }

  return (
    <div className="my-6 rounded-xl border border-fd-border overflow-hidden shadow-sm">
      <div className="px-4 py-2 border-b border-fd-border bg-fd-muted/50 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-red-500"></div>
        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        <span className="ml-2 text-sm font-medium text-fd-muted-foreground">{title}</span>
      </div>
      <Sandpack
        template="react-ts"
        files={{ "/App.tsx": code }}
        options={{
          showConsole: true,
          showTabs: false,
          editorHeight: 350,
          classes: { "sp-layout": "border-0" },
        }}
        theme="dark"
      />
    </div>
  );
}

"use client";

import { useState } from "react";

export function SafeImage({ 
  src, 
  alt, 
  className = "",
  caption,
  fallbackText = "Image not found"
}: { 
  src: string; 
  alt: string; 
  className?: string;
  caption?: string;
  fallbackText?: string;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <figure className="my-6">
        <div className="p-6 rounded-lg border border-dashed border-fd-border bg-fd-muted/20 text-center">
          <div className="text-3xl mb-2">🖼️</div>
          <p className="text-sm text-fd-muted-foreground mb-1">{fallbackText}</p>
          <code className="text-xs text-fd-muted-foreground/70 block">{src}</code>
        </div>
        {caption && (
          <figcaption className="mt-2 text-sm text-fd-muted-foreground text-center">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="my-6">
      <img 
        src={src} 
        alt={alt}
        className={`${className} rounded-lg border border-fd-border shadow-sm`}
        onError={() => setError(true)}
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-fd-muted-foreground text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

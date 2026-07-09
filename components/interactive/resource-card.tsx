'use client';

import { PlayCircle, Globe, ExternalLink } from 'lucide-react';

function getYoutubeThumbnail(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
  }
  return null;
}

function getFavicon(url: string) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    return null;
  }
}

export function ResourceCard({ 
  title, 
  description, 
  href, 
  image, 
  type = 'link' 
}: { 
  title: string; 
  description: string; 
  href: string; 
  image?: string;
  type?: 'video' | 'book' | 'tool' | 'link' | 'leetcode';
}) {
  const ytThumb = getYoutubeThumbnail(href);
  const favicon = getFavicon(href);
  
  const displayImage = image || ytThumb;
  const isVideo = type === 'video' || !!ytThumb;

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="group flex flex-col overflow-hidden rounded-xl border border-fd-border bg-fd-background shadow-sm transition-all hover:shadow-lg hover:border-fd-primary/50 hover:-translate-y-1"
    >
      <div className="relative h-40 w-full bg-fd-muted overflow-hidden flex items-center justify-center">
        {displayImage ? (
          <img 
            src={displayImage} 
            alt={title} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            {favicon ? (
              <img src={favicon} alt="" className="w-16 h-16 object-contain" />
            ) : (
              <Globe className="w-12 h-12 text-fd-muted-foreground" />
            )}
          </div>
        )}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
            <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-bold text-fd-foreground group-hover:text-fd-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <ExternalLink className="w-4 h-4 text-fd-muted-foreground shrink-0 mt-1" />
        </div>
        <p className="text-sm text-fd-muted-foreground line-clamp-3 flex-1">
          {description}
        </p>
      </div>
    </a>
  );
}

export function ResourceGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
      {children}
    </div>
  );
}
"use client";

import { useState, useEffect, useMemo, Fragment } from "react";
import { 
  Search, AlertCircle, Loader2, Folder, ChevronRight, Home, 
  FileText, Video, Link2, HelpCircle, FileCode, X, Download, Maximize2, Plus
} from "lucide-react";

// --- Types ---
type ResourceType = "pdf" | "docx" | "code" | "video" | "link" | "quiz";
type Category = "Lectures" | "Labs" | "Videos" | "Past Papers" | "Tools" | "Books" | "Practice";

interface BaseItem {
  id: string;
  title: string;
  description: string;
  category: Category;
}

export interface FileResource extends BaseItem {
  type: ResourceType;
  url: string;
  isNew?: boolean;
}

export interface FolderResource extends BaseItem {
  type: "folder";
  children: ResourceItem[];
}

export type ResourceItem = FileResource | FolderResource;

interface SearchResult extends FileResource {
  breadcrumb: string[];
}

// --- Helper Functions ---
const getIcon = (type: ResourceType) => {
  switch (type) {
    case "pdf": return <FileText className="h-6 w-6" />;
    case "docx": return <FileText className="h-6 w-6" />;
    case "code": return <FileCode className="h-6 w-6" />;
    case "video": return <Video className="h-6 w-6" />;
    case "link": return <Link2 className="h-6 w-6" />;
    case "quiz": return <HelpCircle className="h-6 w-6" />;
  }
};

const getTypeStyles = (type: ResourceType) => {
  switch (type) {
    case "pdf": return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
    case "docx": return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    case "code": return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
    case "video": return "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20";
    case "link": return "bg-fd-primary/10 text-fd-primary border-fd-primary/20";
    case "quiz": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  }
};

// --- Main Component ---
export function ResourceHub({ modulePath }: { modulePath: string }) {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [path, setPath] = useState<string[]>([]);
  const [viewingFile, setViewingFile] = useState<FileResource | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPath([]);
    setActiveCategory("All");
    
    fetch(`${modulePath}/meta.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Resource index not found");
        return res.json();
      })
      .then((data: ResourceItem[]) => {
        setResources(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [modulePath]);

  // Folder Navigation Logic
  const folderChain = useMemo(() => {
    const chain: FolderResource[] = [];
    let currentItems = resources;
    for (const folderId of path) {
      const found = currentItems.find(i => i.id === folderId && i.type === "folder") as FolderResource;
      if (found) { chain.push(found); currentItems = found.children; } else break;
    }
    return chain;
  }, [path, resources]);

  const currentFolderItems = useMemo(() => {
    let items = resources;
    for (const folder of folderChain) items = folder.children;
    return items;
  }, [resources, folderChain]);

  // Search Logic
  const searchResults = useMemo(() => {
    if (!search) return [];
    const term = search.toLowerCase();
    const results: SearchResult[] = [];
    const traverse = (items: ResourceItem[], breadcrumb: string[]) => {
      for (const item of items) {
        if (item.type === "folder") traverse(item.children, [...breadcrumb, item.title]);
        else if (item.title.toLowerCase().includes(term) || item.description.toLowerCase().includes(term)) 
          results.push({ ...item, breadcrumb });
      }
    };
    traverse(resources, []);
    return results;
  }, [search, resources]);

  const categories: Category[] = ["Lectures", "Labs", "Videos", "Books", "Practice", "Past Papers", "Tools"];

  const navigateToFolder = (folderId: string) => { 
    setPath(prev => [...prev, folderId]); 
    setSearch(""); 
  };
  
  const handleFileClick = (file: FileResource) => { 
    if (file.type === "pdf" || file.type === "docx") setViewingFile(file); 
  };

  // --- Render States ---
  if (loading) return (
    <div className="my-8 rounded-xl border border-fd-border bg-fd-muted/30 p-8 sm:p-12 shadow-sm flex flex-col items-center justify-center gap-3">
      <Loader2 className="h-6 w-6 animate-spin text-fd-primary" />
      <p className="text-sm text-fd-muted-foreground">Loading resource library...</p>
    </div>
  );

  if (error) return (
    <div className="my-8 rounded-xl border border-red-500/50 bg-red-500/5 p-4 sm:p-6 shadow-sm">
      <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-semibold">Failed to Load Resources</h3>
          <p className="text-sm mt-1 text-fd-muted-foreground">
            Could not find <code className="bg-fd-muted px-1 rounded text-xs">{modulePath}/meta.json</code>. {error}
          </p>
        </div>
      </div>
    </div>
  );

  const isSearching = search.length > 0;
  const isInsideFolder = path.length > 0;
  const isCategoryFocused = activeCategory !== "All";

  return (
    <>
      <div className="my-8 rounded-xl border border-fd-border bg-fd-muted/30 p-4 sm:p-6 shadow-sm">
        
        {/* Header & Search */}
        <div className="mb-6 flex flex-col gap-4 border-b border-fd-border pb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-fd-foreground">Resource Library</h3>
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Search all files..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="w-full bg-fd-background border border-fd-border rounded-lg py-2.5 px-4 pl-10 text-base focus:outline-none focus:ring-2 focus:ring-fd-primary/50 transition-all text-fd-foreground placeholder-fd-muted-foreground" 
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-fd-muted-foreground" />
          </div>
        </div>

        {/* Breadcrumbs (For Folders and Focused Categories) */}
        {(isInsideFolder || isCategoryFocused) && !isSearching && (
          <div className="flex items-center gap-2 text-sm text-fd-muted-foreground mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <button 
              onClick={() => { setPath([]); setActiveCategory("All"); }} 
              className="hover:text-fd-foreground flex items-center gap-1 whitespace-nowrap transition-colors"
            >
              <Home className="h-4 w-4" /> Root
            </button>
            
            {isInsideFolder && folderChain.map((folder, index) => (
              <Fragment key={folder.id}>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <button 
                  onClick={() => setPath(path.slice(0, index + 1))} 
                  className="hover:text-fd-foreground whitespace-nowrap transition-colors font-medium text-fd-foreground"
                >
                  {folder.title}
                </button>
              </Fragment>
            ))}

            {isCategoryFocused && !isInsideFolder && (
              <>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium text-fd-foreground">{activeCategory}</span>
              </>
            )}
          </div>
        )}

        {/* --- CONTENT ROUTING --- */}

        {/* 1. Search Results View */}
        {isSearching ? (
          <>
            <p className="text-sm text-fd-muted-foreground mb-4">
              Found <span className="font-semibold text-fd-foreground">{searchResults.length}</span> results for "{search}"
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {searchResults.map((file) => (
                <FileCard key={file.id} file={file} breadcrumb={file.breadcrumb} onClick={() => handleFileClick(file)} />
              ))}
              {searchResults.length === 0 && (
                <div className="col-span-full text-center py-12 text-fd-muted-foreground">No files match your search.</div>
              )}
            </div>
          </>
        ) 
        /* 2. Inside a Real Folder View */
        : isInsideFolder ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentFolderItems.map((item) => (
              item.type === "folder" ? (
                <FolderCard key={item.id} folder={item} onClick={() => navigateToFolder(item.id)} />
              ) : (
                <FileCard key={item.id} file={item} onClick={() => handleFileClick(item)} />
              )
            ))}
            {currentFolderItems.length === 0 && (
              <div className="col-span-full text-center py-12 text-fd-muted-foreground">This folder is empty.</div>
            )}
          </div>
        )
        /* 3. Focused Category Subsection View */
        : isCategoryFocused ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {resources.filter(i => i.category === activeCategory).map((item) => (
              item.type === "folder" ? (
                <FolderCard key={item.id} folder={item} onClick={() => navigateToFolder(item.id)} />
              ) : (
                <FileCard key={item.id} file={item} onClick={() => handleFileClick(item)} />
              )
            ))}
          </div>
        )
        /* 4. Root Dashboard View (Progressive Disclosure) */
        : (
          <div className="space-y-10">
            {categories.map((category) => {
              const items = resources.filter(i => i.category === category);
              if (items.length === 0) return null;

              // Limit to 3 items on the root dashboard
              const displayItems = items.slice(0, 3);
              const hasMore = items.length > 3;
              const remainingCount = items.length - 3;

              return (
                <div key={category}>
                  <h4 className="text-lg font-semibold mb-4 text-fd-foreground flex items-center gap-2">
                    {category} 
                    <span className="text-xs font-normal text-fd-muted-foreground">({items.length})</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {displayItems.map((item) => (
                      item.type === "folder" ? (
                        <FolderCard key={item.id} folder={item} onClick={() => navigateToFolder(item.id)} />
                      ) : (
                        <FileCard key={item.id} file={item} onClick={() => handleFileClick(item)} />
                      )
                    ))}
                    
                    {/* The "+ View More" Card */}
                    {hasMore && (
                      <ViewMoreCard 
                        count={remainingCount} 
                        onClick={() => setActiveCategory(category)} 
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Document Viewer Modal (Bottom sheet on mobile, centered on desktop) */}
      {viewingFile && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full h-[90vh] sm:h-[85vh] sm:max-w-5xl bg-fd-background rounded-t-2xl sm:rounded-xl border-t sm:border border-fd-border shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 sm:slide-in-from-bottom-0">
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-fd-border bg-fd-muted/30 gap-2">
              <div className="flex items-center gap-3 overflow-hidden flex-1">
                <div className="text-fd-primary flex-shrink-0">{getIcon(viewingFile.type)}</div>
                <div className="truncate">
                  <h3 className="font-semibold text-fd-foreground truncate text-sm sm:text-base">{viewingFile.title}</h3>
                  <p className="text-xs text-fd-muted-foreground truncate hidden sm:block">{viewingFile.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a 
                  href={viewingFile.url} 
                  download 
                  className="px-4 py-2.5 sm:px-3 sm:py-1.5 rounded-lg bg-fd-background border border-fd-border text-fd-foreground text-sm font-medium hover:bg-fd-muted transition-colors flex items-center gap-2"
                >
                  <Download className="h-4 w-4" /> <span className="hidden sm:inline">Download</span>
                </a>
                <button 
                  onClick={() => setViewingFile(null)}
                  className="p-3 sm:p-2 rounded-lg hover:bg-fd-muted text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-white dark:bg-zinc-900 relative">
              <iframe 
                src={viewingFile.url} 
                className="w-full h-full border-0"
                title={viewingFile.title}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// --- Sub-Components ---

function ViewMoreCard({ count, onClick }: { count: number, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="group flex flex-col items-center justify-center bg-fd-muted/10 hover:bg-fd-muted/30 rounded-lg border-2 border-dashed border-fd-border hover:border-fd-primary transition-all min-h-[140px] sm:min-h-[160px] text-fd-muted-foreground hover:text-fd-primary active:scale-[0.98]"
    >
      <div className="p-3 rounded-full bg-fd-background border border-fd-border mb-3 group-hover:scale-110 group-hover:border-fd-primary transition-all shadow-sm">
        <Plus className="h-6 w-6" strokeWidth={2.5} />
      </div>
      <span className="font-semibold text-sm">View {count} more</span>
      <span className="text-xs mt-1 opacity-70">Show all in section</span>
    </button>
  );
}

function FileCard({ file, breadcrumb, onClick }: { file: FileResource, breadcrumb?: string[], onClick: () => void }) {
  const isPreviewable = file.type === "pdf" || file.type === "docx";
  const Wrapper = isPreviewable ? "button" : "a";
  const wrapperProps = isPreviewable ? { onClick, type: "button" as const } : { href: file.url, target: file.type === "video" ? "_blank" : "_self", rel: "noopener noreferrer" };

  return (
    <Wrapper 
      {...wrapperProps}
      className="group flex flex-col bg-fd-background rounded-lg overflow-hidden border border-fd-border hover:border-fd-primary/50 transition-all duration-300 hover:shadow-md text-left w-full h-full active:scale-[0.98]"
    >
      <div className="h-28 sm:h-32 bg-fd-muted/50 relative flex items-center justify-center border-b border-fd-border">
        <div className="text-fd-foreground/20 group-hover:text-fd-primary/40 transition-colors">
          {getIcon(file.type)}
        </div>
        <span className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold border ${getTypeStyles(file.type)}`}>
          {file.type.toUpperCase()}
        </span>
        {file.isNew && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-fd-primary text-fd-primary-foreground">NEW</span>
        )}
        {isPreviewable && (
          <div className="absolute bottom-2 right-2 p-1.5 rounded-md bg-fd-background/80 border border-fd-border opacity-0 group-hover:opacity-100 transition-opacity text-fd-foreground">
            <Maximize2 className="h-3 w-3" />
          </div>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col gap-1">
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="flex items-center gap-1 text-[10px] text-fd-muted-foreground truncate">
            {breadcrumb.map((crumb, i) => (
              <Fragment key={i}>
                {i > 0 && <ChevronRight className="h-3 w-3 flex-shrink-0" />}
                <span className="truncate">{crumb}</span>
              </Fragment>
            ))}
          </div>
        )}
        <h5 className="font-semibold text-sm text-fd-foreground line-clamp-2 group-hover:text-fd-primary transition-colors">
          {file.title}
        </h5>
        <p className="text-xs text-fd-muted-foreground line-clamp-2 flex-1">
          {file.description}
        </p>
      </div>
    </Wrapper>
  );
}

function FolderCard({ folder, onClick }: { folder: FolderResource, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col bg-fd-background rounded-lg overflow-hidden border border-fd-border hover:border-fd-primary/50 transition-all duration-300 hover:shadow-md text-left w-full h-full active:scale-[0.98]"
    >
      <div className="h-28 sm:h-32 bg-fd-muted/50 relative flex items-center justify-center border-b border-fd-border">
        <Folder className="h-10 w-10 text-fd-primary/40 group-hover:text-fd-primary transition-colors" />
        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-fd-muted text-fd-muted-foreground border border-fd-border">
          {folder.children.length} items
        </span>
      </div>
      <div className="p-3 flex-1 flex flex-col gap-1">
        <h5 className="font-semibold text-sm text-fd-foreground line-clamp-2 group-hover:text-fd-primary transition-colors">
          {folder.title}
        </h5>
        <p className="text-xs text-fd-muted-foreground line-clamp-2 flex-1">
          {folder.description}
        </p>
      </div>
    </button>
  );
}
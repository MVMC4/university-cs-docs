import { BookOpen, Bot, CalendarDays, Calculator, ChartLine, Compass, FileText, FolderOpen, GraduationCap, Landmark, Layers, Library, NotebookPen, Pencil, Repeat2, Timer, Video, CircleDot, CreditCard } from "lucide-react";

export default function ResourceIcon({ name }: { name: string }) {
  var common = { size: 22, strokeWidth: 1.8 };
  switch (name) {
    case "book": return <BookOpen {...common} />;
    case "library": return <Library {...common} />;
    case "landmark": return <Landmark {...common} />;
    case "book-open": return <BookOpen {...common} />;
    case "youtube": return <Video {...common} />;
    case "video": return <Video {...common} />;
    case "calculator": return <Calculator {...common} />;
    case "teacher": return <GraduationCap {...common} />;
    case "folder": return <FolderOpen {...common} />;
    case "pencil": return <Pencil {...common} />;
    case "timer": return <Timer {...common} />;
    case "bot": return <Bot {...common} />;
    case "chart": return <ChartLine {...common} />;
    case "compass": return <Compass {...common} />;
    case "layers": return <Layers {...common} />;
    case "notebook": return <NotebookPen {...common} />;
    case "repeat": return <Repeat2 {...common} />;
    case "focus": return <CircleDot {...common} />;
    case "file": return <FileText {...common} />;
    case "calendar": return <CalendarDays {...common} />;
    case "cards": return <CreditCard {...common} />;
    default: return <BookOpen {...common} />;
  }
}

import {
  Award,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  CircleHelp,
  Crosshair,
  Flame,
  Footprints,
  GraduationCap,
  Layers,
  Library,
  ListChecks,
  Milestone,
  Target,
  Timer,
  Trophy,
  type LucideIcon,
} from 'lucide-react';

/**
 * Icon names that content/progress/rewards.json may use for a badge. A new name in the JSON needs one line here;
 * an unknown name falls back to the award icon, so a rewards update never breaks the page.
 */
const icons: Record<string, LucideIcon> = {
  award: Award,
  'badge-check': BadgeCheck,
  'book-open': BookOpen,
  'calendar-days': CalendarDays,
  'circle-help': CircleHelp,
  crosshair: Crosshair,
  flame: Flame,
  footprints: Footprints,
  'graduation-cap': GraduationCap,
  layers: Layers,
  library: Library,
  'list-checks': ListChecks,
  milestone: Milestone,
  target: Target,
  timer: Timer,
  trophy: Trophy,
};

export function badgeIcon(name: string | undefined): LucideIcon {
  return (name && icons[name]) || Award;
}

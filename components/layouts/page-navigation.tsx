import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { PageNeighbours, TopicTab } from '@/lib/page-navigation';
import { PageKeys } from './page-keys';

/** The pages of the current topic, as a row of underlined tabs above the title. */
export function TopicTabs({ tabs }: { tabs: TopicTab[] }) {
  if (tabs.length === 0) return null;
  return (
    <nav className="ui-topic-tabs" aria-label="Pages in this topic">
      {tabs.map((tab) => (
        <Link key={tab.url} href={tab.url} aria-current={tab.active ? 'page' : undefined} data-active={tab.active || undefined}>
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}

/** Previous / next cards, the reader's position, and the arrow-key shortcuts. */
export function DocsPager({ neighbours }: { neighbours: PageNeighbours }) {
  const { previous, next, position, total, scope } = neighbours;
  return (
    <>
      <PageKeys previous={previous?.url} next={next?.url} />
      {(previous || next) && (
        <nav className="ui-pager" aria-label="Page turning">
          {previous && (
            <Link className="ui-pager-prev" href={previous.url}>
              <small><ArrowLeft size={14} /> Previous</small>
              <span>{previous.name}</span>
            </Link>
          )}
          {next && (
            <Link className="ui-pager-next" href={next.url}>
              <small>Next <ArrowRight size={14} /></small>
              <span>{next.name}</span>
            </Link>
          )}
        </nav>
      )}
      {total > 1 && (
        <p className="ui-pagehint">
          Page {position} of {total}{scope ? ` in ${scope}` : ''}
          <span className="ui-pagehint-keys"> · use <kbd>←</kbd> <kbd>→</kbd> to turn pages</span>
        </p>
      )}
    </>
  );
}

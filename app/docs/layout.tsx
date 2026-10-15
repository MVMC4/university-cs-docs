import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions, docsTabs } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const tree = source.getPageTree();
  const base = baseOptions();

  return (
    <DocsLayout
      {...base}
      tree={tree}
      nav={{ ...base.nav, mode: 'top' }}
      tabMode="navbar"
      tabs={docsTabs(tree)}
      sidebar={{ collapsible: false }}
    >
      {children}
    </DocsLayout>
  );
}

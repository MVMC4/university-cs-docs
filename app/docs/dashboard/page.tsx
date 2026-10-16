import type { Metadata } from 'next';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/notebook/page';
import { ProgressDashboard } from '@/features/progress/dashboard/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your study streak, level, badges and progress through every course, saved in this browser.',
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <DocsPage toc={[]} full footer={{ enabled: false }}>
      <DocsTitle>Dashboard</DocsTitle>
      <DocsDescription>Your study streak, level, badges and progress through every course. Everything is saved in this browser.</DocsDescription>
      <DocsBody>
        <ProgressDashboard />
      </DocsBody>
    </DocsPage>
  );
}

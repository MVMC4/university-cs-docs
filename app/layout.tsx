import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import 'katex/dist/katex.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: {
    default: 'University Docs',
    template: '%s | University Docs', // Automatically appends this to individual page titles
  },
  description: 'A centralized hub for university course notes, study guides, and resources.',
  
  // Required for Open Graph images to resolve correctly
  metadataBase: new URL('https://university-cs-docs.vercel.app'), // Change this to your Vercel/custom domain
  
  openGraph: {
    title: 'University Docs',
    description: 'Comprehensive notes, study guides, and resources for university courses.',
    images: ['/og-image.png'], // Make sure to put this image in your `public` folder!
    siteName: 'University Docs',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    
    title: 'University Docs',
    description: 'Comprehensive notes, study guides, and resources for university courses.',
    images: ['/og-image.png'],
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen font-sans">
        <RootProvider>{children}</RootProvider>
        <Analytics />
      </body>
    </html>
  );
}

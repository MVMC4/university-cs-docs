import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Allow cross-origin dev requests from your network IP
  allowedDevOrigins: ['100.124.114.119'],
  async redirects() {
    return [
      {
        source: '/docs/sem3/csi243/01-functional-thinking/programming-model',
        destination: '/docs/sem3/csi243/01-functional-thinking/notes/programming-model',
        permanent: true,
      },
      {
        source: '/docs/sem3/csi243/01-functional-thinking/functional-thinking',
        destination: '/docs/sem3/csi243/01-functional-thinking/notes/functional-thinking',
        permanent: true,
      },
      {
        source: '/docs/sem3/csi243/02-expressions-types/ghci',
        destination: '/docs/sem3/csi243/02-expressions-types/notes/ghci',
        permanent: true,
      },
      {
        source: '/docs/sem3/csi243/02-expressions-types/values-text',
        destination: '/docs/sem3/csi243/02-expressions-types/notes/values-text',
        permanent: true,
      },
      {
        source: '/docs/sem3/csi243/02-expressions-types/expressions-types',
        destination: '/docs/sem3/csi243/02-expressions-types/notes/expressions-types',
        permanent: true,
      },
      {
        source: '/docs/sem3/csi243/03-defining-functions/defining-functions',
        destination: '/docs/sem3/csi243/03-defining-functions/notes/defining-functions',
        permanent: true,
      },
      {
        source: '/docs/sem3/csi243/03-defining-functions/output',
        destination: '/docs/sem3/csi243/03-defining-functions/notes/output',
        permanent: true,
      },
      {
        source: '/docs/sem3/csi243/03-defining-functions/complete-program',
        destination: '/docs/sem3/csi243/03-defining-functions/notes/complete-program',
        permanent: true,
      },
      {
        source: '/docs/sem3/csi243/03-defining-functions/input-processing',
        destination: '/docs/sem3/csi243/03-defining-functions/notes/input-processing',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);

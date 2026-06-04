import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Allow cross-origin dev requests from your network IP
  allowedDevOrigins: ['100.124.114.119'],
};

export default withMDX(config);

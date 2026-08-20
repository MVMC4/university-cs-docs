const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || (vercelHost ? "https://" + vercelHost : "https://mat221-flow-docs.vercel.app")).replace(/\/$/, "");

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MAT 221 Flow Docs",
    short_name: "MAT 221",
    description: "A Calculus I study companion with guided notes, worked examples and exam practice.",
    start_url: "/",
    display: "standalone",
    background_color: "#F1EBDD",
    theme_color: "#30364D",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }]
  };
}

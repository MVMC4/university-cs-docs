# University CS Docs - Image Assets

## Supported Formats
✅ **PNG** (.png) - Best for screenshots, diagrams with transparency  
✅ **WebP** (.webp) - Best for photos, smaller file size with good quality  
✅ **GIF** (.gif) - Best for simple animations, step-by-step visualizations  

## Directory Structure
public/images/
├── csi247/          # Data Structures module
│   ├── linear-search.png
│   ├── binary-search.webp
│   ├── bst-insert.gif
│   └── ...
├── csi243/          # Functional Programming
├── csi213/          # Discrete Structures
├── mat221/          # Calculus
└── shared/          # Reusable assets (icons, diagrams)

## Image Guidelines
- **Max width**: 800px for optimal loading (Next.js will handle responsive sizing)
- **File naming**: Use kebab-case: linear-search-visualization.png
- **Alt text**: Always include descriptive alt text in MDX: ![Description](/images/path/file.png)
- **Dark mode**: Prefer images that look good on both light and dark backgrounds
- **Compression**: Use squoosh.app or cwebp CLI to optimize

## Adding Images to MDX
Static image:
![Algorithm Visualization](/images/csi247/linear-search.png)

With caption:
<figure>
  <img src="/images/csi247/bst-traversal.webp" alt="BST traversal steps" />
  <figcaption>Figure 1: In-order traversal of a Binary Search Tree</figcaption>
</figure>

Animated GIF for step-by-step:
![Bubble Sort Animation](/images/csi247/bubble-sort.gif)

## Tools Recommendations
- **Screenshots**: CleanShot X (macOS), ShareX (Windows), Flameshot (Linux)
- **Diagrams**: Excalidraw, draw.io, Mermaid (export as PNG/WebP)
- **Animations**: ScreenToGif, LICEcap, or record → convert with ezgif.com
- **Optimization**: cwebp input.png -q 80 -o output.webp

## Next.js Image Optimization
All images in public/ are served statically. For advanced optimization (lazy loading, responsive sizes), consider using the <Image> component from next/image in custom MDX components.

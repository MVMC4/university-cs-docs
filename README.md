# University CS Docs

A comprehensive, interactive documentation platform for Computer Science courses at the University of Botswana. This project provides structured notes, runnable code examples, and interactive quizzes for various modules, including Functional Programming, Data Structures, Discrete Mathematics, and Calculus.

## Purpose

The primary objective of this repository is to centralize and modernize course materials. By leveraging modern web technologies, it transforms static PDF or text-based notes into an engaging, searchable, and interactive learning experience. It serves as both a study aid for students and a portfolio piece demonstrating advanced full-stack development skills.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Documentation Engine**: Fumadocs
- **Language**: TypeScript, Python (for build automation)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Content**: MDX (Markdown + JSX)
- **Code Execution**: CodeSandbox Sandpack
- **Icons**: Lucide React

## Project Structure

```text
university-docs/
├── app/                    # Next.js App Router directory
│   ├── (home)/             # Landing page with parallax animations
│   ├── api/                # API routes
│   ├── docs/               # Documentation layout and pages
│   ├── og/                 # OpenGraph image generation
│   ├── global.css          # Global Tailwind styles
│   └── layout.tsx          # Root layout
├── components/             # Reusable React components
│   ├── mdx.tsx             # MDX component configuration
│   ├── playground.tsx      # Sandpack code playground wrapper
│   ├── quiz.tsx            # Interactive quiz component
│   └── safe-image.tsx      # Image component with fallback handling
├── content/                # Source of truth for all content
│   ├── docs/               # MDX files organized by semester and course
│   └── quiz-data/          # TypeScript files containing quiz questions
├── lib/                    # Shared utilities and layout configurations
├── public/                 # Static assets
├── apply-files.py          # Script to apply payload.json to the filesystem
├── make-batch-payload.py   # Script to bundle existing content into payload.json
└── payload.json            # Temporary JSON file used for file operations
```

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Python 3.x (for automation scripts)

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/MVMC4/university-docs.git
   cd university-docs
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Ensure Python 3 is installed and available in your PATH.

## Development Workflow

### Running the Development Server

Start the local Next.js development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

### Content Management and Automation

This project utilizes a unique JSON-based payload system to manage MDX and TypeScript files programmatically. This allows for batch updates and seamless integration with AI-generated content.

#### Applying Content from Payload
If you have a `payload.json` file containing file paths and their contents, you can write them to the filesystem using the Python script:
```bash
python3 apply-files.py
```
This script reads `payload.json`, creates necessary directories, and writes or updates the files accordingly.

#### Generating a Batch Payload
To bundle all existing MDX and quiz files into a single `payload.json` file (useful for backups or transferring content):
```bash
python3 make-batch-payload.py
```

### Adding New Content Manually

1. **MDX Notes**: Create a new `.mdx` file in `content/docs/sem{X}/{course}/`. Ensure it includes the required Fumadocs frontmatter and imports the `Quiz` component if applicable.
2. **Quiz Data**: Create a corresponding `.ts` file in `content/quiz-data/sem{X}/{course}/`. Export an array of objects matching the `Question` interface.
3. **Navigation**: Update the `meta.json` file in the respective course directory to include the new page in the sidebar.

## Architecture and Features

### Interactive Homepage
The landing page (`app/(home)/page.tsx`) features a highly responsive, parallax-driven design. It uses Framer Motion to track mouse movements and apply spring physics to floating module cards. The layout dynamically adapts to mobile, tablet, and desktop viewports, switching from a parallax grid to a static layered grid on smaller screens.

### Documentation Engine
Powered by Fumadocs, the documentation section provides a fast, searchable, and accessible interface for reading MDX content. It supports syntax highlighting, mathematical equations, and Mermaid.js diagrams.

### Custom MDX Components
The `components/` directory provides specialized components injected into the MDX pipeline:
- **Quiz**: A fully interactive multiple-choice quiz component. It manages local state for user selections, calculates scores, provides immediate feedback with color-coded indicators, and displays explanations.
- **Playground**: Wraps CodeSandbox Sandpack to allow users to edit and execute React/TypeScript code directly within the documentation.
- **SafeImage**: An image wrapper that gracefully handles broken links by displaying a styled fallback UI with the attempted source URL.

## Image Assets Guidelines

### Supported Formats
- **PNG** (.png): Best for screenshots, diagrams with transparency.
- **WebP** (.webp): Best for photos, smaller file size with good quality.
- **GIF** (.gif): Best for simple animations, step-by-step visualizations.

### Directory Structure
```text
public/images/
├── csi247/          # Data Structures module
├── csi243/          # Functional Programming
├── csi213/          # Discrete Structures
├── mat221/          # Calculus
└── shared/          # Reusable assets (icons, diagrams)
```

### Image Guidelines
- **Max width**: 800px for optimal loading (Next.js will handle responsive sizing).
- **File naming**: Use kebab-case (e.g., `linear-search-visualization.png`).
- **Alt text**: Always include descriptive alt text in MDX.
- **Dark mode**: Prefer images that look good on both light and dark backgrounds.
- **Compression**: Use squoosh.app or cwebp CLI to optimize.

### Adding Images to MDX
Static image:
```mdx
![Algorithm Visualization](/images/csi247/linear-search.png)
```

With caption:
```mdx
<figure>
  <img src="/images/csi247/bst-traversal.webp" alt="BST traversal steps" />
  <figcaption>Figure 1: In-order traversal of a Binary Search Tree</figcaption>
</figure>
```

Animated GIF for step-by-step:
```mdx
![Bubble Sort Animation](/images/csi247/bubble-sort.gif)
```

### Tools Recommendations
- **Screenshots**: CleanShot X (macOS), ShareX (Windows), Flameshot (Linux).
- **Diagrams**: Excalidraw, draw.io, Mermaid (export as PNG/WebP).
- **Animations**: ScreenToGif, LICEcap, or record and convert with ezgif.com.
- **Optimization**: `cwebp input.png -q 80 -o output.webp`.

### Next.js Image Optimization
All images in `public/` are served statically. For advanced optimization (lazy loading, responsive sizes), consider using the `Image` component from `next/image` in custom MDX components.

## Building and Deployment

### Production Build
To create an optimized production build:
```bash
npm run build
```

### Starting the Production Server
To run the production build locally:
```bash
npm start
```

### Deployment
The project is configured for static export or Node.js server deployment. It can be deployed to platforms like Vercel, Netlify, or any Node.js hosting provider.

For Vercel:
1. Push the repository to GitHub/GitLab.
2. Import the project into Vercel.
3. Vercel will automatically detect Next.js and configure the build settings.

## LLM Integration

The project includes specialized routes and files (`llms.txt`, `llms-full.txt`, `llms.mdx`) designed to provide context to Large Language Models. These files aggregate the course content into a format that can be easily ingested by AI tools for RAG (Retrieval-Augmented Generation) or context-aware assistance.

## Contributing Guidelines

Contributions are welcome and encouraged. To contribute:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3. Ensure your code adheres to the existing styling and architectural patterns.
4. If adding new content, ensure MDX files are properly formatted and quiz data strictly follows the TypeScript interfaces.
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
6. Push to the branch (`git push origin feature/AmazingFeature`).
7. Open a Pull Request.

Please ensure that all new MDX files include the necessary frontmatter and that quiz data arrays contain exactly four options per question with a valid 0-indexed `correctIndex`.

## License

Distributed under the MIT License. See `LICENSE` file for full text.

Copyright (c) 2026 MVMC4

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

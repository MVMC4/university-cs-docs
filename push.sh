#!/bin/bash
set -e

echo "🚀 Setting up University CS Docs with GitHub CLI..."

# Check for gh CLI
if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI not found. Install: brew install gh (macOS) or see https://cli.github.com"
  exit 1
fi

# Authenticate if needed
if ! gh auth status &>/dev/null 2>&1; then
  echo "🔐 Authenticating with GitHub..."
  gh auth login --web
fi

# Create README.md using unique delimiter to avoid code block conflicts
cat > README.md << '###UNIQUE_README_DELIMITER_END###'
# 🎓 University CS Docs

A modern, interactive documentation hub for University of Botswana Computer Science courses. Built with Next.js and Fumadocs.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Fumadocs](https://img.shields.io/badge/Fumadocs-16-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **📚 Structured Course Notes** - Organized by semester and module
- **💻 Interactive Code Playgrounds** - Live TypeScript examples via Sandpack
- **📝 Interactive Quizzes** - Built-in knowledge checks with explanations
- **🔍 Full-Text Search** - Fast client-side search (Cmd+K / Ctrl+K)
- **🎨 Beautiful UI** - Clean, responsive design with dark mode
- **📱 Mobile-First** - Optimized for learning on any device
- **⚡ Fast & SEO-Friendly** - Next.js 16 with Turbopack
- **📄 Markdown-Based** - Easy content authoring in Obsidian or any editor

## 📖 Current Courses (Semester III)

| Code | Title | Type |
|------|-------|------|
| **CSI247** | Data Structures | Core |
| **CSI243** | Functional Programming | Core |
| **CSI213** | Discrete Structures III | Core |
| **MAT221** | Calculus I | Core |
| **MGT202** | Management | Elective |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation
1. Clone the repository:
```bash
git clone https://github.com/MVMC4/university-cs-docs.git
cd university-cs-docs
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure
```
university-cs-docs/
├── app/
│   ├── (home)/          # Landing page route group
│   ├── docs/            # Documentation pages with sidebar
│   ├── api/search/      # Search API endpoint
│   ├── og/              # Open Graph image generation
│   └── llms.txt/        # LLM-friendly text export
├── components/
│   ├── mdx.tsx          # MDX component registry
│   ├── playground.tsx   # Interactive Sandpack code editor
│   └── quiz.tsx         # Interactive quiz component
├── content/docs/        # Markdown content organized by semester
│   ├── sem3/
│   │   ├── csi247/      # Data Structures module
│   │   ├── csi243/      # Functional Programming
│   │   ├── csi213/      # Discrete Structures III
│   │   ├── mat221/      # Calculus I
│   │   └── mgt202/      # Management (Elective)
├── lib/
│   ├── shared.ts        # Global config (app name, GitHub)
│   ├── layout.shared.tsx # Shared layout configuration
│   └── source.ts        # Content source adapter
├── public/              # Static assets (images, fonts)
├── source.config.ts     # Fumadocs MDX configuration
├── next.config.mjs      # Next.js configuration
└── tsconfig.json        # TypeScript configuration
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Documentation**: Fumadocs
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Code Execution**: Sandpack by CodeSandbox
- **Icons**: Lucide React
- **Math Rendering**: KaTeX (via remark-math + rehype-katex)
- **Language**: TypeScript

## 📝 Writing Content

### Adding a New Page
1. Create a new `.mdx` file in `content/docs/sem3/[module]/`
2. Add frontmatter at the top:
```mdx
---
title: Your Page Title
description: A brief description for SEO and previews
---

# Your Content

Write your markdown content here...
```

3. Update the module's `meta.json` to include the new page in the sidebar:
```json
{
  "title": "Module Name",
  "pages": ["index", "your-new-page", "question-bank"]
}
```

### Using Interactive Components

#### Code Playground
```mdx
<Playground
  title="Example Component"
  code={`export default function App() {
  return <div className="p-4">Hello World</div>;
}`}
/>
```

#### Quiz Component
```mdx
<Quiz
  title="Knowledge Check"
  questions={[
    {
      question: "What is the time complexity of linear search?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctIndex: 2,
      explanation: "Linear search checks each element once in worst case."
    }
  ]}
/>
```

## 🔧 Configuration

Edit `lib/shared.ts` to customize global settings:
```typescript
export const appName = 'University CS Docs';
export const docsRoute = '/docs';

export const gitConfig = {
  user: 'MVMC4',
  repo: 'university-cs-docs',
  branch: 'main',
};
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub (already done!)
2. Import your repository at [vercel.com/new](https://vercel.com/new)
3. Deploy with one click - no additional config needed

### Self-Hosting
```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions welcome! To contribute:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details.

## 👨‍💻 Author

**MVMC4** - University of Botswana Computer Science Student

## 🙏 Acknowledgments

- [Fumadocs](https://fumadocs.dev/) - Documentation framework
- [Next.js](https://nextjs.org/) - React framework
- [University of Botswana](https://www.ub.ac.bw/) - For the curriculum

---
*Made with ❤️ by students, for students.*
###UNIQUE_README_DELIMITER_END###

# Create .gitignore
cat > .gitignore << '###UNIQUE_GITIGNORE_END###'
# Dependencies
node_modules/
.pnp
.pnp.js

# Next.js build output
.next/
out/
build/
dist/

# Production logs
*.log

# Environment files
.env*.local
.env

# Vercel
.vercel/

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE and editor
.idea/
.vscode/
*.swp
*.swo
*~

# OS files
.DS_Store
Thumbs.db

# Fumadocs generated
.source/
.fumadocs/

# Testing
coverage/
*.lcov

# Package manager caches
.npm/
.yarn/
.pnpm-store/

# Bun
bun.lockb

# Misc
*.pem
ehthumbs.db
project-context.txt
###UNIQUE_GITIGNORE_END###

# Create LICENSE file
cat > LICENSE << '###UNIQUE_LICENSE_END###'
MIT License

Copyright (c) 2026 MVMC4

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
###UNIQUE_LICENSE_END###

# Update lib/shared.ts with correct app name and GitHub config
cat > lib/shared.ts << '###UNIQUE_SHARED_END###'
export const appName = 'University CS Docs';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const gitConfig = {
  user: 'MVMC4',
  repo: 'university-cs-docs',
  branch: 'main',
};
###UNIQUE_SHARED_END###

echo "✅ Created README.md, .gitignore, LICENSE, and updated lib/shared.ts"

# Initialize Git repository
echo "🔄 Initializing Git repository..."

# Remove existing .git if present to start fresh
rm -rf .git

git init
git add .
git commit -m "Initial commit: University CS Docs - Interactive documentation hub"
git branch -M main

# Create public repository on GitHub using gh CLI and push
echo "🔗 Creating public repository on GitHub and pushing..."
gh repo create MVMC4/university-cs-docs --public --source=. --remote=origin --push

echo ""
echo "✅ Repository setup complete!"
echo "🔗 View your repo: https://github.com/MVMC4/university-cs-docs"
echo "🌐 Deploy on Vercel: https://vercel.com/new/clone?repository-url=https://github.com/MVMC4/university-cs-docs"
echo ""
echo "🎉 Your University CS Docs site is now live and ready to share!"

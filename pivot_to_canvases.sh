#!/bin/bash
set -e

echo "🚀 Starting CSI247 Excalidraw Pivot..."

CANVAS_DIR="public/diagrams/sem3/csi247/canvases"
DOCS_DIR="content/docs/sem3/csi247"

# 1. Rename Excalidraw files to clean kebab-case
echo "📁 Renaming Excalidraw files..."
cd "$CANVAS_DIR"
mv "1-time-complexity.excalidraw" "time-complexity.excalidraw" 2>/dev/null || true
mv "arrays&arraylists.excalidraw" "arrays-and-arraylists.excalidraw" 2>/dev/null || true
mv "collections&sorting&searching.excalidraw" "collections-sorting-searching.excalidraw" 2>/dev/null || true
mv "linkedlists&lineartravesals.excalidraw" "linked-lists-traversals.excalidraw" 2>/dev/null || true
mv "stacks&queues.excalidraw" "stacks-and-queues.excalidraw" 2>/dev/null || true
cd - > /dev/null

# 2. Archive old content (Safety First!)
echo "📦 Archiving old chapter structure to _archive_csi247..."
mkdir -p "_archive_csi247/docs"
mkdir -p "_archive_csi247/quiz-data"
mkdir -p "_archive_csi247/flashcard-data"

# Move old docs (folders starting with 01- through 08-)
for dir in "$DOCS_DIR"/0*; do
  [ -d "$dir" ] && mv "$dir" "_archive_csi247/docs/"
done

# Move old quiz/flashcard data
if [ -d "content/quiz-data/sem3/csi247" ]; then
  mv "content/quiz-data/sem3/csi247"/* "_archive_csi247/quiz-data/" 2>/dev/null || true
fi
if [ -d "content/flashcard-data/sem3/csi247" ]; then
  mv "content/flashcard-data/sem3/csi247"/* "_archive_csi247/flashcard-data/" 2>/dev/null || true
fi

# 3. Create new Canvas-First MDX wrappers
echo "📝 Generating new Canvas-First MDX pages..."

# Define the 5 topics (Slug -> Title)
declare -A TOPICS=(
  ["time-complexity"]="Time Complexity & Big-O"
  ["arrays-and-arraylists"]="Arrays & ArrayLists"
  ["collections-sorting-searching"]="Collections, Sorting & Searching"
  ["linked-lists-traversals"]="Linked Lists & Linear Traversals"
  ["stacks-and-queues"]="Stacks & Queues"
)

for slug in "${!TOPICS[@]}"; do
  title="${TOPICS[$slug]}"
  mkdir -p "$DOCS_DIR/$slug"
  
  # Create meta.json for the chapter
  cat << EOF > "$DOCS_DIR/$slug/meta.json"
{
  "title": "$title",
  "pages": ["index"]
}
EOF

  # Create index.mdx that embeds the canvas
  cat << EOF > "$DOCS_DIR/$slug/index.mdx"
---
title: $title
description: Interactive visual study map for $title.
---

# $title

<ExcalidrawCanvas 
  src="/diagrams/sem3/csi247/canvases/$slug.excalidraw" 
  title="Visual Study Map: $title" 
/>
EOF
done

# 4. Update Root meta.json to reflect the new 5-topic structure
echo "🔗 Updating root sidebar navigation..."
cat << EOF > "$DOCS_DIR/meta.json"
{
  "title": "CSI247: Data Structures",
  "pages": [
    "index",
    "time-complexity",
    "arrays-and-arraylists",
    "collections-sorting-searching",
    "linked-lists-traversals",
    "stacks-and-queues",
    "resources"
  ]
}
EOF

echo "✅ Pivot complete! Your curriculum is now 100% Excalidraw-driven."
echo "🗑️  Old files are safely stored in the '_archive_csi247' folder."

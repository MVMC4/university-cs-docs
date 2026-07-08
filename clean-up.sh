cd content/docs/sem3/csi247

# 1. Define the old folders that need to be archived
OLD_FOLDERS=("algorithm-analysis" "graphs" "hash-tables" "java-foundations" "linear-structures" "recursion" "sorting-searching" "trees")

for dir in "${OLD_FOLDERS[@]}"; do
  if [ -d "$dir" ]; then
    echo "📦 Archiving lingering old folder: $dir"
    mv "$dir" "../../../_archive_csi247/docs/"
  fi
done

# 2. Define the 5 new canvas folders
NEW_FOLDERS=("time-complexity" "arrays-and-arraylists" "collections-sorting-searching" "linked-lists-traversals" "stacks-and-queues")

for dir in "${NEW_FOLDERS[@]}"; do
  if [ -d "$dir" ]; then
    echo "🧹 Ensuring $dir ONLY contains index.mdx and meta.json"
    # Delete any stray files that aren't the canvas wrapper or metadata
    find "$dir" -type f ! -name "index.mdx" ! -name "meta.json" -exec rm -f {} +
  fi
done

echo "✅ Directory is now perfectly aligned with your 5 Excalidraw canvases!"

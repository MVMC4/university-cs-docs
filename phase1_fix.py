import os
import re

print("🚀 Starting Phase 1 Fixes...\n")

# ==========================================
# 1. POPULATE RESOURCES.MDX FILES
# ==========================================
resources_map = {
    "01-java-foundations": [
        "- [Official Java Documentation: Object-Oriented Programming Concepts](https://docs.oracle.com/javase/tutorial/java/concepts/)",
        "- [LeetCode Tag: Java Basics & OOP](https://leetcode.com/problemset/)",
        "- *Textbook:* Goodrich, Tamassia, Goldwasser - Chapter 1 & 2 (Java Primer)"
    ],
    "02-algorithm-analysis": [
        "- [Big-O Cheat Sheet (bigocheatsheet.com)](https://www.bigocheatsheet.com/)",
        "- [LeetCode Tag: Math & Complexity](https://leetcode.com/tag/math/)",
        "- *Textbook:* CLRS - Chapter 3 (Growth of Functions) & Chapter 4 (Recurrences)"
    ],
    "03-recursion": [
        "- [LeetCode Tag: Recursion](https://leetcode.com/tag/recursion/)",
        "- [LeetCode Tag: Backtracking](https://leetcode.com/tag/backtracking/)",
        "- *Textbook:* CLRS - Chapter 4 (Divide and Conquer)"
    ],
    "04-linear-structures": [
        "- [VisuAlgo: List, Stack, Queue](https://visualgo.net/en/list)",
        "- [LeetCode Tag: Linked List](https://leetcode.com/tag/linked-list/)",
        "- [LeetCode Tag: Stack & Queue](https://leetcode.com/tag/stack/)",
        "- *Textbook:* CLRS - Chapter 10 (Elementary Data Structures)"
    ],
    "05-sorting-searching": [
        "- [VisuAlgo: Sorting Algorithms](https://visualgo.net/en/sorting)",
        "- [LeetCode Tag: Sorting](https://leetcode.com/tag/sorting/)",
        "- [LeetCode Tag: Binary Search](https://leetcode.com/tag/binary-search/)",
        "- *Textbook:* CLRS - Chapter 2 (Getting Started) & Chapters 6-8 (Sorting)"
    ],
    "06-trees": [
        "- [VisuAlgo: Binary Search Tree & AVL Tree](https://visualgo.net/en/bst)",
        "- [LeetCode Tag: Tree & DFS/BFS](https://leetcode.com/tag/tree/)",
        "- [LeetCode Tag: Trie](https://leetcode.com/tag/trie/)",
        "- *Textbook:* CLRS - Chapter 12 (BST) & Chapter 13 (Red-Black Trees)"
    ],
    "07-hash-tables": [
        "- [VisuAlgo: Hash Table](https://visualgo.net/en/hashtable)",
        "- [LeetCode Tag: Hash Table](https://leetcode.com/tag/hash-table/)",
        "- *Textbook:* CLRS - Chapter 11 (Hash Tables)"
    ],
    "08-graphs": [
        "- [VisuAlgo: Graph Traversal, MST, SSSP](https://visualgo.net/en/graphds)",
        "- [LeetCode Tag: Graph](https://leetcode.com/tag/graph/)",
        "- [LeetCode Tag: Union Find](https://leetcode.com/tag/union-find/)",
        "- *Textbook:* CLRS - Chapter 22 (Elementary Graphs) & 24 (Shortest Paths)"
    ]
}

for folder, links in resources_map.items():
    filepath = f"content/docs/sem3/csi247/{folder}/resources.mdx"
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the empty bullet under "## Additional Reading"
        new_content = re.sub(
            r"(## Additional Reading\n)-\s*$", 
            r"\1" + "\n".join(links), 
            content, 
            flags=re.MULTILINE
        )
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"✅ Populated resources: {folder}")

# ==========================================
# 2. INJECT WARNING CALLOUTS FOR ADVANCED TOPICS
# ==========================================
callout_text = '\n\n<Callout type="warn" title="⚠️ Advanced / Interview Topic">\nThis section covers advanced material often found in technical interviews or graduate-level courses. It is excellent for deep understanding but may not be strictly required for the core university exam.\n</Callout>\n'

advanced_topics = {
    "content/docs/sem3/csi247/06-trees/trees.mdx": [
        r"(### 5\. Finding Lowest Common Ancestor \(LCA\))",
        r"(### 6\. Morris Traversal \(O\(1\) Space In-Order\))"
    ],
    "content/docs/sem3/csi247/08-graphs/graphs.mdx": [
        r"(### 2\. Bellman-Ford Algorithm)",
        r"(### 3\. Floyd-Warshall Algorithm)"
    ]
}

for filepath, patterns in advanced_topics.items():
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        modified = False
        for pattern in patterns:
            # Negative lookahead ensures we don't inject it twice if the script is run again
            precise_pattern = pattern + r"(?!\s*<Callout)"
            if re.search(precise_pattern, content):
                content = re.sub(precise_pattern, r"\1" + callout_text, content, count=1)
                modified = True
                
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Injected Callouts: {filepath}")

# ==========================================
# 3. CLEAN STRAY FLASHCARD DATA IN HASH TABLES
# ==========================================
ht_filepath = "content/docs/sem3/csi247/07-hash-tables/hash-tables.mdx"
if os.path.exists(ht_filepath):
    with open(ht_filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    clean_lines = []
    in_code_block = False
    
    for line in lines:
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
        
        # Skip stray flashcard lines that aren't inside code blocks
        if not in_code_block and re.match(r'^\s*(front:|back:|\{\s*front:)', line):
            continue 
        
        clean_lines.append(line)
        
    new_content = '\n'.join(clean_lines)
    
    with open(ht_filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"✅ Cleaned stray flashcard data: {ht_filepath}")

print("\n🎉 Phase 1 Complete! Run `npm run dev` to see the changes.")

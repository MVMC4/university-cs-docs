#!/usr/bin/env python3
import json
import os
import sys

def apply_files():
    # 1. Move existing files up by one to make room for the new Chapter 2
    renames = [
        ("content/docs/sem3/csi243/02-syntax-pattern-matching.mdx", "content/docs/sem3/csi243/03-syntax-pattern-matching.mdx"),
        ("content/docs/sem3/csi243/03-adts-modules.mdx", "content/docs/sem3/csi243/04-adts-modules.mdx"),
        ("content/docs/sem3/csi243/04-polymorphism-typeclasses.mdx", "content/docs/sem3/csi243/05-polymorphism-typeclasses.mdx"),
        ("content/docs/sem3/csi243/05-recursion-lists-induction.mdx", "content/docs/sem3/csi243/06-recursion-lists-induction.mdx"),
        ("content/docs/sem3/csi243/06-hofs-list-processing.mdx", "content/docs/sem3/csi243/07-hofs-list-processing.mdx"),
        ("content/docs/sem3/csi243/07-abstractions.mdx", "content/docs/sem3/csi243/08-abstractions.mdx"),
        ("content/docs/sem3/csi243/08-io-monad.mdx", "content/docs/sem3/csi243/09-io-monad.mdx"),
    ]
    
    print("🔄 Shifting existing chapters up by one...")
    for old_path, new_path in renames:
        if os.path.exists(old_path):
            os.rename(old_path, new_path)
            print(f"  ✅ Renamed: {old_path} -> {new_path}")
        else:
            print(f"  ⚠️  Skipped (not found): {old_path}")

    # 2. Apply new/updated files from payload
    payload_file = 'payload.json'
    
    if not os.path.exists(payload_file):
        print(f"❌ Error: {payload_file} not found!")
        sys.exit(1)
    
    try:
        with open(payload_file, 'r', encoding='utf-8') as f:
            files = json.load(f)
    except json.JSONDecodeError as e:
        print(f"❌ Error: Invalid JSON in {payload_file}")
        print(f"Details: {e}")
        sys.exit(1)
    
    created_count = 0
    updated_count = 0
    
    print("\n📝 Applying payload...")
    for filepath, content in files.items():
        try:
            parent_dir = os.path.dirname(filepath)
            if parent_dir:
                os.makedirs(parent_dir, exist_ok=True)
            
            file_exists = os.path.exists(filepath)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            if file_exists:
                print(f"✅ Updated: {filepath}")
                updated_count += 1
            else:
                print(f"✅ Created: {filepath}")
                created_count += 1
                
        except Exception as e:
            print(f"❌ Error writing {filepath}: {e}")
    
    print("\n" + "="*50)
    print(f"🎉 Complete! Created: {created_count}, Updated: {updated_count}")
    print("="*50)

if __name__ == "__main__":
    apply_files()

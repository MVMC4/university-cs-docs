#!/usr/bin/env python3
import os
import re
import shutil
from pathlib import Path
from collections import defaultdict

CONTENT_DIR = Path("content/docs/sem3/csi247")
IMAGES_DIR = Path("public/images")

# Matches any path starting with /images/ inside quotes or parentheses
IMG_PATH_REGEX = re.compile(r'(/images/[^"\'\s)]+)')

def find_image_globally(filename):
    """Searches the entire public/images directory for a specific filename."""
    for root, dirs, files in os.walk(IMAGES_DIR):
        if filename in files:
            return Path(root) / filename
    return None

def main():
    csi247_img_dir = IMAGES_DIR / "sem3" / "csi247"
    csi247_img_dir.mkdir(parents=True, exist_ok=True)

    image_to_modules = defaultdict(set)
    mdx_files = list(CONTENT_DIR.rglob("*.mdx"))
    
    print("🔍 Pass 1: Scanning MDX files to map image usage...")
    for mdx_path in mdx_files:
        rel_path = mdx_path.relative_to(CONTENT_DIR)
        # Determine module folder (e.g., '01-java-foundations') or '00-shared' for root files
        module_folder = rel_path.parts[0] if len(rel_path.parts) > 1 else "00-shared"
        
        with open(mdx_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        for old_path in IMG_PATH_REGEX.findall(content):
            filename = os.path.basename(old_path)
            image_to_modules[filename].add(module_folder)

    # Determine final destination for each image
    image_destinations = {}
    for filename, modules in image_to_modules.items():
        if len(modules) > 1:
            image_destinations[filename] = "00-shared"
        else:
            image_destinations[filename] = list(modules)[0]

    print("📦 Pass 2: Moving physical image files to correct directories...")
    moved_count = 0
    for filename, dest_module in image_destinations.items():
        physical_path = find_image_globally(filename)
        if physical_path:
            target_dir = csi247_img_dir / dest_module
            target_dir.mkdir(parents=True, exist_ok=True)
            new_physical_path = target_dir / filename
            
            if physical_path != new_physical_path:
                shutil.move(str(physical_path), str(new_physical_path))
                moved_count += 1

    print("✍️  Pass 3: Updating MDX image references...")
    updated_count = 0
    for mdx_path in mdx_files:
        with open(mdx_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = content
        for old_path in IMG_PATH_REGEX.findall(content):
            filename = os.path.basename(old_path)
            if filename in image_destinations:
                dest_module = image_destinations[filename]
                new_path = f"/images/sem3/csi247/{dest_module}/{filename}"
                if old_path != new_path:
                    new_content = new_content.replace(old_path, new_path)
                    updated_count += 1
                
        if new_content != content:
            with open(mdx_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

    print(f"\n✅ Successfully moved {moved_count} images.")
    print(f"✅ Successfully updated {updated_count} image references in MDX files.")
    
    print("🧹 Cleaning up empty old directories...")
    for root, dirs, files in os.walk(csi247_img_dir, topdown=False):
        for d in dirs:
            dir_path = Path(root) / d
            try:
                contents = list(dir_path.iterdir())
                # Remove directory if empty or only contains a README.md
                if not contents or (len(contents) == 1 and contents[0].name == 'README.md'):
                    if len(contents) == 1:
                        os.remove(contents[0])
                    dir_path.rmdir()
            except OSError:
                pass
                
    print("🎉 Done! Your image structure now perfectly matches your docs structure.")

if __name__ == "__main__":
    main()

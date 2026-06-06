#!/usr/bin/env python3
import json
import os
import sys

def apply_files():
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

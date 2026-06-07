import os
import json

def create_batch_payload():
    docs_dir = "content/docs/sem3/csi243"
    quiz_dir = "content/quiz-data/sem3/csi243"
    
    payload = {}
    file_count = 0
    
    # 1. Get all .mdx files
    if os.path.exists(docs_dir):
        for filename in sorted(os.listdir(docs_dir)):
            if filename.endswith(".mdx"):
                filepath = os.path.join(docs_dir, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    # Use the exact relative path expected by your apply-files.py script
                    payload[f"content/docs/sem3/csi243/{filename}"] = f.read()
                    file_count += 1
                    
    # 2. Get all .ts files
    if os.path.exists(quiz_dir):
        for filename in sorted(os.listdir(quiz_dir)):
            if filename.endswith(".ts"):
                filepath = os.path.join(quiz_dir, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    payload[f"content/quiz-data/sem3/csi243/{filename}"] = f.read()
                    file_count += 1
                    
    # 3. Write to payload.json (json.dump handles all newline/quote escaping automatically)
    with open("payload.json", "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)
        
    print(f"🎉 Success! Created payload.json with {file_count} files.")
    print("You can now inspect payload.json or pass it to your processing pipeline.")

if __name__ == "__main__":
    create_batch_payload()

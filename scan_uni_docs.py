#!/usr/bin/env python3
r"""
scan_uni_docs.py

Read-only repository scraper for university-cs-docs.

Usage:
    python scan_uni_docs.py

Optional:
    python scan_uni_docs.py --root "C:/Users/Nido/Desktop/Projects/Active/university-cs-docs"
    python scan_uni_docs.py --full-docs
    python scan_uni_docs.py --include-archive

Output:
    repo_scan.txt
"""

import argparse
import json
import os
from datetime import datetime, timezone
from pathlib import Path


EXCLUDE_DIRS = {
    ".git",
    ".next",
    ".source",
    "node_modules",
    "_archive_csi247",
    "__pycache__",
    ".cache",
    "dist",
    "build",
    "coverage",
    ".vercel",
    ".idea",
    ".vscode",
    ".turbo",
}

SKIP_FILE_NAMES = {
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
    ".payload.json.swp",
    "llms-full.txt",
    ".DS_Store",
    "Thumbs.db",
}

SKIP_FILE_SUFFIXES = {
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".ico",
    ".pdf",
    ".zip",
    ".gz",
    ".tar",
    ".7z",
    ".rar",
    ".mp3",
    ".mp4",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
    ".otf",
    ".exe",
    ".dll",
    ".so",
    ".dylib",
    ".map",
    ".svg",
    ".avif",
}

TEXT_EXTS = {
    ".json",
    ".jsonc",
    ".md",
    ".mdx",
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".py",
    ".sh",
    ".css",
    ".scss",
    ".txt",
    ".yml",
    ".yaml",
    ".toml",
    ".env",
    ".gitignore",
}

TEXT_FILENAMES = {
    "license",
    ".gitignore",
    ".env.example",
    ".editorconfig",
}

PAGE_CONTAINER_KEYS = {
    "pages",
    "items",
    "children",
    "routes",
    "tabs",
    "entries",
    "links",
}

PAGE_VALUE_KEYS = {
    "page",
    "href",
    "slug",
    "path",
    "id",
    "file",
    "url",
}


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def skip_file(name):
    if name in SKIP_FILE_NAMES:
        return True

    suffix = Path(name).suffix.lower()
    if suffix in SKIP_FILE_SUFFIXES:
        return True

    return False


def is_text_rel(rel):
    p = Path(rel)

    if p.suffix.lower() in TEXT_EXTS:
        return True

    if p.name.lower() in TEXT_FILENAMES:
        return True

    return False


def scan_files(root, exclude_dirs, skip_names):
    results = []

    for dirpath, dirnames, filenames in os.walk(root):
        keep = []

        for d in sorted(dirnames):
            if d in exclude_dirs or d.startswith("."):
                continue
            keep.append(d)

        dirnames[:] = keep

        for filename in sorted(filenames):
            if filename in skip_names:
                continue

            if skip_file(filename):
                continue

            full_path = Path(dirpath) / filename

            try:
                rel = full_path.relative_to(root).as_posix()
            except ValueError:
                continue

            try:
                size = full_path.stat().st_size
            except OSError:
                size = 0

            results.append((rel, size))

    return results


def read_text(path, max_chars):
    try:
        with open(path, "r", encoding="utf-8", errors="replace", newline="") as fh:
            text = fh.read(max_chars + 1)

        truncated = len(text) > max_chars
        return text[:max_chars], truncated

    except Exception as exc:
        return "[READ ERROR] {}".format(exc), False


def extract_frontmatter(text):
    """
    If the file starts with MDX/Markdown frontmatter, return only that.
    Otherwise return the first 20 lines.
    """

    if text.startswith("---"):
        lines = text.splitlines()

        if len(lines) > 1:
            for i in range(1, len(lines)):
                if lines[i].strip() == "---":
                    return "\n".join(lines[: i + 1])

    return "\n".join(text.splitlines()[:20])


def write_tree(out, files):
    out.write("\n\n")
    out.write("=" * 80 + "\n")
    out.write("FILE TREE\n")
    out.write("generated: {}\n".format(now_iso()))
    out.write("file_count: {}\n".format(len(files)))
    out.write("=" * 80 + "\n\n")

    for rel, size in files:
        out.write("{:>10}  {}\n".format(size, rel))


def write_section(out, title, files, root, max_chars, md_mode="full"):
    """
    md_mode:
        "full"         -> dump whole text file
        "frontmatter"  -> for .md/.mdx, dump only frontmatter/fallback excerpt
    """

    out.write("\n\n")
    out.write("=" * 80 + "\n")
    out.write(title + "\n")
    out.write("generated: {}\n".format(now_iso()))
    out.write("file_count: {}\n".format(len(files)))
    out.write("md_mode: {}\n".format(md_mode))
    out.write("=" * 80 + "\n")

    for rel, size in files:
        out.write("\n===== FILE: {} ({} bytes) =====\n".format(rel, size))

        if not is_text_rel(rel):
            out.write("[non-text file skipped]\n")
            continue

        full_path = root / rel
        text, truncated = read_text(full_path, max_chars)

        if md_mode == "frontmatter" and rel.lower().endswith((".md", ".mdx")):
            text = extract_frontmatter(text)

        out.write(text)

        if text and not text.endswith("\n"):
            out.write("\n")

        if truncated:
            out.write("[TRUNCATED BY SCAN]\n")


def base_slug(value):
    """
    Normalize page-like strings to a comparable slug.

    Examples:
        "stacks-and-queues" -> "stacks-and-queues"
        "./stacks-and-queues" -> "stacks-and-queues"
        "stacks-and-queues.mdx" -> "stacks-and-queues"
        "topics/stacks-and-queues/index" -> "stacks-and-queues"
    """

    s = value.strip().strip("/")
    s = s.split("#")[0]
    s = s.split("?")[0]

    if not s:
        return ""

    parts = [p for p in s.split("/") if p not in ("", ".", "..")]

    if not parts:
        return ""

    last = parts[-1]

    if last.lower() in {"index", "index.md", "index.mdx"}:
        if len(parts) > 1:
            last = parts[-2]
        else:
            return ""

    return Path(last).stem


def collect_page_strings(obj, acc):
    """
    Recursively collect likely page/path strings from meta.json-like structures.
    """

    if isinstance(obj, str):
        acc.append(obj)
        return

    if isinstance(obj, list):
        for item in obj:
            collect_page_strings(item, acc)
        return

    if isinstance(obj, dict):
        for key, value in obj.items():
            k = str(key).lower()

            if k in PAGE_CONTAINER_KEYS:
                collect_page_strings(value, acc)
            elif k in PAGE_VALUE_KEYS and isinstance(value, str):
                acc.append(value)

        return


def unique_page_strings(raw):
    seen = set()
    result = []

    for value in raw:
        if not isinstance(value, str):
            continue

        slug = base_slug(value)

        if not slug:
            continue

        if slug in seen:
            continue

        seen.add(slug)
        result.append(value)

    return result


def pages_after_marker(pages, marker):
    """
    Return pages appearing after the first page whose slug contains marker.
    If marker is not found, return None.
    """

    found = False
    after = []

    for page in pages:
        slug = base_slug(page)

        if found:
            after.append(page)

        if marker in slug:
            found = True

    return after if found else None


def audit_content(root):
    lines = []

    docs_base = root / "content" / "docs"
    flash_base = root / "content" / "flashcard-data"
    quiz_base = root / "content" / "quiz-data"

    if not docs_base.exists():
        lines.append("content/docs: MISSING")
        return lines

    lines.append(
        "Checks each content/docs/<sem>/<course> against matching flashcard-data and quiz-data."
    )
    lines.append("")

    for sem_dir in sorted(docs_base.iterdir(), key=lambda p: p.name):
        if not sem_dir.is_dir() or sem_dir.name.startswith("."):
            continue

        for course_dir in sorted(sem_dir.iterdir(), key=lambda p: p.name):
            if not course_dir.is_dir() or course_dir.name.startswith("."):
                continue

            sem = sem_dir.name
            course = course_dir.name

            docs_topics = sorted(
                d.name
                for d in course_dir.iterdir()
                if d.is_dir() and not d.name.startswith(".")
            )

            lines.append("## {}/{}".format(sem, course))

            meta_file = course_dir / "meta.json"

            if meta_file.exists():
                lines.append(
                    "meta.json: {}".format(meta_file.relative_to(root).as_posix())
                )

                try:
                    data = json.loads(meta_file.read_text(encoding="utf-8"))

                    raw_pages = []
                    collect_page_strings(data, raw_pages)
                    pages = unique_page_strings(raw_pages)

                    if pages:
                        lines.append("meta.json page-like strings:")

                        for page in pages:
                            lines.append("  - {}".format(page))

                        after_stacks = pages_after_marker(pages, "stacks-and-queues")

                        if after_stacks is not None:
                            lines.append(
                                "Candidate pages after 'stacks-and-queues' for CSI323 Algorithms:"
                            )

                            if after_stacks:
                                for page in after_stacks:
                                    lines.append("  - {}".format(page))
                            else:
                                lines.append("  - none found after marker")

                    else:
                        lines.append("meta.json parsed but no page-like strings found.")

                except Exception as exc:
                    lines.append("meta.json parse error: {}".format(exc))

            else:
                lines.append("meta.json: MISSING")

            lines.append("docs topic directories ({}):".format(len(docs_topics)))

            for topic in docs_topics:
                lines.append("  - {}".format(topic))

            for label, base in (
                ("flashcard-data", flash_base),
                ("quiz-data", quiz_base),
            ):
                target_course_dir = base / sem / course

                if not target_course_dir.exists():
                    lines.append(
                        "{}: MISSING course directory ({})".format(
                            label,
                            target_course_dir.relative_to(root).as_posix(),
                        )
                    )
                    continue

                existing_topics = sorted(
                    d.name
                    for d in target_course_dir.iterdir()
                    if d.is_dir() and not d.name.startswith(".")
                )

                missing = [t for t in docs_topics if t not in existing_topics]
                extra = [t for t in existing_topics if t not in docs_topics]

                empty = []

                for topic in existing_topics:
                    topic_dir = target_course_dir / topic

                    try:
                        if not any(topic_dir.iterdir()):
                            empty.append(topic)
                    except Exception:
                        pass

                lines.append(
                    "{} topic directories ({}):".format(label, len(existing_topics))
                )

                for topic in existing_topics:
                    lines.append("  - {}".format(topic))

                if missing:
                    lines.append(
                        "{} MISSING vs docs: {}".format(label, ", ".join(missing))
                    )

                if empty:
                    lines.append(
                        "{} EMPTY directories: {}".format(label, ", ".join(empty))
                    )

                if extra:
                    lines.append(
                        "{} EXTRA vs docs: {}".format(label, ", ".join(extra))
                    )

                if not missing and not extra and not empty:
                    lines.append(
                        "{}: directories match docs and are non-empty".format(label)
                    )

            lines.append("")

    return lines


def write_summary(out, args, root, out_path, files, exclude_dirs):
    top_counts = {}

    for rel, _ in files:
        top = rel.split("/")[0] if "/" in rel else "(root)"
        top_counts[top] = top_counts.get(top, 0) + 1

    out.write("REPO SCAN SUMMARY\n")
    out.write("=================\n\n")

    out.write("Generated: {}\n".format(now_iso()))
    out.write("Root: {}\n".format(root))
    out.write("Output file: {}\n".format(out_path))
    out.write("Total listed files: {}\n".format(len(files)))
    out.write("Full docs mode: {}\n".format(args.full_docs))
    out.write("Include archive: {}\n".format(args.include_archive))
    out.write("Max file chars: {}\n".format(args.max_file_chars))
    out.write("Excluded directories: {}\n\n".format(", ".join(sorted(exclude_dirs))))

    out.write("TOP-LEVEL FILE COUNTS\n")
    out.write("---------------------\n")

    for key in sorted(top_counts):
        out.write("  {}: {}\n".format(key, top_counts[key]))

    out.write("\nMIGRATION TARGET CHECK\n")
    out.write("----------------------\n")

    for content_kind in ("docs", "flashcard-data", "quiz-data"):
        target = root / "content" / content_kind / "sem5" / "csi323"
        exists = target.exists()
        out.write(
            "content/{}/sem5/csi323 exists: {}\n".format(content_kind, exists)
        )

    out.write("\nWHAT TO SEND BACK\n")
    out.write("-----------------\n")
    out.write("Send/upload this single file:\n")
    out.write("  repo_scan.txt\n")
    out.write("\n")
    out.write("Then the migration/flashcard fix script can be generated safely.\n")


def write_audit_section(out, audit_lines):
    out.write("\n\n")
    out.write("=" * 80 + "\n")
    out.write("FLASHCARD / QUIZ AUDIT\n")
    out.write("generated: {}\n".format(now_iso()))
    out.write("=" * 80 + "\n\n")
    out.write("\n".join(audit_lines))


def main():
    parser = argparse.ArgumentParser(
        description="Read-only scraper for university-cs-docs migration planning."
    )

    parser.add_argument(
        "--root",
        default=".",
        help="Project root to scan. Defaults to current directory.",
    )

    parser.add_argument(
        "--out",
        default="repo_scan.txt",
        help="Output file. Defaults to repo_scan.txt.",
    )

    parser.add_argument(
        "--max-file-chars",
        type=int,
        default=200000,
        help="Maximum characters to read/dump per text file.",
    )

    parser.add_argument(
        "--full-docs",
        action="store_true",
        help="Dump full docs .md/.mdx content instead of only frontmatter/excerpt.",
    )

    parser.add_argument(
        "--include-archive",
        action="store_true",
        help="Include _archive_csi247 in the scan. Excluded by default.",
    )

    args = parser.parse_args()

    root = Path(args.root).resolve()

    if not root.exists() or not root.is_dir():
        raise SystemExit("Invalid root directory: {}".format(root))

    out_path = Path(args.out)

    if not out_path.is_absolute():
        out_path = root / out_path

    if out_path.is_dir():
        out_path = out_path / "repo_scan.txt"

    if out_path.suffix == "":
        out_path = out_path.with_suffix(".txt")

    out_path.parent.mkdir(parents=True, exist_ok=True)

    exclude_dirs = set(EXCLUDE_DIRS)

    if args.include_archive:
        exclude_dirs.discard("_archive_csi247")

    # Avoid including the output file itself if rerunning.
    skip_names = {out_path.name}

    files = scan_files(root, exclude_dirs, skip_names)

    meta_files = [
        (rel, size)
        for rel, size in files
        if Path(rel).name.lower() == "meta.json"
    ]

    flash_files = [
        (rel, size)
        for rel, size in files
        if rel.startswith("content/flashcard-data/")
    ]

    quiz_files = [
        (rel, size)
        for rel, size in files
        if rel.startswith("content/quiz-data/")
    ]

    docs_files = [
        (rel, size)
        for rel, size in files
        if rel.startswith("content/docs/")
    ]

    source_files = [
        (rel, size)
        for rel, size in files
        if rel.startswith(("app/", "components/", "lib/"))
    ]

    root_files = [
        (rel, size)
        for rel, size in files
        if "/" not in rel and is_text_rel(rel)
    ]

    audit_lines = audit_content(root)

    with open(out_path, "w", encoding="utf-8", newline="") as out:
        write_summary(
            out,
            args,
            root,
            out_path,
            files,
            exclude_dirs,
        )

        write_audit_section(out, audit_lines)

        write_tree(out, files)

        write_section(
            out,
            "ALL meta.json FILES",
            meta_files,
            root,
            args.max_file_chars,
            md_mode="full",
        )

        write_section(
            out,
            "FLASHCARD DATA",
            flash_files,
            root,
            args.max_file_chars,
            md_mode="full",
        )

        write_section(
            out,
            "QUIZ DATA",
            quiz_files,
            root,
            args.max_file_chars,
            md_mode="full",
        )

        write_section(
            out,
            "DOCS STRUCTURE",
            docs_files,
            root,
            args.max_file_chars,
            md_mode="full" if args.full_docs else "frontmatter",
        )

        write_section(
            out,
            "APP / COMPONENTS / LIB SOURCE",
            source_files,
            root,
            args.max_file_chars,
            md_mode="full",
        )

        write_section(
            out,
            "ROOT CONFIGS AND SCRIPTS",
            root_files,
            root,
            args.max_file_chars,
            md_mode="full",
        )

    print("Scan complete.")
    print("Output file: {}".format(out_path))


if __name__ == "__main__":
    main()
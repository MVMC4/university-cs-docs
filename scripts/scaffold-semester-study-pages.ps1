$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$contentRoots = @(
  (Join-Path $projectRoot 'content/docs/sem1'),
  (Join-Path $projectRoot 'content/docs/sem2')
)
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Get-Attribute([string]$source, [string]$name) {
  $match = [regex]::Match($source, ('{0}="([^"]+)"' -f [regex]::Escape($name)))
  if (-not $match.Success) {
    throw "Missing $name attribute in TopicNotesFlow"
  }
  return $match.Groups[1].Value
}

function Write-Utf8([string]$path, [string]$content) {
  [System.IO.File]::WriteAllText($path, ($content.TrimEnd() + "`n"), $utf8NoBom)
}

$notesFiles = Get-ChildItem $contentRoots -Recurse -Filter 'notes.mdx'

foreach ($notesFile in $notesFiles) {
  $notes = [System.IO.File]::ReadAllText($notesFile.FullName)
  $course = Get-Attribute $notes 'course'
  $topic = Get-Attribute $notes 'topic'
  $summary = Get-Attribute $notes 'summary'
  $chapterDirectory = $notesFile.DirectoryName

  $notes = [regex]::Replace($notes, '(?m)^title:\s*"Notes:[^"]*"\s*$', 'title: "Notes"', 1)
  Write-Utf8 $notesFile.FullName $notes

  $pageSpecs = @(
    @{
      File = 'review.mdx'
      Title = 'Review'
      Description = "Closed-book recap, flashcards, and a chapter quiz for $topic."
      Heading = "$topic Review"
      Component = 'ChapterReview'
    },
    @{
      File = 'questions.mdx'
      Title = 'Questions'
      Description = "Guided practice questions with worked answer guidance for $topic."
      Heading = "$topic Questions"
      Component = 'ChapterQuestions'
    },
    @{
      File = 'exam.mdx'
      Title = 'Exam'
      Description = "A timed, marked mock examination and marking guidance for $topic."
      Heading = "$topic Exam"
      Component = 'ChapterExam'
    }
  )

  foreach ($page in $pageSpecs) {
    $body = @"
---
title: "$($page.Title)"
description: "$($page.Description)"
---

## $($page.Heading)

<$($page.Component) course="$course" topic="$topic" summary="$summary" />
"@
    Write-Utf8 (Join-Path $chapterDirectory $page.File) $body
  }

  $metaPath = Join-Path $chapterDirectory 'meta.json'
  if (-not (Test-Path -LiteralPath $metaPath)) {
    throw "Missing chapter metadata: $metaPath"
  }

  $meta = [System.IO.File]::ReadAllText($metaPath) | ConvertFrom-Json
  $orderedMeta = [ordered]@{
    title = $meta.title
    pages = @('notes', 'review', 'questions', 'exam')
  }
  Write-Utf8 $metaPath ($orderedMeta | ConvertTo-Json -Depth 4)
}

Write-Output "Scaffolded Review, Questions, and Exam pages for $($notesFiles.Count) chapters."

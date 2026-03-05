#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const PROJECTS_DIR = path.join(__dirname, "..", "public", "projects");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".webp", ".avif", ".png", ".gif"]);
const VIDEO_EXT = new Set([".mp4"]);

const IMAGE_WARN_KB = 500;
const IMAGE_FAIL_KB = 900;
const VIDEO_WARN_MB = 12;
const VIDEO_FAIL_MB = 20;

function walkDir(dir, base = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.relative(base, full);
    if (e.isDirectory()) {
      files.push(...walkDir(full, base));
    } else if (e.isFile()) {
      files.push({ full, rel });
    }
  }
  return files;
}

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  return (bytes / 1024).toFixed(2) + " KB";
}

let hasFailure = false;
const warnings = [];
const failures = [];

if (!fs.existsSync(PROJECTS_DIR)) {
  console.log("No public/projects directory found. Skipping.");
  process.exit(0);
}

const files = walkDir(PROJECTS_DIR);

for (const { full, rel } of files) {
  const ext = path.extname(full).toLowerCase();
  const stat = fs.statSync(full);
  const bytes = stat.size;

  if (IMAGE_EXT.has(ext)) {
    const kb = bytes / 1024;
    if (kb > IMAGE_FAIL_KB) {
      failures.push({ rel, size: bytes, rule: `image > ${IMAGE_FAIL_KB} KB` });
    } else if (kb > IMAGE_WARN_KB) {
      warnings.push({ rel, size: bytes, rule: `image > ${IMAGE_WARN_KB} KB (soft)` });
    }
  } else if (VIDEO_EXT.has(ext)) {
    const mb = bytes / (1024 * 1024);
    if (mb > VIDEO_FAIL_MB) {
      failures.push({ rel, size: bytes, rule: `video > ${VIDEO_FAIL_MB} MB` });
    } else if (mb > VIDEO_WARN_MB) {
      warnings.push({ rel, size: bytes, rule: `video > ${VIDEO_WARN_MB} MB (soft)` });
    }
  }
}

console.log("Project assets size check (public/projects)\n");

if (warnings.length) {
  console.log("Warnings:");
  for (const w of warnings) {
    console.log(`  ${w.rel}  ${formatBytes(w.size)}  (${w.rule})`);
  }
  console.log("");
}

if (failures.length) {
  console.log("Failures (exceed hard limit):");
  for (const f of failures) {
    console.log(`  ${f.rel}  ${formatBytes(f.size)}  (${f.rule})`);
  }
  hasFailure = true;
}

if (!warnings.length && !failures.length) {
  console.log("All checked assets within limits.");
}

if (hasFailure) {
  process.exit(1);
}

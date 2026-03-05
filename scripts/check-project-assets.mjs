#!/usr/bin/env node
/**
 * Lightweight check: warns on large files in /public/projects. Does not fail the build.
 * Run: npm run check:assets
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECTS_DIR = path.join(__dirname, "..", "public", "projects");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".webp", ".avif", ".png", ".gif"]);
const VIDEO_EXT = new Set([".mp4"]);

const IMAGE_WARN_KB = 900;
const VIDEO_WARN_MB = 20;

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

if (!fs.existsSync(PROJECTS_DIR)) {
  console.log("No public/projects directory. Skipping asset check.");
  process.exit(0);
}

const files = walkDir(PROJECTS_DIR);
const warnings = [];

for (const { full, rel } of files) {
  const ext = path.extname(full).toLowerCase();
  const stat = fs.statSync(full);
  const bytes = stat.size;

  if (IMAGE_EXT.has(ext)) {
    if (bytes / 1024 > IMAGE_WARN_KB) {
      warnings.push({ rel, size: bytes, msg: `image > ${IMAGE_WARN_KB} KB` });
    }
  } else if (VIDEO_EXT.has(ext)) {
    if (bytes / (1024 * 1024) > VIDEO_WARN_MB) {
      warnings.push({ rel, size: bytes, msg: `video > ${VIDEO_WARN_MB} MB` });
    }
  }
}

if (warnings.length > 0) {
  console.log("Project assets – size warnings (consider compressing):\n");
  for (const w of warnings) {
    console.log(`  ${w.rel}  ${formatBytes(w.size)}  (${w.msg})`);
  }
} else {
  console.log("Project assets: no size warnings.");
}

process.exit(0);

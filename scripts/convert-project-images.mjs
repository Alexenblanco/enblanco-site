#!/usr/bin/env node
/**
 * Generate .webp next to jpg/png under /public/projects. Does not delete originals.
 * Requires: npm install sharp (devDependency).
 * Run: npm run convert:assets
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECTS_DIR = path.join(__dirname, "..", "public", "projects");

const SOURCE_EXT = new Set([".jpg", ".jpeg", ".png"]);
const WEBP_QUALITY = 78;

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

async function run() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error("This script requires sharp. Install with: npm install -D sharp");
    process.exit(1);
  }

  if (!fs.existsSync(PROJECTS_DIR)) {
    console.log("No public/projects directory. Nothing to convert.");
    process.exit(0);
  }

  const files = walkDir(PROJECTS_DIR);
  const converted = [];
  const skipped = [];

  for (const { full, rel } of files) {
    const ext = path.extname(full).toLowerCase();
    if (!SOURCE_EXT.has(ext)) continue;

    const dir = path.dirname(full);
    const basename = path.basename(full, ext);
    const webpPath = path.join(dir, `${basename}.webp`);

    if (fs.existsSync(webpPath)) {
      skipped.push({ rel: path.relative(PROJECTS_DIR, webpPath), reason: "webp exists" });
      continue;
    }

    try {
      await sharp(full)
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpPath);
      const stat = fs.statSync(webpPath);
      converted.push({ rel: path.relative(PROJECTS_DIR, webpPath), bytes: stat.size });
    } catch (err) {
      console.error(`Failed ${rel}:`, err.message);
    }
  }

  console.log("Project images – webp conversion report\n");
  if (converted.length > 0) {
    console.log("Created:");
    for (const { rel, bytes } of converted) {
      console.log(`  ${rel}  ${(bytes / 1024).toFixed(1)} KB`);
    }
  }
  if (skipped.length > 0) {
    console.log("\nSkipped (webp already exists):", skipped.length);
  }
  if (converted.length === 0 && skipped.length === 0) {
    console.log("No jpg/png files found under public/projects.");
  }

  process.exit(0);
}

run();

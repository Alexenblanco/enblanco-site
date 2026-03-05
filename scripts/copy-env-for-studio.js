const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const src = path.join(root, ".env.local");
const destDir = path.join(root, "studio");
const dest = path.join(destDir, ".env.local");

if (!fs.existsSync(src)) {
  console.warn("No .env.local en la raíz. Crea studio/.env.local con SANITY_STUDIO_PROJECT_ID y SANITY_STUDIO_DATASET.");
  process.exit(0);
}

function parseValue(line) {
  const m = line.match(/^[^=]+=(.*)$/);
  if (!m) return "";
  const v = m[1].trim();
  return v.replace(/^["']|["']$/g, "");
}

const content = fs.readFileSync(src, "utf8");
const lines = content.split(/\r?\n/);
let projectId = "";
let dataset = "production";
for (const line of lines) {
  if (line.startsWith("NEXT_PUBLIC_SANITY_PROJECT_ID=")) projectId = parseValue(line);
  if (line.startsWith("NEXT_PUBLIC_SANITY_DATASET=")) dataset = parseValue(line);
  if (line.startsWith("SANITY_STUDIO_PROJECT_ID=")) projectId = projectId || parseValue(line);
  if (line.startsWith("SANITY_STUDIO_DATASET=")) dataset = parseValue(line);
}

// Sanity Studio solo expone al navegador variables con prefijo SANITY_STUDIO_
const studioEnv = [
  "# Generado por scripts/copy-env-for-studio.js (SANITY_STUDIO_* es necesario para el navegador)",
  `SANITY_STUDIO_PROJECT_ID=${projectId || ""}`,
  `SANITY_STUDIO_DATASET=${dataset}`,
  "",
  content,
].join("\n");

try {
  fs.writeFileSync(dest, studioEnv, "utf8");
  console.log("Copiado .env.local a studio/ (con SANITY_STUDIO_PROJECT_ID para el navegador)");
} catch (e) {
  console.error("Error escribiendo studio/.env.local:", e.message);
  process.exit(1);
}

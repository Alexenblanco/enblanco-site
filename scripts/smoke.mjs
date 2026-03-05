#!/usr/bin/env node
/**
 * Minimal smoke: run typecheck and exit. Fails fast on type/import errors.
 * Full CI should also run: npm run lint && npm test && npm run build
 */
import { execSync } from "child_process";

try {
  execSync("npm run typecheck", { stdio: "inherit" });
  console.log("Smoke OK (typecheck passed)");
} catch (e) {
  process.exit(e.status ?? 1);
}

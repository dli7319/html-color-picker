/**
 * Copies the committed static assets in public/ into dist/.
 * Run before bundling (build and dev) so the dev server and the deployed
 * site both see the same files. Idempotent; overwrites existing files.
 */
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const publicDir = join(repoRoot, "public");
const distDir = join(repoRoot, "dist");

if (!existsSync(publicDir)) {
  console.error(`copy-static: missing ${publicDir}`);
  process.exit(1);
}

mkdirSync(distDir, { recursive: true });
cpSync(publicDir, distDir, { recursive: true });
console.log("copy-static: public/ -> dist/ done");

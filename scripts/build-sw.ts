/**
 * Final build step for the service worker: generate the precache manifest
 * from the actual dist/ bytes, derive the content-hash cache version, and
 * substitute both placeholders into dist/sw.js.
 *
 * Fails loudly when a placeholder is missing (before substitution) or
 * survives (after), so a minifier that renames or drops a token can never
 * ship a worker that only breaks when the network is down.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(repoRoot, "dist");
const swPath = join(distDir, "sw.js");

/** Precache only what the app needs; never the worker itself or dev artifacts. */
const EXCLUDED = new Set(["sw.js", "main.js.map", "tsconfig.tsbuildinfo"]);

function listPrecacheFiles(dir: string, base = dir): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir).sort()) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...listPrecacheFiles(full, base));
      continue;
    }
    const rel = relative(base, full).split("\\").join("/");
    if (EXCLUDED.has(rel)) continue;
    out.push(`./${rel}`);
  }
  return out.sort();
}

function fail(message: string): never {
  console.error(`build-sw: ${message}`);
  process.exit(1);
}

const precache = listPrecacheFiles(distDir);
if (!precache.includes("./index.html") || !precache.includes("./main.js")) {
  fail(`precache list missing app shell entries: ${precache.join(", ")}`);
}

const hash = createHash("sha256");
for (const file of precache) {
  hash.update(file);
  hash.update(readFileSync(join(distDir, file.slice(2))));
}
const version = hash.digest("hex").slice(0, 12);

let sw = readFileSync(swPath, "utf8");

// Both tokens must be present in the BUILT output before substitution.
// The minifier rewrites string literals to any of the three quote styles
// (rolldown emits backtick template literals), so match quote-agnostically
// with a backreference that also enforces the closing quote.
const versionToken = /(["'`])_SW_VERSION_\1/;
const precacheToken = /(["'`])_PRECACHE_LIST_\1/;
if (!versionToken.test(sw)) {
  fail("placeholder _SW_VERSION_ missing from built sw.js — refusing to build");
}
if (!precacheToken.test(sw)) {
  fail(
    "placeholder _PRECACHE_LIST_ missing from built sw.js — refusing to build",
  );
}

// Quote-agnostic, replacer-function substitution ($& / $' stay literal).
sw = sw.replace(versionToken, () => JSON.stringify(version));
sw = sw.replace(precacheToken, () => JSON.stringify(precache));

if (/(["'`])_(SW_VERSION|PRECACHE_LIST)_\1/.test(sw)) {
  fail("placeholder survived substitution");
}
if (!sw.includes(JSON.stringify(version))) {
  fail("version substitution did not land");
}

writeFileSync(swPath, sw);
console.log(
  `build-sw: version=${version} precache=${precache.length} files -> ${swPath}`,
);
console.log(`build-sw:   ${precache.join(", ")}`);

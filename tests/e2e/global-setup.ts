import { spawn } from "node:child_process";
import type { FullConfig } from "@playwright/test";

const STARTUP_TIMEOUT_MS = 10_000;

/**
 * Spawns scripts/serve-dist.mjs (which binds an ephemeral port) and exposes
 * the resolved URL to workers via process.env.E2E_BASE_URL, which
 * playwright.config.ts reads as `use.baseURL`.
 *
 * Returns a teardown function that stops the server.
 */
export default async function globalSetup(
  _config: FullConfig,
): Promise<() => void> {
  const server = spawn(process.execPath, ["scripts/serve-dist.mjs", "dist"], {
    stdio: ["ignore", "pipe", "inherit"],
  });

  const baseURL = await new Promise<string>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("serve-dist.mjs did not start in time")),
      STARTUP_TIMEOUT_MS,
    );
    server.on("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`serve-dist.mjs exited early with code ${code}`));
    });
    server.stdout?.on("data", (chunk: Buffer) => {
      const match = /LISTENING (http:\/\/127\.0\.0\.1:\d+)/.exec(
        chunk.toString(),
      );
      if (match) {
        clearTimeout(timer);
        resolve(match[1]);
      }
    });
  });

  process.env.E2E_BASE_URL = baseURL;
  return () => {
    server.kill();
  };
}

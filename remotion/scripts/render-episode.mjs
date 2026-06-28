#!/usr/bin/env node
/**
 * Render an episode video. Syncs script + voiceover first.
 * Usage: node scripts/render-episode.mjs 001_what-is-an-llm
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const remotionRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(remotionRoot, "..");

const folder = process.argv[2];

if (!folder) {
  console.error("Usage: npm run render -- 001_what-is-an-llm");
  process.exit(1);
}

const voiceoverPath = path.join(
  repoRoot,
  "series",
  "learn-ai-in-2-mins",
  "episodes",
  folder,
  "voiceover.mp3",
);

if (!fs.existsSync(voiceoverPath)) {
  console.error("Missing voiceover.mp3. Add your recording here first:");
  console.error(`  ${voiceoverPath}`);
  process.exit(1);
}

execSync(`node scripts/sync-episodes.mjs ${folder}`, {
  cwd: remotionRoot,
  stdio: "inherit",
});

const outFile = `out/${folder}.mp4`;
const props = JSON.stringify({ episodeFolder: folder });

execSync(
  `npx remotion render Episode001 ${outFile} --props='${props}'`,
  { cwd: remotionRoot, stdio: "inherit" },
);

console.log(`\nDone: remotion/${outFile}`);

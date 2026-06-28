#!/usr/bin/env node
/**
 * Syncs episode YAML → Remotion JSON and copies voiceover.mp3 from episode folder.
 * Usage: node scripts/sync-episodes.mjs [episodeFolder]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { load as loadYaml } from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const remotionRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(remotionRoot, "..");
const episodesRoot = path.join(repoRoot, "series", "learn-ai-in-2-mins", "episodes");
const outDir = path.join(remotionRoot, "src", "generated");
const publicEpisodesDir = path.join(remotionRoot, "public", "episodes");

const target = process.argv[2];

const syncEpisode = (folder) => {
  const episodeDir = path.join(episodesRoot, folder);
  const yamlPath = path.join(episodeDir, "episode.yaml");
  const jsonPath = path.join(outDir, `${folder}.json`);
  const metaPath = path.join(outDir, `${folder}.meta.json`);
  const voiceoverSource = path.join(episodeDir, "voiceover.mp3");
  const voiceoverDestDir = path.join(publicEpisodesDir, folder);
  const voiceoverDest = path.join(voiceoverDestDir, "voiceover.mp3");

  if (!fs.existsSync(yamlPath)) {
    console.error(`Missing: ${yamlPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(yamlPath, "utf8");
  const data = loadYaml(raw);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

  let hasVoiceover = false;
  if (fs.existsSync(voiceoverSource)) {
    fs.mkdirSync(voiceoverDestDir, { recursive: true });
    fs.copyFileSync(voiceoverSource, voiceoverDest);
    hasVoiceover = true;
    console.log(`Copied voiceover → public/episodes/${folder}/voiceover.mp3`);
  } else {
    console.warn(`No voiceover.mp3 in episode folder (optional until render):`);
    console.warn(`  ${voiceoverSource}`);
  }

  fs.writeFileSync(metaPath, JSON.stringify({ hasVoiceover }, null, 2));
  console.log(`Synced ${folder} → src/generated/${folder}.json`);
};

if (target) {
  syncEpisode(target);
} else {
  const folders = fs
    .readdirSync(episodesRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const folder of folders) {
    if (fs.existsSync(path.join(episodesRoot, folder, "episode.yaml"))) {
      syncEpisode(folder);
    }
  }
}

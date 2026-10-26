// Monta um Reel num único HTML: node build.js 02-gemini  →  ../motion-02-gemini.html
const fs = require("fs"), path = require("path");
const reel = process.argv[2];
if (!reel) { console.error("uso: node build.js <reel>"); process.exit(1); }
const here = __dirname, out = path.join(here, "..");
const meta = JSON.parse(fs.readFileSync(path.join(here, "tts", reel, "metadata.json"), "utf8")).Metadata;
const words = meta.map(m => [m.Data.text.Text, +(m.Data.Offset / 1e7).toFixed(2), +((m.Data.Offset + m.Data.Duration) / 1e7).toFixed(2)]);
const reelSrc = fs.readFileSync(path.join(here, "reels", reel + ".js"), "utf8");
const title = (reelSrc.match(/title:"([^"]+)"/) || [, "YRA Motion"])[1];
const html = fs.readFileSync(path.join(here, "template.html"), "utf8")
  .split("__TITLE__").join(title)
  .replace("__LOGO__", () => "data:image/png;base64," + fs.readFileSync(path.join(out, "logo-white.png")).toString("base64"))
  .replace("__AUDIO__", () => fs.readFileSync(path.join(here, "tts", reel, "audio.mp3")).toString("base64"))
  .replace("__WORDS__", () => JSON.stringify(words))
  .replace("__ENGINE__", () => ["logos.js", "engine.js", "kit.js"].map(f => fs.readFileSync(path.join(here, f), "utf8")).join("\n"))
  .replace("__REEL__", () => reelSrc);
const file = path.join(out, "motion-" + reel + ".html");
fs.writeFileSync(file, html);
console.log("ok →", path.basename(file), `(${words.length} palavras, fala até ${words.at(-1)[2]}s)`);

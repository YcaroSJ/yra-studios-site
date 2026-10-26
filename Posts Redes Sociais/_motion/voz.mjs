// Gera a narração de um Reel: node voz.mjs 02-gemini
// lê tts/<reel>.txt, grava tts/<reel>/audio.mp3 + metadata.json (tempo de cada palavra)
// Voz padrão aprovada: pt-BR-AntonioNeural (sotaque brasileiro).
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";

const reel = process.argv[2];
const voice = process.argv[3] || "pt-BR-AntonioNeural";
if (!reel) { console.error("uso: node voz.mjs <reel>"); process.exit(1); }
const text = fs.readFileSync(`tts/${reel}.txt`, "utf8").trim();
const tts = new MsEdgeTTS();
await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3, { wordBoundaryEnabled: true });
fs.rmSync(`tts/${reel}`, { recursive: true, force: true });
fs.mkdirSync(`tts/${reel}`, { recursive: true });
await tts.toFile(`tts/${reel}`, text, { rate: "+4%" });
const m = JSON.parse(fs.readFileSync(`tts/${reel}/metadata.json`, "utf8")).Metadata;
const last = m.at(-1).Data;
console.log(`${m.length} palavras, ${((last.Offset + last.Duration) / 1e7).toFixed(1)}s`);
console.log(m.map(x => x.Data.text.Text + "@" + (x.Data.Offset / 1e7).toFixed(2)).join("  "));
process.exit(0);

// Confere um roteiro antes do build: node check.js 03-chatgpt [--words]
// 1) toda palavra-gatilho existe na narração  2) cenas e títulos estão em ordem crescente no tempo
const fs = require("fs"), path = require("path"), vm = require("vm");
const reel = process.argv[2];
const meta = JSON.parse(fs.readFileSync(path.join(__dirname, "tts", reel, "metadata.json"), "utf8")).Metadata;
const WORDS = meta.map(m => [m.Data.text.Text, m.Data.Offset / 1e7, (m.Data.Offset + m.Data.Duration) / 1e7]);
if (process.argv.includes("--words")) console.log(WORDS.map(w => w[0] + "@" + w[1].toFixed(1)).join(" "));
const f = path.join(__dirname, "reels", reel + ".js");
if (!fs.existsSync(f)) process.exit(0);
const src = fs.readFileSync(f, "utf8"), bad = [];
const toks = WORDS.map(w => w[0].toLowerCase());
for (const m of src.matchAll(/(?:at|endOf)\("([^"]+)"(?:,\s*(\d+))?\)/g)){
  const w = m[1].toLowerCase(), n = +(m[2] || 1), c = toks.filter(x => x === w).length;
  if (c < n) bad.push(`gatilho ${m[1]}#${n} (existe ${c}x)`);
}
// avalia o roteiro com o kit "de mentira" só pra ler os tempos
const at = (w, n = 1) => { let c = 0; for (const [x, s] of WORDS) if (x.toLowerCase() === w.toLowerCase() && ++c === n) return s; return NaN; };
const box = { WORDS, at, endOf:at, K:new Proxy({}, { get:() => () => ({}) }), END:999, W:1080, H:1920, X0:96, MAXW:888, C2:{}, BRANDS:{} };
try { vm.runInNewContext(src + "\nthis.REEL = REEL;", box); } catch (e){ bad.push("erro ao ler roteiro: " + e.message); }
const R = box.REEL;
if (R){
  R.scenes.forEach((s, i) => { if (i && !(s.t0 > R.scenes[i - 1].t0)) bad.push(`cena ${i} começa (${s.t0.toFixed(1)}s) antes/junto da cena ${i - 1} (${R.scenes[i - 1].t0.toFixed(1)}s)`); });
  R.heads.forEach((h, i) => { if (i && !(h.t > R.heads[i - 1].t)) bad.push(`título ${i} "${h.tag}" (${h.t.toFixed(1)}s) fora de ordem`); });
  if (!(R.intro.leave > .8)) bad.push(`abertura curta demais (${R.intro.leave.toFixed(1)}s)`);
}
console.log(reel, bad.length ? "PROBLEMAS:\n  - " + [...new Set(bad)].join("\n  - ") : "ok (gatilhos e ordem das cenas)");
process.exitCode = bad.length ? 1 : 0;

// Servidor local de prévia: node serve.js  →  http://localhost:8650/motion-02-gemini.html
const http = require("http"), fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const types = { ".html": "text/html; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".mp3": "audio/mpeg" };
http.createServer((req, res) => {
  if (req.method === "POST" && req.url.startsWith("/__snap/")){ // salva quadros de conferência em _motion/snaps/
    const name = path.basename(decodeURIComponent(req.url.slice(8))), chunks = [];
    req.on("data", c => chunks.push(c)).on("end", () => {
      fs.mkdirSync(path.join(__dirname, "snaps"), { recursive:true });
      fs.writeFileSync(path.join(__dirname, "snaps", name), Buffer.from(Buffer.concat(chunks).toString().split(",")[1], "base64"));
      res.end("ok");
    });
    return;
  }
  const f = path.join(root, decodeURIComponent(req.url.split("?")[0]));
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(8650, () => console.log("http://localhost:8650/"));

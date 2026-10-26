/* =====================================================================
   Motor dos Reels YRA Studios — comum a todos os vídeos.
   Cada Reel (reels/NN-tema.js) define um objeto REEL com: title, file,
   legenda, captionMap, intro, cams, scenes, heads, build(), animate(), draw2D().
   Padrão aprovado: 1080×1920, 60fps, voz pt-BR, logos das marcas, 3D + 2D,
   câmera contínua, legendas animadas, trilha dark cyberpunk, nada sobreposto.
   ===================================================================== */

const W = 1080, H = 1920, X0 = 96, MAXW = 888, FPS = 60, SR = 48000;
// zonas fixas da tela (evitam sobreposição): topo 0–260 · conteúdo 270–1090 · título 1110–1390 · legenda 1415–1510
const Z = { tagY:1130, headY:1176, headSize:60, capY:1462 };
const C2 = { ground:"#0b0a09", ink:"#f4efe9", mute:"#9c9088", neon:"#b8261c", neonB:"#d94a3a", panel:"rgba(18,15,14,.8)", line:"rgba(244,239,233,.14)" };
const SANS = "Inter, sans-serif", MONO = '"IBM Plex Mono", monospace';

/* ---------- tempo ---------- */
const norm = s => s.toLowerCase();
function at(w, n = 1){ let c = 0; for (const [x, s] of WORDS) if (norm(x) === norm(w) && ++c === n) return s; console.warn("cue não achado:", w, n); return 0; }
function endOf(w, n = 1){ let c = 0; for (const [x, , e] of WORDS) if (norm(x) === norm(w) && ++c === n) return e; return 0; }
const LAST = WORDS[WORDS.length - 1][2] + .5;
const END = LAST + 1.9;

/* ---------- easing ---------- */
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const eOut = x => 1 - Math.pow(1 - x, 3);
const eInOut = x => x < .5 ? 4*x*x*x : 1 - Math.pow(-2*x + 2, 3) / 2;
const eBack = x => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3*Math.pow(x-1, 3) + c1*Math.pow(x-1, 2); };
const eBounce = x => { const n = 7.5625, d = 2.75;
  if (x < 1/d) return n*x*x; if (x < 2/d) return n*(x-=1.5/d)*x+.75; if (x < 2.5/d) return n*(x-=2.25/d)*x+.9375; return n*(x-=2.625/d)*x+.984375; };
const smoother = x => x * x * x * (x * (x * 6 - 15) + 10);
const p = (t, s, d, e = eOut) => e(clamp((t - s) / d));
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const lerp = (a, b, k) => a + (b - a) * k;
const between = (t, a, b) => t >= a && t < b;

/* ---------- 3D: base ---------- */
let renderer, scene, camera, gl, M;
const A = {};
function canvasTex(w, h, draw){
  const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 8; return t;
}
function fitFont(x, str, weight, size, maxW){ do { x.font = `${weight} ${size}px ${SANS}`; size -= 2; } while (x.measureText(str).width > maxW && size > 10); }
function mat(hex, o){ const m = new THREE.MeshPhysicalMaterial(o); m.color.setHex(hex).convertSRGBToLinear(); return m; }
function rcard(w, h, d, r){
  const s = new THREE.Shape(), x = -w/2, y = -h/2;
  s.moveTo(x+r, y); s.lineTo(x+w-r, y); s.quadraticCurveTo(x+w, y, x+w, y+r); s.lineTo(x+w, y+h-r);
  s.quadraticCurveTo(x+w, y+h, x+w-r, y+h); s.lineTo(x+r, y+h); s.quadraticCurveTo(x, y+h, x, y+h-r);
  s.lineTo(x, y+r); s.quadraticCurveTo(x, y, x+r, y);
  const g = new THREE.ExtrudeGeometry(s, { depth:d, bevelEnabled:true, bevelThickness:.04, bevelSize:.04, bevelSegments:3, curveSegments:10 });
  g.translate(0, 0, -d/2); return g;
}
function facePlane(w, h, tex, z){
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map:tex, transparent:true, toneMapped:false }));
  m.position.z = z; return m;
}
function group(c){ const g = new THREE.Group(); g.position.set(...c); scene.add(g); return g; }
const camC = i => REEL.cams[i].c;
const wire = (geo, op, col = 0xd94a3a) => new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color:col, transparent:true, opacity:op }));
// logo SVG extrudada em 3D (paths = string ou lista de "d"); stops = cores do degradê diagonal
function svgLogo3D(paths, vb, size, depth, stops){
  const ds = Array.isArray(paths) ? paths : [paths];
  const svg = new THREE.SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vb} ${vb}">${ds.map(d => `<path d="${d}"/>`).join("")}</svg>`);
  const geo = new THREE.ExtrudeGeometry(svg.paths.flatMap(p => THREE.SVGLoader.createShapes(p)),
    { depth:depth * vb / size, bevelEnabled:true, bevelThickness:vb * .02, bevelSize:vb * .011, bevelSegments:5, curveSegments:14 });
  geo.center(); geo.rotateX(Math.PI); geo.scale(size / vb, size / vb, size / vb);
  if (stops && stops.length > 1){
    geo.computeBoundingBox(); const b = geo.boundingBox, pos = geo.attributes.position, col = new Float32Array(pos.count * 3);
    const cs = stops.map(h => new THREE.Color(h).convertSRGBToLinear());
    for (let i = 0; i < pos.count; i++){
      const k = clamp(((pos.getX(i) - b.min.x) / (b.max.x - b.min.x) + (b.max.y - pos.getY(i)) / (b.max.y - b.min.y)) / 2) * (cs.length - 1);
      const j = Math.min(cs.length - 2, Math.floor(k)), c = cs[j].clone().lerp(cs[j + 1], k - j);
      col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  }
  return geo;
}
let FONT3D = null;
function text3D(str, size, material){
  if (!FONT3D) return new THREE.Group();
  const geo = new THREE.TextGeometry(str, { font:FONT3D, size, height:size * .27, curveSegments:12, bevelEnabled:true, bevelThickness:size * .03, bevelSize:size * .02, bevelSegments:5 });
  geo.center(); return new THREE.Mesh(geo, material);
}
function glowPlane(size, rgba){
  const tex = canvasTex(512, 512, (x, w) => { const g = x.createRadialGradient(w/2, w/2, 0, w/2, w/2, w/2); g.addColorStop(0, rgba); g.addColorStop(1, "rgba(0,0,0,0)"); x.fillStyle = g; x.fillRect(0, 0, w, w); });
  return new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshBasicMaterial({ map:tex, transparent:true, blending:THREE.AdditiveBlending, depthWrite:false }));
}

async function init3D(){
  renderer = new THREE.WebGLRenderer({ antialias:true, preserveDrawingBuffer:true, powerPreference:"high-performance" });
  renderer.setPixelRatio(1); renderer.setSize(W, H, false);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.1;
  gl = renderer.domElement;
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0a09);
  scene.fog = new THREE.FogExp2(0x0b0a09, 0.03);
  camera = new THREE.PerspectiveCamera(50, W/H, 0.1, 400);

  const pm = new THREE.PMREMGenerator(renderer), es = new THREE.Scene();
  es.add(new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ color:0x0e0c0b, side:THREE.BackSide })));
  const panel = (c, w, h, pos) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color:c, side:THREE.DoubleSide })); m.position.set(...pos); m.lookAt(0,0,0); es.add(m); };
  panel(0xffffff, 16, 5, [0, 15, 4]); panel(0xff3b2c, 7, 14, [-15, 2, 0]); panel(0xffe2d6, 5, 10, [15, 4, -4]); panel(0x7a140c, 22, 4, [0, -6, -15]);
  scene.environment = pm.fromScene(es, 0.04).texture;

  scene.add(new THREE.AmbientLight(0xffffff, .25));
  const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(6, 12, 10); scene.add(key);
  const rim = new THREE.DirectionalLight(0xff4a3a, 1.4); rim.position.set(-8, 4, -10); scene.add(rim);
  REEL.cams.forEach(k => { const l = new THREE.PointLight(0xff3b2c, 3, 24, 2); l.position.set(k.c[0]-5, k.c[1]+4, k.c[2]+3); scene.add(l); });

  M = {
    red:  mat(0xb8261c, { metalness:.25, roughness:.18, clearcoat:1, clearcoatRoughness:.08, envMapIntensity:1.5 }),
    dark: mat(0x1d1a18, { metalness:.55, roughness:.3, clearcoat:.8, clearcoatRoughness:.2, envMapIntensity:1.2 }),
    ink:  mat(0xf4efe9, { metalness:.9, roughness:.15, envMapIntensity:1.3 }),
    glow: mat(0xb8261c, { metalness:.1, roughness:.25, clearcoat:1, emissive:0x3a0603, envMapIntensity:1.4 }),
    dead: mat(0x2a2624, { metalness:.3, roughness:.6, envMapIntensity:.5 }),
  };

  const N = 2400, pos = new Float32Array(N*3);
  for (let i = 0; i < N; i++){ pos[i*3] = (Math.random()-.5)*110; pos[i*3+1] = -6 + Math.random()*22; pos[i*3+2] = 30 - Math.random()*240; }
  const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  A.dust = new THREE.Points(pg, new THREE.PointsMaterial({ color:0x9c9088, size:.07, transparent:true, opacity:.55 }));
  scene.add(A.dust);
  const grid = new THREE.GridHelper(360, 180, 0x5a1a14, 0x2a2220);
  grid.position.set(0, -5, -90); grid.material.transparent = true; grid.material.opacity = .35; scene.add(grid);

  FONT3D = await new Promise(res => new THREE.FontLoader().load(
    "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_bold.typeface.json", res, undefined, () => res(null)));

  // abertura: logo da marca principal em 3D
  const I = REEL.intro;
  if (I.brand){ const b = BRANDS[I.brand]; I.paths = b.d; I.vb = 24; I.stops = b.stops.length > 1 ? b.stops : null; I.color = I.color || parseInt(b.stops[0].slice(1), 16); }
  A.introG = group(I.c);
  A.introLogo = new THREE.Mesh(svgLogo3D(I.paths, I.vb, I.size || 4.6, I.depth || .7, I.stops),
    I.stops ? new THREE.MeshStandardMaterial({ vertexColors:true, metalness:.05, roughness:.42, emissive:new THREE.Color(I.emissive || 0x000000), envMapIntensity:.35 })
            : mat(I.color, { metalness:.1, roughness:.35, clearcoat:.6, clearcoatRoughness:.25, emissive:I.emissive || 0x1a0703, envMapIntensity:.7 }));
  A.introGlow = glowPlane(12, I.glow || "rgba(217,74,58,.35)"); A.introGlow.position.z = -1.5;
  A.introRing = wire(new THREE.TorusGeometry(4.2, .04, 3, 90), .5);
  const il = new THREE.PointLight(0xffffff, 1.2, 20, 2); il.position.set(4, 4, 6);
  A.introG.add(A.introGlow, A.introLogo, A.introRing, il);

  REEL.scenes.forEach(s => (s.parts || []).forEach(pt => pt.build && pt.build(A, M, s.g || (s.g = group(REEL.cams[s.cam].c)), s)));
  if (REEL.build) REEL.build(A, M);
}

/* ---------- câmera: órbita contínua + voos suaves entre cenas ---------- */
let CAM_T0 = [];
function orbit(k, t, t0){
  const a = k.a0 + (t - t0) * k.spin, R = k.R - (t - t0) * .18;
  return { pos:new THREE.Vector3(k.c[0] + Math.sin(a)*R, k.c[1] + k.h, k.c[2] + Math.cos(a)*R),
           tgt:new THREE.Vector3(k.c[0], k.c[1] + k.ty, k.c[2]) };
}
const pose = (ci, t) => orbit(REEL.cams[ci], t, CAM_T0[ci]);
function blend(a, b, k, lift, i){
  const e = smoother(k);
  return { pos:a.pos.lerp(b.pos, e).add(new THREE.Vector3(0, Math.sin(k * Math.PI) * lift, 0)), tgt:a.tgt.lerp(b.tgt, e),
           roll:Math.sin(k * Math.PI) * .06 * (i % 2 ? 1 : -1) };
}
function updateCamera(t){
  const S = REEL.scenes;
  let ci = 0; for (const s of S) if (t >= s.t0) ci = s.cam;
  let P = pose(ci, t); P.roll = 0;
  const I = REEL.intro, ki = (t - I.leave) / 1.35;
  if (ki < 1){ const O = orbit(I.cam, t, 0); P = ki <= 0 ? Object.assign(O, { roll:0 }) : blend(O, P, ki, 3, 1); }
  S.forEach((s, i) => {
    if (!i || s.cam === S[i-1].cam) return;
    const k = (t - (s.t0 - .6)) / 1.7;
    if (k > 0 && k < 1) P = blend(pose(S[i-1].cam, t), pose(s.cam, t), k, 4.5, i);
  });
  P.pos.x += Math.sin(t * 1.3) * .06 + Math.sin(t * 2.9) * .025;
  P.pos.y += Math.cos(t * 1.1) * .05 + Math.sin(t * 2.3) * .02;
  camera.position.copy(P.pos); camera.up.set(P.roll, 1, 0).normalize(); camera.lookAt(P.tgt);
}
function animate3D(t){
  A.dust.rotation.y = Math.sin(t * .05) * .02;
  const ci = eBack(clamp((t - .05) / 1.0));
  A.introLogo.scale.setScalar(Math.max(.001, ci));
  A.introLogo.rotation.set(Math.sin(t * .9) * .12, -Math.PI * 1.5 * (1 - eOut(clamp((t - .05) / 1.5))) + Math.sin(t * .8) * .35, REEL.intro.spinZ ? t * .15 : 0);
  A.introLogo.position.y = Math.sin(t * 1.4) * .12;
  A.introGlow.material.opacity = clamp(t * 2) * (.8 + .2 * Math.sin(t * 3));
  A.introRing.rotation.set(1.25 + Math.sin(t * .7) * .1, t * .4, 0); A.introRing.scale.setScalar(Math.max(.001, eOut(clamp((t - .3) / 1))));
  REEL.scenes.forEach(s => (s.parts || []).forEach(pt => pt.animate && pt.animate(t, s)));
  if (REEL.animate) REEL.animate(t);
}
function toScreen(obj, local){
  const v = obj.localToWorld(local.clone()).project(camera);
  return { x:(v.x * .5 + .5) * W, y:(-v.y * .5 + .5) * H };
}
function screenBox(obj, pts){
  const s = pts.map(q => toScreen(obj, new THREE.Vector3(...q)));
  return { x0:Math.min(...s.map(q => q.x)), x1:Math.max(...s.map(q => q.x)), y0:Math.min(...s.map(q => q.y)), y1:Math.max(...s.map(q => q.y)) };
}

/* ---------- 2D: tipografia e HUD ---------- */
function words(str){
  const out = []; let hl = false;
  for (const raw of str.split(" ")){
    if (raw.startsWith("*")) hl = true;
    out.push({ w:raw.replace(/\*/g, ""), hl });
    if (raw.slice(1).includes("*")) hl = false;
  }
  return out;
}
function layout(ctx, str, o){
  const ws = words(o.upper ? str.toUpperCase() : str), sp = o.size * .26, lines = [{ ws:[], w:0 }];
  for (const wd of ws){
    ctx.font = `${wd.hl ? 900 : o.weight} ${o.size}px ${SANS}`;
    const width = ctx.measureText(wd.w).width;
    let L = lines[lines.length - 1];
    if (L.ws.length && L.w + sp + width > o.maxW){ L = { ws:[], w:0 }; lines.push(L); }
    if (L.ws.length) L.w += sp;
    wd.x = L.w; L.ws.push(wd); L.w += width;
  }
  return lines;
}
function text(ctx, t, str, o){
  o = Object.assign({ x:X0, size:70, weight:800, maxW:MAXW, lh:1.04, upper:true, color:C2.ink, hl:C2.neonB, start:0, stagger:.1, dur:.75, align:"left" }, o);
  const lines = layout(ctx, str, o), lh = o.size * o.lh;
  ctx.letterSpacing = "0px"; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
  lines.forEach((L, i) => {
    const a = p(t, o.start + i * o.stagger, o.dur); if (a <= 0) return;
    const top = o.y + i * lh, ox = o.x + (o.align === "center" ? (o.maxW - L.w) / 2 : 0);
    ctx.save(); ctx.globalAlpha *= a;
    ctx.beginPath(); ctx.rect(0, top - o.size * .2, W, lh + o.size * .35); ctx.clip();
    ctx.translate(0, (1 - a) * lh);
    for (const wd of L.ws){
      ctx.font = `${wd.hl ? 900 : o.weight} ${o.size}px ${SANS}`;
      ctx.fillStyle = wd.hl ? o.hl : o.color; ctx.fillText(wd.w, ox + wd.x, top + o.size * .82);
    }
    ctx.restore();
  });
  return lines.length * lh;
}
function mono(ctx, str, x, y, o = {}){
  ctx.font = `${o.weight || 600} ${o.size || 24}px ${MONO}`; ctx.letterSpacing = (o.ls ?? 3) + "px";
  ctx.fillStyle = o.color || C2.mute; ctx.textAlign = o.align || "left"; ctx.textBaseline = "middle"; ctx.fillText(str, x, y);
  ctx.letterSpacing = "0px";
}
const typed = (str, t, start, cps = 32) => str.slice(0, Math.max(0, Math.floor((t - start) * cps)));
const caret = t => Math.floor(t * 3) % 2 ? "▌" : " ";
function tag(ctx, t, label, y, start){
  const a = p(t, start, .5); if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.shadowColor = C2.neon; ctx.shadowBlur = 14 + 8 * Math.sin(t * 4); ctx.fillStyle = C2.neonB;
  ctx.beginPath(); ctx.arc(X0 + 7, y, Math.max(0, 7 * eBack(clamp((t - start) / .5))), 0, 7); ctx.fill(); ctx.shadowBlur = 0;
  mono(ctx, typed("> " + label.toUpperCase(), t, start, 40) + caret(t), X0 + 30, y + 1, { size:24, ls:4 });
  ctx.restore();
}
function brackets(ctx, x0, y0, x1, y1, len, col, lw = 3){
  ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
  ctx.moveTo(x0, y0 + len); ctx.lineTo(x0, y0); ctx.lineTo(x0 + len, y0);
  ctx.moveTo(x1 - len, y0); ctx.lineTo(x1, y0); ctx.lineTo(x1, y0 + len);
  ctx.moveTo(x1, y1 - len); ctx.lineTo(x1, y1); ctx.lineTo(x1 - len, y1);
  ctx.moveTo(x0 + len, y1); ctx.lineTo(x0, y1); ctx.lineTo(x0, y1 - len);
  ctx.stroke();
}
// painel HUD: o título e o "sinal" ficam em lados opostos (área reservada pro selo à direita: right)
function hudPanel(ctx, x, y, w, h, title, t, right){
  ctx.beginPath(); ctx.roundRect(x, y, w, h, 22); ctx.fillStyle = C2.panel; ctx.fill();
  ctx.strokeStyle = C2.line; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = C2.neonB; ctx.fillRect(x + 28, y, 90, 3);
  ctx.beginPath(); ctx.arc(x + 36, y + 40, 6, 0, 7); ctx.fill();
  mono(ctx, title, x + 56, y + 41, { size:21, ls:4, color:C2.ink, weight:700 });
  ctx.fillStyle = "rgba(244,239,233,.08)"; ctx.fillRect(x, y + 74, w, 1.5);
  for (let i = 0; i < 12; i++){
    const v = .3 + .7 * Math.abs(Math.sin(t * 3 + i * .9) * hash(i + Math.floor(t * 6)));
    ctx.fillStyle = i > 8 ? C2.neonB : "rgba(244,239,233,.35)"; ctx.fillRect(x + w - 40 - (11 - i) * 9, y + 50 - 24 * v, 5, 24 * v);
  }
  if (right) right(x + w - 160, y + 41); // selo opcional, termina antes das barras de sinal
}
function env(ctx, t, t0, t1, cx = W/2, cy = 700){
  const a = p(t, t0, .55), out = p(t, t1 - .4, .4, eInOut);
  if (a <= 0 || out >= 1) return false;
  const s = lerp(.94, 1, a) * (1 + .1 * out) * (1 + .03 * smoother(clamp((t - t0) / 10))); // aproximação lenta, no máximo 3%
  ctx.save(); ctx.globalAlpha = a * (1 - out);
  ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-cx, -cy);
  if (out > 0 && Q === 1) ctx.filter = `blur(${12 * out}px)`; // desfoque só no MP4 (na prévia pesa)
  return true;
}
// desenha uma logo vetorial 2D: paths = [{d, fill}] num viewBox vb, centralizada em (x,y) com tamanho size
function drawLogo(ctx, paths, vb, x, y, size, rot = 0, alpha = 1){
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(size / vb, size / vb); ctx.translate(-vb / 2, -vb / 2);
  paths.forEach(q => { q.p = q.p || new Path2D(q.d); ctx.fillStyle = typeof q.fill === "function" ? q.fill(ctx, vb) : q.fill; ctx.fill(q.p); });
  ctx.restore();
}
// etiqueta (pílula) presa a um ponto da tela — normalmente projetado de um objeto 3D
function chip(ctx, x, y, txt, a, hl, icon){
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.font = `700 26px ${MONO}`; ctx.letterSpacing = "3px";
  const iw = icon ? 40 : 0, w = ctx.measureText(txt).width + 44 + iw, yy = y - (1 - a) * 18;
  ctx.beginPath(); ctx.roundRect(x - w/2, yy - 27, w, 54, 27);
  ctx.fillStyle = hl ? C2.neon : "rgba(11,10,9,.85)"; ctx.fill();
  ctx.strokeStyle = hl ? "rgba(255,255,255,.3)" : "rgba(244,239,233,.22)"; ctx.lineWidth = 2; ctx.stroke();
  if (icon) icon(ctx, x - w/2 + 34, yy);
  ctx.fillStyle = "#fff"; ctx.textAlign = "left"; ctx.textBaseline = "middle"; ctx.fillText(txt, x - w/2 + 22 + iw, yy + 1);
  ctx.letterSpacing = "0px"; ctx.restore();
}
function drawLock(ctx, x, y, s, col = C2.ink){
  ctx.save(); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = s * .14;
  ctx.beginPath(); ctx.arc(x, y - s * .15, s * .32, Math.PI, 0); ctx.lineTo(x + s * .32, y + s * .05); ctx.moveTo(x - s * .32, y + s * .05); ctx.lineTo(x - s * .32, y - s * .15); ctx.stroke();
  ctx.beginPath(); ctx.roundRect(x - s * .5, y, s, s * .72, s * .12); ctx.fill();
  ctx.fillStyle = "rgba(11,10,9,.85)"; ctx.beginPath(); ctx.arc(x, y + s * .3, s * .09, 0, 7); ctx.fill();
  ctx.restore();
}
function stamp(ctx, t, start, label, x, y, rot = -.12, col = C2.neon){
  if (t < start) return;
  const s = eBack(clamp((t - start) / .35));
  ctx.save(); ctx.globalAlpha *= clamp((t - start) * 5); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.font = `900 40px ${SANS}`; const w = ctx.measureText(label).width + 70;
  ctx.beginPath(); ctx.roundRect(-w/2, -42, w, 84, 14); ctx.fillStyle = col; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,.5)"; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.roundRect(-w/2 + 10, -32, w - 20, 64, 10); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(label, 0, 2);
  ctx.restore();
}

/* ---------- 2D: fluxograma / roadmap que se monta com a narração ----------
   nodes: [{ id, x, y, w, h, label, sub, cue, style:"hl"|"bad"|"", icon(ctx,cx,cy) }]
   edges: [{ a, b, cue, style:"bad"|"" }]  — linhas se desenham sozinhas e levam um pulso de dados */
function edgePath(A1, B1){
  const ax = A1.x + A1.w / 2, bx = B1.x + B1.w / 2;
  if (B1.y >= A1.y + A1.h - 1){ const y0 = A1.y + A1.h, y1 = B1.y, my = (y0 + y1) / 2; return ax === bx ? [[ax, y0], [bx, y1]] : [[ax, y0], [ax, my], [bx, my], [bx, y1]]; }
  const ay = A1.y + A1.h / 2, by = B1.y + B1.h / 2;
  return B1.x > A1.x ? [[A1.x + A1.w, ay], [B1.x, by]] : [[A1.x, ay], [B1.x + B1.w, by]];
}
function polyAt(pts, f){
  const seg = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1])), tot = seg.reduce((a, b) => a + b, 0);
  let d = f * tot; for (let i = 0; i < seg.length; i++){ if (d <= seg[i]){ const k = d / seg[i]; return { pt:[lerp(pts[i][0], pts[i+1][0], k), lerp(pts[i][1], pts[i+1][1], k)], i, ang:Math.atan2(pts[i+1][1] - pts[i][1], pts[i+1][0] - pts[i][0]) }; } d -= seg[i]; }
  const n = pts.length - 1; return { pt:pts[n], i:n - 1, ang:Math.atan2(pts[n][1] - pts[n-1][1], pts[n][0] - pts[n-1][0]) };
}
function drawGraph(ctx, t, g){
  const byId = Object.fromEntries(g.nodes.map(n => [n.id, n]));
  g.edges.forEach((e, i) => {
    const k = p(t, e.cue, .45, eInOut); if (k <= 0) return;
    const pts = edgePath(byId[e.a], byId[e.b]), end = polyAt(pts, k);
    ctx.save(); ctx.strokeStyle = e.style === "bad" ? "rgba(244,239,233,.35)" : C2.neonB; ctx.lineWidth = 4;
    if (e.style === "bad") ctx.setLineDash([12, 10]);
    ctx.beginPath(); ctx.moveTo(...pts[0]); for (let j = 1; j <= end.i; j++) ctx.lineTo(...pts[j]); ctx.lineTo(...end.pt); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = ctx.strokeStyle; ctx.translate(...end.pt); ctx.rotate(end.ang);
    ctx.beginPath(); ctx.moveTo(4, 0); ctx.lineTo(-14, -10); ctx.lineTo(-14, 10); ctx.closePath(); ctx.fill();
    ctx.restore();
    if (k >= 1 && e.style !== "bad"){ // pulso de dados percorrendo a linha
      const q = polyAt(pts, (t * .9 + hash(i)) % 1).pt;
      ctx.save(); ctx.fillStyle = "#ffb3a8"; ctx.shadowColor = C2.neonB; ctx.shadowBlur = 16; ctx.beginPath(); ctx.arc(q[0], q[1], 6, 0, 7); ctx.fill(); ctx.restore();
    }
  });
  g.nodes.forEach(n => {
    const a = clamp((t - n.cue) / .4); if (a <= 0) return;
    const s = .9 + .1 * eBack(a), cx = n.x + n.w / 2, cy = n.y + n.h / 2;
    ctx.save(); ctx.globalAlpha *= clamp(a * 2); ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-cx, -cy);
    ctx.beginPath(); ctx.roundRect(n.x, n.y, n.w, n.h, 20);
    if (n.style === "hl"){
      const gr = ctx.createLinearGradient(n.x, n.y, n.x + n.w, n.y + n.h); gr.addColorStop(0, "rgba(184,38,28,.55)"); gr.addColorStop(1, "rgba(184,38,28,.18)");
      ctx.fillStyle = gr; ctx.fill(); ctx.shadowColor = "rgba(217,74,58,.8)"; ctx.shadowBlur = 22 + 10 * Math.sin(t * 5); ctx.strokeStyle = C2.neonB;
    } else if (n.style === "bad"){ ctx.fillStyle = "rgba(244,239,233,.04)"; ctx.fill(); ctx.strokeStyle = "rgba(244,239,233,.22)"; }
    else { ctx.fillStyle = "rgba(18,15,14,.88)"; ctx.fill(); ctx.strokeStyle = "rgba(244,239,233,.28)"; }
    ctx.lineWidth = 3; ctx.stroke(); ctx.shadowBlur = 0;
    const tx = n.icon ? n.x + 96 : n.x + n.w / 2;
    if (n.icon) n.icon(ctx, n.x + 50, cy);
    ctx.font = `${n.style === "hl" ? 900 : 800} ${n.size || 34}px ${SANS}`; ctx.fillStyle = n.style === "bad" ? C2.mute : C2.ink;
    ctx.textAlign = n.icon ? "left" : "center"; ctx.textBaseline = "middle";
    ctx.fillText(n.label.toUpperCase(), tx, n.sub ? cy - 15 : cy + 2);
    if (n.sub) mono(ctx, typed(n.sub, t, n.cue + .25, 40), tx, cy + 24, { size:19, ls:2, color:n.style === "hl" ? "#ffd2cc" : C2.mute, align:n.icon ? "left" : "center", weight:700 });
    ctx.restore();
  });
}

/* ---------- legendas animadas (karaokê), sempre na zona própria ---------- */
let CAPS = [];
function buildCaps(){
  const map = REEL.captionMap || {};
  const ws = WORDS.map(([w, s, e]) => ({ d:(w in map ? map[w] : w).toUpperCase(), s, e })).filter(x => x.d);
  const out = []; let cur = [];
  ws.forEach(w => {
    const prev = cur[cur.length - 1], len = cur.reduce((a, b) => a + b.d.length + 1, 0);
    if (cur.length && (cur.length >= 4 || len + w.d.length > 24 || w.s - prev.e > .2)){ out.push(cur); cur = []; }
    cur.push(w);
  });
  if (cur.length) out.push(cur);
  CAPS = out.map((c, i) => ({ words:c, t0:c[0].s - .05, t1:out[i + 1] ? Math.min(out[i + 1][0].s - .05, c.at(-1).e + .9) : c.at(-1).e + .6 }));
}
function drawCaptions(ctx, t){
  const c = CAPS.find(c => t >= c.t0 && t < c.t1); if (!c) return;
  let size = 46; ctx.font = `800 ${size}px ${SANS}`; ctx.letterSpacing = "1px";
  const sp = 16; let widths = c.words.map(w => ctx.measureText(w.d).width), tot = widths.reduce((a, b) => a + b, 0) + sp * (widths.length - 1);
  if (tot > 860){ size = Math.floor(size * 860 / tot); ctx.font = `800 ${size}px ${SANS}`; widths = c.words.map(w => ctx.measureText(w.d).width); tot = widths.reduce((a, b) => a + b, 0) + sp * (widths.length - 1); }
  const a = clamp((t - c.t0) / .18), s = .9 + .1 * eBack(a), out = 1 - clamp((c.t1 - t) / .12);
  ctx.save(); ctx.globalAlpha = clamp(a * 2) * (1 - out); ctx.translate(W/2, Z.capY); ctx.scale(s, s);
  ctx.beginPath(); ctx.roundRect(-tot/2 - 30, -size * .9, tot + 60, size * 1.8, 18); ctx.fillStyle = "rgba(11,10,9,.82)"; ctx.fill();
  ctx.strokeStyle = "rgba(244,239,233,.12)"; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = C2.neonB; ctx.fillRect(-tot/2 - 30, -size * .9 + 14, 4, size * 1.8 - 28);
  let x = -tot / 2; ctx.textBaseline = "middle"; ctx.textAlign = "left";
  c.words.forEach((w, i) => {
    const spoken = t >= w.s - .03, active = spoken && (i === c.words.length - 1 || t < c.words[i + 1].s - .03);
    ctx.save();
    if (active){ const k = 1 + .08 * eBack(clamp((t - w.s) / .15)); ctx.translate(x + widths[i] / 2, 0); ctx.scale(k, k); ctx.translate(-(x + widths[i] / 2), 0); }
    ctx.fillStyle = active ? C2.neonB : spoken ? C2.ink : "rgba(244,239,233,.4)";
    ctx.fillText(w.d, x, 3); ctx.restore();
    x += widths[i] + sp;
  });
  ctx.letterSpacing = "0px"; ctx.restore();
}

/* ---------- composição do quadro ---------- */
const NOISE = (() => { const c = document.createElement("canvas"); c.width = c.height = 256; const x = c.getContext("2d"), d = x.createImageData(256, 256);
  for (let i = 0; i < d.data.length; i += 4){ const v = Math.random() * 255; d.data[i] = d.data[i+1] = d.data[i+2] = v; d.data[i+3] = 255; }
  x.putImageData(d, 0, 0); return c; })();
const SCAN = (() => { const c = document.createElement("canvas"); c.width = 4; c.height = 4; const x = c.getContext("2d"); x.fillStyle = "rgba(0,0,0,.35)"; x.fillRect(0, 0, 4, 1); return c; })();
const small = document.createElement("canvas"); small.width = 270; small.height = 480; const sctx = small.getContext("2d");
let LOGO, grainPat, scanPat, cv, ctx;
let Q = 1;
function setQuality(q){ Q = q; cv.width = W * q; cv.height = H * q; renderer.setSize(W * q, H * q, false); }

function drawIntro2D(ctx, t){
  const I = REEL.intro;
  if (t > I.leave + .6) return;
  const a = p(t, .4, .5) * (1 - p(t, I.leave, .5));
  ctx.save(); ctx.globalAlpha = a;
  ctx.font = `800 64px ${SANS}`; ctx.letterSpacing = "6px"; ctx.fillStyle = C2.ink; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(typed(I.name, t, .45, 14), W/2, 1010); ctx.letterSpacing = "0px";
  mono(ctx, typed(I.sub, t, .8, 30), W/2, 1072, { align:"center", size:22, ls:6, color:I.subColor || C2.neonB, weight:700 });
  ctx.restore();
}

function drawFrame(ctx, t){
  ctx.setTransform(Q, 0, 0, Q, 0, 0);
  animate3D(t); updateCamera(t); renderer.render(scene, camera);
  ctx.save();
  ctx.drawImage(gl, 0, 0, W, H);
  sctx.filter = "blur(5px)"; sctx.clearRect(0, 0, 270, 480); sctx.drawImage(gl, 0, 0, 270, 480);
  ctx.globalCompositeOperation = "lighter"; ctx.globalAlpha = .24; ctx.drawImage(small, 0, 0, W, H);
  ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 1;

  const v = ctx.createRadialGradient(W/2, H*.38, H*.22, W/2, H*.42, H*.8);
  v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, "rgba(0,0,0,.7)"); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  const b = ctx.createLinearGradient(0, 960, 0, H);
  b.addColorStop(0, "rgba(11,10,9,0)"); b.addColorStop(.25, "rgba(11,10,9,.86)"); b.addColorStop(1, "rgba(11,10,9,.96)");
  ctx.fillStyle = b; ctx.fillRect(0, 960, W, H - 960);

  ctx.save(); ctx.translate(Math.sin(t * .3) * 8, Math.cos(t * .25) * 6);
  drawIntro2D(ctx, t);
  if (REEL.draw2D) REEL.draw2D(ctx, t);
  REEL.scenes.forEach(s => { if (t >= s.t0 - .1 && t <= s.t1 + .1) (s.parts || []).forEach(pt => pt.draw && pt.draw(ctx, t, s)); });
  ctx.restore();

  REEL.heads.forEach((hd, i) => {
    const t1 = REEL.heads[i + 1] ? REEL.heads[i + 1].t : END - .5;
    if (t < hd.t || t > t1) return;
    const out = p(t, t1 - .35, .35, eInOut);
    ctx.save(); ctx.globalAlpha = 1 - out; ctx.translate(0, -30 * out); if (out > 0 && Q === 1) ctx.filter = `blur(${10 * out}px)`;
    tag(ctx, t, hd.tag, Z.tagY, hd.t);
    text(ctx, t, hd.text, { y:Z.headY, start:hd.t + .12, size:Z.headSize });
    ctx.restore();
  });
  drawCaptions(ctx, t);

  // HUD fixo
  const tg = ctx.createLinearGradient(0, 0, 0, 290);
  tg.addColorStop(0, "rgba(11,10,9,.92)"); tg.addColorStop(.6, "rgba(11,10,9,.6)"); tg.addColorStop(1, "rgba(11,10,9,0)");
  ctx.fillStyle = tg; ctx.fillRect(0, 0, W, 290);
  ctx.globalAlpha = p(t, .1, .6);
  const lh = 40, lw = LOGO.width * lh / LOGO.height;
  ctx.drawImage(LOGO, X0, 140 - lh/2, lw, lh);
  mono(ctx, "YRA STUDIOS", W - X0, 141, { size:22, color:C2.ink, weight:700, align:"right" });
  ctx.fillStyle = "rgba(244,239,233,.14)"; ctx.fillRect(X0, 185, MAXW, 2);
  ctx.fillStyle = C2.neonB; ctx.fillRect(X0, 185, MAXW * clamp(t / END), 2);
  ctx.fillStyle = Math.floor(t * 2) % 2 ? C2.neonB : "rgba(217,74,58,.35)"; ctx.beginPath(); ctx.arc(X0 + 6, 222, 6, 0, 7); ctx.fill();
  mono(ctx, "AI FEED // LIVE", X0 + 22, 223, { size:18, ls:3 });
  mono(ctx, "T+" + t.toFixed(2).padStart(5, "0"), W - X0, 223, { size:18, ls:3, align:"right" });
  brackets(ctx, 40, 40, W - 40, H - 40, 40, "rgba(244,239,233,.18)", 2);
  ctx.globalAlpha = 1;

  scanPat = scanPat || ctx.createPattern(SCAN, "repeat"); ctx.globalAlpha = .35; ctx.fillStyle = scanPat; ctx.fillRect(0, 0, W, H);
  const by = ((t * .25) % 1) * (H + 300) - 150, sg = ctx.createLinearGradient(0, by - 120, 0, by + 120);
  sg.addColorStop(0, "rgba(255,255,255,0)"); sg.addColorStop(.5, "rgba(255,255,255,.035)"); sg.addColorStop(1, "rgba(255,255,255,0)");
  ctx.globalAlpha = 1; ctx.fillStyle = sg; ctx.fillRect(0, by - 120, W, 240);
  grainPat = grainPat || ctx.createPattern(NOISE, "repeat");
  ctx.globalAlpha = .05; ctx.translate(Math.random() * 256, Math.random() * 256); ctx.fillStyle = grainPat; ctx.fillRect(-256, -256, W + 256, H + 256);
  ctx.setTransform(Q, 0, 0, Q, 0, 0); ctx.globalAlpha = 1;

  let g = 0; REEL.scenes.forEach((s, i) => { if (i && s.cam !== REEL.scenes[i-1].cam) g = Math.max(g, 1 - Math.abs(t - s.t0) / .16); });
  if (g > 0){
    const f = Math.floor(t * 30);
    for (let i = 0; i < 7; i++){
      const y = hash(f * 13 + i) * H, h = 14 + hash(f * 7 + i) * 110, dx = (hash(f * 3 + i) - .5) * 120 * g;
      ctx.drawImage(ctx.canvas, 0, y * Q, W * Q, h * Q, dx, y, W, h);
    }
    ctx.globalCompositeOperation = "lighter"; ctx.globalAlpha = .1 * g; ctx.fillStyle = C2.neon; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 1;
  }
  ctx.globalAlpha = Math.max(1 - p(t, 0, .4), p(t, END - .7, .7)); ctx.fillStyle = "#0b0a09"; ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

/* ---------- trilha dark cyberpunk (sintetizada; sem direitos de terceiros) ---------- */
const BPM = 86;
function synth(oc, out, dur, key = 0){
  const beat = 60 / BPM, bar = beat * 4, step = beat / 4;
  const chords = [[57, 60, 64], [57, 60, 64], [53, 57, 60], [52, 55, 59]].map(c => c.map(m => m + key)); // Am Am F Em
  const roots = [45, 45, 41, 40].map(m => m + key);
  const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
  const comp = oc.createDynamicsCompressor(); comp.threshold.value = -18; comp.ratio.value = 4; comp.connect(out);
  const pump = oc.createGain(); pump.connect(comp);
  const delay = oc.createDelay(2), fb = oc.createGain(), wet = oc.createGain(), dlp = oc.createBiquadFilter();
  delay.delayTime.value = beat * .75; fb.gain.value = .5; wet.gain.value = .45; dlp.type = "lowpass"; dlp.frequency.value = 2400;
  delay.connect(dlp); dlp.connect(fb); fb.connect(delay); dlp.connect(wet); wet.connect(comp);
  const nb = oc.createBuffer(1, SR * 2, SR), nd = nb.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
  const noise = (ts, type, f0, q, vol, dec, f1, dest = comp) => {
    const s = oc.createBufferSource(); s.buffer = nb; const f = oc.createBiquadFilter(); f.type = type; f.Q.value = q;
    f.frequency.setValueAtTime(f0, ts); if (f1) f.frequency.exponentialRampToValueAtTime(f1, ts + dec);
    const g = oc.createGain(); g.gain.setValueAtTime(vol, ts); g.gain.exponentialRampToValueAtTime(.0001, ts + dec);
    s.connect(f); f.connect(g); g.connect(dest); s.start(ts, Math.random()); s.stop(ts + dec + .02);
  };
  const osc = (ts, type, f, vol, att, len, dest, filt) => {
    const o = oc.createOscillator(); o.type = type; o.frequency.value = f;
    let n = o; if (filt){ const fl = oc.createBiquadFilter(); fl.type = "lowpass"; fl.Q.value = filt.q || 1; fl.frequency.setValueAtTime(filt.f0, ts); if (filt.f1) fl.frequency.exponentialRampToValueAtTime(filt.f1, ts + (filt.d || len)); o.connect(fl); n = fl; }
    const g = oc.createGain(); g.gain.setValueAtTime(.0001, ts); g.gain.exponentialRampToValueAtTime(vol, ts + att); g.gain.exponentialRampToValueAtTime(.0001, ts + len);
    n.connect(g); dest.forEach(d => g.connect(d)); o.start(ts); o.stop(ts + len + .05); return o;
  };
  for (let b = 0; b * bar < dur; b++){
    const t0 = b * bar, chord = chords[b % 4], root = roots[b % 4];
    // drone grave com filtro "respirando"
    [-10, 10].forEach(det => {
      const o = oc.createOscillator(); o.type = "sawtooth"; o.frequency.value = mtof(root - 12); o.detune.value = det;
      const f = oc.createBiquadFilter(); f.type = "lowpass"; f.Q.value = 4;
      f.frequency.setValueAtTime(180, t0); f.frequency.linearRampToValueAtTime(520, t0 + bar / 2); f.frequency.linearRampToValueAtTime(180, t0 + bar);
      const g = oc.createGain(); g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(.06, t0 + .3); g.gain.setValueAtTime(.06, t0 + bar - .2); g.gain.linearRampToValueAtTime(0, t0 + bar + .05);
      o.connect(f); f.connect(g); g.connect(pump); o.start(t0); o.stop(t0 + bar + .1);
    });
    // pad escuro, bem baixo
    chord.forEach(m => osc(t0, "sawtooth", mtof(m), .012, .8, bar, [pump], { f0:420, q:.7 }));
    for (let s = 0; s < 16; s++){
      const ts = t0 + s * step; if (ts > dur) break;
      if (s % 2 === 0) osc(ts, "sawtooth", mtof(root), .12, .005, step * 1.7, [pump], { f0:900, f1:110, q:9, d:step * 1.6 }); // baixo pulsante numa nota
      if (s === 0 || s === 10){ // bumbo meio-tempo
        const o = oc.createOscillator(), g = oc.createGain(); o.frequency.setValueAtTime(120, ts); o.frequency.exponentialRampToValueAtTime(38, ts + .16);
        g.gain.setValueAtTime(.95, ts); g.gain.exponentialRampToValueAtTime(.0001, ts + .5); o.connect(g); g.connect(comp); o.start(ts); o.stop(ts + .55);
        pump.gain.setValueAtTime(.35, ts); pump.gain.linearRampToValueAtTime(1, ts + beat * .8);
      }
      if (s === 8){ noise(ts, "bandpass", 1300, .7, .3, .35); noise(ts, "lowpass", 2500, .5, .08, 1.3, 600); } // caixa seca + cauda
      if (s % 2 === 1) noise(ts, "highpass", 8500, 1, s % 4 === 3 ? .03 : .012, .035);                       // chimbal discreto
      if (hash(b * 16 + s + key * 7) > .8 && b % 2 === 1) osc(ts, "square", mtof(chord[s % 3] + 24), .02, .003, .07, [comp, delay], { f0:3200 }); // bleeps digitais
    }
    if (b % 4 === 3) noise(t0 + bar - beat * 2, "highpass", 300, .8, .05, beat * 2, 6000);              // riser de transição
  }
}
let MIX = null;
async function buildMix(){
  const len = Math.ceil(END * SR);
  const voice = await new OfflineAudioContext(1, 1, SR).decodeAudioData(AUDIO_BYTES.buffer.slice(0));
  // renderiza 5 compassos e repete os 4 últimos (render offline fica muito lento em trechos longos)
  const bar = 4 * 60 / BPM, mc = new OfflineAudioContext(2, Math.ceil(5 * bar * SR), SR); synth(mc, mc.destination, 5 * bar, REEL.musicKey || 0);
  const seg = await mc.startRendering(), s0 = Math.round(bar * SR), sl = Math.round(4 * bar * SR);
  const tile = c => { const src = seg.getChannelData(c), o = new Float32Array(len); for (let i = 0; i < len; i++) o[i] = src[s0 + i % sl]; return o; };
  const mL = tile(0), mR = tile(1), v = voice.getChannelData(0), off = Math.round((REEL.aoff || 0) * SR);
  const rms = a => { let s = 0, n = 0; for (let i = 0; i < a.length; i += 7){ s += a[i] * a[i]; n++; } return Math.sqrt(s / n) || 1e-6; };
  const gm = .22 * rms(v) / rms(mL);
  const L = new Float32Array(len), R = new Float32Array(len); let peak = 0;
  for (let i = 0; i < len; i++){
    const t = i / SR, envm = Math.min(1, t / .8) * Math.min(1, (END - t) / 2.2);
    const vo = i >= off && i - off < v.length ? v[i - off] : 0;
    L[i] = vo + mL[i] * gm * envm; R[i] = vo + mR[i] * gm * envm;
    peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  }
  if (peak > .95){ const k = .95 / peak; for (let i = 0; i < len; i++){ L[i] *= k; R[i] *= k; } }
  return MIX = { L, R, len };
}

/* ---------- player + exportação ---------- */
const $ = id => document.getElementById(id);
const status = m => $("status").textContent = m;
const AUDIO_BYTES = (() => { const bin = atob(AUDIO_B64), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u; })();
let actx = null, src = null, playing = false, exporting = false, t0 = 0, scrubT = 0;
function play(from = scrubT){
  if (from >= END - .05) from = 0;
  actx = actx || new AudioContext({ sampleRate:SR });
  const buf = actx.createBuffer(2, MIX.len, SR); buf.copyToChannel(MIX.L, 0); buf.copyToChannel(MIX.R, 1);
  src = actx.createBufferSource(); src.buffer = buf; src.connect(actx.destination);
  actx.resume(); src.start(0, from);
  t0 = performance.now() - from * 1000; playing = true; $("play").textContent = "❚❚ Pausar";
}
function pause(){ if (src){ try { src.stop(); } catch {} src = null; } playing = false; $("play").textContent = "▶ Play com som"; }
function loop(now){
  if (!exporting){
    let t = playing ? (now - t0) / 1000 : scrubT;
    if (playing && t >= END){ t = END; scrubT = END; pause(); }
    if (playing){ scrubT = t; $("scrub").value = t; }
    drawFrame(ctx, t);
  }
  requestAnimationFrame(loop);
}
const yieldUI = () => new Promise(r => { const c = new MessageChannel(); c.port1.onmessage = r; c.port2.postMessage(0); });
async function exportMP4(){
  if (!window.VideoEncoder || !window.Mp4Muxer){ status("Este navegador não suporta exportação (use Chrome ou Edge atualizado)."); return; }
  pause(); exporting = true; $("rec").disabled = $("play").disabled = true; setQuality(1);
  try {
    const vcfg = ["avc1.640033", "avc1.4d0033", "avc1.42003e"].map(codec => ({ codec, width:W, height:H, bitrate:16e6, framerate:FPS }));
    let vc = null; for (const c of vcfg) if ((await VideoEncoder.isConfigSupported(c)).supported){ vc = c; break; }
    if (!vc) throw new Error("codificador H.264 indisponível");
    const acfg = { codec:"mp4a.40.2", sampleRate:SR, numberOfChannels:2, bitrate:192000 };
    const hasAAC = window.AudioEncoder && (await AudioEncoder.isConfigSupported(acfg)).supported;
    const muxer = new Mp4Muxer.Muxer({ target:new Mp4Muxer.ArrayBufferTarget(), fastStart:"in-memory",
      video:{ codec:"avc", width:W, height:H, frameRate:FPS }, ...(hasAAC ? { audio:{ codec:"aac", sampleRate:SR, numberOfChannels:2 } } : {}) });
    const venc = new VideoEncoder({ output:(c, m) => muxer.addVideoChunk(c, m), error:e => { throw e; } });
    venc.configure(vc);
    if (hasAAC){
      const aenc = new AudioEncoder({ output:(c, m) => muxer.addAudioChunk(c, m), error:e => { throw e; } });
      aenc.configure(acfg);
      for (let i = 0; i < MIX.len; i += 4096){
        const n = Math.min(4096, MIX.len - i), data = new Float32Array(n * 2);
        data.set(MIX.L.subarray(i, i + n), 0); data.set(MIX.R.subarray(i, i + n), n);
        aenc.encode(new AudioData({ format:"f32-planar", sampleRate:SR, numberOfFrames:n, numberOfChannels:2, timestamp:Math.round(i / SR * 1e6), data }));
      }
      await aenc.flush(); aenc.close();
    }
    const frames = Math.ceil(END * FPS);
    for (let i = 0; i < frames; i++){
      drawFrame(ctx, i / FPS);
      const fr = new VideoFrame(cv, { timestamp:Math.round(i * 1e6 / FPS), duration:Math.round(1e6 / FPS) });
      venc.encode(fr, { keyFrame:i % (FPS * 2) === 0 }); fr.close();
      while (venc.encodeQueueSize > 6) await new Promise(r => venc.addEventListener("dequeue", r, { once:true }));
      if (i % 3 === 0){ status(`Renderizando a 60fps… ${Math.round(i / frames * 100)}% — pode deixar a aba aberta`); await yieldUI(); }
    }
    await venc.flush(); venc.close(); muxer.finalize();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([muxer.target.buffer], { type:"video/mp4" }));
    a.download = REEL.file + ".mp4"; a.click();
    status(hasAAC ? "Pronto — MP4 60fps baixado." : "Pronto — MP4 baixado, mas SEM áudio (este navegador não codifica AAC).");
  } catch (e){ console.error(e); status("Erro na exportação: " + e.message); }
  setQuality(.5); exporting = false; $("rec").disabled = $("play").disabled = false;
}

// cenas sem câmera numérica ganham uma posição própria no espaço (cam:"same" reaproveita a anterior)
function normalizeScenes(){
  if (REEL.cams) return;
  REEL.cams = [];
  REEL.scenes.forEach((s, i) => {
    if (s.cam === "same" && i){ s.cam = REEL.scenes[i - 1].cam; return; }
    const side = i % 2 ? 1 : -1, d = { c:[side * (i ? 24 : 0), 0, -36 * i], R:19, h:1.5, a0:-.25 * side, spin:.05 * side, ty:-2.2 };
    REEL.cams.push(Object.assign(d, s.cam || {})); s.cam = REEL.cams.length - 1;
  });
  REEL.intro.c = REEL.intro.c || [-16, 2, 24];
  REEL.intro.cam = Object.assign({ c:REEL.intro.c, R:13, h:.6, a0:-.25, spin:.16, ty:-2.0 }, REEL.intro.cam || {});
}
async function boot(){
  cv = $("cv"); ctx = cv.getContext("2d"); cv.width = W; cv.height = H;
  $("legenda").textContent = REEL.legenda;
  $("copy").onclick = () => navigator.clipboard.writeText(REEL.legenda).then(() => status("Legenda copiada."));
  $("scrub").max = END;
  $("play").onclick = () => playing ? pause() : play();
  $("scrub").oninput = e => { pause(); scrubT = +e.target.value; };
  $("rec").onclick = exportMP4;
  normalizeScenes();
  REEL.scenes.forEach((s, i, S) => s.t1 = S[i + 1] ? S[i + 1].t0 : END); // fim de cada cena (os painéis 2D saem nele)
  CAM_T0 = REEL.cams.map((_, i) => { const s = REEL.scenes.find(s => s.cam === i); return s ? s.t0 : 0; });
  buildCaps();
  await Promise.all([400, 600, 800, 900].map(w => document.fonts.load(`${w} 80px Inter`)).concat([400, 600, 700].map(w => document.fonts.load(`${w} 30px "IBM Plex Mono"`))));
  LOGO = await new Promise((ok, fail) => { const i = new Image(); i.onload = () => ok(i); i.onerror = fail; i.src = LOGO_SRC; });
  await init3D();
  setQuality(.5);
  status("Preparando cenas e trilha…");
  await buildMix();
  renderer.compile(scene, camera);
  for (let t = 0; t < END; t += .5){ drawFrame(ctx, t); if (t % 4 < .5) await yieldUI(); }
  drawFrame(ctx, 0);
  status("Pronto. Clique em Play pra ver com a narração.");
  requestAnimationFrame(loop);
}

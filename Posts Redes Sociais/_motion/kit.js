/* =====================================================================
   Kit de cenas dos Reels YRA — peças prontas que se montam com a narração.
   Uso no roteiro: scenes:[{ t0, cam:{...}, parts:[ K.cards({...}), K.topPanel({...}) ] }]
   Toda peça respeita as zonas da tela: conteúdo 285–1075 (título e legenda ficam abaixo).
   ===================================================================== */

const GOOGLE_G = [
  { d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill:"#4285F4" },
  { d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill:"#34A853" },
  { d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill:"#FBBC05" },
  { d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill:"#EA4335" },
];
// logo 2D de uma marca do BRANDS (degradê nas cores oficiais); "google" usa o G colorido
function drawBrand(c, name, x, y, size, alpha = 1){
  if (name === "google"){ drawLogo(c, GOOGLE_G, 24, x, y, size, 0, alpha); return; }
  const b = BRANDS[name]; if (!b) return;
  drawLogo(c, [{ d:b.d, fill:(cx, vb) => { if (b.stops.length < 2) return b.stops[0]; const g = cx.createLinearGradient(0, vb, vb, 0); b.stops.forEach((s, i) => g.addColorStop(i / (b.stops.length - 1), s)); return g; } }], 24, x, y, size, 0, alpha);
}
const brandIcon = (name, size) => (c, x, y) => drawBrand(c, name, x, y, size);
function brand3D(name, size, depth = .5){
  const b = BRANDS[name];
  const geo = svgLogo3D(b.d, 24, size, depth, b.stops.length > 1 ? b.stops : null);
  const m = b.stops.length > 1
    ? new THREE.MeshStandardMaterial({ vertexColors:true, metalness:.05, roughness:.4, envMapIntensity:.35 })
    : mat(parseInt(b.stops[0].slice(1), 16), { metalness:.1, roughness:.35, clearcoat:.6, clearcoatRoughness:.25, envMapIntensity:.7 });
  return new THREE.Mesh(geo, m);
}
function drawFlag(ctx, code, x, y, w, h){
  ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, 8); ctx.clip();
  if (code === "US"){
    for (let i = 0; i < 13; i++){ ctx.fillStyle = i % 2 ? "#ffffff" : "#b22234"; ctx.fillRect(x, y + i * h / 13, w, h / 13 + 1); }
    ctx.fillStyle = "#3c3b6e"; ctx.fillRect(x, y, w * .42, h * 7 / 13);
  } else if (code === "IN"){
    ["#ff9933", "#ffffff", "#138808"].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(x, y + i * h / 3, w, h / 3 + 1); });
    ctx.strokeStyle = "#000080"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x + w / 2, y + h / 2, h * .13, 0, 7); ctx.stroke();
  } else if (code === "UK"){
    ctx.fillStyle = "#012169"; ctx.fillRect(x, y, w, h); ctx.strokeStyle = "#fff"; ctx.lineWidth = h * .2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y + h); ctx.moveTo(x + w, y); ctx.lineTo(x, y + h); ctx.stroke();
    ctx.lineWidth = h * .3; ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h); ctx.moveTo(x, y + h / 2); ctx.lineTo(x + w, y + h / 2); ctx.stroke();
    ctx.strokeStyle = "#C8102E"; ctx.lineWidth = h * .16; ctx.stroke();
  } else {
    ctx.fillStyle = "#009c3b"; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#ffdf00"; ctx.beginPath(); ctx.moveTo(x + w / 2, y + h * .1); ctx.lineTo(x + w * .92, y + h / 2); ctx.lineTo(x + w / 2, y + h * .9); ctx.lineTo(x + w * .08, y + h / 2); ctx.fill();
    ctx.fillStyle = "#002776"; ctx.beginPath(); ctx.arc(x + w / 2, y + h / 2, h * .24, 0, 7); ctx.fill();
  }
  ctx.restore();
  ctx.strokeStyle = "rgba(255,255,255,.25)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.roundRect(x, y, w, h, 8); ctx.stroke();
}
const flagIcon = code => (c, x, y) => drawFlag(c, code, x - 30, y - 20, 60, 40);
const iconOf = v => typeof v === "function" ? v : v ? (BRANDS[v] || v === "google" ? brandIcon(v, 48) : flagIcon(v)) : null;
// envelope padrão de uma cena: entra junto com a cena, sai antes da próxima
const life = (t, s, pad = 0) => p(t, s.t0 + pad, .5) * (1 - p(t, s.t1 - .45, .4));
// formas wireframe de fundo (cenas com painel 2D)
function bgWires(g, seed = 0){
  const w = [wire(new THREE.TorusGeometry(6 + seed % 3, 1.1, 8, 28), .2), wire(new THREE.IcosahedronGeometry(3.3, 1), .28), wire(new THREE.TorusGeometry(8.5, .2, 4, 60), .25)];
  w.forEach(x => g.add(x)); return t => { w[0].rotation.set(t * .12 + seed, t * .18, 0); w[1].rotation.set(-t * .2, t * .1 + seed, 0); w[2].rotation.set(1.1, t * .1, t * .05); };
}

const K = {
  /* texto 3D grande (número, data, sigla) com objetos orbitando e mira que trava nele */
  text3D(o){ return {
    build(A, M, g, s){ this.m = text3D(o.text, o.size || 2.4, o.mat === "ink" ? M.ink : M.red); g.add(this.m); this.g = g;
      const geos = [new THREE.SphereGeometry(.34, 32, 16), new THREE.IcosahedronGeometry(.4, 0), new THREE.TorusGeometry(.32, .12, 16, 40), new THREE.BoxGeometry(.48, .48, .48)];
      this.orb = Array.from({ length:o.orbit === false ? 0 : 9 }, (_, i) => { const m = new THREE.Mesh(geos[i % 4], [M.red, M.dark, M.ink][i % 3]); g.add(m); return { m, r:4.6 + hash(i) * 2.4, sp:.2 + hash(i + 9) * .3, ph:hash(i + 3) * 6.28, y:-2.2 + hash(i + 5) * 4.6 }; }); },
    animate(t, s){ const a0 = o.at ?? s.t0 + .2; this.m.visible = t > a0 - .05;
      this.m.scale.setScalar(Math.max(.001, eBack(clamp((t - a0) / .9)))); this.m.rotation.y = -1.4 * (1 - eOut(clamp((t - a0) / 1.5))) + Math.sin(t * .7) * .25; this.m.position.y = Math.sin(t * 1.2) * .15;
      this.orb.forEach(q => { const a = q.ph + t * q.sp; q.m.position.set(Math.cos(a) * q.r, q.y + Math.sin(t * .8 + q.ph) * .4, Math.sin(a) * q.r * .6); q.m.rotation.set(t * .7 + q.ph, t * .5, 0); }); },
    draw(ctx, t, s){ if (!o.lock || t < o.lock.at || t > s.t1) return;
      const hw = o.lock.hw || 3, hh = o.lock.hh || 1.4, b = screenBox(this.g, [[-hw, -hh, 0], [hw, hh, 0]]), k = p(t, o.lock.at, .8), out = p(t, s.t1 - .4, .3);
      const x0 = lerp(70, b.x0 - 30, k), x1 = lerp(W - 70, b.x1 + 30, k), y0 = lerp(300, b.y0 - 30, k), y1 = lerp(1070, b.y1 + 30, k);
      ctx.save(); ctx.globalAlpha = clamp((t - o.lock.at) * 4) * (1 - out);
      brackets(ctx, x0, y0, x1, y1, 44, k > .98 ? C2.neonB : "rgba(244,239,233,.7)", 4);
      if (k > .98) mono(ctx, typed(o.lock.label, t, o.lock.at + .8, 30), x0, y1 + 32, { size:21, color:C2.neonB, weight:700 });
      ctx.restore(); } }; },

  /* logo 3D de uma marca no centro da cena; opcional: "apaga" (die) e contagem regressiva em volta */
  logo3D(o){ return {
    build(A, M, g){ this.M = M; this.m = brand3D(o.brand, o.size || 3.6, o.depth || .5); this.live = this.m.material; this.glow = glowPlane(11, o.glow || "rgba(217,74,58,.3)"); this.glow.position.z = -1.4; g.add(this.glow, this.m); this.g = g; },
    animate(t, s){ const a0 = o.at ?? s.t0, d = o.die ? eInOut(clamp((t - o.die + .1) / .6)) : 0;
      this.m.scale.setScalar(Math.max(.001, eBack(clamp((t - a0) / .9))));
      this.m.rotation.set(Math.sin(t * .8) * .1, Math.sin(t * .6) * .45 + (d > 0 && d < 1 ? (hash(Math.floor(t * 30)) - .5) * .3 : 0), 0);
      this.m.position.y = Math.sin(t * 1.3) * .12;
      this.m.material = d > .5 ? this.M.dead : this.live; // "apagou": perde a cor da marca
      this.glow.material.opacity = (1 - d) * (.8 + .2 * Math.sin(t * 3)); },
    draw(ctx, t, s){
      if (o.countdown){ const c = toScreen(this.g, new THREE.Vector3(0, 0, 0)), a = life(t, s), end = o.countdown.end, left = 1 - clamp((t - s.t0 - .3) / (end - s.t0 - .3)), r = 330;
        ctx.save(); ctx.globalAlpha = a;
        ctx.strokeStyle = "rgba(244,239,233,.1)"; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, 7); ctx.stroke();
        ctx.strokeStyle = left > 0 ? C2.neonB : C2.mute; ctx.shadowColor = C2.neonB; ctx.shadowBlur = left > 0 ? 20 : 0;
        ctx.beginPath(); ctx.arc(c.x, c.y, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * left); ctx.stroke(); ctx.shadowBlur = 0;
        for (let i = 0; i < 60; i++){ const an = i / 60 * Math.PI * 2 - Math.PI / 2, r2 = i % 5 ? r + 26 : r + 36; ctx.strokeStyle = i / 60 < left ? "rgba(244,239,233,.5)" : "rgba(244,239,233,.12)"; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(c.x + Math.cos(an) * (r + 18), c.y + Math.sin(an) * (r + 18)); ctx.lineTo(c.x + Math.cos(an) * r2, c.y + Math.sin(an) * r2); ctx.stroke(); }
        mono(ctx, o.countdown.label + "  ·  00:0" + Math.ceil(left * 9), c.x, c.y - r - 62, { align:"center", size:24, ls:5, color:left > 0 ? C2.ink : C2.neonB, weight:700 });
        if (o.countdown.stamp) stamp(ctx, t, end - .05, o.countdown.stamp, c.x, c.y + 10, -.14);
        ctx.restore(); }
      if (o.chip){ const pt = toScreen(this.g, new THREE.Vector3(0, -(o.size || 3.6) / 2 - .6, 0)); chip(ctx, pt.x, pt.y, o.chip.text, p(t, o.chip.at, .4) * (1 - p(t, s.t1 - .4, .3)), true); } } }; },

  /* várias logos 3D em arco; cada uma entra quando a marca é falada, com etiqueta embaixo */
  logos(o){ return {
    build(A, M, g){ this.g = g; const n = o.items.length, sp = o.spacing || 3.4;
      this.items = o.items.map((it, i) => { const m = brand3D(it.brand, it.size || 2.5, .45), gg = new THREE.Group(); gg.add(m); gg.position.set((i - (n - 1) / 2) * sp, (it.y || 0) + Math.abs(i - (n - 1) / 2) * -.3, -Math.abs(i - (n - 1) / 2) * .8); g.add(gg); return Object.assign({ m, gg }, it); }); },
    animate(t){ this.items.forEach((it, i) => { const a = eBack(clamp((t - it.at) / .8)); it.m.scale.setScalar(Math.max(.001, a)); it.m.rotation.y = -Math.PI * (1 - eOut(clamp((t - it.at) / 1.2))) + Math.sin(t * .9 + i) * .3; it.m.position.y = Math.sin(t * 1.3 + i) * .12; it.m.visible = t > it.at - .05; }); },
    draw(ctx, t, s){ this.items.forEach(it => { if (!it.label) return; const pt = toScreen(it.gg, new THREE.Vector3(0, -(it.size || 2.5) / 2 - .55, 0)); chip(ctx, pt.x, pt.y, it.label, p(t, it.at + .3, .4) * (1 - p(t, s.t1 - .4, .3)), it.hl); }); } }; },

  /* cards 3D (até 3) com estados: "on" acende em vermelho, "lock" recebe cadeado e recua */
  cards(o){ return {
    build(A, M, g){ const cw = o.w || 3, ch = o.h || 4, geo = rcard(cw, ch, .14, .28), n = o.items.length, gap = o.gap || cw + .3; this.M = M;
      this.items = o.items.map((it, i) => {
        const tex = canvasTex(600, 800, (x, w, h) => {
          if (it.brand) drawBrand(x, it.brand, 92, 92, 84); else if (it.flag) drawFlag(x, it.flag, 46, 56, 100, 68);
          x.font = `700 28px ${MONO}`; x.fillStyle = "rgba(244,239,233,.7)"; x.fillText(it.kicker || "", 48, 210);
          x.fillStyle = "#fff"; it.lines.forEach((l, j) => { fitFont(x, l, 900, 118, w - 96); x.fillText(l, 48, 430 + j * 112 - (it.lines.length - 1) * 56); });
          x.font = `700 26px ${MONO}`; x.fillStyle = "rgba(244,239,233,.65)"; x.fillText(it.foot || "", 48, h - 64);
        });
        const grp = new THREE.Group(), body = new THREE.Mesh(geo, M.dark); grp.add(body, facePlane(cw, ch, tex, .12));
        grp.position.x = (i - (n - 1) / 2) * gap; grp.rotation.y = -grp.position.x * .06; g.add(grp);
        return Object.assign({ grp, body, i, ch }, it);
      }); },
    animate(t, s){ this.items.forEach(m => {
      const inn = eBack(clamp((t - (m.in ?? s.t0 + .15 + m.i * .15)) / .6)), on = m.state === "on" && t > m.at, lock = m.state === "lock" ? eInOut(clamp((t - m.at) / .6)) : 0;
      m.grp.scale.setScalar(Math.max(.001, inn) * (on ? 1 + .06 * eBack(clamp((t - m.at) / .4)) : 1));
      m.grp.rotation.x = -.45 * lock; m.grp.position.z = -1.6 * lock; m.grp.position.y = Math.sin(t * 1.1 + m.i) * .1;
      m.body.material = on ? this.M.red : lock > .3 ? this.M.dead : this.M.dark; }); },
    draw(ctx, t, s){ const out = 1 - p(t, s.t1 - .4, .35);
      this.items.forEach(m => { if (!m.chip || t < m.at) return;
        const a = p(t, m.at, .35) * out, pt = toScreen(m.grp, new THREE.Vector3(0, -m.ch / 2 - .55, 0));
        chip(ctx, pt.x, pt.y + 26, m.chip, a, m.state === "on", m.state === "lock" ? (c, x, y) => drawLock(c, x, y - 8, 22, "#fff") : null);
        if (m.state === "lock"){ const c = toScreen(m.grp, new THREE.Vector3(0, -.95, .2)), k = eBack(clamp((t - m.at) / .4));
          ctx.save(); ctx.globalAlpha = a; ctx.translate(c.x, c.y); ctx.scale(k, k); ctx.shadowColor = "rgba(0,0,0,.8)"; ctx.shadowBlur = 20; drawLock(ctx, 0, -20, 76, C2.ink); ctx.restore(); } }); } }; },

  /* pergunta final: dois cards 3D (A vermelho × B escuro), selo VS e "?" 3D; opcional: B cai (fall) */
  versus(o){ return {
    build(A, M, g){ this.g = g; const bg = rcard(3.6, 4.8, .14, .32);
      const tex = (kicker, lines, col, kcol) => canvasTex(720, 960, (x, w, h) => { x.font = `700 34px ${MONO}`; x.fillStyle = kcol; x.fillText(kicker, 56, 96);
        x.fillStyle = col; lines.forEach((l, i) => { fitFont(x, l, 900, 120, w - 112); x.fillText(l, 56, h - 80 - (lines.length - 1 - i) * 118); }); });
      this.a = new THREE.Group(); this.a.add(new THREE.Mesh(bg, M.red), facePlane(3.6, 4.8, tex(o.a.kicker || "OPÇÃO A", o.a.lines, "#fff", "rgba(255,255,255,.8)"), .15));
      this.bp = new THREE.Group(); this.bp.position.set(2.15, -2.4, 0);
      this.b = new THREE.Group(); this.b.add(new THREE.Mesh(bg, M.dark), facePlane(3.6, 4.8, tex(o.b.kicker || "OPÇÃO B", o.b.lines, "#9c9088", "#d94a3a"), .15)); this.b.position.y = 2.4; this.bp.add(this.b);
      this.a.position.x = -2.15; g.add(this.a, this.bp);
      this.q = text3D("?", 1.8, M.ink); this.q.position.set(0, 3.1, -1.2); g.add(this.q); },
    animate(t, s){ const ka = eOut(clamp((t - o.a.at) / 1)), kb = eOut(clamp((t - o.b.at) / 1)), f = o.fall ? eInOut(clamp((t - o.fall) / .9)) : 0;
      this.a.visible = t > o.a.at; this.b.visible = t > o.b.at;
      this.a.rotation.y = .2 + (1 - ka) * Math.PI * .9 + Math.sin(t * 1.3) * .05; this.a.position.y = Math.sin(t * 1.4) * .12; this.a.position.x = -2.15 + 1.6 * f; this.a.scale.setScalar(1 + .08 * f);
      this.b.rotation.y = -.2 - (1 - kb) * Math.PI * .9 + Math.sin(t * 1.3 + 1) * .05; this.bp.rotation.x = -1.45 * f; this.bp.position.x = 2.15 + .8 * f;
      const q = o.q ? eBack(clamp((t - o.q) / .6)) : 0; this.q.visible = !!o.q && t > o.q - .05; this.q.scale.setScalar(Math.max(.001, q)); this.q.rotation.y = Math.sin(t * 1.5) * .5; },
    draw(ctx, t){ const v = o.b.at + .3; if (t < v || o.fall && t > o.fall) return;
      const c = toScreen(this.g, new THREE.Vector3(0, 0, 1)), k = eBack(clamp((t - v) / .4));
      ctx.save(); ctx.globalAlpha = clamp((t - v) * 4) * (1 - p(t, END - .8, .5)); ctx.translate(c.x, c.y); ctx.scale(k, k);
      ctx.beginPath(); ctx.arc(0, 0, 46, 0, 7); ctx.fillStyle = C2.ground; ctx.fill(); ctx.strokeStyle = C2.neonB; ctx.lineWidth = 3; ctx.shadowColor = C2.neonB; ctx.shadowBlur = 24; ctx.stroke(); ctx.shadowBlur = 0;
      mono(ctx, "VS", 0, 2, { align:"center", size:26, weight:700, color:C2.neonB, ls:2 }); ctx.restore(); } }; },

  /* fluxograma/roadmap 2D num painel HUD (nós e setas aparecem na hora da fala) */
  graph(o){ return {
    build(A, M, g){ this.wires = bgWires(g, o.seed || 1); }, animate(t){ this.wires(t); },
    draw(ctx, t, s){ if (!env(ctx, t, s.t0, s.t1, W/2, 680)) return;
      hudPanel(ctx, X0, 285, MAXW, 790, o.title, t, o.titleIcon ? (x, y) => iconOf(o.titleIcon)(ctx, x, y) : null);
      drawGraph(ctx, t, { nodes:o.nodes.map(n => Object.assign({}, n, { icon:iconOf(n.icon) })), edges:o.edges }); ctx.restore(); } }; },

  /* roadmap vertical simples: passos em sequência (gera o layout sozinho) */
  steps(o){ const n = o.items.length, h = o.h || 108, gap = (700 - n * h) / Math.max(1, n - 1), x = X0 + 40, w = MAXW - 80;
    return K.graph({ title:o.title, titleIcon:o.titleIcon, seed:o.seed,
      nodes:o.items.map((it, i) => ({ id:"s" + i, x:it.w ? x + (w - it.w) / 2 : x, y:360 + i * (h + gap), w:it.w || w, h, label:it.label, sub:it.sub, cue:it.at, icon:it.icon, style:it.style })),
      edges:o.items.slice(1).map((it, i) => ({ a:"s" + i, b:"s" + (i + 1), cue:it.at - .3, style:it.edge })) }); },

  /* número grande que conta + barras/linhas de ranking */
  stat(o){ return {
    build(A, M, g){ this.wires = bgWires(g, o.seed || 2); }, animate(t){ this.wires(t); },
    draw(ctx, t, s){ if (!env(ctx, t, s.t0, s.t1, W/2, 680)) return;
      hudPanel(ctx, X0, 285, MAXW, 790, o.title, t, o.titleIcon ? (x, y) => iconOf(o.titleIcon)(ctx, x, y) : null);
      const k = p(t, o.at, o.dur || 1.6, x => 1 - Math.pow(1 - x, 4)), v = (o.from || 0) + (o.value - (o.from || 0)) * k;
      const str = (o.prefix || "") + (o.decimals ? v.toFixed(o.decimals) : Math.round(v).toLocaleString("pt-BR")).replace(".", ",") + (o.suffix || "");
      ctx.save(); ctx.globalAlpha *= p(t, o.at - .1, .4); ctx.font = `900 ${o.size || 190}px ${SANS}`; ctx.fillStyle = C2.neonB; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
      ctx.shadowColor = "rgba(217,74,58,.6)"; ctx.shadowBlur = 50; fitFont(ctx, str, 900, o.size || 190, MAXW - 80); ctx.fillText(str, X0 + 40, 540); ctx.restore();
      text(ctx, t, o.label, { y:580, size:40, weight:800, lh:1.1, start:o.at + .3, maxW:MAXW - 80, x:X0 + 40 });
      const rows = o.rows || [], max = Math.max(...rows.map(r => r.v || 0), 1), y0 = 1060 - rows.length * 104;
      rows.forEach((r, i) => { const a = p(t, r.at, .45); if (a <= 0) return; const ry = y0 + i * 104;
        ctx.save(); ctx.globalAlpha *= a; ctx.translate((1 - a) * 40, 0);
        ctx.beginPath(); ctx.roundRect(X0 + 32, ry, MAXW - 64, 88, 16); ctx.fillStyle = r.hl ? "rgba(184,38,28,.24)" : "rgba(244,239,233,.05)"; ctx.fill();
        if (r.hl){ ctx.strokeStyle = C2.neonB; ctx.lineWidth = 3; ctx.stroke(); }
        const ic = iconOf(r.icon); if (ic) ic(ctx, X0 + 82, ry + 44);
        ctx.font = `${r.hl ? 900 : 800} 30px ${SANS}`; ctx.fillStyle = C2.ink; ctx.textAlign = "left"; ctx.textBaseline = "middle"; const lx = X0 + (ic ? 130 : 60); ctx.fillText(r.label.toUpperCase(), lx, ry + 46); const lEnd = lx + ctx.measureText(r.label.toUpperCase()).width;
        if (r.v != null){ const q = p(t, r.at + .1, 1.1), bx = Math.max(X0 + 430, lEnd + 28), bw = X0 + MAXW - 170 - bx; // barra sempre depois do rótulo
          ctx.fillStyle = "rgba(244,239,233,.08)"; ctx.fillRect(bx, ry + 38, bw, 12); ctx.fillStyle = r.hl ? C2.neonB : "rgba(244,239,233,.4)"; ctx.fillRect(bx, ry + 38, bw * r.v / max * q, 12);
          mono(ctx, (r.v * q).toFixed(r.dec ?? 1).replace(".", ",") + (r.unit ?? "%"), X0 + MAXW - 60, ry + 45, { size:28, weight:700, color:r.hl ? C2.neonB : C2.mute, align:"right", ls:1 }); }
        else if (r.note) mono(ctx, r.note, X0 + MAXW - 60, ry + 45, { size:20, weight:700, color:C2.neonB, align:"right", ls:2 });
        ctx.restore(); });
      ctx.restore(); } }; },

  /* chat de IA: pedidos aparecem conforme a fala, IA "digitando"; núcleo 3D atrás */
  chat(o){ return {
    build(A, M, g){ this.core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4, 5), M.glow); this.shell = wire(new THREE.IcosahedronGeometry(2.1, 1), .4); g.add(this.core, this.shell); },
    animate(t){ this.core.rotation.set(t * .2, t * .3, 0); this.core.scale.setScalar(1 + .04 * Math.sin(t * 3)); this.shell.rotation.set(-t * .15, -t * .22, 0); },
    draw(ctx, t, s){ if (!env(ctx, t, s.t0, s.t1, W/2, 700)) return;
      const x = X0, y = 300, w = MAXW, h = 760;
      hudPanel(ctx, x, y, w, h, o.title || "ASSISTENTE DE IA", t, (px, py) => mono(ctx, "● ONLINE", px - 20, py, { size:18, color:C2.neonB, weight:700, ls:2, align:"right" }));
      ctx.save(); ctx.beginPath(); ctx.rect(x, y + 76, w, h - 76); ctx.clip();
      const vis = o.prompts.filter(q => t > q[0]), bh = 92, gap = 20, bottom = y + h - 120;
      vis.forEach(([cue, str], i) => {
        let slot = 0; for (let j = i + 1; j < vis.length; j++) slot += eOut(clamp((t - vis[j][0]) / .4));
        const a = p(t, cue, .35), by = bottom - bh - slot * (bh + gap) + (1 - a) * 40;
        ctx.font = `600 32px ${SANS}`; const tw = Math.min(ctx.measureText(str).width, w - 140), bw = tw + 70, bx = x + w - 36 - bw;
        ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, [28, 28, 6, 28]); ctx.fillStyle = C2.neon; ctx.fill();
        ctx.fillStyle = "#fff"; ctx.textAlign = "left"; ctx.textBaseline = "middle"; ctx.fillText(typed(str, t, cue + .1, 40), bx + 35, by + bh / 2 + 2); ctx.restore();
      });
      if (vis.length){ const a = p(t, vis[vis.length - 1][0] + .45, .3);
        ctx.save(); ctx.globalAlpha *= a; if (o.avatar) iconOf(o.avatar)(ctx, x + 70, bottom + 50);
        ctx.beginPath(); ctx.roundRect(x + 112, bottom + 14, 150, 72, [6, 28, 28, 28]); ctx.fillStyle = "rgba(244,239,233,.1)"; ctx.fill();
        for (let i = 0; i < 3; i++){ const j = Math.max(0, Math.sin(t * 8 - i * .9)); ctx.fillStyle = "rgba(244,239,233,.85)"; ctx.beginPath(); ctx.arc(x + 156 + i * 32, bottom + 50 - j * 8, 7, 0, 7); ctx.fill(); }
        ctx.restore(); }
      ctx.restore(); ctx.restore(); } }; },

  /* comparativo: bloco "ruim" em cima, bloco "bom" embaixo; itens entram com a fala */
  compare(o){ return {
    build(A, M, g){ this.wires = bgWires(g, o.seed || 3); }, animate(t){ this.wires(t); },
    draw(ctx, t, s){ if (!env(ctx, t, s.t0, s.t1, W/2, 680)) return;
      [[o.bad, 290, false], [o.good, 690, true]].forEach(([b, y, good]) => {
        const a = p(t, b.at, .45); if (a <= 0) return;
        ctx.save(); ctx.globalAlpha *= a; ctx.translate(0, (1 - a) * 30);
        ctx.beginPath(); ctx.roundRect(X0, y, MAXW, 370, 26);
        if (good){ const gr = ctx.createLinearGradient(X0, y, X0 + MAXW, y + 370); gr.addColorStop(0, "rgba(184,38,28,.32)"); gr.addColorStop(1, "rgba(184,38,28,.06)"); ctx.fillStyle = gr; ctx.fill(); ctx.strokeStyle = "rgba(217,74,58,.6)"; }
        else { ctx.fillStyle = "rgba(18,15,14,.85)"; ctx.fill(); ctx.strokeStyle = "rgba(244,239,233,.16)"; }
        ctx.lineWidth = 2.5; ctx.stroke();
        ctx.font = `900 34px ${SANS}`; ctx.fillStyle = good ? C2.neonB : C2.mute; ctx.textAlign = "left"; ctx.textBaseline = "middle"; ctx.fillText(b.title.toUpperCase(), X0 + 36, y + 52);
        const ic = iconOf(b.icon); if (ic) ic(ctx, X0 + MAXW - 70, y + 52);
        b.items.forEach(([cue, txt], i) => { const k = p(t, cue, .35); if (k <= 0) return; const iy = y + 122 + i * 66;
          ctx.save(); ctx.globalAlpha *= k; ctx.translate((1 - k) * 30, 0);
          ctx.beginPath(); ctx.arc(X0 + 56, iy, 19, 0, 7); ctx.fillStyle = good ? C2.neon : "rgba(244,239,233,.14)"; ctx.fill();
          ctx.font = `900 20px ${SANS}`; ctx.fillStyle = good ? "#fff" : "#c9c0b8"; ctx.textAlign = "center"; ctx.fillText(good ? "✓" : "✕", X0 + 56, iy + 1);
          ctx.font = `600 30px ${SANS}`; ctx.fillStyle = good ? C2.ink : "#b9b0a8"; ctx.textAlign = "left"; ctx.fillText(txt, X0 + 94, iy + 2);
          ctx.restore(); });
        ctx.restore(); });
      ctx.restore(); } }; },

  /* checklist num painel: itens marcam ✓ / ✕ / ⚠ conforme a fala */
  checklist(o){ return {
    build(A, M, g){ this.wires = bgWires(g, o.seed || 4); }, animate(t){ this.wires(t); },
    draw(ctx, t, s){ if (!env(ctx, t, s.t0, s.t1, W/2, 680)) return;
      hudPanel(ctx, X0, 285, MAXW, 790, o.title, t, o.titleIcon ? (x, y) => iconOf(o.titleIcon)(ctx, x, y) : null);
      const n = o.items.length, step = Math.min(124, 640 / n);
      o.items.forEach(([cue, txt, st], i) => { const a = p(t, cue, .4); const y = 400 + i * step;
        ctx.save(); ctx.globalAlpha *= a > 0 ? a : .35; ctx.translate((1 - Math.max(a, 0)) * 30, 0);
        ctx.beginPath(); ctx.roundRect(X0 + 32, y, MAXW - 64, step - 18, 16); ctx.fillStyle = a > 0 && st === "ok" ? "rgba(184,38,28,.18)" : "rgba(244,239,233,.05)"; ctx.fill();
        const cy = y + (step - 18) / 2, bad = st === "bad", warn = st === "warn";
        ctx.beginPath(); ctx.arc(X0 + 80, cy, 22, 0, 7); ctx.fillStyle = a <= 0 ? "rgba(244,239,233,.1)" : bad ? "rgba(244,239,233,.16)" : warn ? "#b8861c" : C2.neon; ctx.fill();
        ctx.font = `900 22px ${SANS}`; ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(a <= 0 ? "" : bad ? "✕" : warn ? "!" : "✓", X0 + 80, cy + 1);
        ctx.font = `700 31px ${SANS}`; ctx.fillStyle = a > 0 ? C2.ink : C2.mute; ctx.textAlign = "left"; ctx.fillText(txt, X0 + 124, cy + 2);
        ctx.restore(); });
      ctx.restore(); } }; },

  /* terminal: linhas digitadas na hora certa (cenas de dev) */
  terminal(o){ return {
    build(A, M, g){ this.wires = bgWires(g, o.seed || 5); }, animate(t){ this.wires(t); },
    draw(ctx, t, s){ if (!env(ctx, t, s.t0, s.t1, W/2, 680)) return;
      ctx.beginPath(); ctx.roundRect(X0, 300, MAXW, 760, 22); ctx.fillStyle = "rgba(14,12,11,.92)"; ctx.fill(); ctx.strokeStyle = C2.line; ctx.lineWidth = 2; ctx.stroke();
      ["#b8261c", "#5a524c", "#5a524c"].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(X0 + 36 + i * 28, 340, 8, 0, 7); ctx.fill(); });
      mono(ctx, o.title || "terminal", W/2, 341, { align:"center", size:20, ls:2 }); ctx.fillStyle = C2.line; ctx.fillRect(X0, 376, MAXW, 1.5);
      const vis = o.lines.filter(l => t > l[0]); let cur = -1;
      vis.forEach(([cue, ln], i) => { const shown = typed(ln, t, cue, 30), y = 430 + i * 62; cur = i;
        const head = /^[$>✓✕!]/.test(ln) ? ln[0] : "", col = ln.startsWith("//") ? C2.mute : ln.startsWith("✕") || ln.startsWith("!") ? "#ff8a7a" : C2.ink;
        ctx.font = `500 30px ${MONO}`; ctx.textAlign = "left"; ctx.textBaseline = "middle";
        let x = X0 + 36; if (head && shown.length){ ctx.fillStyle = C2.neonB; ctx.fillText(head, x, y); x += ctx.measureText(head).width; }
        ctx.fillStyle = col; ctx.fillText(head ? shown.slice(1) : shown, x, y);
        if (i === vis.length - 1 && Math.floor(t * 2.5) % 2){ x += ctx.measureText(head ? shown.slice(1) : shown).width + 4; ctx.fillStyle = C2.neonB; ctx.fillRect(x, y - 16, 16, 32); } });
      ctx.restore(); } }; },

  /* painel pequeno no topo (fonte/novidade) */
  topPanel(o){ return { draw(ctx, t, s){ if (!env(ctx, t, o.at, s.t1, W/2, 380)) return;
    hudPanel(ctx, X0, 290, MAXW, 172, o.title, t);
    const ic = iconOf(o.icon); if (ic) ic(ctx, X0 + 56, 412);
    ctx.font = `800 ${o.size || 36}px ${SANS}`; ctx.fillStyle = C2.ink; ctx.textAlign = "left"; ctx.textBaseline = "middle";
    ctx.fillText(typed(o.line1, t, o.at + .2, 34), X0 + (ic ? 100 : 40), 400);
    if (o.line2) mono(ctx, typed(o.line2, t, o.at + .7, 34), X0 + (ic ? 100 : 40), 438, { size:19, ls:3, color:C2.neonB, weight:700 });
    ctx.restore(); } }; },

  /* carimbo animado (ex.: "EXPIRADO") — posição em coordenadas de tela */
  stamp(o){ return { draw(ctx, t, s){ if (t > s.t1 - .3) return; stamp(ctx, t, o.at, o.text, o.x || W/2, o.y || 700, o.rot ?? -.12); } }; },
};

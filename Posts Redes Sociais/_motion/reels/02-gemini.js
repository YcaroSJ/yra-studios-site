/* Reel 02 — Gemini grátis tem prazo de validade (fatos: Google, out/2026 — Olhar Digital, PC Labs, DM) */

// logos oficiais (Wikimedia Commons)
const GEM_D = "M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z";
const GEM_STOPS = ["#9168C0", "#5684D1", "#1BA1E3"];
const GEM2D = [{ d:GEM_D, fill:(c, vb) => { const g = c.createLinearGradient(0, vb, vb, 0); GEM_STOPS.forEach((s, i) => g.addColorStop(i / 2, s)); return g; } }];
// GOOGLE_G vem do kit.js
const gemIcon = s => (c, x, y) => drawLogo(c, GEM2D, 65, x, y, s);
const gIcon = s => (c, x, y) => { c.save(); c.beginPath(); c.arc(x, y, s * .62, 0, 7); c.fillStyle = "#fff"; c.fill(); c.restore(); drawLogo(c, GOOGLE_G, 24, x, y, s * .85); };

const REEL = {
  title:"YRA Motion 02 — Gemini grátis tem prazo de validade",
  file:"yra-motion-02-gemini",
  legenda:`Usa o Gemini de graça? Presta atenção 👀 Desde 9 de outubro, o Google mudou as regras: quem não paga ficou só com o Gemini Flash-Lite. O Flash e o Pro agora são exclusivos de quem assina.

Como ficou:
🔹 Gratuito → só Flash-Lite
🔹 Google AI Plus → Flash-Lite + Flash
🔹 Google AI Pro e Ultra → tudo, incluindo o novo modo Deep Think

Moral da história: IA de graça tem prazo de validade. E aí, você vai assinar ou partir pra próxima IA grátis? 🤔
.
.
.
#yrastudios #gemini #google #inteligenciaartificial #ia #tecnologia #marketingdigital #inovacao #produtividade #googleai`,
  // grafia fonética na narração → grafia correta na legenda
  captionMap:{ "Laite":"Lite", "Êi":"AI", "Ai":"", "Plâs":"Plus", "Dip":"Deep", "Tink":"Think" },
  musicKey:-2,
  intro:{ c:[-16, 2, 24], cam:{ c:[-16, 2, 24], R:13, h:.6, a0:-.25, spin:.16, ty:-2.0 }, paths:GEM_D, vb:65, size:3.3, depth:.5,
    stops:GEM_STOPS, emissive:0x000000, glow:"rgba(86,132,209,.4)", name:"GEMINI", sub:"IA DO GOOGLE", subColor:"#5f9cf0", leave:at("desde") - .35 },
  cams:[
    { c:[0, 0, 0],      R:21, h:1.5, a0:-.35, spin:.08,  ty:-2.4 },
    { c:[28, 0, -34],   R:21, h:1.5, a0:.12,  spin:-.04, ty:-2.0 },
    { c:[-24, 0, -70],  R:18, h:2,   a0:-.2,  spin:.05,  ty:-1 },
    { c:[14, 0, -106],  R:14, h:1,   a0:.2,   spin:.1,   ty:-1.4 },
    { c:[-12, 0, -140], R:18, h:2,   a0:.2,   spin:-.05, ty:-1 },
    { c:[10, 0, -175],  R:20, h:1.2, a0:-.05, spin:.02,  ty:-2.2 },
  ],
  scenes:[
    { t0:0,                     cam:0 }, // 09.10 + Google
    { t0:at("quem") - .25,      cam:1 }, // modelos
    { t0:at("funciona") - .3,   cam:2 }, // roadmap dos planos
    { t0:at("moral") - .3,      cam:3 }, // prazo de validade
    { t0:at("as", 2) - .3,      cam:4 }, // fluxograma do risco
    { t0:at("aí") - .3,         cam:5 }, // pergunta final
  ],
  heads:[
    { t:.1,                    tag:"Alerta Gemini",     text:"Usa o *Gemini* de graça? *Presta atenção*" },
    { t:at("desde") - .05,     tag:"Desde 09/10",       text:"O Google mudou as *regras do jogo*" },
    { t:at("quem") - .05,      tag:"Plano gratuito",    text:"Quem não paga ficou só com o *Flash-Lite*" },
    { t:at("flash", 2) - .15,  tag:"Bloqueados",        text:"*Flash* e *Pro*: só pra quem assina" },
    { t:at("funciona") - .05,  tag:"Como ficou",        text:"Cada plano, um *nível de acesso*" },
    { t:at("moral") - .05,     tag:"Moral da história", text:"IA de graça tem *prazo de validade*" },
    { t:at("as", 2) - .05,     tag:"O risco",           text:"Quem depende só do grátis *fica pra trás*" },
    { t:at("aí") - .05,        tag:"E aí?",             text:"Vai *assinar*… ou caçar a *próxima IA grátis?*" },
  ],

  build(A, M){
    // 0: data 09.10 em 3D com objetos orbitando
    A.g0 = group(camC(0));
    A.date = text3D("09.10", 2.2, M.red); A.g0.add(A.date);
    const geos = [new THREE.SphereGeometry(.36, 32, 16), new THREE.IcosahedronGeometry(.42, 0), new THREE.TorusGeometry(.34, .12, 16, 40), new THREE.BoxGeometry(.5, .5, .5)];
    A.orb = [];
    for (let i = 0; i < 10; i++){
      const m = new THREE.Mesh(geos[i % 4], [M.red, M.dark, M.ink][i % 3]); A.g0.add(m);
      A.orb.push({ m, r:5 + Math.random() * 2.4, sp:.2 + Math.random() * .3, ph:Math.random() * 6.28, y:-2.4 + Math.random() * 5 });
    }
    // 1: três modelos em cards 3D
    const g1 = group(camC(1)), cg = rcard(3, 4, .14, .28);
    const cardTex = (name, foot) => canvasTex(600, 800, (x, w, h) => {
      drawLogo(x, GEM2D, 65, 92, 92, 84);
      x.font = `700 28px ${MONO}`; x.fillStyle = "rgba(244,239,233,.7)"; x.fillText("MODELO GEMINI", 48, 210);
      x.fillStyle = "#fff"; name.forEach((l, i) => { fitFont(x, l, 900, 118, w - 96); x.fillText(l, 48, 420 + i * 118); });
      x.font = `700 26px ${MONO}`; x.fillStyle = "rgba(244,239,233,.65)"; x.fillText(foot, 48, h - 64);
    });
    A.models = [
      { x:-3.3, name:["FLASH", "LITE"], foot:"O MAIS SIMPLES", cue:at("flash", 1) - .1, free:true },
      { x:0,    name:["FLASH"],         foot:"INTERMEDIÁRIO",  cue:at("flash", 2) - .05 },
      { x:3.3,  name:["PRO"],           foot:"O MAIS AVANÇADO", cue:at("pro", 1) - .05 },
    ].map((m, i) => {
      const grp = new THREE.Group(), body = new THREE.Mesh(cg, M.dark);
      grp.add(body, facePlane(3, 4, cardTex(m.name, m.foot), .12)); grp.position.x = m.x; grp.rotation.y = -m.x * .06; g1.add(grp);
      return Object.assign(m, { grp, body, i });
    });
    // 2 e 4: formas wireframe atrás dos diagramas
    A.w2 = [wire(new THREE.TorusGeometry(6, 1.2, 8, 28), .22), wire(new THREE.IcosahedronGeometry(3.4, 1), .3)]; const g2 = group(camC(2)); A.w2.forEach(w => g2.add(w));
    A.w4 = [wire(new THREE.TorusGeometry(8, .2, 4, 60), .3), wire(new THREE.OctahedronGeometry(3.6, 0), .32)]; const g4 = group(camC(4)); A.w4.forEach(w => g4.add(w));
    // 3: estrela do Gemini que "apaga" quando o prazo vence
    A.g3 = group(camC(3));
    A.starMat = new THREE.MeshStandardMaterial({ vertexColors:true, metalness:.05, roughness:.42, emissive:new THREE.Color(0x000000), envMapIntensity:.35 });
    A.star = new THREE.Mesh(svgLogo3D(GEM_D, 65, 3.6, .5, GEM_STOPS), A.starMat);
    A.starGlow = glowPlane(11, "rgba(86,132,209,.35)"); A.starGlow.position.z = -1.4;
    A.g3.add(A.starGlow, A.star);
    // 5: a pergunta final
    A.g5 = group(camC(5));
    const bg = rcard(3.6, 4.8, .14, .32);
    const qTex = (kicker, lines, col, kcol) => canvasTex(720, 960, (x, w, h) => {
      x.font = `700 34px ${MONO}`; x.fillStyle = kcol; x.fillText(kicker, 56, 96);
      x.fillStyle = col; lines.forEach((l, i) => { fitFont(x, l, 900, 120, w - 112); x.fillText(l, 56, h - 80 - (lines.length - 1 - i) * 118); });
    });
    A.qa = new THREE.Group(); A.qa.add(new THREE.Mesh(bg, M.red), facePlane(3.6, 4.8, qTex("OPÇÃO A", ["VOU", "ASSINAR"], "#fff", "rgba(255,255,255,.8)"), .15));
    A.qb = new THREE.Group(); A.qb.add(new THREE.Mesh(bg, M.dark), facePlane(3.6, 4.8, qTex("OPÇÃO B", ["PRÓXIMA", "IA GRÁTIS"], "#9c9088", "#d94a3a"), .15));
    A.qa.position.x = -2.15; A.qb.position.x = 2.15; A.g5.add(A.qa, A.qb);
    A.qmark = text3D("?", 1.8, M.ink); A.qmark.position.set(0, 3.1, -1.2); A.g5.add(A.qmark);
  },

  animate(t){
    const S = REEL.scenes;
    // 0
    const d0 = at("nove") - .45;
    A.date.visible = t > d0 - .05;
    A.date.scale.setScalar(Math.max(.001, eBack(clamp((t - d0) / .9))));
    A.date.rotation.y = -1.4 * (1 - eOut(clamp((t - d0) / 1.5))) + Math.sin(t * .7) * .25;
    A.date.position.y = Math.sin(t * 1.2) * .15;
    A.orb.forEach(o => { const a = o.ph + t * o.sp; o.m.position.set(Math.cos(a) * o.r, o.y + Math.sin(t * .8 + o.ph) * .4, Math.sin(a) * o.r * .6); o.m.rotation.set(t * .7 + o.ph, t * .5, 0); });
    // 1
    A.models.forEach(m => {
      const inn = eBack(clamp((t - S[1].t0 - .15 - m.i * .15) / .6));
      const lock = m.free ? 0 : eInOut(clamp((t - m.cue) / .6));
      m.grp.scale.setScalar(Math.max(.001, inn) * (m.free && t > m.cue ? 1 + .06 * eBack(clamp((t - m.cue) / .4)) : 1));
      m.grp.rotation.x = -.45 * lock; m.grp.position.z = -1.6 * lock; m.grp.position.y = Math.sin(t * 1.1 + m.i) * .1;
      m.body.material = m.free ? (t > m.cue ? M.red : M.dark) : (lock > .3 ? M.dead : M.dark);
    });
    // 2 / 4
    A.w2[0].rotation.set(t * .12, t * .18, 0); A.w2[1].rotation.set(-t * .2, t * .1, 0);
    A.w4[0].rotation.set(1.1, t * .12, t * .05); A.w4[1].rotation.set(t * .15, -t * .2, 0);
    // 3: a estrela perde a cor quando o prazo vence
    const s3 = eBack(clamp((t - S[3].t0) / .9)), dead = eInOut(clamp((t - at("validade") + .1) / .6));
    A.star.scale.setScalar(Math.max(.001, s3));
    A.star.rotation.set(Math.sin(t * .8) * .1, t * .6 + (dead > 0 && dead < 1 ? (hash(Math.floor(t * 30)) - .5) * .3 : 0), 0);
    A.starMat.color.setRGB(lerp(1, .22, dead), lerp(1, .22, dead), lerp(1, .22, dead));
    
    A.starGlow.material.opacity = (1 - dead) * (.8 + .2 * Math.sin(t * 3));
    // 5
    const qa = eOut(clamp((t - S[5].t0 - .2) / 1)), qb = eOut(clamp((t - at("ou") + .1) / 1)), qm = eBack(clamp((t - at("próxima") + .1) / .6));
    A.qa.visible = t > S[5].t0 + .2; A.qb.visible = t > at("ou") - .1;
    A.qa.rotation.y = .2 + (1 - qa) * Math.PI * .9 + Math.sin(t * 1.3) * .05;
    A.qb.rotation.y = -.2 - (1 - qb) * Math.PI * .9 + Math.sin(t * 1.3 + 1) * .05;
    A.qa.position.y = Math.sin(t * 1.4) * .12; A.qb.position.y = Math.sin(t * 1.4 + 1.5) * .12;
    A.qmark.visible = t > at("próxima") - .1; A.qmark.scale.setScalar(Math.max(.001, qm)); A.qmark.rotation.y = Math.sin(t * 1.5) * .5;
  },

  draw2D(ctx, t){
    const S = REEL.scenes;
    // 0: aviso do Google + mira na data
    const gp = at("google") - .3;
    if (env(ctx, t, gp, S[1].t0, W/2, 380)){
      hudPanel(ctx, X0, 290, MAXW, 172, "ATUALIZAÇÃO // GOOGLE", t);
      gIcon(46)(ctx, X0 + 56, 412);
      ctx.font = `800 36px ${SANS}`; ctx.fillStyle = C2.ink; ctx.textAlign = "left"; ctx.textBaseline = "middle";
      ctx.fillText(typed("NOVAS REGRAS DO GEMINI", t, gp + .2, 34), X0 + 100, 400);
      mono(ctx, typed("EM VIGOR DESDE 09.10.2026", t, gp + .7, 34), X0 + 100, 438, { size:19, ls:3, color:C2.neonB, weight:700 });
      ctx.restore();
    }
    const lk = at("nove") - .2;
    if (t > lk && t < S[1].t0){
      const b = screenBox(A.g0, [[-2.9, -1.3, 0], [2.9, 1.3, 0]]), k = p(t, lk, .8), out = p(t, S[1].t0 - .4, .3);
      const x0 = lerp(70, b.x0 - 30, k), x1 = lerp(W - 70, b.x1 + 30, k), y0 = lerp(490, b.y0 - 30, k), y1 = lerp(1080, b.y1 + 30, k);
      ctx.save(); ctx.globalAlpha = clamp((t - lk) * 4) * (1 - out);
      brackets(ctx, x0, y0, x1, y1, 44, k > .98 ? C2.neonB : "rgba(244,239,233,.7)", 4);
      if (k > .98) mono(ctx, typed("DATA DA MUDANÇA // 09.10.2026", t, lk + .8, 30), x0, y1 + 32, { size:21, color:C2.neonB, weight:700 });
      ctx.restore();
    }
    // 1: etiquetas e cadeados nos modelos
    if (between(t, S[1].t0, S[2].t0)){
      const out = 1 - p(t, S[2].t0 - .4, .35);
      A.models.forEach(m => {
        if (t < m.cue) return;
        const a = p(t, m.cue, .35) * out, pt = toScreen(m.grp, new THREE.Vector3(0, -2.55, 0));
        chip(ctx, pt.x, pt.y + 26, m.free ? "GRÁTIS" : "ASSINANTES", a, m.free, m.free ? null : (c, x, y) => drawLock(c, x, y - 8, 22, "#fff"));
        if (!m.free){ const c = toScreen(m.grp, new THREE.Vector3(0, -.95, .2)), s = eBack(clamp((t - m.cue) / .4));
          ctx.save(); ctx.globalAlpha = a; ctx.translate(c.x, c.y); ctx.scale(s, s); ctx.shadowColor = "rgba(0,0,0,.8)"; ctx.shadowBlur = 20; drawLock(ctx, 0, -20, 76, C2.ink); ctx.restore(); }
      });
    }
    // 2: roadmap dos planos (monta conforme a fala)
    if (env(ctx, t, S[2].t0, S[2].t1, W/2, 680)){
      hudPanel(ctx, X0, 285, MAXW, 790, "PLANOS DO GEMINI // DESDE 09.10", t, (x, y) => gIcon(36)(ctx, x, y));
      const nx = X0 + 40, nw = MAXW - 80;
      drawGraph(ctx, t, {
        nodes:[
          { id:"free", x:nx, y:385, w:nw, h:118, label:"Gratuito",        sub:"SÓ FLASH-LITE",              cue:at("funciona") + .35, icon:gemIcon(52) },
          { id:"plus", x:nx, y:563, w:nw, h:118, label:"Google AI Plus",  sub:"FLASH-LITE + FLASH",         cue:at("plâs") - .3,      icon:gemIcon(52) },
          { id:"pro",  x:nx, y:741, w:nw, h:118, label:"AI Pro · Ultra",  sub:"FLASH-LITE + FLASH + PRO",   cue:at("pro", 2) - .3,    icon:gemIcon(52), style:"hl" },
          { id:"deep", x:nx + 164, y:925, w:nw - 328, h:106, label:"+ Deep Think", sub:"MODO DE RACIOCÍNIO", cue:at("dip") - .2, style:"hl", size:32 },
        ],
        edges:[
          { a:"free", b:"plus", cue:at("plâs") - .55 },
          { a:"plus", b:"pro",  cue:at("pro", 2) - .55 },
          { a:"pro",  b:"deep", cue:at("dip") - .45 },
        ],
      });
      ctx.restore();
    }
    // 3: contagem regressiva do "grátis"
    if (between(t, S[3].t0, S[4].t0)){
      const c = toScreen(A.g3, new THREE.Vector3(0, 0, 0)), a = p(t, S[3].t0, .5) * (1 - p(t, S[4].t0 - .45, .4));
      const end = at("validade"), left = 1 - clamp((t - S[3].t0 - .3) / (end - S[3].t0 - .3)), r = 330;
      ctx.save(); ctx.globalAlpha = a;
      ctx.strokeStyle = "rgba(244,239,233,.1)"; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, 7); ctx.stroke();
      ctx.strokeStyle = left > 0 ? C2.neonB : C2.mute; ctx.shadowColor = C2.neonB; ctx.shadowBlur = left > 0 ? 20 : 0;
      ctx.beginPath(); ctx.arc(c.x, c.y, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * left); ctx.stroke(); ctx.shadowBlur = 0;
      for (let i = 0; i < 60; i++){ const an = i / 60 * Math.PI * 2, r2 = i % 5 ? r + 26 : r + 36;
        ctx.strokeStyle = i / 60 < left ? "rgba(244,239,233,.5)" : "rgba(244,239,233,.12)"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(c.x + Math.cos(an - Math.PI / 2) * (r + 18), c.y + Math.sin(an - Math.PI / 2) * (r + 18)); ctx.lineTo(c.x + Math.cos(an - Math.PI / 2) * r2, c.y + Math.sin(an - Math.PI / 2) * r2); ctx.stroke(); }
      mono(ctx, "ACESSO GRÁTIS  ·  00:0" + Math.ceil(left * 9), c.x, c.y - r - 62, { align:"center", size:24, ls:5, color:left > 0 ? C2.ink : C2.neonB, weight:700 });
      stamp(ctx, t, end - .05, "EXPIRADO", c.x, c.y + 10, -.14);
      ctx.restore();
    }
    // 4: fluxograma do risco
    if (env(ctx, t, S[4].t0, S[4].t1, W/2, 680)){
      hudPanel(ctx, X0, 285, MAXW, 790, "O RISCO // DEPENDER SÓ DO GRÁTIS", t);
      const L = X0 + 40, Rr = X0 + MAXW - 40 - 560;
      drawGraph(ctx, t, {
        nodes:[
          { id:"a", x:L,  y:385, w:560, h:110, label:"Ferramenta grátis", cue:S[4].t0 + .25,       icon:gemIcon(48) },
          { id:"b", x:Rr, y:550, w:560, h:110, label:"As regras mudam",   cue:at("mudam") - .2,    icon:gIcon(44) },
          { id:"c", x:L,  y:715, w:560, h:110, label:"Você perde acesso", cue:at("depende") - .2,  icon:(c, x, y) => drawLock(c, x, y - 12, 34, C2.mute), style:"bad" },
          { id:"d", x:Rr, y:880, w:560, h:110, label:"Fica pra trás",     cue:at("trás") - .35,    style:"hl" },
        ],
        edges:[
          { a:"a", b:"b", cue:at("mudam") - .45 },
          { a:"b", b:"c", cue:at("depende") - .45 },
          { a:"c", b:"d", cue:at("trás") - .6 },
        ],
      });
      ctx.restore();
    }
    // 5: selo "VS" entre as opções
    if (t > at("ou") + .2){
      const c = toScreen(A.g5, new THREE.Vector3(0, 0, 1)), s = eBack(clamp((t - at("ou") - .2) / .4));
      ctx.save(); ctx.globalAlpha = clamp((t - at("ou") - .2) * 4) * (1 - p(t, END - .8, .5)); ctx.translate(c.x, c.y); ctx.scale(s, s);
      ctx.beginPath(); ctx.arc(0, 0, 46, 0, 7); ctx.fillStyle = C2.ground; ctx.fill(); ctx.strokeStyle = C2.neonB; ctx.lineWidth = 3; ctx.shadowColor = C2.neonB; ctx.shadowBlur = 24; ctx.stroke(); ctx.shadowBlur = 0;
      mono(ctx, "VS", 0, 2, { align:"center", size:26, weight:700, color:C2.neonB, ls:2 }); ctx.restore();
    }
  },
};

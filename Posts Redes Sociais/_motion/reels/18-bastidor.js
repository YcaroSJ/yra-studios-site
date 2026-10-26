/* Reel 18 — Bastidor: como um Reel da YRA é feito com IA */
const REEL = {
  title:"YRA Motion 18 — Bastidores: feito com IA",
  file:"yra-motion-18-bastidor",
  legenda:`Sabe esses vídeos que a gente posta aqui? Eles são feitos com inteligência artificial 🎬

Como nasce um Reel da YRA:
🔎 pesquisa da notícia e checagem dos dados em fontes confiáveis
✍️ IA ajudando no roteiro
🎙️ narração com voz sintética
🧊 animações 3D e 2D programadas em código
🎧 trilha sonora criada do zero, sem direitos autorais

Mas tem uma parte que nenhuma IA faz sozinha: decidir o que vale a pena contar, revisar cada detalhe e manter a identidade da marca. A ferramenta acelera, a direção é humana.

Você imaginava que era feito assim?
.
.
.
#yrastudios #bastidores #inteligenciaartificial #ia #motiondesign #3d #reels #criatividade #marketingdigital #agenciacriativa`,
  captionMap:{},
  musicKey:0,
  intro:{ brand:"claude", size:3.2, glow:"rgba(217,119,87,.35)", name:"BASTIDORES", sub:"COMO ESSE VÍDEO É FEITO", subColor:"#d97757", leave:at("eles") - .3 },
  scenes:[
    { t0:at("eles") - .3, cam:{ ty:-1 }, parts:[
      K.terminal({ title:"yra-reels // build", lines:[
        [at("feitos") - .1, "$ node voz.mjs 18-bastidor"],
        [at("artificial") - .2, "✓ narração gerada"],
        [at("funciona") - .4, "$ node build.js 18-bastidor"],
        [at("assim") - .2, "✓ reel 60fps pronto"] ] }) ] },
    { t0:at("primeiro") - .4, cam:{ ty:-1 }, parts:[
      K.steps({ title:"COMO NASCE UM REEL", items:[
        { label:"Pesquisa e checagem", sub:"FONTES CONFIÁVEIS", icon:"google", at:at("pesquisa") - .2 },
        { label:"Roteiro", sub:"A IA AJUDA A ESCREVER", icon:"claude", at:at("roteiro") - .2 },
        { label:"Narração", sub:"VOZ SINTÉTICA", at:at("narração") - .2 },
        { label:"Animações 3D e 2D", sub:"PROGRAMADAS EM CÓDIGO", at:at("animações") - .2 },
        { label:"Trilha sonora", sub:"CRIADA DO ZERO", at:at("trilha") - .2, style:"hl" } ] }) ] },
    { t0:at("mas") - .3, cam:{ ty:-1 }, parts:[
      K.checklist({ title:"O QUE A IA NÃO FAZ SOZINHA", items:[
        [at("parte") - .1, "Uma parte continua humana", "warn"],
        [at("decidir") - .1, "Decidir o que vale a pena contar", "ok"],
        [at("revisar") - .1, "Revisar cada detalhe", "ok"],
        [at("identidade") - .2, "Manter a identidade da marca", "ok"] ] }) ] },
    { t0:at("ferramenta") - .4, cam:{ R:20, ty:-2 }, parts:[
      K.text3D({ text:"IA + GENTE", size:.9, at:at("ferramenta") - .3, lock:{ at:at("humana") - .4, label:"A FERRAMENTA ACELERA · A DIREÇÃO É HUMANA", hw:3.2, hh:.6 } }) ] },
    { t0:at("aí") - .3, cam:{ R:20, ty:-2.2 }, parts:[
      K.versus({ a:{ lines:["IMAGINAVA", "SIM"], at:at("aí") }, b:{ lines:["NEM", "IDEIA"], at:at("imaginava") - .1 }, q:at("assim", 2) - .2 }) ] },
  ],
  heads:[
    { t:.1,                     tag:"Bastidores",    text:"Sabe esses vídeos *que a gente posta?*" },
    { t:at("eles") - .1,        tag:"Revelação",     text:"São feitos *com inteligência artificial*" },
    { t:at("primeiro") - .3,    tag:"Passo a passo", text:"Pesquisa, roteiro, voz, *animação e trilha*" },
    { t:at("mas") - .1,         tag:"Mas…",          text:"Tem uma parte que *a IA não faz sozinha*" },
    { t:at("ferramenta") - .3,  tag:"A regra",       text:"A ferramenta acelera. *A direção é humana*" },
    { t:at("aí") - .1,          tag:"E aí?",         text:"Você imaginava *que era feito assim?*" },
  ],
};

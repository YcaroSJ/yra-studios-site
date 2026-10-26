/* Reel 09 — Especial Halloween: o que dá medo de verdade no marketing (fato: Google, 53% abandonam acima de 3s) */
const REEL = {
  title:"YRA Motion 09 — Halloween: medos do marketing",
  file:"yra-motion-09-halloween",
  legenda:`Esquece fantasma e vampiro 🎃 No marketing, o que dá medo de verdade é outra coisa:

👻 Site que leva 10 segundos pra abrir (53% das pessoas desistem acima de 3s, segundo o Google)
👻 Link quebrado na bio
👻 Post sem chamada nenhuma
👻 Marca sem identidade
💀 E o maior de todos: o concorrente aparecendo antes de você no Google

Feliz Halloween! Qual desses te dá mais medo?
.
.
.
#yrastudios #halloween #marketingdigital #criacaodesites #brandingdigital #instagram #google #erros #agenciadigital #empreendedorismo`,
  captionMap:{ "Ráloin":"Halloween" },
  musicKey:-5,
  intro:{ brand:"google", size:3.2, glow:"rgba(255,140,40,.3)", name:"HALLOWEEN", sub:"MEDOS DO MARKETING", subColor:"#ff8a3d", leave:at("medo") - .3 },
  scenes:[
    { t0:at("medo") - .2, cam:{ R:19, ty:-2 }, parts:[
      K.text3D({ text:"BOO!", size:1.6, at:at("medo") - .1, lock:{ at:at("verdade") - .1, label:"O QUE DÁ MEDO DE VERDADE", hw:2.6, hh:.95 } }) ] },
    { t0:at("medo", 2) - .3, cam:{ ty:-1 }, parts:[
      K.stat({ title:"MEDO #1 // SITE LENTO", titleIcon:"google", value:53, suffix:"%", at:at("cinquenta") - .1, label:"das pessoas desistem quando o site passa de 3 segundos", rows:[
        { label:"Site em 10 segundos", note:"PESADELO", at:at("dez") - .1 },
        { label:"Limite do Google", icon:"google", note:"3 SEGUNDOS", at:at("três", 2) - .1, hl:true } ] }) ] },
    { t0:at("medo", 3) - .3, cam:{ ty:-1 }, parts:[
      K.checklist({ title:"TOP 5 MEDOS DO MARKETING", items:[
        [at("medo", 3) + .1, "Site que leva 10s pra abrir", "bad"],
        [at("link") - .1, "Link quebrado na bio", "bad"],
        [at("post") - .1, "Post sem chamada", "bad"],
        [at("identidade") - .2, "Marca sem identidade", "bad"],
        [at("concorrente") - .2, "Concorrente antes de você no Google", "warn"] ] }) ] },
    { t0:at("feliz") - .3, cam:{ R:18, ty:-2 }, parts:[
      K.text3D({ text:"?", size:3, at:at("feliz") - .1, lock:{ at:at("qual") - .1, label:"QUAL TE DÁ MAIS MEDO?", hw:1.3, hh:1.7 } }) ] },
  ],
  heads:[
    { t:.1,                      tag:"Especial Halloween",  text:"Esquece *fantasma e vampiro*" },
    { t:at("medo") - .1,         tag:"Marketing de terror", text:"O que dá medo *de verdade* é outra coisa" },
    { t:at("medo", 2) - .1,      tag:"Medo nº 1",           text:"Site que leva *10 segundos* pra abrir" },
    { t:at("medo", 3) - .1,      tag:"Medo nº 2",           text:"Link *quebrado* na bio" },
    { t:at("medo", 4) - .1,      tag:"Medo nº 3",           text:"Post *sem chamada* nenhuma" },
    { t:at("medo", 5) - .1,      tag:"Medo nº 4",           text:"Marca *sem identidade*" },
    { t:at("maior") - .2,        tag:"O maior medo",        text:"O *concorrente* antes de você no Google" },
    { t:at("feliz") - .1,        tag:"Feliz Halloween",     text:"Qual desses *te dá mais medo?*" },
  ],
};

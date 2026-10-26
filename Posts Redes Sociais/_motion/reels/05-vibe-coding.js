/* Reel 05 — Brasil nº 1 em vibe coding (fato: estatísticas de vibe coding 2026, Hostinger) */
const REEL = {
  title:"YRA Motion 05 — Brasil nº 1 em vibe coding",
  file:"yra-motion-05-vibe-coding",
  legenda:`O Brasil é nº 1 do mundo em vibe coding 🇧🇷💻 Segundo levantamento da Hostinger, 21,7% dos líderes de TI no Brasil já usam vibe coding pra criar agentes de IA — à frente dos EUA (15,4%) e do Reino Unido (8,2%).

Vibe coding é programar conversando com a IA: você descreve o que quer e ferramentas como Claude Code e Cursor escrevem o código. Rápido, prático… e perigoso se ninguém revisa ⚠️

E você, já criou alguma coisa só no papo com a IA?
.
.
.
#yrastudios #vibecoding #programacao #inteligenciaartificial #ia #claudecode #cursor #desenvolvimento #tecnologia #dev`,
  captionMap:{ "váibi":"vibe", "côding":"coding", "Côud":"Code" },
  musicKey:-3,
  intro:{ brand:"cursor", size:3.2, glow:"rgba(255,255,255,.2)", name:"VIBE CODING", sub:"PROGRAMAR CONVERSANDO COM A IA", subColor:"#cfcfcf", leave:at("pois") - .5 },
  scenes:[
    { t0:0, cam:{ R:19, ty:-2 }, parts:[
      K.text3D({ text:"#1", size:3, at:at("pois") - .7, lock:{ at:at("pois") - .1, label:"BRASIL // LÍDER EM VIBE CODING", hw:2.1, hh:1.6 } }) ] },
    { t0:at("segundo") - .3, cam:{ ty:-1 }, parts:[
      K.stat({ title:"VIBE CODING // HOSTINGER", value:21.7, decimals:1, suffix:"%", at:at("vinte") - .1, label:"dos líderes de TI no Brasil já usam pra criar agentes de IA", rows:[
        { label:"Brasil", icon:"BR", v:21.7, at:at("vinte") + .6, hl:true },
        { label:"EUA", icon:"US", v:15.4, at:at("estados") - .1 },
        { label:"Reino Unido", icon:"UK", v:8.2, at:at("reino") - .1 } ] }) ] },
    { t0:at("mas") - .3, cam:{ ty:-1 }, parts:[
      K.steps({ title:"O QUE É VIBE CODING", items:[
        { label:"Programar conversando", sub:"COM A INTELIGÊNCIA ARTIFICIAL", at:at("programar") - .2 },
        { label:"Você descreve o que quer", sub:"EM PORTUGUÊS MESMO", at:at("descreve") - .2 },
        { label:"A IA escreve o código", sub:"CLAUDE CODE · CURSOR", icon:"claude", at:at("ferramentas") - .1 },
        { label:"O app fica pronto", sub:"EM MINUTOS", at:at("escrevem") - .1, style:"hl" } ] }) ] },
    { t0:at("rápido") - .3, cam:{ ty:-1 }, parts:[
      K.terminal({ title:"vibe-coding", lines:[
        [at("rápido"), "$ cria um app de vendas pra mim"],
        [at("prático"), "✓ app criado em 2 minutos"],
        [at("perigoso"), "! ninguém revisou a segurança"],
        [at("revisa"), "✕ senha exposta no código"] ] }) ] },
    { t0:at("agora") - .3, cam:{ R:20, ty:-2.2 }, parts:[
      K.versus({ a:{ lines:["JÁ CRIEI", "NO PAPO"], at:at("agora") }, b:{ lines:["AINDA", "NÃO"], at:at("criou") - .1 }, q:at("papo") }) ] },
  ],
  heads:[
    { t:.1,                 tag:"Ranking global", text:"Brasil é *nº 1 do mundo* em vibe coding" },
    { t:at("segundo") - .1, tag:"Hostinger",      text:"*21,7%* dos líderes de TI já usam" },
    { t:at("mas") - .1,     tag:"Mas o que é?",   text:"Programar *conversando com a IA*" },
    { t:at("rápido") - .1,  tag:"Cuidado",        text:"Rápido, prático… e *perigoso sem revisão*" },
    { t:at("agora") - .1,   tag:"E você?",        text:"Já criou algo *só no papo com a IA?*" },
  ],
};

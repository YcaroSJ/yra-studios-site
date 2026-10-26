/* Reel 11 — Claude Code ganhou mods (fato: atualizações do Claude, out/2026) */
const REEL = {
  title:"YRA Motion 11 — Até a IA ficou sob medida",
  file:"yra-motion-11-claude-mods",
  legenda:`Até a IA ganhou personalização 🧩 O Claude Code, ferramenta de programação da Anthropic, agora aceita mods: você instala e muda o jeito que a ferramenta trabalha — painéis novos, alertas, atalhos e comportamentos sob medida pro seu time. E dá pra compartilhar, como uma loja de extensões.

A lição pra quem tem marca: se até as ferramentas de IA estão ficando sob medida, por que o seu site ainda é um modelo pronto, igual a mil outros?

E o seu: sob medida ou template?
.
.
.
#yrastudios #claude #claudecode #anthropic #inteligenciaartificial #criacaodesites #sitesprofissionais #webdesign #desenvolvimento #tecnologia`,
  captionMap:{ "Côud":"Code", "móds":"mods", "mód":"mod", "têmpleit":"template" },
  musicKey:-2,
  intro:{ brand:"claude", size:3.2, glow:"rgba(217,119,87,.35)", name:"CLAUDE CODE", sub:"AGORA COM MODS", subColor:"#d97757", leave:at("claude") - .3 },
  scenes:[
    { t0:at("claude") - .2, cam:{ ty:-1 }, parts:[
      K.terminal({ title:"claude-code // mods", lines:[
        [at("claude"), "$ claude"],
        [at("aceita") - .1, "> novidade: suporte a mods"],
        [at("instala") - .1, "$ instalar mod painel-do-time"],
        [at("muda") - .1, "✓ jeito de trabalhar atualizado"] ] }) ] },
    { t0:at("dá") - .3, cam:{ ty:-1 }, parts:[
      K.checklist({ title:"O QUE UM MOD FAZ", titleIcon:"claude", items:[
        [at("painéis") - .1, "Painéis novos", "ok"], [at("alertas") - .1, "Alertas", "ok"],
        [at("atalhos") - .1, "Atalhos", "ok"], [at("comportamentos") - .1, "Comportamentos sob medida", "ok"] ] }) ] },
    { t0:at("dá", 2) - .3, cam:{ ty:-1 }, parts:[
      K.steps({ title:"COMPARTILHAR MODS", items:[
        { label:"Você cria o mod", sub:"DO SEU JEITO", icon:"claude", at:at("compartilhar") - .2 },
        { label:"Compartilha", sub:"COM OUTRAS PESSOAS", at:at("outras") - .2 },
        { label:"Loja de extensões", sub:"INSTALOU, USOU", at:at("loja") - .2, style:"hl" } ] }) ] },
    { t0:at("lição") - .4, cam:{ R:24, ty:-2, a0:-.1, spin:.02 }, parts:[
      K.cards({ items:[
        { kicker:"MODELO PRONTO", lines:["SITE", "Nº 1"], foot:"IGUAL A MIL", at:at("modelo") - .1, state:"lock", chip:"TEMPLATE" },
        { kicker:"FEITO PRA VOCÊ", lines:["SOB", "MEDIDA"], foot:"SÓ A SUA MARCA", at:at("medida", 2) - .1, state:"on", chip:"EXCLUSIVO" },
        { kicker:"MODELO PRONTO", lines:["SITE", "Nº 2"], foot:"IGUAL A MIL", at:at("mil") - .1, state:"lock", chip:"TEMPLATE" } ] }) ] },
    { t0:at("seu", 3) - .3, cam:{ R:20, ty:-2.2 }, parts:[
      K.versus({ a:{ lines:["SOB", "MEDIDA"], at:at("seu", 3) }, b:{ lines:["TEMPLATE", "PRONTO"], at:at("ou") - .1 }, fall:at("têmpleit") + 1.0 }) ] },
  ],
  heads:[
    { t:.1,                    tag:"Novidade Claude",  text:"Até a IA ganhou *personalização*" },
    { t:at("claude") - .1,     tag:"Claude Code",      text:"Agora aceita *mods*" },
    { t:at("funciona") - .1,   tag:"Como funciona",    text:"Instalou o mod, *mudou o jeito de trabalhar*" },
    { t:at("dá") - .1,         tag:"Sob medida",       text:"Painéis, alertas e atalhos *pro seu time*" },
    { t:at("dá", 2) - .1,      tag:"Compartilhável",   text:"Tipo uma *loja de extensões*" },
    { t:at("lição") - .2,      tag:"A lição",          text:"Se até a IA é sob medida, *por que seu site não?*" },
    { t:at("seu", 3) - .1,     tag:"E o seu?",         text:"Sob medida… ou *template igual a mil outros?*" },
  ],
};

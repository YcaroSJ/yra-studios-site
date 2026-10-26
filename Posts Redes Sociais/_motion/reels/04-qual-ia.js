/* Reel 04 — Claude, ChatGPT ou Gemini: qual usar? (comparativo de uso, sem ranking oficial) */
const REEL = {
  title:"YRA Motion 04 — Claude, ChatGPT ou Gemini",
  file:"yra-motion-04-qual-ia",
  legenda:`ChatGPT, Claude ou Gemini: qual IA usar? 🤔 Spoiler: depende do que você precisa.

🔸 Claude → textos longos, análise e programação
🔸 ChatGPT → o mais versátil: conversa, pesquisa rápida e imagens
🔸 Gemini → se dá bem com o ecossistema Google (Gmail, Docs, Drive)

O segredo não é escolher uma só: é saber qual usar em cada etapa do trabalho. E você, qual é a sua favorita? 👇
.
.
.
#yrastudios #claude #chatgpt #gemini #inteligenciaartificial #ia #produtividade #tecnologia #marketingdigital #ferramentasdeia`,
  captionMap:{ "Chat":"ChatGPT", "Gê":"", "Pê":"", "Tê":"" },
  musicKey:3,
  intro:{ brand:"openai", size:3.2, glow:"rgba(255,255,255,.2)", name:"DUELO DE IAS", sub:"CHATGPT × CLAUDE × GEMINI", subColor:"#cfcfcf", leave:at("claude") - .35 },
  scenes:[
    { t0:0, cam:{ R:21, ty:-1.8 }, parts:[
      K.logos({ spacing:3.7, items:[
        { brand:"openai", at:1.0, label:"CHATGPT" },
        { brand:"claude", at:at("claude") - .1, label:"CLAUDE", hl:true },
        { brand:"googlegemini", at:at("gemini") - .1, label:"GEMINI" } ] }) ] },
    { t0:at("claude", 2) - .4, cam:{ ty:-1 }, parts:[
      K.checklist({ title:"CLAUDE // PONTOS FORTES", titleIcon:"claude", items:[
        [at("textos") - .1, "Textos longos", "ok"], [at("análise") - .1, "Análise", "ok"],
        [at("programação") - .1, "Programação", "ok"], [at("queridinho") - .1, "Queridinho de quem desenvolve", "ok"] ] }) ] },
    { t0:at("chat", 2) - .4, cam:{ ty:-1 }, parts:[
      K.checklist({ title:"CHATGPT // PONTOS FORTES", titleIcon:"openai", seed:6, items:[
        [at("versátil") - .2, "O mais versátil", "ok"], [at("conversa") - .1, "Conversa", "ok"],
        [at("pesquisa") - .1, "Pesquisa rápida", "ok"], [at("criação") - .1, "Criação de imagens", "ok"] ] }) ] },
    { t0:at("já") - .3, cam:{ ty:-1 }, parts:[
      K.steps({ title:"GEMINI // ECOSSISTEMA GOOGLE", titleIcon:"googlegemini", items:[
        { label:"Gmail", sub:"E-MAILS", icon:"google", at:at("gmail") - .15 },
        { label:"Docs", sub:"DOCUMENTOS", icon:"google", at:at("docs") - .15 },
        { label:"Drive", sub:"ARQUIVOS", icon:"google", at:at("drive") - .15, style:"hl" } ] }) ] },
    { t0:at("prática") - .4, cam:{ ty:-1 }, parts:[
      K.steps({ title:"CADA IA NO SEU PAPEL", items:[
        { label:"Pesquisar", sub:"GEMINI", icon:"googlegemini", at:at("segredo") - .1 },
        { label:"Escrever e programar", sub:"CLAUDE", icon:"claude", at:at("escolher") - .1 },
        { label:"Criar imagens", sub:"CHATGPT", icon:"openai", at:at("saber") - .1 },
        { label:"Você no comando", sub:"A ESTRATÉGIA É SUA", at:at("etapa") - .1, style:"hl" } ] }) ] },
    { t0:at("você", 2) - .4, cam:{ R:21, ty:-1.8 }, parts:[
      K.logos({ spacing:3.7, items:[
        { brand:"claude", at:at("você", 2), label:"CLAUDE" },
        { brand:"openai", at:at("você", 2) + .2, label:"CHATGPT" },
        { brand:"googlegemini", at:at("você", 2) + .4, label:"GEMINI" } ] }),
      K.stamp({ at:at("favorita") - .1, text:"QUAL É A SUA?", y:1030, rot:-.06 }) ] },
  ],
  heads:[
    { t:.1,                      tag:"Duelo de IAs", text:"ChatGPT, Claude ou Gemini: *qual usar?*" },
    { t:at("spoiler") - .1,      tag:"Spoiler",      text:"Depende do que *você precisa*" },
    { t:at("claude", 2) - .4,    tag:"Claude",       text:"Brilha em *texto, análise e código*" },
    { t:at("chat", 2) - .4,      tag:"ChatGPT",      text:"O mais *versátil* das três" },
    { t:at("já") - .3,           tag:"Gemini",       text:"Se dá bem com o *ecossistema Google*" },
    { t:at("prática") - .4,      tag:"Na prática",   text:"O segredo é usar *cada uma na sua etapa*" },
    { t:at("você", 2) - .4,      tag:"E você?",      text:"Qual é a sua *favorita?*" },
  ],
};

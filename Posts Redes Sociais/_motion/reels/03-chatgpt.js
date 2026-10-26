/* Reel 03 — ChatGPT com anúncios no gerador de imagens (fatos: Forbes Brasil, DM, Portal Publicitário — out/2026) */
const REEL = {
  title:"YRA Motion 03 — ChatGPT virou vitrine",
  file:"yra-motion-03-chatgpt",
  legenda:`Pediu uma imagem pro ChatGPT? Pode vir propaganda junto 👀 A OpenAI começou a testar anúncios visuais dentro do gerador de imagens: enquanto a imagem é criada, aparecem produtos ligados ao que você pediu.

Os testes começaram nos EUA. Aqui no Brasil, os anúncios no ChatGPT já aparecem desde agosto pra quem usa o plano gratuito.

Ou seja: a IA virou vitrine. E toda vitrine nova é chance pra quem chega primeiro. Sua marca tá pronta? 🚀
.
.
.
#yrastudios #chatgpt #openai #inteligenciaartificial #ia #marketingdigital #publicidade #midiadigital #tecnologia #inovacao`,
  captionMap:{ "Chat":"ChatGPT", "Gê":"", "Pê":"", "Tê":"", "Ópen":"OpenAI", "Ei":"", "Ai":"" },
  musicKey:0,
  intro:{ brand:"openai", size:3.4, glow:"rgba(255,255,255,.22)", name:"CHATGPT", sub:"DA OPENAI", subColor:"#cfcfcf", leave:at("agora") - .4 },
  scenes:[
    { t0:0, cam:{ R:19, ty:-2 }, parts:[
      K.text3D({ text:"AD", size:2.1, at:at("propaganda") - .3, lock:{ at:at("anúncios") - .2, label:"ANÚNCIO VISUAL // CHATGPT", hw:1.8, hh:1.15 } }),
      K.topPanel({ at:at("ópen") - .2, title:"NOVIDADE // OPENAI", icon:"openai", line1:"ANÚNCIOS NO GERADOR DE IMAGENS", line2:"TESTE INICIADO EM OUT/2026" }) ] },
    { t0:at("funciona") - .3, cam:{ ty:-1 }, parts:[
      K.steps({ title:"COMO FUNCIONA", titleIcon:"openai", items:[
        { label:"Você pede uma imagem", sub:"PROMPT NO CHATGPT", at:at("pede") - .2, icon:"openai" },
        { label:"A IA cria a imagem", sub:"GERANDO…", at:at("criada") - .3 },
        { label:"Produtos aparecem ao lado", sub:"ANÚNCIO LIGADO AO SEU PEDIDO", at:at("fotos") - .3, style:"hl" } ] }) ] },
    { t0:at("testes") - .3, cam:{ R:20, ty:-2 }, parts:[
      K.cards({ items:[
        { flag:"US", kicker:"TESTE INICIAL", lines:["EUA"], foot:"ANÚNCIOS VISUAIS", at:at("estados") - .1, state:"on", chip:"EM TESTE" },
        { flag:"BR", kicker:"AQUI NO BRASIL", lines:["BRASIL"], foot:"ANÚNCIOS DESDE AGO", at:at("agosto") - .1, state:"on", chip:"PLANO GRÁTIS" } ] }) ] },
    { t0:at("ou") - .3, cam:{ R:21 }, parts:[
      K.text3D({ text:"VITRINE", size:1.15, at:at("ou") + .2, lock:{ at:at("vitrine", 2) - .2, label:"NOVO CANAL DE MÍDIA", hw:3.6, hh:.8 } }),
      K.stamp({ at:at("primeiro") - .2, text:"QUEM CHEGA PRIMEIRO", y:975 }) ] },
    { t0:at("sua") - .3, cam:{ R:20, ty:-2.2 }, parts:[
      K.versus({ a:{ lines:["PRONTA", "PRA APARECER"], at:at("sua") }, b:{ lines:["AINDA", "INVISÍVEL"], at:at("aparecer") - .2 }, q:at("cria") - .2 }) ] },
  ],
  heads:[
    { t:.1,                   tag:"Novidade ChatGPT", text:"Pediu uma imagem? *Pode vir propaganda junto*" },
    { t:at("ópen") - .1,      tag:"OpenAI",           text:"Anúncios *dentro do gerador* de imagens" },
    { t:at("funciona") - .05, tag:"Como funciona",    text:"Você pede, a IA cria, *o produto aparece*" },
    { t:at("testes") - .05,   tag:"Onde já tem",      text:"Teste nos *EUA*. No Brasil, anúncios *desde agosto*" },
    { t:at("ou") - .05,       tag:"Ou seja",          text:"A IA *virou vitrine*" },
    { t:at("sua") - .05,      tag:"E a sua marca?",   text:"Pronta pra aparecer *onde o cliente cria?*" },
  ],
};

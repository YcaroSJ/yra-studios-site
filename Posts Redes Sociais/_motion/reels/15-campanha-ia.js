/* Reel 15 — Campanha de Black Friday inteira com IA (passo a passo) */
const REEL = {
  title:"YRA Motion 15 — Campanha de Black Friday com IA",
  file:"yra-motion-15-campanha-ia",
  legenda:`Dá pra montar uma campanha de Black Friday inteira com IA? Dá — se você souber dividir o trabalho 🤖

1️⃣ Planejamento: peça pro Claude ou pro ChatGPT organizar ofertas, datas e público
2️⃣ Textos: anúncios, legendas, e-mails e mensagens de WhatsApp
3️⃣ Visual: no Canva, a IA ajuda a criar artes e vídeos em minutos
4️⃣ Números: peça pra IA analisar o que vendeu mais e onde investir

Mas lembre: a IA acelera, quem dá a direção é você. Estratégia primeiro, ferramenta depois.

Você já usa IA nas suas campanhas?
.
.
.
#yrastudios #blackfriday #inteligenciaartificial #ia #chatgpt #claude #canva #marketingdigital #campanha #produtividade`,
  captionMap:{ "Bléc":"Black", "Fráidei":"Friday", "Chat":"ChatGPT", "Gê":"", "Pê":"", "Tê":"", "Uótsap":"WhatsApp" },
  musicKey:-1,
  intro:{ brand:"claude", size:3.2, glow:"rgba(217,119,87,.35)", name:"CAMPANHA COM IA", sub:"ESPECIAL BLACK FRIDAY", subColor:"#d97757", leave:at("dá", 2) - .3 },
  scenes:[
    { t0:at("dá", 2) - .3, cam:{ R:21, ty:-1.6 }, parts:[
      K.logos({ spacing:3.7, items:[
        { brand:"claude", at:at("dá", 2), label:"CLAUDE" },
        { brand:"openai", at:at("dá", 2) + .25, label:"CHATGPT" },
        { brand:"canva", at:at("dá", 2) + .5, label:"CANVA" } ] }) ] },
    { t0:at("primeiro") - .4, cam:{ ty:-.6 }, parts:[
      K.chat({ title:"PLANEJAMENTO E TEXTOS", avatar:"claude", prompts:[
        [at("planejamento") - .1, "Monta o plano da Black Friday"],
        [at("organizar") - .1, "Ofertas, datas e público"],
        [at("textos") - .1, "Escreve 5 anúncios"],
        [at("e-mails") - .1, "E um e-mail de lançamento"] ] }) ] },
    { t0:at("em") - .3, cam:{ R:16, ty:-1.4 }, parts:[
      K.logo3D({ brand:"canva", size:3.4, at:at("em"), glow:"rgba(0,196,204,.3)", chip:{ text:"ARTES E VÍDEOS EM MINUTOS", at:at("minutos") - .3 } }) ] },
    { t0:at("fim") - .5, cam:{ ty:-1 }, parts:[
      K.checklist({ title:"A IA ANALISA OS NÚMEROS", titleIcon:"googleads", items:[
        [at("números") - .1, "Lê os resultados da campanha", "ok"],
        [at("vendeu") - .1, "Mostra o que vendeu mais", "ok"],
        [at("investir") - .2, "Indica onde investir", "ok"] ] }) ] },
    { t0:at("mas") - .3, cam:{ ty:-1 }, parts:[
      K.steps({ title:"QUEM MANDA NA CAMPANHA", items:[
        { label:"A IA acelera", sub:"FAZ O TRABALHO PESADO", icon:"claude", at:at("acelera") - .2 },
        { label:"Você dá a direção", sub:"DECIDE O QUE IMPORTA", at:at("direção") - .2 },
        { label:"Estratégia primeiro", sub:"OFERTA E PÚBLICO CERTOS", at:at("estratégia") - .2, style:"hl" },
        { label:"Ferramenta depois", sub:"NA ORDEM CERTA", at:at("ferramenta") - .2 } ] }) ] },
    { t0:at("você", 3) - .4, cam:{ R:20, ty:-2.2 }, parts:[
      K.versus({ a:{ lines:["JÁ USO", "IA"], at:at("você", 3) - .2 }, b:{ lines:["AINDA", "NÃO"], at:at("usa") - .1 }, q:at("campanhas") - .1 }) ] },
  ],
  heads:[
    { t:.1,                      tag:"Black Friday",    text:"Uma campanha inteira *com IA?*" },
    { t:at("dá", 2) - .1,        tag:"Dá sim",          text:"Se você souber *dividir o trabalho*" },
    { t:at("primeiro") - .1,     tag:"1. Planejamento", text:"Ofertas, datas e público *com Claude ou ChatGPT*" },
    { t:at("depois") - .1,       tag:"2. Textos",       text:"Anúncios, legendas, e-mails e *WhatsApp*" },
    { t:at("em") - .1,           tag:"3. Visual",       text:"Artes e vídeos *em minutos no Canva*" },
    { t:at("fim") - .3,          tag:"4. Números",      text:"A IA mostra *o que vendeu e onde investir*" },
    { t:at("mas") - .2,          tag:"Lembre",          text:"*Estratégia primeiro*, ferramenta depois" },
    { t:at("você", 3) - .2,      tag:"E você?",         text:"Já usa IA *nas suas campanhas?*" },
  ],
};

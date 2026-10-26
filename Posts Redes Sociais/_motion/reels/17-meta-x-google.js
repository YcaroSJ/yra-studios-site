/* Reel 17 — Meta Ads × Google Ads na Black Friday (demanda criada × demanda pronta) */
const REEL = {
  title:"YRA Motion 17 — Meta Ads ou Google Ads",
  file:"yra-motion-17-meta-x-google",
  legenda:`Meta Ads ou Google Ads: onde investir na Black Friday? 💸 Depende de onde o seu cliente está na jornada.

🔵 Google Ads → a pessoa já está procurando. É demanda pronta, ótima pra vender rápido.
🟣 Meta Ads → a pessoa descobre o seu produto rolando o feed (Instagram e Facebook). É demanda criada, ótima pra gerar desejo.

Na prática, os dois se completam: a Meta faz a pessoa conhecer, e o Google captura quem já decidiu. Investir só em um é deixar dinheiro na mesa.

E você, investe em qual hoje?
.
.
.
#yrastudios #metaads #googleads #trafegopago #blackfriday #marketingdigital #anuncios #gestaodetrafego #ecommerce #estrategiadigital`,
  captionMap:{ "Éds":"Ads", "Bléc":"Black", "Fráidei":"Friday" },
  musicKey:-2,
  intro:{ brand:"meta", size:3.2, glow:"rgba(0,129,251,.3)", name:"META × GOOGLE", sub:"ONDE INVESTIR NA BLACK FRIDAY", subColor:"#5aa9ff", leave:at("resposta") - .4 },
  scenes:[
    { t0:at("resposta") - .3, cam:{ R:21, ty:-1.6 }, parts:[
      K.logos({ spacing:4.2, items:[
        { brand:"meta", at:at("resposta") - .2, label:"META ADS" },
        { brand:"googleads", at:at("resposta") + .1, label:"GOOGLE ADS" } ] }) ] },
    { t0:at("no") - .3, cam:{ ty:-1 }, parts:[
      K.steps({ title:"GOOGLE ADS // DEMANDA PRONTA", titleIcon:"googleads", items:[
        { label:"A pessoa procura", sub:"JÁ SABE O QUE QUER", icon:"google", at:at("procurando") - .2 },
        { label:"Digita o que quer", sub:"NA BUSCA DO GOOGLE", at:at("digita") - .2 },
        { label:"Compra rápido", sub:"DEMANDA PRONTA", at:at("pronta") - .2, style:"hl" } ] }) ] },
    { t0:at("na", 3) - .3, cam:{ ty:-1 }, parts:[
      K.steps({ title:"META ADS // DEMANDA CRIADA", titleIcon:"meta", items:[
        { label:"Rola o feed", sub:"INSTAGRAM E FACEBOOK", icon:"instagram", at:at("instagram") - .2 },
        { label:"Descobre o produto", sub:"SEM ESTAR PROCURANDO", at:at("descobre") - .2 },
        { label:"Gera desejo", sub:"DEMANDA CRIADA", at:at("criada") - .2, style:"hl" } ] }) ] },
    { t0:at("prática") - .4, cam:{ ty:-1 }, parts:[
      K.steps({ title:"NA PRÁTICA // OS DOIS SE COMPLETAM", items:[
        { label:"Meta faz conhecer", sub:"TOPO DO FUNIL", icon:"meta", at:at("conhecer") - .3 },
        { label:"Google captura a decisão", sub:"FUNDO DO FUNIL", icon:"googleads", at:at("captura") - .2 },
        { label:"Venda", sub:"OS DOIS JUNTOS VENDEM MAIS", at:at("decidiu") - .1, style:"hl" } ] }) ] },
    { t0:at("você") - .4, cam:{ R:20, ty:-2.2 }, parts:[
      K.versus({ a:{ lines:["META", "ADS"], at:at("você") - .2 }, b:{ lines:["GOOGLE", "ADS"], at:at("qual") - .2 }, q:at("hoje") - .1 }) ] },
  ],
  heads:[
    { t:.1,                   tag:"Black Friday",   text:"Meta Ads ou Google Ads: *onde investir?*" },
    { t:at("resposta") - .1,  tag:"Resposta curta", text:"Depende de *onde está o seu cliente*" },
    { t:at("no") - .1,        tag:"Google Ads",     text:"A pessoa *já está procurando*" },
    { t:at("na", 3) - .1,     tag:"Meta Ads",       text:"A pessoa *descobre* rolando o feed" },
    { t:at("prática") - .3,   tag:"Na prática",     text:"Os dois *se completam*" },
    { t:at("quem", 3) - .1,   tag:"Atenção",        text:"Investir só em um é *dinheiro na mesa*" },
    { t:at("você") - .3,      tag:"E você?",        text:"Investe *em qual hoje?*" },
  ],
};

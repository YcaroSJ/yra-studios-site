/* Reel 16 — A Black Friday começa no Google (fatos: pesquisa apresentada pelo Google — 50% buscam 30+ dias antes, jornada de 35 dias, 49 buscas, 55% das conversões de novembro vêm de buscas de outubro) */
const REEL = {
  title:"YRA Motion 16 — A Black Friday começa no Google",
  file:"yra-motion-16-bf-google",
  legenda:`A Black Friday não começa no dia 27 🔎 Ela começa no Google, semanas antes.

Segundo pesquisa apresentada pelo Google:
📌 metade das pessoas começa a procurar ofertas mais de 30 dias antes
📌 a jornada de compra leva em média 35 dias, com cerca de 49 buscas
📌 55% das conversões online de novembro vêm de buscas que começaram em outubro

Quem só aparece no dia da promoção chega atrasado. Quando o seu cliente pesquisa hoje, ele te encontra?
.
.
.
#yrastudios #blackfriday #google #seo #googleads #marketingdigital #ecommerce #jornadadecompra #estrategiadigital #varejo`,
  captionMap:{ "Bléc":"Black", "Fráidei":"Friday" },
  musicKey:1,
  intro:{ brand:"google", size:3.2, glow:"rgba(66,133,244,.3)", name:"BLACK FRIDAY", sub:"COMEÇA NO GOOGLE", subColor:"#4285F4", leave:at("ela") - .4 },
  scenes:[
    { t0:at("ela") - .3, cam:{ R:20, ty:-2 }, parts:[
      K.text3D({ text:"27.11", size:1.8, at:at("ela") - .3, lock:{ at:at("semanas") - .2, label:"COMEÇA SEMANAS ANTES NO GOOGLE", hw:3.2, hh:.95 } }) ] },
    { t0:at("uma") - .3, cam:{ ty:-1 }, parts:[
      K.stat({ title:"PESQUISA DO GOOGLE // JORNADA", titleIcon:"google", value:50, suffix:"%", at:at("metade") - .1, label:"começam a procurar ofertas mais de 30 dias antes", rows:[
        { label:"Jornada média", v:35, unit:" dias", dec:0, at:at("jornada") - .1 },
        { label:"Buscas até comprar", icon:"google", v:49, unit:"", dec:0, at:at("quarenta") - .1, hl:true } ] }) ] },
    { t0:at("mais", 2) - .3, cam:{ ty:-1 }, parts:[
      K.stat({ title:"OUTUBRO DECIDE NOVEMBRO", titleIcon:"google", value:55, suffix:"%", at:at("cinquenta") - .1, label:"das conversões online de novembro vêm de buscas que começaram em outubro", rows:[
        { label:"Buscas de outubro", icon:"google", note:"VIRAM VENDA EM NOVEMBRO", at:at("outubro") - .1, hl:true } ] }) ] },
    { t0:at("ou") - .3, cam:{ ty:-1 }, parts:[
      K.steps({ title:"LINHA DO TEMPO DA COMPRA", items:[
        { label:"Outubro: pesquisa", sub:"AS BUSCAS COMEÇAM", icon:"google", at:at("ou") + .1 },
        { label:"Novembro: compara", sub:"PREÇOS E OFERTAS", at:at("atrasado") - .6 },
        { label:"27/11: compra", sub:"QUEM APARECEU ANTES, VENDE", at:at("agora") - .2, style:"hl" } ] }) ] },
    { t0:at("aí") - .3, cam:{ R:20, ty:-2.2 }, parts:[
      K.versus({ a:{ lines:["ME", "ENCONTRA"], at:at("aí") }, b:{ lines:["ACHA O", "CONCORRENTE"], at:at("hoje") - .2 }, q:at("encontra") - .1 }) ] },
  ],
  heads:[
    { t:.1,                    tag:"Black Friday",    text:"Não começa *no dia 27*" },
    { t:at("ela") - .1,        tag:"Começa antes",    text:"Começa *no Google*, semanas antes" },
    { t:at("uma") - .1,        tag:"Pesquisa Google", text:"*Metade* procura ofertas 30+ dias antes" },
    { t:at("jornada") - .2,    tag:"A jornada",       text:"*35 dias* e *49 buscas* até comprar" },
    { t:at("mais", 2) - .1,    tag:"E mais",          text:"*55%* das vendas de novembro vêm de buscas de outubro" },
    { t:at("ou") - .1,         tag:"Ou seja",         text:"Quem só aparece no dia *chega atrasado*" },
    { t:at("aí") - .1,         tag:"E aí?",           text:"Quando seu cliente pesquisa hoje, *te encontra?*" },
  ],
};

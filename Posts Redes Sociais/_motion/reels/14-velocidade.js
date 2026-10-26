/* Reel 14 — Cada segundo de carregamento custa venda (fatos: Google — 53% abandonam acima de 3s; Portant — -4,42% de conversão por segundo) */
const REEL = {
  title:"YRA Motion 14 — Cada segundo custa venda",
  file:"yra-motion-14-velocidade",
  legenda:`3 segundos ⏱️ É o tempo que você tem antes de perder metade dos visitantes do seu site.

📉 Segundo o Google, 53% das pessoas no celular abandonam um site que demora mais de 3s pra carregar.
📉 E cada segundo a mais derruba a conversão: em média, 4,42% a menos por segundo.

O que deixa um site lento? Imagens pesadas, código desnecessário e servidor fraco. A boa notícia: dá pra medir de graça no PageSpeed Insights, do Google.

Seu site abre em quanto tempo?
.
.
.
#yrastudios #velocidade #pagespeed #criacaodesites #performance #seo #conversao #ecommerce #blackfriday #webdesign`,
  captionMap:{ "Bléc":"Black", "Fráidei":"Friday", "Pêidj":"PageSpeed", "Spíd":"", "Ínsaits":"Insights" },
  musicKey:2,
  intro:{ brand:"pagespeedinsights", size:3.2, glow:"rgba(66,133,244,.3)", name:"3 SEGUNDOS", sub:"VELOCIDADE É VENDA", subColor:"#4285F4", leave:at("é") - .2 },
  scenes:[
    { t0:at("é") - .2, cam:{ R:19, ty:-2 }, parts:[
      K.text3D({ text:"3s", size:2.6, at:at("é") - .1, lock:{ at:at("metade") - .2, label:"ANTES DE PERDER METADE DOS VISITANTES", hw:1.7, hh:1.4 } }) ] },
    { t0:at("segundo") - .3, cam:{ ty:-1 }, parts:[
      K.stat({ title:"DADO DO GOOGLE // CELULAR", titleIcon:"google", value:53, suffix:"%", at:at("cinquenta") - .1, label:"abandonam sites que demoram mais de 3 segundos pra carregar", rows:[
        { label:"Limite de paciência", icon:"google", note:"3 SEGUNDOS", at:at("três", 3) - .1, hl:true } ] }) ] },
    { t0:at("cada") - .4, cam:{ ty:-1 }, parts:[
      K.stat({ title:"CADA SEGUNDO CUSTA", value:4.42, decimals:2, prefix:"-", suffix:"%", at:at("quatro") - .1, label:"de conversão, em média, a cada segundo a mais", rows:[
        { label:"Na Black Friday", note:"DÓI AINDA MAIS", at:at("bléc") - .1, hl:true } ] }) ] },
    { t0:at("deixa") - .6, cam:{ ty:-1 }, parts:[
      K.checklist({ title:"O QUE DEIXA O SITE LENTO", items:[
        [at("imagens") - .1, "Imagens pesadas", "bad"], [at("código") - .1, "Código desnecessário", "bad"], [at("servidor") - .1, "Servidor fraco", "bad"] ] }) ] },
    { t0:at("boa") - .4, cam:{ ty:-1 }, parts:[
      K.steps({ title:"COMO DEIXAR O SITE VOANDO", items:[
        { label:"Medir de graça", sub:"PAGESPEED INSIGHTS", icon:"pagespeedinsights", at:at("medir") - .2 },
        { label:"Otimizar imagens", sub:"MESMA QUALIDADE, MENOS PESO", at:at("otimizada") - .2 },
        { label:"Código limpo", sub:"SÓ O NECESSÁRIO", at:at("limpo") - .2 },
        { label:"Servidor bom", sub:"SITE VOANDO", at:at("servidor", 2) - .2, style:"hl" } ] }) ] },
    { t0:at("abre") - .8, cam:{ R:20, ty:-2.2 }, parts:[
      K.versus({ a:{ lines:["MENOS", "DE 3s"], at:at("abre") - .6 }, b:{ lines:["MAIS", "DE 3s"], at:at("quanto") - .1 }, fall:at("tempo", 2) + 1.0 }) ] },
  ],
  heads:[
    { t:.1,                  tag:"Velocidade",     text:"*3 segundos*" },
    { t:at("é") - .1,        tag:"O limite",       text:"Antes de perder *metade dos visitantes*" },
    { t:at("segundo") - .1,  tag:"Google",         text:"*53%* abandonam acima de 3s" },
    { t:at("cada") - .3,     tag:"Conversão",      text:"Cada segundo custa *4,42%* das vendas" },
    { t:at("deixa") - .5,    tag:"O vilão",        text:"O que deixa o site *lento?*" },
    { t:at("boa") - .3,      tag:"A boa notícia",  text:"Dá pra *medir de graça* e resolver" },
    { t:at("abre") - .7,     tag:"E o seu?",       text:"Seu site abre *em quanto tempo?*" },
  ],
};

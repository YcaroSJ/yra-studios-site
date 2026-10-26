/* Reel 10 — TikTok Shop e o social commerce (fatos: TikTok Newsroom, Central do Varejo, E-commerce Planet — 2026) */
const REEL = {
  title:"YRA Motion 10 — Vender sem sair do app",
  file:"yra-motion-10-social-commerce",
  legenda:`R$ 1,58 bilhão em vendas em um único mês, sem ninguém sair do app 🛒 Foi o que o TikTok Shop fez aqui no Brasil.

📈 De R$ 5 milhões/mês (mai/2025) pra R$ 1,58 bilhão (jun/2026): mais de 100x
🔴 Vendas em lives cresceram 161x
🛍️ Quase 6 em cada 10 brasileiros no TikTok já compraram depois de descobrir o produto ali mesmo

A compra agora acontece onde a pessoa rola o feed: ver, gostar e comprar no mesmo lugar. Sua marca já vende dentro das redes?
.
.
.
#yrastudios #tiktokshop #socialcommerce #livecommerce #ecommerce #tiktok #vendasonline #marketingdigital #varejo #empreendedorismo`,
  captionMap:{ "Tik":"TikTok", "Tok":"", "Xóp":"Shop", "láivs":"lives" },
  musicKey:1,
  intro:{ brand:"tiktok", size:3.2, glow:"rgba(254,44,85,.28)", name:"TIKTOK SHOP", sub:"SOCIAL COMMERCE NO BRASIL", subColor:"#FE2C55", leave:at("foi") - .4 },
  scenes:[
    { t0:at("foi") - .3, cam:{ R:19, ty:-2 }, parts:[
      K.text3D({ text:"1 BI", size:1.85, at:at("foi") - .2, lock:{ at:at("xóp") - .2, label:"TIKTOK SHOP // VENDAS EM 1 MÊS", hw:2.4, hh:1 } }) ] },
    { t0:at("ele") - .3, cam:{ ty:-1 }, parts:[
      K.stat({ title:"TIKTOK SHOP // BRASIL", titleIcon:"tiktok", value:1.58, decimals:2, prefix:"R$ ", suffix:" bi", at:at("junho") - .1, dur:1.4, label:"em vendas em um único mês (junho/2026)", rows:[
        { label:"Maio de 2025", v:5, unit:" mi", dec:0, at:at("maio") - .1 },
        { label:"Junho de 2026", v:1580, unit:" mi", dec:0, at:at("junho") + .2, hl:true } ] }) ] },
    { t0:at("crescimento") - .4, cam:{ R:19, ty:-2 }, parts:[
      K.text3D({ text:"102X", size:1.75, at:at("cem") - .3, lock:{ at:at("vezes") - .1, label:"CRESCIMENTO EM 1 ANO", hw:2.6, hh:.9 } }) ] },
    { t0:at("motor") - .4, cam:{ ty:-1 }, parts:[
      K.stat({ title:"LIVES // O MOTOR DAS VENDAS", titleIcon:"tiktok", value:161, suffix:"x", at:at("cento") - .1, label:"foi o crescimento das vendas em lives em um ano", rows:[
        { label:"Lives por dia", icon:"tiktok", note:"20X MAIS", at:at("transmissões") - .1, hl:true } ] }) ] },
    { t0:at("quase") - .3, cam:{ ty:-1 }, parts:[
      K.stat({ title:"COMPRA POR DESCOBERTA", titleIcon:"tiktok", value:57.8, decimals:1, suffix:"%", at:at("seis") - .1, label:"dos usuários já compraram após descobrir o produto no TikTok", rows:[
        { label:"Brasileiros no TikTok", icon:"BR", note:"6 EM CADA 10", at:at("brasileiros") - .1, hl:true } ] }) ] },
    { t0:at("agora") - .3, cam:{ ty:-1 }, parts:[
      K.steps({ title:"A NOVA JORNADA DE COMPRA", items:[
        { label:"Rola o feed", sub:"DESCOBERTA", icon:"tiktok", at:at("rola") - .2 },
        { label:"Ver", sub:"O PRODUTO EM USO", at:at("ver") - .15 },
        { label:"Gostar", sub:"CONFIANÇA NO CRIADOR", at:at("gostar") - .15 },
        { label:"Comprar", sub:"SEM SAIR DO APP", at:at("comprar") - .15, style:"hl" } ] }) ] },
    { t0:at("sua") - .4, cam:{ R:20, ty:-2.2 }, parts:[
      K.versus({ a:{ lines:["JÁ VENDO", "NAS REDES"], at:at("sua") - .2 }, b:{ lines:["SÓ NO", "SITE"], at:at("vende") - .2 }, q:at("redes") - .1 }) ] },
  ],
  heads:[
    { t:.1,                      tag:"Social commerce", text:"R$ 1 bilhão em um mês *sem sair do app*" },
    { t:at("foi") - .1,          tag:"TikTok Shop",     text:"Aconteceu *aqui no Brasil*" },
    { t:at("ele") - .1,          tag:"Em 1 ano",        text:"De *R$ 5 mi* pra *R$ 1,58 bi* por mês" },
    { t:at("crescimento") - .3,  tag:"Crescimento",     text:"Mais de *100 vezes* maior" },
    { t:at("motor") - .3,        tag:"O motor",         text:"Vendas em lives cresceram *161 vezes*" },
    { t:at("quase") - .1,        tag:"Descoberta",      text:"*6 em cada 10* já compraram pelo TikTok" },
    { t:at("agora") - .1,        tag:"A nova jornada",  text:"Ver, gostar e comprar *no mesmo lugar*" },
    { t:at("sua") - .3,          tag:"E a sua marca?",  text:"Já vende *dentro das redes?*" },
  ],
};

/* Reel 13 — Faltam 18 dias pra Black Friday (fatos: Black Friday 27/11/2026; projeção Black Friday Talks — Central do Varejo) */
const REEL = {
  title:"YRA Motion 13 — Faltam 18 dias pra Black Friday",
  file:"yra-motion-13-bf-18-dias",
  legenda:`Faltam 18 dias pra Black Friday ⏳ Ela cai em 27 de novembro, e a projeção é de R$ 14,5 bilhões em vendas online no Brasil só na semana da data, com mais de 18 milhões de pedidos.

Agora pensa: se o seu site trava com 100 pessoas ao mesmo tempo, o que acontece com 1.000? Nessa época, cada minuto fora do ar é venda indo pro concorrente.

Checklist antes da promoção:
✅ teste a velocidade
✅ revise o checkout
✅ confira o estoque
✅ prepare o servidor pro pico

Seu site aguenta a Black Friday?
.
.
.
#yrastudios #blackfriday #blackfriday2026 #ecommerce #lojavirtual #vendasonline #criacaodesites #marketingdigital #varejo #empreendedorismo`,
  captionMap:{ "Bléc":"Black", "Fráidei":"Friday" },
  musicKey:-3,
  intro:{ brand:"shopify", size:3.2, glow:"rgba(149,191,71,.3)", name:"BLACK FRIDAY", sub:"27 DE NOVEMBRO", subColor:"#95BF47", leave:at("ela") - .4 },
  scenes:[
    { t0:at("ela") - .3, cam:{ R:19, ty:-2 }, parts:[
      K.text3D({ text:"18", size:3, at:at("ela") - .3, lock:{ at:at("novembro") - .3, label:"DIAS PRA BLACK FRIDAY // 27.11", hw:1.9, hh:1.6 } }) ] },
    { t0:at("previsão") - .4, cam:{ ty:-1 }, parts:[
      K.stat({ title:"PREVISÃO // SEMANA DA BLACK FRIDAY", titleIcon:"shopify", value:14.5, decimals:1, prefix:"R$ ", suffix:" bi", at:at("catorze") - .1, label:"em vendas online no Brasil só na semana da Black Friday", rows:[
        { label:"Pedidos previstos", v:18.3, unit:" mi", dec:1, at:at("pedidos") - .3, hl:true } ] }) ] },
    { t0:at("agora") - .4, cam:{ ty:-1 }, parts:[
      K.terminal({ title:"monitor do servidor", lines:[
        [at("cem") - .1, "> 100 visitantes · ok"],
        [at("mil") - .1, "> 1.000 visitantes…"],
        [at("mil") + .7, "! tempo de resposta: 9,8s"],
        [at("fora") - .2, "✕ erro 503 · site fora do ar"],
        [at("concorrente") - .1, "✕ cliente foi pro concorrente"] ] }) ] },
    { t0:at("então") - .4, cam:{ ty:-1 }, parts:[
      K.checklist({ title:"CHECKLIST PRÉ-BLACK FRIDAY", titleIcon:"shopify", items:[
        [at("básico") - .1, "Fazer o básico antes da promoção", "warn"],
        [at("velocidade") - .1, "Testar a velocidade", "ok"], [at("checkout") - .1, "Revisar o checkout", "ok"],
        [at("estoque") - .1, "Conferir o estoque", "ok"], [at("servidor") - .1, "Servidor pronto pro pico", "ok"] ] }) ] },
    { t0:at("aí") - .3, cam:{ R:20, ty:-2.2 }, parts:[
      K.versus({ a:{ lines:["AGUENTA", "O PICO"], at:at("aí") }, b:{ lines:["CAI NO", "1º DIA"], at:at("aguenta") - .2 }, fall:at("fráidei", 3) + .4 }) ] },
  ],
  heads:[
    { t:.1,                    tag:"Contagem regressiva", text:"Faltam *18 dias* pra Black Friday" },
    { t:at("ela") - .1,        tag:"27 de novembro",      text:"A data *mais disputada* do ano" },
    { t:at("previsão") - .3,   tag:"Previsão",            text:"*R$ 14,5 bi* só na semana" },
    { t:at("agora") - .3,      tag:"Agora pensa",         text:"Seu site *aguenta mil pessoas* ao mesmo tempo?" },
    { t:at("então") - .3,      tag:"Antes da promoção",   text:"Faça *o básico* bem feito" },
    { t:at("aí") - .1,         tag:"E aí?",               text:"Seu site *aguenta a Black Friday?*" },
  ],
};

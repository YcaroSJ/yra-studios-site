/* Reel 06 — Site feito na vibe × site profissional */
const REEL = {
  title:"YRA Motion 06 — Site na vibe × site profissional",
  file:"yra-motion-06-vibe-x-pro",
  legenda:`Dá pra fazer um site inteiro só conversando com a IA? Dá. Mas ele aguenta o tranco? 🤔

Site feito só na vibe sobe rapidinho… e o problema aparece depois: segurança sem revisão, invisível no Google e travando quando o tráfego chega.

Site profissional também usa IA — mas com gente experiente revisando segurança, velocidade, estrutura pro Google e espaço pra crescer. A IA acelera. Quem decide o que funciona ainda é gente.

E o seu site: feito pra durar ou só pra subir?
.
.
.
#yrastudios #vibecoding #criacaodesites #sitesprofissionais #inteligenciaartificial #webdesign #seo #desenvolvimentoweb #ia #marketingdigital`,
  captionMap:{ "váibi":"vibe" },
  musicKey:-1,
  intro:{ brand:"github", size:3.2, glow:"rgba(255,255,255,.2)", name:"VIBE × PRO", sub:"SITE FEITO NA IA", subColor:"#cfcfcf", leave:at("dá", 2) - .3 },
  scenes:[
    { t0:at("dá", 2) - .2, cam:{ ty:-1 }, parts:[
      K.terminal({ title:"site-na-vibe", lines:[
        [at("dá", 2) - .1, "$ cria um site completo pra minha loja"],
        [at("mas") - .2, "✓ site no ar em 10 minutos"],
        [at("aguenta") - .3, "> mas… aguenta o tranco?"] ] }) ] },
    { t0:at("site", 3) - .3, cam:{ ty:-1 }, parts:[
      K.compare({
        bad:{ title:"Feito só na vibe", icon:"cursor", at:at("site", 3) - .2, items:[
          [at("rapidinho") - .1, "Sobe rapidinho"], [at("segurança") - .1, "Segurança sem revisão"],
          [at("google") - .1, "Invisível no Google"], [at("trava") - .3, "Trava quando o tráfego chega"] ] },
        good:{ title:"Feito por quem entende", at:at("profissional") - .2, items:[
          [at("revisando") - .1, "IA + revisão humana"], [at("velocidade") - .1, "Seguro e rápido"],
          [at("estrutura") - .1, "Estruturado pro Google"], [at("crescer") - .1, "Pronto pra crescer"] ] } }) ] },
    { t0:at("acelera") - .6, cam:{ ty:-1 }, parts:[
      K.steps({ title:"O JEITO CERTO", h:150, items:[
        { label:"A IA acelera", sub:"O TRABALHO PESADO", icon:"claude", at:at("acelera") - .2 },
        { label:"Gente decide", sub:"O QUE FUNCIONA DE VERDADE", at:at("decide") - .2, style:"hl" } ] }) ] },
    { t0:at("seu") - .3, cam:{ R:20, ty:-2.2 }, parts:[
      K.versus({ a:{ lines:["FEITO", "PRA DURAR"], at:at("seu") }, b:{ lines:["SÓ PRA", "SUBIR"], at:at("durar") - .1 }, fall:at("subir") + .3 }) ] },
  ],
  heads:[
    { t:.1,                      tag:"Vibe coding",   text:"Dá pra fazer um site *só conversando com a IA?*" },
    { t:at("mas") - .1,          tag:"A pergunta",    text:"Esse site *aguenta o tranco?*" },
    { t:at("site", 3) - .1,      tag:"Feito na vibe", text:"Sobe rápido. O problema *vem depois*" },
    { t:at("profissional") - .6, tag:"Profissional",  text:"Também usa IA, mas *com gente revisando*" },
    { t:at("acelera") - .6,      tag:"A regra",       text:"A IA acelera. *Gente decide*" },
    { t:at("seu") - .1,          tag:"E o seu?",      text:"Feito *pra durar*… ou só pra subir?" },
  ],
};

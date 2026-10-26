/* Reel 12 — IA da Meta atendendo no WhatsApp (fatos: Mobile Time, Forbes Brasil — Business AI para PMEs, 2026) */
const REEL = {
  title:"YRA Motion 12 — IA atendendo no WhatsApp",
  file:"yra-motion-12-ia-whatsapp",
  legenda:`Seu cliente manda mensagem às 3 da manhã. Quem responde? 🌙

O Business AI, da Meta, foi liberado pra pequenas e médias empresas no Brasil: um atendente virtual dentro do WhatsApp Business que responde 24h, recomenda produtos do catálogo e tira dúvidas — sem precisar programar nada.

Pra usar: WhatsApp Business em português + pelo menos 1 produto no catálogo.

⚠️ Mas atenção: a IA só sabe o que você ensina. Catálogo completo e informações claras = respostas melhores.

Seu atendimento já funciona enquanto você dorme?
.
.
.
#yrastudios #whatsapp #whatsappbusiness #meta #inteligenciaartificial #atendimento #vendas #pme #automacao #marketingdigital`,
  captionMap:{ "Bízness":"Business", "Ei":"AI", "Ai":"", "Uótsap":"WhatsApp" },
  musicKey:-1,
  intro:{ brand:"whatsapp", size:3.2, glow:"rgba(37,211,102,.3)", name:"WHATSAPP", sub:"IA DA META NO ATENDIMENTO", subColor:"#25D366", leave:at("agora") - .4 },
  scenes:[
    { t0:at("agora") - .3, cam:{ ty:-.6 }, parts:[
      K.chat({ title:"WHATSAPP BUSINESS · 03:00", avatar:"meta", prompts:[
        [at("agora") - .1, "Oi! Ainda tem o tênis 42?"],
        [at("meta") - .3, "Vocês entregam amanhã?"] ] }) ] },
    { t0:at("bízness") - .4, cam:{ R:21, ty:-1.4 }, parts:[
      K.logos({ spacing:4.2, items:[
        { brand:"meta", at:at("bízness") - .2, label:"BUSINESS AI" },
        { brand:"whatsapp", at:at("uótsap") - .2, label:"WHATSAPP", hl:true } ] }),
      K.topPanel({ at:at("liberado") - .2, title:"META // BUSINESS AI", icon:"meta", line1:"LIBERADO PARA PMEs NO BRASIL", line2:"ATENDENTE VIRTUAL COM IA" }) ] },
    { t0:at("ele") - .3, cam:{ ty:-1 }, parts:[
      K.checklist({ title:"O QUE O ATENDENTE FAZ", titleIcon:"whatsapp", items:[
        [at("vinte") - .1, "Responde 24 horas por dia", "ok"], [at("recomenda") - .1, "Recomenda produtos do catálogo", "ok"],
        [at("tira") - .1, "Tira dúvidas", "ok"], [at("programar") - .2, "Sem precisar programar nada", "ok"] ] }) ] },
    { t0:at("usar") - .6, cam:{ ty:-1 }, parts:[
      K.steps({ title:"PRA ATIVAR", items:[
        { label:"WhatsApp Business", sub:"EM PORTUGUÊS", icon:"whatsapp", at:at("uótsap", 2) - .2 },
        { label:"1 produto no catálogo", sub:"NO MÍNIMO", at:at("produto") - .2 },
        { label:"Atendente no ar", sub:"24 HORAS POR DIA", at:at("catálogo", 2) - .1, style:"hl" } ] }) ] },
    { t0:at("atenção") - .4, cam:{ ty:-1 }, parts:[
      K.steps({ title:"A REGRA DE OURO", items:[
        { label:"Catálogo completo", sub:"FOTOS, PREÇOS E DETALHES", at:at("catálogo", 3) - .2 },
        { label:"Informações claras", sub:"HORÁRIOS, ENTREGA E TROCAS", at:at("informações") - .2 },
        { label:"IA responde melhor", sub:"ELA SÓ SABE O QUE VOCÊ ENSINA", icon:"meta", at:at("responde", 3) - .2, style:"hl" } ] }) ] },
    { t0:at("atendimento") - .6, cam:{ R:20, ty:-2.2 }, parts:[
      K.versus({ a:{ lines:["FUNCIONA", "24 HORAS"], at:at("atendimento") - .4 }, b:{ lines:["SÓ NO", "HORÁRIO"], at:at("enquanto") - .1 }, q:at("dorme") - .1 }) ] },
  ],
  heads:[
    { t:.1,                      tag:"3h da manhã",  text:"Seu cliente mandou mensagem. *Quem responde?*" },
    { t:at("agora") - .1,        tag:"Agora",        text:"Pode ser uma *IA da própria Meta*" },
    { t:at("bízness") - .3,      tag:"Business AI",  text:"Atendente virtual *dentro do WhatsApp*" },
    { t:at("ele") - .1,          tag:"Na prática",   text:"Responde *24h* e recomenda produtos" },
    { t:at("usar") - .6,         tag:"Pra usar",     text:"WhatsApp Business + *1 produto no catálogo*" },
    { t:at("atenção") - .3,      tag:"Atenção",      text:"A IA *só sabe o que você ensina*" },
    { t:at("atendimento") - .6,  tag:"E o seu?",     text:"Seu atendimento funciona *enquanto você dorme?*" },
  ],
};

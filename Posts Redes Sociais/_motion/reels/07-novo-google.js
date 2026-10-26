/* Reel 07 — A rede social virou o novo Google (fatos: Google/FGV ~40% da Geração Z; Adobe 67%) */
const REEL = {
  title:"YRA Motion 07 — A rede social virou o novo Google",
  file:"yra-motion-07-novo-google",
  legenda:`Onde você pesquisa antes de comprar? 🔎 Se a resposta foi TikTok ou Instagram, você não tá sozinho.

📊 Segundo o próprio Google, quase 40% da Geração Z prefere pesquisar no TikTok e no Instagram em vez do buscador.
📊 E pela Adobe, 67% dessa geração usa o TikTok pra pesquisar produtos antes de comprar.

Ou seja: sua marca precisa ser encontrada nas redes, e não só no Google. Comece com legenda com palavra-chave, vídeo que responde dúvidas e perfil bem organizado.

Quando alguém procura o que você vende, é você que aparece?
.
.
.
#yrastudios #tiktok #instagram #seo #socialseo #marketingdigital #geracaoz #redessociais #estrategiadigital #conteudo`,
  captionMap:{ "Tik":"TikTok", "Tok":"" },
  musicKey:2,
  intro:{ brand:"tiktok", size:3.2, glow:"rgba(37,244,238,.25)", name:"TIKTOK", sub:"O NOVO BUSCADOR?", subColor:"#25F4EE", leave:at("pesquisa") - .3 },
  scenes:[
    { t0:at("pesquisa") - .2, cam:{ R:21, ty:-1.8 }, parts:[
      K.logos({ spacing:3.7, items:[
        { brand:"google", at:at("pesquisa"), label:"BUSCADOR" },
        { brand:"tiktok", at:at("tik") - .1, label:"TIKTOK", hl:true },
        { brand:"instagram", at:at("instagram") - .1, label:"INSTAGRAM", hl:true } ] }) ] },
    { t0:at("segundo") - .3, cam:{ ty:-1 }, parts:[
      K.stat({ title:"ONDE A GERAÇÃO Z PESQUISA", titleIcon:"google", value:40, prefix:"~", suffix:"%", at:at("quarenta") - .2, label:"da Geração Z prefere pesquisar no TikTok e no Instagram", rows:[
        { label:"TikTok", icon:"tiktok", note:"PREFERIDO", at:at("tik", 2) - .1 },
        { label:"Instagram", icon:"instagram", note:"PREFERIDO", at:at("instagram", 2) - .1 },
        { label:"Buscador", icon:"google", at:at("buscador") - .1 } ] }) ] },
    { t0:at("adobe") - .6, cam:{ ty:-1 }, parts:[
      K.stat({ title:"PESQUISA DA ADOBE", titleIcon:"tiktok", value:67, suffix:"%", at:at("sessenta") - .1, label:"da Geração Z usa o TikTok pra pesquisar produtos antes de comprar", rows:[
        { label:"Antes de comprar", icon:"tiktok", note:"PESQUISA NO TIKTOK", at:at("produtos") - .1, hl:true } ] }) ] },
    { t0:at("ou", 3) - .3, cam:{ ty:-1 }, parts:[
      K.steps({ title:"COMO SER ENCONTRADO NAS REDES", items:[
        { label:"Ser encontrado nas redes", sub:"NÃO SÓ NO GOOGLE", icon:"google", at:at("encontrada") - .2 },
        { label:"Legenda com palavra-chave", sub:"O QUE AS PESSOAS DIGITAM", icon:"instagram", at:at("legenda") - .2 },
        { label:"Vídeo que responde dúvidas", sub:"CONTEÚDO QUE ENSINA", icon:"tiktok", at:at("vídeo") - .2 },
        { label:"Perfil bem organizado", sub:"BIO, DESTAQUES E LINKS", at:at("perfil") - .2, style:"hl" } ] }) ] },
    { t0:at("aí") - .3, cam:{ R:20, ty:-2.2 }, parts:[
      K.versus({ a:{ lines:["É A MINHA", "MARCA"], at:at("aí") }, b:{ lines:["É O", "CONCORRENTE"], at:at("vende") - .2 }, q:at("aparece") - .1 }) ] },
  ],
  heads:[
    { t:.1,                 tag:"Pergunta rápida", text:"Onde você *pesquisa* antes de comprar?" },
    { t:at("se") - .1,      tag:"Se foi TikTok…",  text:"Você *não tá sozinho*" },
    { t:at("segundo") - .1, tag:"Dado do Google",  text:"*~40%* da Geração Z prefere as redes" },
    { t:at("adobe") - .6,   tag:"Adobe",           text:"*67%* pesquisam produtos no TikTok" },
    { t:at("ou", 3) - .1,      tag:"Ou seja",         text:"Sua marca precisa ser *encontrada nas redes*" },
    { t:at("aí") - .1,      tag:"E aí?",           text:"Quando procuram o que você vende, *quem aparece?*" },
  ],
};

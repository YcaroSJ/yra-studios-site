/* Reel 08 — Reels = 51% do tempo no Instagram (fato: Sensor Tower, 2º tri/2026) */
const REEL = {
  title:"YRA Motion 08 — Reels são metade do Instagram",
  file:"yra-motion-08-reels-51",
  legenda:`Mais da metade do tempo no Instagram já é Reels 🎬 Segundo a Sensor Tower, os Reels ficaram com 51% do tempo no app no 2º trimestre de 2026 — e com 51% dos espaços de anúncio também.

O que isso quer dizer pra sua marca? Post parado tem cada vez menos espaço. E nos Reels, os 3 primeiros segundos decidem tudo:
✅ gancho forte
✅ legenda na tela
✅ uma ideia por vídeo

Quantos Reels a sua marca postou esse mês? 👀
.
.
.
#yrastudios #reels #instagram #videomarketing #marketingdigital #redessociais #conteudo #estrategiadigital #socialmedia #algoritmo`,
  captionMap:{ "Ríls":"Reels" },
  musicKey:-4,
  intro:{ brand:"instagram", size:3.2, glow:"rgba(214,41,118,.3)", name:"INSTAGRAM", sub:"A ERA DOS REELS", subColor:"#FA7E1E", leave:at("segundo") - .4 },
  scenes:[
    { t0:at("segundo") - .3, cam:{ R:19, ty:-2 }, parts:[
      K.text3D({ text:"51%", size:1.95, at:at("cinquenta") - .3, lock:{ at:at("tempo", 2) - .2, label:"DO TEMPO NO INSTAGRAM // REELS", hw:2.5, hh:1 } }),
      K.topPanel({ at:at("sensor") - .2, title:"DADOS // SENSOR TOWER", icon:"instagram", line1:"REELS NO 2º TRIMESTRE DE 2026", line2:"TEMPO DE USO + ANÚNCIOS" }) ] },
    { t0:at("não") - .3, cam:{ ty:-1 }, parts:[
      K.stat({ title:"ONDE ESTÁ A ATENÇÃO", titleIcon:"instagram", value:51, suffix:"%", at:at("cinquenta", 2) - .1, label:"dos espaços de anúncio do Instagram já estão nos Reels", rows:[
        { label:"Tempo no app", icon:"instagram", v:51, dec:0, at:at("cinquenta", 2) + .3, hl:true },
        { label:"Espaços de anúncio", icon:"instagram", v:51, dec:0, at:at("espaços") - .1 } ] }) ] },
    { t0:at("isso") - .5, cam:{ ty:-1 }, parts:[
      K.checklist({ title:"O QUE MUDA PRA SUA MARCA", titleIcon:"instagram", items:[
        [at("isso") + .2, "Atenção agora é vídeo", "ok"],
        [at("parado") - .2, "Post parado: cada vez menos espaço", "bad"],
        [at("gancho") - .1, "Gancho forte nos 3 primeiros segundos", "ok"],
        [at("legenda") - .1, "Legenda na tela", "ok"],
        [at("ideia") - .1, "Uma ideia por vídeo", "ok"] ] }) ] },
    { t0:at("quem") - .3, cam:{ R:16, ty:-1.4 }, parts:[
      K.logo3D({ brand:"instagram", size:3.4, at:at("quem"), die:at("some") - .1, glow:"rgba(214,41,118,.3)", chip:{ text:"SUMIU DO FEED", at:at("some") } }) ] },
    { t0:at("aí") - .3, cam:{ R:20, ty:-2.2 }, parts:[
      K.versus({ a:{ lines:["VÁRIOS", "REELS"], at:at("aí") }, b:{ lines:["NENHUM", "AINDA"], at:at("ríls", 4) - .1 }, q:at("mês") - .1 }) ] },
  ],
  heads:[
    { t:.1,                  tag:"Instagram",         text:"Mais da metade do tempo *é Reels*" },
    { t:at("segundo") - .1,  tag:"Sensor Tower",      text:"*51%* do tempo no app vai pros Reels" },
    { t:at("não") - .1,      tag:"E não só atenção",  text:"*51%* dos anúncios também" },
    { t:at("isso") - .3,     tag:"Pra sua marca",     text:"Os *3 primeiros segundos* decidem tudo" },
    { t:at("quem") - .1,     tag:"A real",            text:"Quem não aparece em vídeo *some do feed*" },
    { t:at("aí") - .1,       tag:"E aí?",             text:"Quantos Reels sua marca *postou esse mês?*" },
  ],
};

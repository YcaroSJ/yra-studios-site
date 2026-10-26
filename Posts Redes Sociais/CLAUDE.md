# Posts Redes Sociais — YRA Studios

Gerador de 30 artes para Instagram da YRA Studios. Tudo num arquivo só: `index.html` (HTML+CSS+JS, sem build, abre direto no navegador ou via servidor local).

## O que é

- Formato: 4:5 retrato, 1080×1350px, exportado em 2x (2160×2700px) via `html2canvas`.
- Referência visual original: contas do Instagram v4company, blueoceansem, enredobranding — depois evoluiu pra algo mais cinematográfico/editorial.
- Paleta: vermelho suavizado `--neon:#b8261c` / `--neon-bright:#d94a3a` (o vermelho original `#d21a12`/`#ff3b2c` foi considerado forte demais). Fundo escuro `--ground:#0b0a09`. Textura de grão sutil (`.board::before`, opacity 0.07) em todos os boards.
- Cada post tem uma legenda com hashtags em `const legendas`, copiável via botão "Copiar legenda".
- Download: botão "Baixar PNG" por post, ou "Baixar todas (.zip)" que gera um zip com os 30 via JSZip.

## Como adicionar/editar um post

1. Adicione uma entrada em `const posts` (array `{type, ...campos específicos do tipo}`). Tipos existentes: `STATEMENT`, `STAT`, `MITO`, `INFOGRAFICO`, `CASE`, `GLOSS`, `AUTORIDADE`, `COMPARATIVO`, `CHECKLIST`, `PROCESSO`, `CTA`, `ERRO`. Cada tipo tem uma função renderer correspondente no objeto `renderers`.
2. Adicione a legenda+hashtags correspondente em `const legendas`, na MESMA posição do array (índice = post - 1).
3. Fotos (tipos `CASE`/`AUTORIDADE`) são embutidas como base64 (`photo:"data:image/jpeg;base64,..."`) — nunca usar `<img src="arquivo.jpg">` local por causa de cross-origin no `file://`. Redimensione antes (max ~1400px, quality ~80) pra não inchar o HTML.
4. **Nunca usar fotos de pessoas reais/famosas identificáveis** (já aconteceu de duas fotos da pasta `Fotos/` serem Elon Musk e Mark Zuckerberg disfarçados — foram recusadas). Só banco de imagens genérico.

## Regra de ouro pra exportar sem bug

**Sempre com o zoom do navegador em 100% (Ctrl+0) antes de clicar em "Baixar".** O `html2canvas` mede e desenha texto de forma diferente dependendo do zoom, e isso foi a causa raiz de praticamente todo bug de "alinhamento" que já caçamos aqui. Já existe um guard (`zoomOkToExport()`) que avisa automaticamente se o zoom mudou desde que a página carregou — mas se um bug de alinhamento aparecer de novo, confirme o zoom ANTES de sair mexendo em CSS.

## Se aparecer um novo bug de alinhamento no PNG exportado

Isso quase certamente é uma limitação do `html2canvas` (ele reimplementa renderização de layout em JS, não tira print de verdade). Bugs já catalogados e resolvidos nesse arquivo, todos via CSS aplicado só durante a exportação (classe `.exporting`, adicionada no `body` dentro de `boardCanvas()`):

- Texto renderiza alguns pixels mais baixo do que o cálculo de layout indica (afetou `.erro-badge`, `.chip-legenda`, `.checklist li`, `.comp-col li`) — compensado com `padding-top`/`padding-bottom` assimétrico (quando o texto é o próprio container flex) ou `position:relative; top:-Npx` (quando o texto é um `<span>` filho ao lado de um ícone).
- `object-fit:cover` em `<img>` não é respeitado — usar `background-image` + `background-size:cover` num `<div>` (`.photo-hero`).
- `filter:brightness(0) invert(1)` (deixar a logo branca) não é respeitado — gerar um PNG branco de verdade em vez de aplicar filtro CSS.
- `text-decoration:line-through` sai na posição errada — evitar, usar `opacity` pra indicar "mito"/erro.
- `stroke="currentColor"` e paths puramente de contorno em SVG inline falham silenciosamente — preferir caracteres de texto (ex: `&#9662;`, `&#10003;`) a ícones SVG pequenos.
- `width:100%` num filho de flex não é resolvido de forma confiável — usar `width:1080px` fixo.
- O mesmo caractere Unicode usado em dois tamanhos MUITO diferentes na mesma página (ex: um "×" gigante decorativo de fundo e um "×" pequeno de ícone) pode falhar em renderizar na instância pequena — usar caracteres diferentes.

**Sempre confirme uma correção de duas formas antes de considerar resolvido**: (1) medição de pixel no canvas exportado comparando com a posição esperada calculada a partir do layout ao vivo do DOM, E (2) um recorte visual do canvas com uma linha de referência desenhada no centro geométrico, conferida por screenshot. Medição numérica sozinha já deu falso positivo (ex: bug do círculo "VS", onde a predicate de cor pegava a borda do círculo por engano).

## Caminhos abandonados (não tentar de novo sem avisar o usuário)

- **`getDisplayMedia()`** (captura de tela real via API do navegador) — implementado e abandonado porque a troca rápida entre os 30 boards causava captura de frames obsoletos/aleatórios.
- **"Modo print" via DevTools** (overlay full-viewport + captura manual "Capture node screenshot" do Chrome) — implementado e abandonado por sair com conteúdo duplicado/bugado. Pode haver código morto relacionado a isso ainda no arquivo (`buildPrintOverlay`, `showPrintIndex`, etc.) e um botão "Modo print (sem bugs)" na toolbar.

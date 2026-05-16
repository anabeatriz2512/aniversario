# Presente para o Amor 🌙✨

Site de aniversário feito sob medida para o ficante da Bia.

## Como hospedar no GitHub Pages

1. **Criar o repositório**
   - Vá em [github.com/new](https://github.com/new)
   - Dê um nome qualquer (ex: `presente-amor` ou `feliz-aniversario`)
   - Marque como **Public** (Pages grátis só funciona em repo público)
   - Clique em **Create repository**

2. **Subir os arquivos**
   - Faça upload destes 3 arquivos (arrastando para a página do GitHub ou via git):
     - `index.html`
     - `style.css`
     - `script.js`

3. **Ativar o GitHub Pages**
   - No repositório, vá em **Settings → Pages** (menu da esquerda)
   - Em **Source**, escolha **Deploy from a branch**
   - Em **Branch**, escolha **main** e pasta **/(root)** → **Save**
   - Espera uns 30 segundos a 2 minutos

4. **Pegar o link**
   - O link aparece no topo da mesma página, algo como:
     `https://SEU-USUARIO.github.io/presente-amor/`
   - Esse é o link pra mandar pra ela.

## Como funciona

O site tem 6 telas que se desbloqueiam uma de cada vez:

1. **Capa** — céu estrelado com botão "toque para descobrir"
2. **Carta** — pergaminho dourado se desenrola com a carta completa
3. **Constelação** — 5 estrelas que ela clica pra revelar qualidades dele; ao final, as estrelas se ligam formando um desenho
4. **Pedido** — uma estrela cadente atravessa a tela; clicar nela = pedido feito
5. **Bolo** — 5 velinhas pra "soprar" (clicar em cada uma)
6. **Final** — mensagem final, confetes caem, e tem um botão pra reviver tudo

Tudo funciona sem internet depois de carregar (só usa Google Fonts via CDN).

## Personalizar

Quer trocar alguma coisa? Tudo tá no `index.html` (texto da carta, qualidades dele na constelação, etc.). O CSS no `style.css` controla cores — as principais variáveis estão no topo do arquivo:

```css
:root {
  --bg-deep: #050818;     /* azul profundo do céu */
  --gold: #e8c87a;        /* dourado dos detalhes */
  --paper: #f1e2bd;       /* cor do pergaminho */
}
```

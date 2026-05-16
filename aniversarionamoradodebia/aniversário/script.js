/* ============================================
   PARA O AMOR — Feliz Aniversário
   Interações: estrelas, pergaminho, constelação,
   estrela cadente, bolo e confetes
   ============================================ */

(() => {
  'use strict';

  // -------- 1. GERA O CÉU ESTRELADO --------
  const sky = document.getElementById('sky');
  const STAR_COUNT = window.innerWidth < 640 ? 90 : 170;
  for (let i = 0; i < STAR_COUNT; i++) {
    const s = document.createElement('span');
    s.className = 'star' + (Math.random() < 0.18 ? ' gold' : '');
    const size = Math.random() * 2.2 + 0.6;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.top = Math.random() * 100 + '%';
    s.style.left = Math.random() * 100 + '%';
    s.style.setProperty('--dur', (Math.random() * 4 + 2.5) + 's');
    s.style.setProperty('--delay', (Math.random() * 5) + 's');
    sky.appendChild(s);
  }

  // -------- 2. ESTRELAS CADENTES DECORATIVAS --------
  const shootingLayer = document.getElementById('shootingLayer');
  function launchShooting() {
    const s = document.createElement('span');
    s.className = 'shooting';
    s.style.top = (Math.random() * 40) + '%';
    s.style.right = (Math.random() * 30) + '%';
    shootingLayer.appendChild(s);
    setTimeout(() => s.remove(), 1700);
  }
  setInterval(() => { if (Math.random() < 0.55) launchShooting(); }, 4200);

  // -------- 3. NAVEGAÇÃO ENTRE TELAS --------
  const screens = {
    cover: document.getElementById('screen-cover'),
    letter: document.getElementById('screen-letter'),
    constellation: document.getElementById('screen-constellation'),
    wish: document.getElementById('screen-wish'),
    cake: document.getElementById('screen-cake'),
    final: document.getElementById('screen-final'),
  };
  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // -------- 4. COVER → CARTA (com pergaminho desenrolando) --------
  const openBtn = document.getElementById('openBtn');
  const scroll = document.getElementById('scroll');

  openBtn.addEventListener('click', () => {
    // Pequeno glow antes da transição
    openBtn.style.boxShadow = '0 0 80px rgba(247, 217, 138, 0.6)';
    setTimeout(() => {
      showScreen('letter');
      // pequena pausa antes de desenrolar
      setTimeout(() => scroll.classList.add('open'), 350);
    }, 480);
  });

  // -------- 5. CARTA → CONSTELAÇÃO --------
  document.getElementById('toConstellation').addEventListener('click', () => {
    showScreen('constellation');
    setTimeout(initConstellation, 200);
  });

  // -------- 6. CONSTELAÇÃO INTERATIVA --------
  const constellationStage = document.getElementById('constellationStage');
  const constellationRevealed = document.getElementById('constellationRevealed');
  const toWishBtn = document.getElementById('toWish');

  // posições (porcentagens) + qualidades + frases reveladas
  const constellationData = [
    { x: 14, y: 30, label: 'atencioso',  phrase: 'do jeito mais raro — o tipo de atenção que faz a gente se sentir vista de verdade.' },
    { x: 32, y: 62, label: 'acolhedor',  phrase: 'me sinto em casa quando você tá por perto, mesmo a gente tendo se conhecido tão pouco.' },
    { x: 50, y: 22, label: 'leve',       phrase: 'você entrou na minha vida sem fazer barulho, e ficou. esse é o seu tipo de leveza.' },
    { x: 68, y: 58, label: 'presente',   phrase: 'você não tá só ali — você tá ali pra mim. e isso é coisa pra poucos.' },
    { x: 84, y: 36, label: 'meu',        phrase: 'meu favorito.' },
  ];

  let constellationInitialized = false;
  function initConstellation() {
    if (constellationInitialized) return;
    constellationInitialized = true;

    let revealedCount = 0;
    constellationData.forEach((s, i) => {
      const btn = document.createElement('button');
      btn.className = 'cs-star';
      btn.style.left = s.x + '%';
      btn.style.top = s.y + '%';
      btn.setAttribute('aria-label', 'Estrela ' + (i+1));
      const label = document.createElement('span');
      label.className = 'cs-label';
      label.textContent = s.label;
      btn.appendChild(label);

      btn.addEventListener('click', () => {
        if (btn.classList.contains('revealed')) return;
        btn.classList.add('revealed');
        constellationRevealed.style.opacity = '0';
        setTimeout(() => {
          constellationRevealed.textContent = '"' + s.phrase + '"';
          constellationRevealed.style.opacity = '1';
        }, 280);
        revealedCount++;
        if (revealedCount === constellationData.length) {
          drawConstellationLines();
          toWishBtn.disabled = false;
          setTimeout(() => {
            constellationRevealed.style.opacity = '0';
            setTimeout(() => {
              constellationRevealed.textContent = 'é isso. essas estrelas, todas juntas, são você pra mim. ✦';
              constellationRevealed.style.opacity = '1';
            }, 300);
          }, 1800);
        }
      });
      constellationStage.appendChild(btn);
    });

    // SVG por cima do palco para ligar as estrelas
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'cs-svg');
    svg.style.position = 'absolute';
    svg.style.inset = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    constellationStage.appendChild(svg);

    function drawConstellationLines() {
      const stage = constellationStage.getBoundingClientRect();
      // conecta em ordem: 0→1→2→3→4→0 fechando o desenho
      const order = [0, 1, 2, 3, 4, 0];
      for (let i = 0; i < order.length - 1; i++) {
        const a = constellationData[order[i]];
        const b = constellationData[order[i+1]];
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', (a.x / 100) * stage.width);
        line.setAttribute('y1', (a.y / 100) * stage.height);
        line.setAttribute('x2', (b.x / 100) * stage.width);
        line.setAttribute('y2', (b.y / 100) * stage.height);
        line.setAttribute('stroke', 'rgba(247, 217, 138, 0.55)');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-dasharray', '600');
        line.setAttribute('stroke-dashoffset', '600');
        line.style.filter = 'drop-shadow(0 0 4px rgba(247, 217, 138, 0.7))';
        svg.appendChild(line);
        setTimeout(() => {
          line.style.transition = 'stroke-dashoffset 1.4s ease';
          line.setAttribute('stroke-dashoffset', '0');
        }, 100 + i * 200);
      }
    }
  }

  // -------- 7. CONSTELAÇÃO → PEDIDO --------
  toWishBtn.addEventListener('click', () => {
    showScreen('wish');
  });

  // -------- 8. ESTRELA CADENTE (PEDIDO) --------
  const wishTrail = document.getElementById('wishTrail');
  const wishResult = document.getElementById('wishResult');
  const toCakeBtn = document.getElementById('toCake');

  function catchWish() {
    if (wishTrail.classList.contains('caught')) return;
    wishTrail.classList.add('caught');
    wishResult.textContent = 'pedido feito ✦ tomara que vire verdade.';
    wishResult.classList.add('show');
    toCakeBtn.disabled = false;
  }
  wishTrail.addEventListener('click', catchWish);
  wishTrail.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); catchWish(); }
  });

  // -------- 9. PEDIDO → BOLO --------
  toCakeBtn.addEventListener('click', () => {
    showScreen('cake');
  });

  // -------- 10. BOLO COM VELAS --------
  const candles = document.querySelectorAll('.candle');
  const cakeStatus = document.getElementById('cakeStatus');
  const toFinalBtn = document.getElementById('toFinal');
  let outCount = 0;
  candles.forEach(c => {
    c.addEventListener('click', () => {
      if (c.classList.contains('out')) return;
      c.classList.add('out');
      outCount++;
      const left = candles.length - outCount;
      if (left > 0) {
        cakeStatus.textContent = left + (left === 1 ? ' velinha acesa' : ' velinhas acesas');
      } else {
        cakeStatus.innerHTML = '✨ faz um pedido ✨';
        toFinalBtn.disabled = false;
      }
    });
  });

  // -------- 11. BOLO → FINAL (com confetes) --------
  toFinalBtn.addEventListener('click', () => {
    showScreen('final');
    setTimeout(startConfetti, 200);
  });

  // -------- 12. CONFETES (canvas) --------
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  let confettiPieces = [];
  let confettiRunning = false;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function startConfetti() {
    confettiPieces = [];
    const colors = ['#f7d98a', '#e8c87a', '#fff5d2', '#d99fbf', '#ffffff'];
    for (let i = 0; i < 140; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height,
        w: Math.random() * 8 + 4,
        h: Math.random() * 10 + 6,
        c: colors[Math.floor(Math.random() * colors.length)],
        vy: Math.random() * 2 + 1.4,
        vx: (Math.random() - 0.5) * 1.6,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.16,
      });
    }
    if (!confettiRunning) {
      confettiRunning = true;
      requestAnimationFrame(drawConfetti);
    }
    setTimeout(() => { confettiRunning = false; }, 6000);
  }
  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    });
    confettiPieces = confettiPieces.filter(p => p.y < canvas.height + 30);
    if (confettiRunning || confettiPieces.length > 0) {
      requestAnimationFrame(drawConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // -------- 13. REINICIAR --------
  document.getElementById('restartBtn').addEventListener('click', () => {
    // resetar estados
    scroll.classList.remove('open');
    wishTrail.classList.remove('caught');
    wishResult.classList.remove('show');
    wishResult.textContent = '';
    toCakeBtn.disabled = true;
    toWishBtn.disabled = true;
    toFinalBtn.disabled = true;
    candles.forEach(c => c.classList.remove('out'));
    outCount = 0;
    cakeStatus.textContent = '5 velinhas acesas';
    // limpar constelação para regenerar
    constellationStage.innerHTML = '';
    constellationRevealed.textContent = '';
    constellationRevealed.style.opacity = '0';
    constellationInitialized = false;
    showScreen('cover');
  });

  // -------- 14. ESC: reseta com gentileza --------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // não faz nada agressivo, apenas garante foco no botão de abrir se estiver na capa
      const active = document.querySelector('.screen.active');
      if (active === screens.cover) openBtn.focus();
    }
  });

})();

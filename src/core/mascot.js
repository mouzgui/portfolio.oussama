// Desktop Mascot — A wizard that guides users through the portfolio
// Each hover reveals the next tip. First: portfolio guide. Then: Darija jokes.

// ========================================
// SEQUENTIAL MESSAGES
// ========================================

// Phase 1: Portfolio discovery guide (shown first, in order)
const GUIDE_MESSAGES = [
  "Mrhba bik! 🧙 Ana l'wizard dyalk, hover 3liya w nwrik kolchi!",
  "Ftech f About Me 📁 bach t3rf chkoun ana w chnou kandir!",
  "Sir l Projects 🚀 w chouf chnou bniit b yeddiya!",
  "3ndi Experience folder 💼 fih khedmati kolha, ftech w chouf!",
  "Chouf Education 🎓 dyali, ghadi t3jbek!",
  "Wrk 3la ☰ li fo9 3la liser, fih Settings bach tbddel theme wla wallpaper! 🎨",
  "Jerreb Terminal ⌨️ kteb 'help' bach tchouf l'commands li kaynin!",
  "Bghi tsiftli message? 📧 Click 3la Mail f'dock!",
  "Sme3 muzika 🎵 click 3la Spotify f'dock w nta kat'explori!",
  "Ila mlliti, l3ab chi game 🎮 f'dock, 3ndi Minesweeper w Snake!",
  "Chouf 🏆 fo9 3la limen, fih achievements secrets!",
  "CV dyali 📄 kayn f Desktop, click 3lih!",
];

// Phase 2: Fun Darija phrases (shown after guide is done, random)
const DARIJA_JOKES = [
  "feen albatal? 🏃‍♂️",
  "ta tla9 mni? ra rjli hadik! 😤",
  "khooya tla9 mni! 🙏",
  "achbghiti 3ndi? 😂",
  "waaaah tban lia mn hadok li kaydwiw m3a l'écran 👀",
  "sir chouf CV dyali, machi ana! 📄",
  "wa ntaya, wach baghi t5dm m3aya? 🤝",
  "ana developer machi souris! 🖱️",
  "3tini break gha 3yit! 😩",
  "wa chkoun nta bach t'hoverini? 😂",
  "ana sahir d'code, machi wizard 3adi! 🧙",
  "abracadabra... deployiiit! 🚀",
  "gha sir l Projects, tema feen l'magic! ✨",
  "wach 3jbek l'portfolio? ila 3jbek hire me! 😎",
  "click 3la chi haja, matb9ach gha tstari fiya! 🖱️",
  "ra ana gha pixel, matkhlaa3ch! 😅",
  "ntaya zwin hit jawbti 3la l'wizard 🫶",
];

// ========================================
// STATE
// ========================================
let mascotEl = null;
let bubbleEl = null;
let trailContainer = null;
let posX = 0;
let posY = 0;
let targetX = 0;
let targetY = 0;
let animFrame = null;
let isPaused = false;
let walkFrame = 0;
let trailTimer = 0;

let hoverCount = 0; // tracks which message to show next
let bubbleTimeout = null;

// ========================================
// INIT
// ========================================
export function initMascot() {
  // Trail container
  trailContainer = document.createElement('div');
  trailContainer.id = 'mascot-trails';
  trailContainer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:799;overflow:hidden;';
  document.getElementById('desktop-environment').appendChild(trailContainer);

  // Mascot element
  mascotEl = document.createElement('div');
  mascotEl.id = 'desktop-mascot';
  mascotEl.innerHTML = getWizardSVG();
  document.getElementById('desktop-environment').appendChild(mascotEl);

  // Speech bubble
  bubbleEl = document.createElement('div');
  bubbleEl.id = 'mascot-bubble';
  bubbleEl.classList.add('mascot-bubble');
  document.getElementById('desktop-environment').appendChild(bubbleEl);

  // Start position
  posX = window.innerWidth - 120;
  posY = window.innerHeight - 180;
  mascotEl.style.left = posX + 'px';
  mascotEl.style.top = posY + 'px';

  // First random target
  pickNewTarget();

  // Events
  mascotEl.addEventListener('mouseenter', onHover);
  mascotEl.addEventListener('mouseleave', onLeave);
  mascotEl.addEventListener('click', onHover); // click also shows next message

  // Start
  animate();
}

// ========================================
// MOVEMENT
// ========================================
function pickNewTarget() {
  const padding = 80;
  targetX = padding + Math.random() * (window.innerWidth - padding * 2 - 40);
  targetY = 50 + Math.random() * (window.innerHeight - 200);
}

function animate() {
  if (!isPaused) {
    walkFrame++;
    trailTimer++;

    // Move toward target
    const dx = targetX - posX;
    const dy = targetY - posY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 3) {
      const speed = Math.min(2.8, Math.max(0.8, dist * 0.015));
      posX += (dx / dist) * speed;
      posY += (dy / dist) * speed;
    } else {
      // Reached target, wait a bit then pick new one
      if (walkFrame % 120 === 0) {
        pickNewTarget();
      }
    }

    // Flip
    if (Math.abs(dx) > 1) {
      mascotEl.style.transform = dx < 0 ? 'scaleX(-1)' : 'scaleX(1)';
    }

    mascotEl.style.left = posX + 'px';
    mascotEl.style.top = posY + 'px';

    // Float bob
    const bob = Math.sin(walkFrame * 0.08) * 3;
    mascotEl.style.marginTop = bob + 'px';

    // Sparkle trail
    if (dist > 4 && trailTimer % 6 === 0) {
      spawnTrailParticle(posX + 18, posY + 35);
    }
  }

  animFrame = requestAnimationFrame(animate);
}

// ========================================
// HOVER HANDLERS
// ========================================
function onHover() {
  isPaused = true;
  mascotEl.classList.add('paused');

  // Clear any auto-hide timeout
  if (bubbleTimeout) clearTimeout(bubbleTimeout);

  // Get the next message
  const msg = getNextMessage();
  showBubble(msg);
}

function onLeave() {
  isPaused = false;
  mascotEl.classList.remove('paused');

  // Hide bubble after a small delay so user can read it
  bubbleTimeout = setTimeout(() => {
    hideBubble();
    // Dash away!
    pickNewTarget();
  }, 600);
}

function getNextMessage() {
  if (hoverCount < GUIDE_MESSAGES.length) {
    // Still in guide phase — return next guide message
    const msg = GUIDE_MESSAGES[hoverCount];
    hoverCount++;
    return msg;
  } else {
    // Guide done — pick random Darija joke
    hoverCount++;
    return DARIJA_JOKES[Math.floor(Math.random() * DARIJA_JOKES.length)];
  }
}

// ========================================
// SPEECH BUBBLE
// ========================================
function showBubble(msg) {
  bubbleEl.textContent = msg;

  // Position above wizard, clamped to screen
  const bubbleRect = bubbleEl.getBoundingClientRect();
  let bx = posX + 20 - 120; // center roughly
  let by = posY - 60;

  // Clamp horizontally
  bx = Math.max(8, Math.min(bx, window.innerWidth - 260));
  // If too close to top, show below
  if (by < 10) {
    by = posY + 58;
    bubbleEl.classList.add('below');
  } else {
    bubbleEl.classList.remove('below');
  }

  bubbleEl.style.left = bx + 'px';
  bubbleEl.style.top = by + 'px';
  bubbleEl.classList.add('visible');
}

function hideBubble() {
  bubbleEl.classList.remove('visible');
}

// ========================================
// TRAIL PARTICLES
// ========================================
function spawnTrailParticle(x, y) {
  const p = document.createElement('div');
  p.className = 'mascot-trail-particle';
  p.style.left = (x + (Math.random() - 0.5) * 10) + 'px';
  p.style.top = (y + (Math.random() - 0.5) * 6) + 'px';

  const sparkles = ['✦', '✧', '⋆', '˚', '∗', '·'];
  p.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];

  trailContainer.appendChild(p);
  setTimeout(() => p.remove(), 800);
}

// ========================================
// WIZARD SVG
// ========================================
function getWizardSVG() {
  return `<svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Wizard Hat -->
    <polygon points="20,0 8,18 32,18" fill="#5b21b6"/>
    <polygon points="20,0 14,18 26,18" fill="#7c3aed"/>
    <ellipse cx="20" cy="18" rx="14" ry="3" fill="#5b21b6"/>
    <text x="18" y="14" font-size="7" fill="#fbbf24">★</text>
    <!-- Face -->
    <rect x="12" y="18" width="16" height="12" rx="5" fill="#e8c39e"/>
    <!-- Eyes -->
    <circle cx="17" cy="24" r="2" fill="#7c3aed">
      <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="23" cy="24" r="2" fill="#7c3aed">
      <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="17" cy="23.5" r="0.8" fill="#fff"/>
    <circle cx="23" cy="23.5" r="0.8" fill="#fff"/>
    <!-- Beard -->
    <path d="M14 28 Q16 36 20 38 Q24 36 26 28" fill="#d1d5db"/>
    <path d="M16 30 Q18 35 20 36 Q22 35 24 30" fill="#e5e7eb"/>
    <!-- Robe -->
    <path d="M10 30 L8 50 L32 50 L30 30 Z" fill="#5b21b6"/>
    <path d="M14 30 L12 50 L28 50 L26 30 Z" fill="#7c3aed"/>
    <rect x="12" y="34" width="16" height="2" rx="1" fill="#fbbf24"/>
    <!-- Staff -->
    <rect x="32" y="22" width="2.5" height="26" rx="1" fill="#92400e"/>
    <circle cx="33.25" cy="20" r="4" fill="#a78bfa" opacity="0.8">
      <animate attributeName="r" values="3.5;4.5;3.5" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="33.25" cy="20" r="2" fill="#c4b5fd">
      <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite"/>
    </circle>
    <!-- Left hand -->
    <circle cx="8" cy="38" r="3" fill="#e8c39e"/>
    <!-- Feet -->
    <rect x="10" y="48" width="8" height="4" rx="2" fill="#3b0764"/>
    <rect x="22" y="48" width="8" height="4" rx="2" fill="#3b0764"/>
  </svg>`;
}

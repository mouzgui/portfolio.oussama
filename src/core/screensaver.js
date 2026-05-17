import { getSettings, onSettingsChange } from './settings.js';
import '../styles/screensaver.css';

let lastActivityTime = Date.now();
let isActive = false;
let checkInterval = null;
let animFrame = null;
let overlay = null;

// Logo bouncing state
let x = 0;
let y = 0;
let dx = 2;
let dy = 2;
let colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ffffff'];
let colorIndex = 0;

export function initScreensaver() {
  // Listen for activity
  ['mousemove', 'mousedown', 'keydown', 'touchstart'].forEach(evt => {
    document.addEventListener(evt, resetActivity);
  });

  // Check periodically
  checkInterval = setInterval(checkInactivity, 1000);
}

function resetActivity() {
  lastActivityTime = Date.now();
  if (isActive) {
    stopScreensaver();
  }
}

function checkInactivity() {
  const settings = getSettings();
  if (!settings.screensaverEnabled) return;
  if (isActive) return;

  const timeoutMs = settings.screensaverTimeout * 60 * 1000;
  if (Date.now() - lastActivityTime > timeoutMs) {
    startScreensaver();
  }
}

function startScreensaver() {
  isActive = true;
  
  overlay = document.createElement('div');
  overlay.id = 'screensaver-overlay';
  
  const logo = document.createElement('div');
  logo.id = 'screensaver-logo';
  logo.textContent = 'PORTFOLIO';
  logo.style.color = colors[colorIndex];
  
  overlay.appendChild(logo);
  document.body.appendChild(overlay);

  // Initialize position randomly
  const w = window.innerWidth;
  const h = window.innerHeight;
  x = Math.random() * (w - 150);
  y = Math.random() * (h - 60);

  // Randomize direction but keep it roughly diagonal
  dx = (Math.random() > 0.5 ? 1 : -1) * (1.5 + Math.random());
  dy = (Math.random() > 0.5 ? 1 : -1) * (1.5 + Math.random());

  function animate() {
    if (!isActive) return;

    x += dx;
    y += dy;

    let hitEdge = false;
    if (x + 150 >= window.innerWidth || x <= 0) {
      dx = -dx;
      hitEdge = true;
    }
    if (y + 60 >= window.innerHeight || y <= 0) {
      dy = -dy;
      hitEdge = true;
    }

    if (hitEdge) {
      colorIndex = (colorIndex + 1) % colors.length;
      logo.style.color = colors[colorIndex];
    }

    logo.style.transform = `translate(${x}px, ${y}px)`;
    animFrame = requestAnimationFrame(animate);
  }

  animate();
}

function stopScreensaver() {
  isActive = false;
  if (overlay) {
    overlay.remove();
    overlay = null;
  }
  if (animFrame) {
    cancelAnimationFrame(animFrame);
    animFrame = null;
  }
}

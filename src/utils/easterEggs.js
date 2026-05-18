// Easter Eggs — hidden interactions and surprises

import { showToast, triggerConfetti, startMatrixRain } from './animations.js';

let konamiSequence = [];
const KONAMI_CODE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let logoClickCount = 0;
let logoClickTimer = null;

export function initEasterEggs() {
  // Konami Code listener
  document.addEventListener('keydown', (e) => {
    konamiSequence.push(e.key);
    if (konamiSequence.length > KONAMI_CODE.length) {
      konamiSequence.shift();
    }
    if (konamiSequence.length === KONAMI_CODE.length &&
        konamiSequence.every((k, i) => k === KONAMI_CODE[i])) {
      activateRetroMode();
      konamiSequence = [];
    }
  });

  // Logo click counter
  const logo = document.getElementById('menu-logo');
  if (logo) {
    logo.addEventListener('click', () => {
      logoClickCount++;
      clearTimeout(logoClickTimer);

      if (logoClickCount >= 7) {
        activateDevMode();
        logoClickCount = 0;
      } else if (logoClickCount >= 3) {
        showToast(`${7 - logoClickCount} more clicks to activate developer mode...`);
      }

      logoClickTimer = setTimeout(() => { logoClickCount = 0; }, 2000);
    });
  }

  // Keyboard shortcut: Ctrl/Cmd + Shift + D for theme toggle hint
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
      e.preventDefault();
      showToast('🌗 Theme toggle is a feature for v2.0! Stay tuned.');
    }
  });
}

function activateRetroMode() {
  const isRetro = document.body.classList.toggle('retro-mode');
  if (isRetro) {
    showToast('🕹️ RETRO MODE ACTIVATED! Press Konami code again to disable.');
    triggerConfetti();

    // Change desktop background temporarily
    const desktop = document.getElementById('desktop');
    desktop.style.background = 'linear-gradient(180deg, #000033 0%, #000066 50%, #000033 100%)';
  } else {
    showToast('Retro mode deactivated. Welcome back to the future!');
    const desktop = document.getElementById('desktop');
    desktop.style.background = '';
  }
}

function activateDevMode() {
  showToast('🛠️ Developer Mode activated! Check the console for a secret message.');
  triggerConfetti();

  console.log('%c🔧 DEVELOPER MODE 🔧', 'font-size: 24px; font-weight: bold; color: #27C93F;');
  console.log('%cHey there, fellow developer! 👋', 'font-size: 16px; color: #007AFF;');
  console.log('%cYou found the secret developer mode!', 'font-size: 14px; color: #f0f0f0;');
  console.log('%cThis portfolio was built with:', 'font-size: 14px; color: #f0f0f0;');
  console.log('%c  • Vanilla JavaScript (no frameworks!)', 'font-size: 12px; color: #8e8e93;');
  console.log('%c  • CSS Custom Properties for theming', 'font-size: 12px; color: #8e8e93;');
  console.log('%c  • Vite for bundling', 'font-size: 12px; color: #8e8e93;');
  console.log('%c  • A lot of love and attention to detail 💜', 'font-size: 12px; color: #8e8e93;');
  console.log('%cLet\'s connect: omouzgui@gmail.com', 'font-size: 14px; color: #FFBD2E; font-weight: bold;');

  // Add glow to all open windows
  document.querySelectorAll('.app-window').forEach(w => {
    w.classList.add('dev-mode-glow');
    setTimeout(() => w.classList.remove('dev-mode-glow'), 5000);
  });
}

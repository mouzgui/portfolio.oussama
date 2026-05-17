// Main entry point — bootstrap the desktop OS

// Styles
import './styles/index.css';
import './styles/desktop.css';
import './styles/menubar.css';
import './styles/dock.css';
import './styles/window.css';
import './styles/finder.css';
import './styles/terminal.css';
import './styles/email.css';
import './styles/viewer.css';
import './styles/minesweeper.css';
import './styles/snake.css';
import './styles/easter-eggs.css';
import './styles/preferences.css';
import './styles/achievements.css';
import './styles/themes.css';
import './styles/mascot.css';

// Core
import { initMenuBar } from './core/menubar.js';
import { initDock, setAppOpener as setDockAppOpener } from './core/dock.js';
import { initDesktop, setDesktopAppOpener, renderDesktopIcons } from './core/desktop.js';
import { findWindowByApp, focusWindow, restoreWindow } from './core/windowManager.js';
import { initSettings } from './core/settings.js';
import { initScreensaver } from './core/screensaver.js';
import { initAchievements } from './core/achievements.js';
import { initMascot } from './core/mascot.js';

// Apps
import { openFinder, setFinderAppOpener } from './apps/finder.js';
import { openTerminal, setTerminalAppOpener } from './apps/terminal.js';
import { openEmail } from './apps/email.js';
import { openPdfViewer } from './apps/pdfViewer.js';
import { openTextViewer } from './apps/textViewer.js';
import { openProjectViewer } from './apps/imageViewer.js';
import { openMinesweeper } from './apps/minesweeper.js';
import { openSnake } from './apps/snake.js';
import { openSpotify } from './apps/spotify.js';
import { openSystemPreferences } from './apps/systemPreferences.js';
import { openAchievements } from './apps/achievementsWindow.js';

// Utils
import { initEasterEggs } from './utils/easterEggs.js';

// ========================================
// Central app opener — routes app IDs to their open functions
// ========================================
function openApp(appId, arg) {
  // Check if already open and focus it
  const existingId = findWindowByApp(appId);
  if (existingId && appId !== 'finder' && appId !== 'text' && appId !== 'project') {
    const el = document.getElementById(existingId);
    if (el && el.style.display === 'none') {
      restoreWindow(existingId);
    } else {
      focusWindow(existingId);
    }
    return;
  }

  switch (appId) {
    case 'finder':
      openFinder(arg || '/');
      break;
    case 'terminal':
      openTerminal();
      break;
    case 'email':
      openEmail();
      break;
    case 'pdf':
      openPdfViewer();
      break;
    case 'text':
      openTextViewer(arg);
      break;
    case 'project':
      openProjectViewer(arg);
      break;
    case 'minesweeper':
      openMinesweeper();
      break;
    case 'snake':
      openSnake();
      break;
    case 'spotify':
      openSpotify();
      break;
    case 'trash':
      openFinder('/Trash');
      break;
    case 'settings':
      openSystemPreferences();
      break;
    case 'achievements':
      openAchievements();
      break;
    default:
      console.warn(`Unknown app: ${appId}`);
  }
}

// Wire up app opener to all modules that need it
setDockAppOpener(openApp);
setDesktopAppOpener(openApp);
setFinderAppOpener(openApp);
setTerminalAppOpener(openApp);

// ========================================
// Boot Sequence
// ========================================
function boot() {
  const bootScreen = document.getElementById('boot-screen');
  const desktopEnv = document.getElementById('desktop-environment');
  const progressBar = document.querySelector('.boot-progress-bar');

  let progress = 0;
  const bootInterval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(bootInterval);

      // Fade out boot screen
      setTimeout(() => {
        bootScreen.classList.add('fade-out');
        desktopEnv.classList.remove('hidden');

        // Initialize everything
        initMenuBar();
        initDock();
        initDesktop();
        initSettings();
        initScreensaver();
        initAchievements();
        initEasterEggs();
        initMascot();

        // Trophy icon click
        const trophyIcon = document.getElementById('trophy-icon');
        if (trophyIcon) {
          trophyIcon.addEventListener('click', () => openApp('achievements'));
        }

        // Remove boot screen after fade
        setTimeout(() => bootScreen.remove(), 800);
      }, 300);
    }
    progressBar.style.width = progress + '%';
  }, 150);
}

// Start boot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
// Dock Controller

import { dockItems } from '../data/fileTree.js';
import { onWindowEvent, findWindowByApp, focusWindow, restoreWindow, isAppOpen, getOpenApps } from './windowManager.js';

let appOpener = null; // will be set externally

export function setAppOpener(fn) {
  appOpener = fn;
}

export function initDock() {
  renderDock();
  setupMagnification();

  // Listen for window events to update running indicators
  onWindowEvent('open', updateRunningIndicators);
  onWindowEvent('close', updateRunningIndicators);
}

function renderDock() {
  const container = document.getElementById('dock-items');
  container.innerHTML = '';

  dockItems.forEach(item => {
    if (item.id === 'separator') {
      const sep = document.createElement('div');
      sep.className = 'dock-separator';
      container.appendChild(sep);
      return;
    }

    const el = document.createElement('div');
    el.className = 'dock-icon';
    el.dataset.appId = item.id;
    el.innerHTML = `
      <div class="dock-tooltip">${item.name}</div>
      <div class="dock-icon-img">${item.icon}</div>
      <div class="dock-indicator"></div>
    `;

    el.addEventListener('click', () => handleDockClick(item.id));
    container.appendChild(el);
  });
}

function handleDockClick(appId) {
  const existingId = findWindowByApp(appId);
  if (existingId) {
    // Check if minimized
    const el = document.getElementById(existingId);
    if (el && el.style.display === 'none') {
      restoreWindow(existingId);
    } else {
      focusWindow(existingId);
    }
    return;
  }

  // Bounce animation
  const dockIcon = document.querySelector(`.dock-icon[data-app-id="${appId}"]`);
  if (dockIcon) {
    dockIcon.classList.add('bouncing');
    setTimeout(() => dockIcon.classList.remove('bouncing'), 600);
  }

  // Open app
  if (appOpener) appOpener(appId);
}

function updateRunningIndicators() {
  const openApps = getOpenApps();
  document.querySelectorAll('.dock-icon').forEach(el => {
    const appId = el.dataset.appId;
    if (openApps.has(appId)) {
      el.classList.add('running');
    } else {
      el.classList.remove('running');
    }
  });
}

export function updateTrashIcon(hasItems) {
  const trashIcon = document.querySelector('.dock-icon[data-app-id="trash"] .dock-icon-img');
  if (trashIcon) {
    // Note: To dynamically change between empty/full, we'd need to import win98Icons here
    // For now we'll just keep the empty icon since we imported it from fileTree.js
    // Alternatively, we can use the CDN directly
    const imgUrl = hasItems 
      ? 'https://win98icons.alexmeub.com/icons/png/recycle_bin_full-4.png'
      : 'https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png';
    trashIcon.innerHTML = `<img src="${imgUrl}" alt="Trash" style="width: 100%; height: 100%; object-fit: contain;">`;
  }
}

function setupMagnification() {
  const dock = document.getElementById('dock');
  const icons = () => dock.querySelectorAll('.dock-icon');

  dock.addEventListener('mousemove', (e) => {
    const dockRect = dock.getBoundingClientRect();
    const mouseX = e.clientX;

    icons().forEach(icon => {
      const iconRect = icon.querySelector('.dock-icon-img').getBoundingClientRect();
      const iconCenter = iconRect.left + iconRect.width / 2;
      const distance = Math.abs(mouseX - iconCenter);
      const maxDist = 120;

      if (distance < maxDist) {
        const scale = 1 + 0.35 * (1 - distance / maxDist);
        icon.querySelector('.dock-icon-img').style.transform = `scale(${scale})`;
      } else {
        icon.querySelector('.dock-icon-img').style.transform = '';
      }
    });
  });

  dock.addEventListener('mouseleave', () => {
    icons().forEach(icon => {
      icon.querySelector('.dock-icon-img').style.transform = '';
    });
  });
}

// Desktop icon management and interaction

import { fs } from './fileSystem.js';

let appOpener = null;
let selectedIcons = new Set();

export function setDesktopAppOpener(fn) {
  appOpener = fn;
}

export function initDesktop() {
  renderDesktopIcons();
  setupDesktopInteractions();
}

export function renderDesktopIcons() {
  const container = document.getElementById('desktop-icons');
  container.innerHTML = '';

  const items = fs.listDir('/');
  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'desktop-icon';
    el.dataset.name = item.name;
    el.dataset.type = item.type;
    el.innerHTML = `
      <div class="desktop-icon-img">${item.icon}</div>
      <span class="desktop-icon-label">${item.name}</span>
    `;

    // Double-click to open
    el.addEventListener('dblclick', (e) => {
      e.preventDefault();
      openDesktopItem(item);
    });

    // Single click to select
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!e.ctrlKey && !e.metaKey) {
        clearSelection();
      }
      toggleSelection(el);
    });

    // Right-click context menu
    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      clearSelection();
      toggleSelection(el);
      showContextMenu(e.clientX, e.clientY, item);
    });

    container.appendChild(el);
  });
}

function openDesktopItem(item) {
  if (!appOpener) return;

  if (item.type === 'folder') {
    if (item.isTrash) {
      appOpener('finder', '/Trash');
    } else {
      appOpener('finder', '/' + item.name);
    }
  } else if (item.fileType === 'pdf') {
    appOpener('pdf');
  } else if (item.fileType === 'project') {
    appOpener('project', item.name);
  } else {
    appOpener('text', '/' + item.name);
  }
}

function setupDesktopInteractions() {
  const desktop = document.getElementById('desktop');

  // Click desktop to deselect
  desktop.addEventListener('click', (e) => {
    if (e.target === desktop || e.target.id === 'desktop-icons') {
      clearSelection();
      hideContextMenu();
    }
  });

  // Right-click desktop
  desktop.addEventListener('contextmenu', (e) => {
    if (e.target === desktop || e.target === document.getElementById('desktop-icons') || e.target.id === 'desktop') {
      e.preventDefault();
      showDesktopContextMenu(e.clientX, e.clientY);
    }
  });

  // Hide context menu on click elsewhere
  document.addEventListener('click', hideContextMenu);

  // Keyboard: Enter to open, Delete to trash
  document.addEventListener('keydown', (e) => {
    if (selectedIcons.size === 0) return;
    // Ignore keyboard events from inside windows (e.g. terminal input)
    if (e.target.closest('.window')) return;
    if (e.key === 'Enter') {
      selectedIcons.forEach(el => {
        const name = el.dataset.name;
        const item = fs.resolve('/' + name) || fs.listDir('/').find(i => i.name === name);
        if (item) openDesktopItem(item);
      });
    }
    if (e.key === 'Delete' || e.key === 'Backspace') {
      selectedIcons.forEach(el => {
        const name = el.dataset.name;
        if (name !== 'Trash') {
          fs.moveToTrash('/' + name);
        }
      });
      clearSelection();
      renderDesktopIcons();
    }
  });
}

function toggleSelection(el) {
  if (el.classList.contains('selected')) {
    el.classList.remove('selected');
    selectedIcons.delete(el);
  } else {
    el.classList.add('selected');
    selectedIcons.add(el);
  }
}

function clearSelection() {
  selectedIcons.forEach(el => el.classList.remove('selected'));
  selectedIcons.clear();
}

function showContextMenu(x, y, item) {
  const menu = document.getElementById('context-menu');
  menu.classList.remove('hidden');
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';

  // Adjust if off-screen
  const rect = menu.getBoundingClientRect();
  if (rect.right > window.innerWidth) menu.style.left = (x - rect.width) + 'px';
  if (rect.bottom > window.innerHeight) menu.style.top = (y - rect.height) + 'px';

  // Wire actions
  menu.querySelector('[data-action="open"]').onclick = () => {
    openDesktopItem(item);
    hideContextMenu();
  };
  menu.querySelector('[data-action="get-info"]').onclick = () => {
    const { showToast } = require('../utils/animations.js');
    hideContextMenu();
  };
  menu.querySelector('[data-action="move-to-trash"]').onclick = () => {
    if (item.name !== 'Trash') {
      fs.moveToTrash('/' + item.name);
      renderDesktopIcons();
    }
    hideContextMenu();
  };
}

function showDesktopContextMenu(x, y) {
  hideContextMenu();
  const menu = document.getElementById('context-menu');
  menu.classList.remove('hidden');
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';

  menu.querySelector('[data-action="open"]').textContent = 'Change Wallpaper';
  menu.querySelector('[data-action="open"]').onclick = () => hideContextMenu();
  menu.querySelector('[data-action="get-info"]').textContent = 'About This Desktop';
  menu.querySelector('[data-action="get-info"]').onclick = () => hideContextMenu();
  menu.querySelector('[data-action="move-to-trash"]').textContent = 'Clean Up';
  menu.querySelector('[data-action="move-to-trash"]').onclick = () => hideContextMenu();
}

function hideContextMenu() {
  const menu = document.getElementById('context-menu');
  if (menu) menu.classList.add('hidden');
  // Reset labels
  const open = menu?.querySelector('[data-action="open"]');
  if (open) open.textContent = 'Open';
  const info = menu?.querySelector('[data-action="get-info"]');
  if (info) info.textContent = 'Get Info';
  const trash = menu?.querySelector('[data-action="move-to-trash"]');
  if (trash) trash.textContent = 'Move to Trash';
}

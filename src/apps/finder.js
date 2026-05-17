// Finder App — file browser with sidebar, breadcrumbs, grid view

import { fs } from '../core/fileSystem.js';
import { createWindow, setWindowTitle } from '../core/windowManager.js';
import { sidebarFavorites, win98Icons } from '../data/fileTree.js';
import { showToast } from '../utils/animations.js';
import { trackPathOpened, trackTrashFileOpened } from '../core/achievements.js';

let appOpener = null;

export function setFinderAppOpener(fn) { appOpener = fn; }

export function openFinder(initialPath = '/') {
  const { id, body } = createWindow('finder', 'Finder', '', {
    width: 780, height: 500
  });

  let currentPath = initialPath;
  let history = [initialPath];
  let historyIndex = 0;

  function render() {
    const items = currentPath === '/' ? fs.listDir('/') : fs.listDir(currentPath);
    const pathParts = currentPath.split('/').filter(Boolean);

    body.innerHTML = `
      <div class="finder-container">
        <div class="finder-sidebar">
          <div class="finder-sidebar-section">
            <div class="finder-sidebar-title">Favorites</div>
            ${sidebarFavorites.map(f => `
              <div class="finder-sidebar-item ${currentPath === f.path ? 'active' : ''}" data-path="${f.path}">
                <span class="sidebar-icon">${f.icon}</span>
                <span>${f.name}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;">
          <div class="finder-toolbar">
            <button class="finder-nav-btn" id="finder-back-${id}" ${historyIndex <= 0 ? 'disabled' : ''}>◀</button>
            <button class="finder-nav-btn" id="finder-fwd-${id}" ${historyIndex >= history.length - 1 ? 'disabled' : ''}>▶</button>
            <div class="finder-breadcrumbs">
              <span class="finder-breadcrumb ${pathParts.length === 0 ? 'current' : ''}" data-path="/">Desktop</span>
              ${pathParts.map((part, i) => {
                const p = '/' + pathParts.slice(0, i + 1).join('/');
                const isCurrent = i === pathParts.length - 1;
                return `<span class="finder-breadcrumb-sep">›</span>
                        <span class="finder-breadcrumb ${isCurrent ? 'current' : ''}" data-path="${p}">${part}</span>`;
              }).join('')}
            </div>
          </div>
          <div class="finder-content">
            ${items.length === 0 ? `
              <div class="finder-empty">
                <div class="finder-empty-icon" style="width: 64px; height: 64px;">${win98Icons.folderOpen}</div>
                <div>This folder is empty</div>
              </div>
            ` : `
              <div class="finder-grid">
                ${items.map(item => `
                  <div class="finder-item" data-name="${item.name}" data-type="${item.type}">
                    <div class="finder-item-icon">${item.icon}</div>
                    <div class="finder-item-name">${item.name}</div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>
      </div>
    `;

    // Update window title
    const folderName = pathParts.length ? pathParts[pathParts.length - 1] : 'Desktop';
    setWindowTitle(id, folderName);

    // Bind events
    bindEvents();
  }

  function navigateTo(path) {
    currentPath = path;
    // Trim history forward if navigating from middle
    history = history.slice(0, historyIndex + 1);
    history.push(path);
    historyIndex = history.length - 1;
    render();
  }

  function bindEvents() {
    // Sidebar items
    body.querySelectorAll('.finder-sidebar-item').forEach(el => {
      el.addEventListener('click', () => navigateTo(el.dataset.path));
    });

    // Back/Forward
    const backBtn = body.querySelector(`#finder-back-${id}`);
    const fwdBtn = body.querySelector(`#finder-fwd-${id}`);
    if (backBtn) backBtn.addEventListener('click', () => {
      if (historyIndex > 0) { historyIndex--; currentPath = history[historyIndex]; render(); }
    });
    if (fwdBtn) fwdBtn.addEventListener('click', () => {
      if (historyIndex < history.length - 1) { historyIndex++; currentPath = history[historyIndex]; render(); }
    });

    // Breadcrumbs
    body.querySelectorAll('.finder-breadcrumb').forEach(el => {
      el.addEventListener('click', () => navigateTo(el.dataset.path));
    });

    // Grid items — double click
    body.querySelectorAll('.finder-item').forEach(el => {
      let selected = false;

      el.addEventListener('click', () => {
        body.querySelectorAll('.finder-item').forEach(i => i.classList.remove('selected'));
        el.classList.add('selected');
      });

      el.addEventListener('dblclick', () => {
        const name = el.dataset.name;
        const type = el.dataset.type;
        const fullPath = currentPath === '/' ? '/' + name : currentPath + '/' + name;

        if (type === 'folder') {
          navigateTo(fullPath);
        } else {
          // Open file
          const node = fs.resolve(fullPath);
          if (node) {
            trackPathOpened(fullPath);
            if (node.easterEggMsg) {
              trackTrashFileOpened(name);
              showToast(node.easterEggMsg);
              return;
            }
            if (appOpener) {
              if (node.fileType === 'pdf') appOpener('pdf');
              else if (node.fileType === 'project') appOpener('project', name);
              else appOpener('text', fullPath);
            }
          }
        }
      });
    });
  }

  render();
  return id;
}

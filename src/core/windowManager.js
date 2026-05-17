// Window Manager — create, focus, drag, close, minimize, maximize windows

let zCounter = 100;
const windows = new Map(); // id -> { el, appId, title, isMinimized, isMaximized, prevBounds }
let focusedWindowId = null;

const listeners = { focus: [], close: [], open: [] };

export function onWindowEvent(event, cb) {
  if (listeners[event]) listeners[event].push(cb);
}

function emit(event, data) {
  (listeners[event] || []).forEach(cb => cb(data));
}

export function createWindow(appId, title, contentHTML, opts = {}) {
  const id = appId + '-' + Date.now();
  const container = document.getElementById('windows-container');

  const width = opts.width || 700;
  const height = opts.height || 500;
  const x = opts.x ?? (window.innerWidth / 2 - width / 2 + Math.random() * 40 - 20);
  const y = opts.y ?? (window.innerHeight / 2 - height / 2 + Math.random() * 30 - 15);

  const win = document.createElement('div');
  win.className = 'app-window opening';
  win.id = id;
  win.style.cssText = `left:${x}px;top:${y}px;width:${width}px;height:${height}px;z-index:${++zCounter};`;
  win.dataset.appId = appId;

  win.innerHTML = `
    <div class="window-header">
      <div class="traffic-lights">
        <div class="traffic-light close" title="Close">✕</div>
        <div class="traffic-light minimize" title="Minimize">−</div>
        <div class="traffic-light maximize" title="Maximize">⤢</div>
      </div>
      <span class="window-title">${title}</span>
    </div>
    <div class="window-body">${contentHTML}</div>
    <div class="resize-handle right"></div>
    <div class="resize-handle bottom"></div>
    <div class="resize-handle corner"></div>
  `;

  container.appendChild(win);

  // Remove opening class after animation
  setTimeout(() => win.classList.remove('opening'), 300);

  // Traffic lights
  win.querySelector('.traffic-light.close').addEventListener('click', (e) => {
    e.stopPropagation();
    closeWindow(id);
  });
  win.querySelector('.traffic-light.minimize').addEventListener('click', (e) => {
    e.stopPropagation();
    minimizeWindow(id);
  });
  win.querySelector('.traffic-light.maximize').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMaximize(id);
  });

  // Focus on click
  win.addEventListener('mousedown', () => focusWindow(id));

  // Dragging
  setupDrag(win, id);
  // Resizing
  setupResize(win);

  const record = { el: win, appId, title, isMinimized: false, isMaximized: false, prevBounds: null };
  windows.set(id, record);
  focusWindow(id);
  emit('open', { id, appId, title });

  return { id, el: win, body: win.querySelector('.window-body') };
}

export function closeWindow(id) {
  const record = windows.get(id);
  if (!record) return;
  const { el, appId } = record;
  el.classList.add('closing');
  el.addEventListener('animationend', () => {
    el.remove();
    windows.delete(id);
    emit('close', { id, appId });
    // Focus next window
    if (focusedWindowId === id) {
      focusedWindowId = null;
      const remaining = [...windows.values()].filter(w => !w.isMinimized);
      if (remaining.length) {
        const top = remaining.reduce((a, b) =>
          parseInt(a.el.style.zIndex) > parseInt(b.el.style.zIndex) ? a : b
        );
        focusWindow([...windows.entries()].find(([, v]) => v === top)?.[0]);
      } else {
        emit('focus', { id: null, appId: null, title: 'Finder' });
      }
    }
  }, { once: true });
}

export function minimizeWindow(id) {
  const record = windows.get(id);
  if (!record) return;
  record.isMinimized = true;
  record.el.classList.add('minimizing');
  record.el.addEventListener('animationend', () => {
    record.el.style.display = 'none';
    record.el.classList.remove('minimizing');
  }, { once: true });
  // Focus next
  focusedWindowId = null;
  const remaining = [...windows.values()].filter(w => !w.isMinimized && w !== record);
  if (remaining.length) {
    const top = remaining.reduce((a, b) =>
      parseInt(a.el.style.zIndex) > parseInt(b.el.style.zIndex) ? a : b
    );
    focusWindow([...windows.entries()].find(([, v]) => v === top)?.[0]);
  } else {
    emit('focus', { id: null, appId: null, title: 'Finder' });
  }
}

export function restoreWindow(id) {
  const record = windows.get(id);
  if (!record) return;
  record.isMinimized = false;
  record.el.style.display = '';
  record.el.classList.add('opening');
  setTimeout(() => record.el.classList.remove('opening'), 300);
  focusWindow(id);
}

export function toggleMaximize(id) {
  const record = windows.get(id);
  if (!record) return;
  const el = record.el;

  if (record.isMaximized) {
    // Restore
    const b = record.prevBounds;
    el.style.left = b.left; el.style.top = b.top;
    el.style.width = b.width; el.style.height = b.height;
    el.style.borderRadius = '';
    record.isMaximized = false;
  } else {
    // Save & maximize
    record.prevBounds = {
      left: el.style.left, top: el.style.top,
      width: el.style.width, height: el.style.height
    };
    el.style.left = '0'; el.style.top = '28px';
    el.style.width = '100vw'; el.style.height = 'calc(100vh - 28px)';
    el.style.borderRadius = '0';
    record.isMaximized = true;
  }
  el.classList.add('maximizing');
  setTimeout(() => el.classList.remove('maximizing'), 300);
}

export function focusWindow(id) {
  if (!id || !windows.has(id)) return;
  // Unfocus all
  windows.forEach((record) => {
    record.el.classList.remove('focused');
    record.el.classList.add('unfocused');
  });
  const record = windows.get(id);
  record.el.style.zIndex = ++zCounter;
  record.el.classList.add('focused');
  record.el.classList.remove('unfocused');
  focusedWindowId = id;
  emit('focus', { id, appId: record.appId, title: record.title });
}

// Find window by appId (returns first match)
export function findWindowByApp(appId) {
  for (const [id, record] of windows) {
    if (record.appId === appId && !record.isMinimized) return id;
  }
  // Check minimized
  for (const [id, record] of windows) {
    if (record.appId === appId) return id;
  }
  return null;
}

export function isAppOpen(appId) {
  for (const [, record] of windows) {
    if (record.appId === appId) return true;
  }
  return false;
}

export function getOpenApps() {
  const apps = new Set();
  windows.forEach(r => apps.add(r.appId));
  return apps;
}

export function setWindowTitle(id, title) {
  const record = windows.get(id);
  if (!record) return;
  record.title = title;
  record.el.querySelector('.window-title').textContent = title;
  if (focusedWindowId === id) {
    emit('focus', { id, appId: record.appId, title });
  }
}

// Drag setup
function setupDrag(win, id) {
  const header = win.querySelector('.window-header');
  let isDragging = false, startX, startY, origX, origY;

  header.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('traffic-light')) return;
    const record = windows.get(id);
    if (record?.isMaximized) return;
    isDragging = true;
    startX = e.clientX; startY = e.clientY;
    origX = parseInt(win.style.left); origY = parseInt(win.style.top);
    document.body.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    win.style.left = (origX + dx) + 'px';
    win.style.top = Math.max(28, origY + dy) + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    document.body.style.cursor = '';
  });
}

// Resize setup
function setupResize(win) {
  const handles = win.querySelectorAll('.resize-handle');

  handles.forEach(handle => {
    let isResizing = false, startX, startY, startW, startH, startL, startT;
    const isRight = handle.classList.contains('right') || handle.classList.contains('corner');
    const isBottom = handle.classList.contains('bottom') || handle.classList.contains('corner');

    handle.addEventListener('mousedown', (e) => {
      isResizing = true;
      startX = e.clientX; startY = e.clientY;
      startW = win.offsetWidth; startH = win.offsetHeight;
      startL = parseInt(win.style.left); startT = parseInt(win.style.top);
      document.body.style.cursor = handle.style.cursor;
      e.preventDefault();
      e.stopPropagation();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      if (isRight) {
        const w = Math.max(400, startW + (e.clientX - startX));
        win.style.width = w + 'px';
      }
      if (isBottom) {
        const h = Math.max(300, startH + (e.clientY - startY));
        win.style.height = h + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      if (!isResizing) return;
      isResizing = false;
      document.body.style.cursor = '';
    });
  });
}

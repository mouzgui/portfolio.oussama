// Menu Bar Controller

import { onWindowEvent } from './windowManager.js';

let clockInterval;

export function initMenuBar() {
  updateClock();
  clockInterval = setInterval(updateClock, 1000);

  // Update active app name on window focus
  onWindowEvent('focus', ({ title, appId }) => {
    const el = document.getElementById('active-app-name');
    if (el) el.textContent = title || 'Finder';
  });

  // Menu dropdowns
  setupMenuDropdowns();
  setupLogoDropdown();
}

function updateClock() {
  const el = document.getElementById('menu-clock');
  if (!el) return;
  const now = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = days[now.getDay()];
  const mon = months[now.getMonth()];
  const date = now.getDate();
  const h = now.getHours() % 12 || 12;
  const m = String(now.getMinutes()).padStart(2, '0');
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  el.textContent = `${day} ${mon} ${date}  ${h}:${m} ${ampm}`;
}

function setupMenuDropdowns() {
  const menuItems = document.querySelectorAll('.menu-item');
  let openDropdown = null;

  const dropdownData = {
    file: [
      { label: 'New Finder Window', shortcut: '⌘N' },
      { label: 'New Terminal', shortcut: '⌘T' },
      { divider: true },
      { label: 'Close Window', shortcut: '⌘W' },
    ],
    edit: [
      { label: 'Undo', shortcut: '⌘Z' },
      { label: 'Redo', shortcut: '⇧⌘Z' },
      { divider: true },
      { label: 'Cut', shortcut: '⌘X' },
      { label: 'Copy', shortcut: '⌘C' },
      { label: 'Paste', shortcut: '⌘V' },
      { label: 'Select All', shortcut: '⌘A' },
    ],
    view: [
      { label: 'as Icons', shortcut: '⌘1' },
      { label: 'as List', shortcut: '⌘2' },
      { divider: true },
      { label: 'Show Hidden Files', shortcut: '⇧⌘.' },
    ],
    window: [
      { label: 'Minimize', shortcut: '⌘M' },
      { label: 'Zoom' },
      { divider: true },
      { label: 'Bring All to Front' },
    ],
    help: [
      { label: 'Portfolio Help' },
      { divider: true },
      { label: 'About This Portfolio' },
      { label: 'Keyboard Shortcuts', shortcut: '⌘/' },
    ],
  };

  function closeDropdown() {
    if (openDropdown) {
      openDropdown.remove();
      openDropdown = null;
    }
    document.removeEventListener('click', closeDropdown);
  }

  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDropdown();
      const key = item.dataset.menu;
      const data = dropdownData[key];
      if (!data) return;

      const dropdown = document.createElement('div');
      dropdown.className = 'menu-dropdown';
      const rect = item.getBoundingClientRect();
      dropdown.style.left = rect.left + 'px';

      data.forEach(entry => {
        if (entry.divider) {
          const div = document.createElement('div');
          div.className = 'menu-divider';
          dropdown.appendChild(div);
        } else {
          const btn = document.createElement('button');
          btn.innerHTML = `${entry.label}${entry.shortcut ? `<span class="shortcut">${entry.shortcut}</span>` : ''}`;
          btn.addEventListener('click', closeDropdown);
          dropdown.appendChild(btn);
        }
      });

      document.body.appendChild(dropdown);
      openDropdown = dropdown;
      setTimeout(() => document.addEventListener('click', closeDropdown), 10);
    });
  });
}

function setupLogoDropdown() {
  const logo = document.getElementById('menu-logo');
  if (!logo) return;
  
  logo.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // We need to close existing ones, we can just trigger a click on document
    document.body.click();
    
    const dropdown = document.createElement('div');
    dropdown.className = 'menu-dropdown';
    const rect = logo.getBoundingClientRect();
    dropdown.style.left = rect.left + 'px';
    dropdown.style.top = (rect.bottom + 4) + 'px'; // 4px padding
    
    const prefBtn = document.createElement('button');
    prefBtn.innerHTML = 'System Preferences...';
    prefBtn.addEventListener('click', () => {
      import('../apps/systemPreferences.js').then(module => {
        module.openSystemPreferences();
      }).catch(err => console.error(err));
    });
    
    dropdown.appendChild(prefBtn);

    const divider = document.createElement('div');
    divider.className = 'menu-divider';
    dropdown.appendChild(divider);

    const restartBtn = document.createElement('button');
    restartBtn.innerHTML = 'Restart...';
    restartBtn.addEventListener('click', () => {
      localStorage.removeItem('portfolio_achievements');
      localStorage.removeItem('portfolio_has_booted');
      localStorage.removeItem('portfolio_settings');
      window.location.reload();
    });
    dropdown.appendChild(restartBtn);
    
    document.body.appendChild(dropdown);
    
    const closeIt = () => {
      dropdown.remove();
      document.removeEventListener('click', closeIt);
    };
    
    setTimeout(() => document.addEventListener('click', closeIt), 10);
  });
}

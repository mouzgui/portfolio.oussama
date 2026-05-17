import { createWindow } from '../core/windowManager.js';
import { getSettings, updateSettings } from '../core/settings.js';

import batmanWallpaper from '../walpapper/batman.jpg';

const WALLPAPERS = [
  { id: 'wp-default', name: 'Default', value: `url('${batmanWallpaper}')`, type: 'image' },
  { id: 'wp-landscape1', name: 'Mountain', value: "url('https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80')", type: 'image' },
  { id: 'wp-landscape2', name: 'Forest', value: "url('https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80')", type: 'image' },
  { id: 'wp-neon', name: 'Neon City', value: "url('https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1920&auto=format&fit=crop')", type: 'image' },
  { id: 'wp-clouds', name: 'Classic Clouds', value: "url('https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?q=80&w=1920&auto=format&fit=crop')", type: 'image' },
  { id: 'wp-matrix', name: 'The Matrix', value: "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1920&auto=format&fit=crop')", type: 'image' },
  { id: 'wp-sand', name: 'Minimal Sand', value: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop')", type: 'image' },
  { id: 'wp-grad1', name: 'Midnight Blue', value: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", type: 'gradient' },
  { id: 'wp-grad2', name: 'Deep Space', value: "linear-gradient(to right, #0f2027, #203a43, #2c5364)", type: 'gradient' },
  { id: 'wp-solid1', name: 'Dark Gray', value: "#2b2b2b", type: 'solid' },
  { id: 'wp-solid2', name: 'Pitch Black', value: "#000000", type: 'solid' },
  { id: 'wp-solid3', name: 'Classic Teal', value: "#008080", type: 'solid' }
];

const THEMES = [
  { id: 'default', name: 'Default', desc: 'Modern dark mode with glassmorphism.' },
  { id: 'vintage', name: 'Vintage Tech', desc: 'Warm CRT and classic beige hardware.' },
  { id: 'minimal', name: 'Minimal', desc: 'Stark, high-contrast monochrome.' },
  { id: 'aurora', name: 'Aurora', desc: 'Deep Nordic blues and polar lights.' },
  { id: 'concrete', name: 'Concrete', desc: 'Brutalist greys and thick bold borders.' }
];

export function openSystemPreferences() {
  const { id, body } = createWindow('syspref', 'System Preferences', '', {
    width: 600, height: 450
  });

  const settings = getSettings();

  body.innerHTML = `
    <div class="syspref-container">
      <div class="syspref-sidebar">
        <div class="syspref-tab active" data-tab="themes">Themes</div>
        <div class="syspref-tab" data-tab="wallpaper">Desktop</div>
        <div class="syspref-tab" data-tab="screensaver">Screensaver</div>
      </div>
      
      <div class="syspref-content">
        <!-- Themes Section -->
        <div class="syspref-section active" id="syspref-themes">
          <div class="syspref-title">System Theme</div>
          <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 13px;">Choose a visual style. This affects all windows, icons, and fonts.</p>
          
          <div class="theme-grid">
            ${THEMES.map(t => `
              <div class="theme-card ${settings.theme === t.id ? 'active' : ''}" data-theme-id="${t.id}">
                <div class="theme-card-preview theme-preview-${t.id}">
                  <div class="preview-header"></div>
                  <div class="preview-body"></div>
                </div>
                <div class="theme-card-info">
                  <div class="theme-card-name">${t.name}</div>
                  <div class="theme-card-desc">${t.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Wallpaper Section -->
        <div class="syspref-section" id="syspref-wallpaper">
          <div class="syspref-title">Desktop Background</div>
          
          <div class="wallpaper-category">Images</div>
          <div class="wallpaper-grid">
            ${WALLPAPERS.filter(w => w.type === 'image').map(w => `
              <div class="wallpaper-item ${settings.wallpaper === w.value ? 'active' : ''}" 
                   style="background-image: ${w.value}"
                   data-value="${w.value}"></div>
            `).join('')}
          </div>

          <div class="wallpaper-category">Gradients</div>
          <div class="wallpaper-grid">
            ${WALLPAPERS.filter(w => w.type === 'gradient').map(w => `
              <div class="wallpaper-item ${settings.wallpaper === w.value ? 'active' : ''}" 
                   style="background-image: ${w.value}"
                   data-value="${w.value}"></div>
            `).join('')}
          </div>

          <div class="wallpaper-category">Solid Colors</div>
          <div class="wallpaper-grid">
            ${WALLPAPERS.filter(w => w.type === 'solid').map(w => `
              <div class="wallpaper-item ${settings.wallpaper === w.value ? 'active' : ''}" 
                   style="background-color: ${w.value}"
                   data-value="${w.value}"></div>
            `).join('')}
          </div>

          <div class="wallpaper-category" style="margin-top: 24px;">Custom Wallpaper</div>
          <div class="pref-form-group" style="border-bottom: none;">
            <div class="pref-label">
              <strong>Upload Image</strong>
              Select an image from your computer.
            </div>
            <input type="file" id="pref-custom-wp" accept="image/*" style="font-size: 13px; color: var(--text-secondary);" />
          </div>
        </div>

        <!-- Screensaver Section -->
        <div class="syspref-section" id="syspref-screensaver">
          <div class="syspref-title">Screensaver</div>
          
          <div class="pref-form-group">
            <div class="pref-label">
              <strong>Enable Screensaver</strong>
              Show an animation when you're away.
            </div>
            <label class="pref-switch">
              <input type="checkbox" id="pref-ss-enable" ${settings.screensaverEnabled ? 'checked' : ''}>
              <span class="pref-slider"></span>
            </label>
          </div>

          <div class="pref-form-group">
            <div class="pref-label">
              <strong>Start after</strong>
              How long to wait before starting.
            </div>
            <select class="pref-select" id="pref-ss-timeout" ${!settings.screensaverEnabled ? 'disabled' : ''}>
              <option value="1" ${settings.screensaverTimeout === 1 ? 'selected' : ''}>1 Minute</option>
              <option value="5" ${settings.screensaverTimeout === 5 ? 'selected' : ''}>5 Minutes</option>
              <option value="15" ${settings.screensaverTimeout === 15 ? 'selected' : ''}>15 Minutes</option>
              <option value="60" ${settings.screensaverTimeout === 60 ? 'selected' : ''}>1 Hour</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `;

  bindEvents(body);
  return id;
}

function bindEvents(body) {
  // Tabs
  const tabs = body.querySelectorAll('.syspref-tab');
  const sections = body.querySelectorAll('.syspref-section');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      
      tab.classList.add('active');
      body.querySelector(`#syspref-${tab.dataset.tab}`).classList.add('active');
    });
  });

  // Wallpaper selection
  const wallItems = body.querySelectorAll('.wallpaper-item');
  wallItems.forEach(item => {
    item.addEventListener('click', () => {
      wallItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      updateSettings({ wallpaper: item.dataset.value });
    });
  });

  // Screensaver enable toggle
  const ssEnable = body.querySelector('#pref-ss-enable');
  const ssTimeout = body.querySelector('#pref-ss-timeout');

  ssEnable.addEventListener('change', (e) => {
    const enabled = e.target.checked;
    ssTimeout.disabled = !enabled;
    updateSettings({ screensaverEnabled: enabled });
  });

  // Screensaver timeout
  ssTimeout.addEventListener('change', (e) => {
    updateSettings({ screensaverTimeout: parseInt(e.target.value) });
  });

  // Custom wallpaper upload
  const customWpInput = body.querySelector('#pref-custom-wp');
  if (customWpInput) {
    customWpInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        const newValue = `url('${dataUrl}')`;
        
        // Unselect others
        wallItems.forEach(i => i.classList.remove('active'));
        
        // Update setting
        updateSettings({ wallpaper: newValue });
      };
      reader.readAsDataURL(file);
    });
  }

  // Theme selection
  body.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', () => {
      body.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const newTheme = card.dataset.themeId;
      updateSettings({ theme: newTheme });
    });
  });

  return id;
}

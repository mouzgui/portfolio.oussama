import batmanWallpaper from '../walpapper/batman.jpg';

const defaultSettings = {
  theme: 'default',
  wallpaper: `url('${batmanWallpaper}')`,
  screensaverEnabled: true,
  screensaverTimeout: 5, // minutes
};

// Simple event emitter for settings changes
const listeners = [];

export function onSettingsChange(callback) {
  listeners.push(callback);
}

export function getSettings() {
  const saved = localStorage.getItem('portfolio_settings');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Patch old broken wallpaper string if it exists
      if (parsed.wallpaper === "url('../walpapper/batman.jpg')") {
        parsed.wallpaper = defaultSettings.wallpaper;
      }
      return { ...defaultSettings, ...parsed };
    } catch (e) {
      console.error('Failed to parse settings', e);
    }
  }
  return { ...defaultSettings };
}

export function updateSettings(updates) {
  const current = getSettings();
  const next = { ...current, ...updates };
  localStorage.setItem('portfolio_settings', JSON.stringify(next));

  applyWallpaper(next.wallpaper);
  applyTheme(next.theme);

  listeners.forEach(cb => cb(next));
  return next;
}

export function applyTheme(theme) {
  if (theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

export function applyWallpaper(wallpaper) {
  const desktop = document.getElementById('desktop');
  if (!desktop) return;

  if (wallpaper.startsWith('url(')) {
    desktop.style.backgroundImage = wallpaper;
    desktop.style.backgroundColor = 'transparent';
  } else if (wallpaper.startsWith('linear-gradient') || wallpaper.startsWith('radial-gradient')) {
    desktop.style.backgroundImage = wallpaper;
    desktop.style.backgroundColor = 'transparent';
  } else {
    // Solid color
    desktop.style.backgroundImage = 'none';
    desktop.style.backgroundColor = wallpaper;
  }
}

export function initSettings() {
  const settings = getSettings();
  applyWallpaper(settings.wallpaper);
  applyTheme(settings.theme);
}

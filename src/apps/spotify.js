// Spotify App — embedded music player

import { createWindow } from '../core/windowManager.js';

export function openSpotify() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  
  // Size suitable for Spotify embed
  const width = Math.min(360, vw - 40);
  const height = Math.min(480, vh - 100);
  
  const { id, body } = createWindow('spotify', 'Spotify', '', {
    width, height
  });

  // User requested playlist
  const embedCode = `<iframe style="position:absolute; top:0; left:0; width:100%; height:100%; border:none; border-radius:0;" src="https://open.spotify.com/embed/playlist/37i9dQZF1EVHGWrwldPRtj?utm_source=generator&theme=0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;

  body.innerHTML = `
    <div class="spotify-container" style="position: absolute; inset: 0; background: #121212;">
      ${embedCode}
    </div>
  `;

  return id;
}

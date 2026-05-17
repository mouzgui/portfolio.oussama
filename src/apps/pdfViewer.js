// PDF Viewer — displays CV

import { createWindow } from '../core/windowManager.js';
import { showToast } from '../utils/animations.js';
import resumePdf from '../cv/advanced  oussama mouzgui.pdf';
import { trackCvOpened } from '../core/achievements.js';

export function openPdfViewer() {
  trackCvOpened();
  const { id, body } = createWindow('pdf', 'cv.pdf', '', {
    width: 800, height: 600
  });

  body.innerHTML = `
    <div class="pdf-viewer" style="height: 100%; display: flex; flex-direction: column;">
      <div class="pdf-toolbar" style="display: flex; justify-content: space-between; padding: 8px 16px; background: rgba(35, 35, 35, 0.9); border-bottom: 1px solid var(--border);">
        <div style="color: var(--text-secondary); font-size: 14px;">Oussama Mouzgui - Resume</div>
        <button class="pdf-download-btn" id="pdf-download-${id}" style="padding: 6px 16px; background: var(--accent); color: #fff; border-radius: 4px; font-weight: 600;">⬇ Download CV</button>
      </div>
      <div class="pdf-content" style="flex: 1; overflow: hidden; margin: 0; padding: 0;">
        <iframe src="${resumePdf}" width="100%" height="100%" style="border: none;"></iframe>
      </div>
    </div>
  `;

  // Download button
  body.querySelector(`#pdf-download-${id}`).addEventListener('click', () => {
    // We can open the PDF in a new tab which triggers download/view
    window.open(resumePdf, '_blank');
  });

  return id;
}

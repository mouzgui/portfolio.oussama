// Achievements Window — displays all achievements

import { createWindow } from '../core/windowManager.js';
import { getAchievements } from '../core/achievements.js';

export function openAchievements() {
  const { id, body } = createWindow('achievements', 'Achievements', '', {
    width: 380, height: 480
  });

  const achievements = getAchievements();

  body.innerHTML = `
    <div class="achievements-container">
      <div class="achievements-header">ACHIEVEMENTS</div>
      <div class="achievements-list">
        ${achievements.map(a => `
          <div class="achievement-row ${a.unlocked ? 'unlocked' : ''}">
            <span class="achievement-indicator">${a.unlocked ? '✓' : '•'}</span>
            <div class="achievement-info">
              <span class="achievement-name">${a.name}</span>
              <span class="achievement-desc">${a.unlocked ? a.desc : '???'}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  return id;
}

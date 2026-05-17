// Project Preview — rich project display

import { createWindow } from '../core/windowManager.js';
import { projects } from '../data/portfolio.js';
import { showToast } from '../utils/animations.js';

export function openProjectViewer(projectKey) {
  const project = projects[projectKey];
  if (!project) {
    showToast(`Project "${projectKey}" not found.`);
    return;
  }

  // Size the window to fit the viewport nicely
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const width = Math.min(850, vw - 80);
  const height = Math.min(700, vh - 100);
  const x = Math.max(20, (vw - width) / 2);
  const y = Math.max(36, (vh - height) / 2);

  const { id, body } = createWindow('project', project.title, '', {
    width, height, x, y
  });

  const highlightsHtml = project.details?.highlights ? `
    <div class="project-section">
      <h3 class="project-section-title">✨ Key Highlights</h3>
      <div class="project-highlights">
        ${project.details.highlights.map(h => `
          <div class="highlight-item">
            <div class="highlight-title">${h.title}</div>
            <div class="highlight-desc">${h.description}</div>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  const featuresHtml = project.details?.features ? `
    <div class="project-section">
      <h3 class="project-section-title">⚙️ Core Features</h3>
      <div class="project-features">
        ${project.details.features.map(f => `
          <div class="feature-category">
            <div class="feature-category-title">${f.category}</div>
            <ul class="feature-list">
              ${f.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  body.innerHTML = `
    <div class="project-preview">
      <div class="project-hero">
        <img src="${project.image}" alt="${project.title} Banner" class="project-hero-img" />
      </div>

      <div class="project-header">
        <div class="project-title">${project.title}</div>
        <div class="project-links">
          ${project.liveUrl !== '#' ? `<button class="project-link-btn primary" data-url="${project.liveUrl}">🔗 Live Demo</button>` : ''}
          ${project.githubUrl !== '#' ? `<button class="project-link-btn" data-url="${project.githubUrl}">⭐ GitHub</button>` : ''}
        </div>
      </div>

      <div class="project-meta">
        ${project.tech.map(t => `<span class="project-tag">${t}</span>`).join('')}
        <span class="project-tag" style="color:var(--accent);border-color:var(--accent-subtle)">${project.year}</span>
      </div>

      <div class="project-description" style="font-size: 16px; margin-bottom: 24px;">${project.description}</div>

      ${highlightsHtml}
      ${featuresHtml}
    </div>
  `;

  // Link buttons
  body.querySelectorAll('.project-link-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.open(btn.dataset.url, '_blank');
    });
  });

  return id;
}

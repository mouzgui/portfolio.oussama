// Email Client — testimonials as emails

import { createWindow } from '../core/windowManager.js';
import { testimonials } from '../data/testimonials.js';
import { showToast } from '../utils/animations.js';
import { win98Icons } from '../data/fileTree.js';
import { trackEmailOpened } from '../core/achievements.js';

export function openEmail() {
  trackEmailOpened();
  const { id, body } = createWindow('email', 'Mail', '', {
    width: 850, height: 520
  });

  let activeFolder = 'inbox';
  let activeEmail = null;

  function render() {
    const emails = activeFolder === 'inbox' ? testimonials : [];
    const email = activeEmail ? testimonials.find(t => t.id === activeEmail) : null;

    body.innerHTML = `
      <div class="email-container">
        <div class="email-sidebar">
          <button class="email-compose-btn" id="email-compose-${id}">
            <div style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:4px;">${win98Icons.text}</div>
            Compose
          </button>
          <div class="email-folder active" data-folder="inbox">
            <span class="email-folder-icon" style="display:inline-block;width:16px;height:16px;">${win98Icons.mail}</span>
            <span>Inbox</span>
            <span class="email-folder-badge">${testimonials.filter(t => t.unread).length}</span>
          </div>
          <div class="email-folder" data-folder="sent">
            <span class="email-folder-icon" style="display:inline-block;width:16px;height:16px;">${win98Icons.mail}</span>
            <span>Sent</span>
          </div>
          <div class="email-folder" data-folder="drafts">
            <span class="email-folder-icon" style="display:inline-block;width:16px;height:16px;">${win98Icons.text}</span>
            <span>Drafts</span>
          </div>
          <div class="email-folder" data-folder="starred">
            <span class="email-folder-icon" style="display:inline-block;width:16px;height:16px;">${win98Icons.secret}</span>
            <span>Starred</span>
          </div>
        </div>

        <div class="email-list">
          ${emails.map(e => `
            <div class="email-list-item ${e.unread ? 'unread' : ''} ${activeEmail === e.id ? 'active' : ''}" data-id="${e.id}">
              <div class="email-item-header">
                <span class="email-item-sender">
                  ${e.unread ? '<span class="email-unread-dot"></span>' : ''}
                  ${e.sender}
                </span>
                <span class="email-item-date">${e.date}</span>
              </div>
              <div class="email-item-subject">${e.subject}</div>
              <div class="email-item-preview">${e.body.substring(0, 80).replace(/\n/g, ' ')}...</div>
            </div>
          `).join('')}
        </div>

        <div class="email-detail">
          ${email ? `
            <div class="email-detail-header">
              <div class="email-detail-subject">${email.subject}</div>
              <div class="email-detail-meta">
                <div class="email-avatar" style="background:${email.avatarColor}">
                  ${email.sender.charAt(0)}
                </div>
                <div class="email-detail-sender-info">
                  <div class="email-detail-sender">${email.sender}</div>
                  <div class="email-detail-address">${email.email} — ${email.role}</div>
                </div>
                <div class="email-detail-date">${email.date}</div>
              </div>
            </div>
            <div class="email-detail-body">
              ${email.body.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')}
            </div>
          ` : `
            <div class="email-empty">Select an email to read</div>
          `}
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    // Email list items
    body.querySelectorAll('.email-list-item').forEach(el => {
      el.addEventListener('click', () => {
        activeEmail = parseInt(el.dataset.id);
        render();
      });
    });

    // Compose button
    const composeBtn = body.querySelector(`#email-compose-${id}`);
    if (composeBtn) {
      composeBtn.addEventListener('click', () => {
        window.location.href = 'mailto:omouzgui@gmail.com?subject=Hello Oussama!&body=I saw your awesome portfolio OS and wanted to reach out.';
        showToast('📧 Opening your email client to contact Oussama...');
      });
    }

    // Folder nav
    body.querySelectorAll('.email-folder').forEach(el => {
      el.addEventListener('click', () => {
        activeFolder = el.dataset.folder;
        activeEmail = null;
        render();
      });
    });
  }

  render();
  // Auto-select first email
  if (testimonials.length > 0) {
    activeEmail = testimonials[0].id;
    render();
  }

  return id;
}

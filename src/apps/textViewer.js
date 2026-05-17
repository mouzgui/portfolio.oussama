// Text Viewer — displays .txt and .md files

import { createWindow } from '../core/windowManager.js';
import { fs } from '../core/fileSystem.js';

export function openTextViewer(path) {
  const parts = path.split('/').filter(Boolean);
  const fileName = parts[parts.length - 1];
  const content = fs.getContent(path);
  const isMd = fileName.endsWith('.md');

  const { id, body } = createWindow('text', fileName, '', {
    width: 600, height: 450
  });

  if (isMd) {
    body.innerHTML = `<div class="text-viewer">${renderMarkdown(content)}</div>`;
  } else {
    body.innerHTML = `<div class="text-viewer monospace">${escapeHtml(content)}</div>`;
  }

  return id;
}

// Simple markdown renderer
function renderMarkdown(text) {
  let html = escapeHtml(text);

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Inline code
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');

  // Blockquotes
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');

  // Unordered list items
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  // Wrap consecutive li elements in ul
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

  // Line breaks for remaining text
  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>(<h[1-3]>)/g, '$1');
  html = html.replace(/(<\/h[1-3]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)<\/p>/g, '$1');
  html = html.replace(/<p>(<blockquote>)/g, '$1');
  html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');

  return html;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

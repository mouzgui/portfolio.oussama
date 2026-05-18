// Achievements System — quiet, system-level achievement tracking
import { openAchievements } from '../apps/achievementsWindow.js';

const ACHIEVEMENTS = [
  { id: 'first_boot', name: 'First Boot', desc: 'Booted up the OS for the first time.' },
  { id: 'desktop_explorer', name: 'Desktop Explorer', desc: 'Opened 5 different files or folders.' },
  { id: 'context_matters', name: 'Context Matters', desc: 'Read multiple files in About Me.' },
  { id: 'reference_check', name: 'Reference Check', desc: 'Opened the Email app.' },
  { id: 'actually_read_it', name: 'Actually Read It', desc: 'Opened the CV PDF.' },
  { id: 'command_line_curious', name: 'Command Line Curious', desc: 'Ran a command in the Terminal.' },
  { id: 'help_actually', name: 'Help, Actually', desc: 'Used the help command in Terminal.' },
  { id: 'trash_explorer', name: 'Trash Explorer', desc: 'Tried to open every file in the Trash.' },
  { id: 'first_mine', name: 'First Mine', desc: 'Hit a mine in Minesweeper.' },
  { id: 'clean_board', name: 'Clean Board', desc: 'Won a game of Minesweeper.' },
  { id: 'just_one_more', name: 'Just One More', desc: 'Played the same game more than once.' },
  { id: 'gamer', name: 'Gamer', desc: 'Played both mini-games.' },
];

// State
let unlocked = new Set();
let listeners = [];
let pendingNotification = null;

// Tracking helpers
let openedPaths = new Set();
let aboutMeFiles = new Set();
let trashFilesOpened = new Set();
let gamesPlayed = new Set();
let gamePlayCounts = {};

const TRASH_FILES = ['passwords.txt', 'journal_2020-2022.txt', 'bank_transactions_2021.csv', 'side_projects_roi.csv'];

export function initAchievements() {
  // Load from localStorage
  const saved = localStorage.getItem('portfolio_achievements');
  if (saved) {
    try {
      const arr = JSON.parse(saved);
      unlocked = new Set(arr);
    } catch (e) {}
  }

  // First boot
  if (!localStorage.getItem('portfolio_has_booted')) {
    localStorage.setItem('portfolio_has_booted', '1');
    unlock('first_boot');
  }
}

export function getAchievements() {
  return ACHIEVEMENTS.map(a => ({
    ...a,
    unlocked: unlocked.has(a.id),
  }));
}

export function isUnlocked(id) {
  return unlocked.has(id);
}

export function onAchievementUnlock(cb) {
  listeners.push(cb);
}

export function unlock(id) {
  if (unlocked.has(id)) return;
  const achievement = ACHIEVEMENTS.find(a => a.id === id);
  if (!achievement) return;

  unlocked.add(id);
  save();

  // Show notification
  showAchievementNotification(achievement);

  // Pulse the trophy icon
  const trophyIcon = document.getElementById('trophy-icon');
  if (trophyIcon) {
    trophyIcon.classList.add('achievement-pulse');
    setTimeout(() => trophyIcon.classList.remove('achievement-pulse'), 2000);
  }

  // Notify listeners
  listeners.forEach(cb => cb(achievement));
}

function save() {
  localStorage.setItem('portfolio_achievements', JSON.stringify([...unlocked]));
}

function showAchievementNotification(achievement) {
  // Remove existing notification if any
  const existing = document.querySelector('.achievement-notification');
  if (existing) existing.remove();

  const notif = document.createElement('div');
  notif.className = 'achievement-notification';
  notif.innerHTML = `
    <div class="achievement-notif-icon">🏆</div>
    <div class="achievement-notif-text">
      <div class="achievement-notif-label">Achievement unlocked</div>
      <div class="achievement-notif-name">${achievement.name}</div>
    </div>
  `;

  notif.addEventListener('click', () => {
    notif.remove();
    openAchievements();
  });

  document.body.appendChild(notif);

  // Auto-remove after 4 seconds
  setTimeout(() => {
    notif.classList.add('fading');
    setTimeout(() => notif.remove(), 500);
  }, 4000);
}

// ========================================
// Trigger helpers — called from various apps
// ========================================

export function trackPathOpened(path) {
  openedPaths.add(path);

  // Desktop Explorer: opened 5+ different paths
  if (openedPaths.size >= 5) {
    unlock('desktop_explorer');
  }

  // Context Matters: opened both About Me files
  const aboutFiles = ['bio.txt', 'values.md', 'skills.md'];
  aboutFiles.forEach(f => {
    if (path.includes(f)) aboutMeFiles.add(f);
  });
  if (aboutMeFiles.size >= 2) {
    unlock('context_matters');
  }
}

export function trackTrashFileOpened(filename) {
  trashFilesOpened.add(filename);
  if (TRASH_FILES.every(f => trashFilesOpened.has(f))) {
    unlock('trash_explorer');
  }
}

export function trackEmailOpened() {
  unlock('reference_check');
}

export function trackCvOpened() {
  unlock('actually_read_it');
}

export function trackTerminalCommand() {
  unlock('command_line_curious');
}

export function trackTerminalHelp() {
  unlock('help_actually');
}

export function trackMinesweeperLoss() {
  unlock('first_mine');
  trackGamePlayed('minesweeper');
}

export function trackMinesweeperWin() {
  unlock('clean_board');
  trackGamePlayed('minesweeper');
}

export function trackGamePlayed(gameId) {
  gamesPlayed.add(gameId);
  gamePlayCounts[gameId] = (gamePlayCounts[gameId] || 0) + 1;

  // Just One More: played same game more than once
  if (gamePlayCounts[gameId] > 1) {
    unlock('just_one_more');
  }

  // Gamer: played both mini-games
  if (gamesPlayed.has('minesweeper') && gamesPlayed.has('snake')) {
    unlock('gamer');
  }
}

export function trackSnakePlayed() {
  trackGamePlayed('snake');
}

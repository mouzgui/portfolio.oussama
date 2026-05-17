// Minesweeper — complete game with difficulty levels

import { createWindow } from '../core/windowManager.js';
import { trackMinesweeperLoss, trackMinesweeperWin } from '../core/achievements.js';

const DIFFICULTIES = {
  easy:   { rows: 9,  cols: 9,  mines: 10, label: 'Easy' },
  medium: { rows: 16, cols: 16, mines: 40, label: 'Medium' },
  hard:   { rows: 16, cols: 30, mines: 99, label: 'Hard' },
};

export function openMinesweeper() {
  const { id, body } = createWindow('minesweeper', 'Minesweeper', '', {
    width: 520, height: 560
  });

  let difficulty = 'easy';
  let board = [];
  let revealed = [];
  let flagged = [];
  let gameOver = false;
  let gameWon = false;
  let firstClick = true;
  let mineCount = 0;
  let flagCount = 0;
  let timer = 0;
  let timerInterval = null;

  function init() {
    const diff = DIFFICULTIES[difficulty];
    board = [];
    revealed = [];
    flagged = [];
    gameOver = false;
    gameWon = false;
    firstClick = true;
    mineCount = diff.mines;
    flagCount = 0;
    timer = 0;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;

    // Init empty board
    for (let r = 0; r < diff.rows; r++) {
      board[r] = [];
      revealed[r] = [];
      flagged[r] = [];
      for (let c = 0; c < diff.cols; c++) {
        board[r][c] = 0;
        revealed[r][c] = false;
        flagged[r][c] = false;
      }
    }

    render();
  }

  function placeMines(safeR, safeC) {
    const diff = DIFFICULTIES[difficulty];
    let placed = 0;
    while (placed < diff.mines) {
      const r = Math.floor(Math.random() * diff.rows);
      const c = Math.floor(Math.random() * diff.cols);
      // Don't place on safe cell or adjacent
      if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue;
      if (board[r][c] === -1) continue;
      board[r][c] = -1;
      placed++;
    }

    // Calculate numbers
    for (let r = 0; r < diff.rows; r++) {
      for (let c = 0; c < diff.cols; c++) {
        if (board[r][c] === -1) continue;
        let count = 0;
        forNeighbors(r, c, (nr, nc) => {
          if (board[nr][nc] === -1) count++;
        });
        board[r][c] = count;
      }
    }
  }

  function forNeighbors(r, c, cb) {
    const diff = DIFFICULTIES[difficulty];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < diff.rows && nc >= 0 && nc < diff.cols) {
          cb(nr, nc);
        }
      }
    }
  }

  function reveal(r, c) {
    const diff = DIFFICULTIES[difficulty];
    if (r < 0 || r >= diff.rows || c < 0 || c >= diff.cols) return;
    if (revealed[r][c] || flagged[r][c]) return;

    revealed[r][c] = true;

    if (board[r][c] === -1) {
      // Hit mine
      gameOver = true;
      trackMinesweeperLoss();
      if (timerInterval) clearInterval(timerInterval);
      // Reveal all mines
      for (let rr = 0; rr < diff.rows; rr++) {
        for (let cc = 0; cc < diff.cols; cc++) {
          if (board[rr][cc] === -1) revealed[rr][cc] = true;
        }
      }
      render();
      return;
    }

    if (board[r][c] === 0) {
      // Flood fill
      forNeighbors(r, c, (nr, nc) => reveal(nr, nc));
    }

    // Check win
    checkWin();
  }

  function checkWin() {
    const diff = DIFFICULTIES[difficulty];
    let unrevealed = 0;
    for (let r = 0; r < diff.rows; r++) {
      for (let c = 0; c < diff.cols; c++) {
        if (!revealed[r][c]) unrevealed++;
      }
    }
    if (unrevealed === diff.mines) {
      gameWon = true;
      gameOver = true;
      trackMinesweeperWin();
      if (timerInterval) clearInterval(timerInterval);
      render();
    }
  }

  function render() {
    const diff = DIFFICULTIES[difficulty];
    const faceEmoji = gameOver ? (gameWon ? '😎' : '💀') : '😊';

    // Adjust window size for hard mode
    if (difficulty === 'hard') {
      const winEl = document.getElementById(id);
      if (winEl) {
        winEl.style.width = '900px';
        winEl.style.height = '560px';
      }
    } else if (difficulty === 'medium') {
      const winEl = document.getElementById(id);
      if (winEl) {
        winEl.style.width = '560px';
        winEl.style.height = '620px';
      }
    } else {
      const winEl = document.getElementById(id);
      if (winEl) {
        winEl.style.width = '380px';
        winEl.style.height = '500px';
      }
    }

    body.innerHTML = `
      <div class="minesweeper" style="position:relative">
        <div class="mine-difficulty">
          ${Object.entries(DIFFICULTIES).map(([key, d]) => `
            <button class="mine-diff-btn ${key === difficulty ? 'active' : ''}" data-diff="${key}">${d.label}</button>
          `).join('')}
        </div>

        <div class="mine-toolbar">
          <div class="mine-counter">${String(mineCount - flagCount).padStart(3, '0')}</div>
          <button class="mine-face-btn" id="mine-reset-${id}">${faceEmoji}</button>
          <div class="mine-timer">${String(timer).padStart(3, '0')}</div>
        </div>

        <div class="mine-board" style="grid-template-columns: repeat(${diff.cols}, 28px)">
          ${renderCells(diff)}
        </div>

        ${gameOver ? `
          <div class="mine-overlay">
            <div class="mine-overlay-text">${gameWon ? '🎉 You Won!' : '💥 Game Over'}</div>
            <div class="mine-overlay-sub">${gameWon ? `Completed in ${timer}s` : 'Better luck next time!'}</div>
            <button class="mine-play-again" id="mine-again-${id}">Play Again</button>
          </div>
        ` : ''}
      </div>
    `;

    bindEvents(diff);
  }

  function renderCells(diff) {
    let html = '';
    for (let r = 0; r < diff.rows; r++) {
      for (let c = 0; c < diff.cols; c++) {
        const isRevealed = revealed[r][c];
        const isFlagged = flagged[r][c];
        const val = board[r][c];

        let cls = 'mine-cell';
        let content = '';

        if (isRevealed) {
          cls += ' revealed';
          if (val === -1) {
            content = '💣';
            if (gameOver && !gameWon) cls += ' mine-exploded';
          } else if (val > 0) {
            content = val;
            cls += ` n${val}`;
          }
        } else if (isFlagged) {
          cls += ' flagged';
          content = '🚩';
        }

        html += `<div class="${cls}" data-r="${r}" data-c="${c}">${content}</div>`;
      }
    }
    return html;
  }

  function bindEvents(diff) {
    // Cell clicks
    body.querySelectorAll('.mine-cell').forEach(cell => {
      const r = parseInt(cell.dataset.r);
      const c = parseInt(cell.dataset.c);

      cell.addEventListener('click', () => {
        if (gameOver || flagged[r][c]) return;

        if (firstClick) {
          firstClick = false;
          placeMines(r, c);
          timerInterval = setInterval(() => {
            timer++;
            const timerEl = body.querySelector('.mine-timer');
            if (timerEl) timerEl.textContent = String(timer).padStart(3, '0');
          }, 1000);
        }

        reveal(r, c);
        render();
      });

      cell.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (gameOver || revealed[r][c]) return;

        flagged[r][c] = !flagged[r][c];
        flagCount += flagged[r][c] ? 1 : -1;
        render();
      });
    });

    // Difficulty buttons
    body.querySelectorAll('.mine-diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        difficulty = btn.dataset.diff;
        init();
      });
    });

    // Reset / play again
    const resetBtn = body.querySelector(`#mine-reset-${id}`);
    if (resetBtn) resetBtn.addEventListener('click', init);

    const againBtn = body.querySelector(`#mine-again-${id}`);
    if (againBtn) againBtn.addEventListener('click', init);
  }

  init();
  return id;
}

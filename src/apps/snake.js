// Snake Game — classic snake with retro styling

import { createWindow } from '../core/windowManager.js';
import { trackSnakePlayed } from '../core/achievements.js';

const GRID_SIZE = 20;
const CELL_SIZE = 22;
const SPEEDS = {
  easy:   { interval: 150, label: 'Easy' },
  medium: { interval: 100, label: 'Medium' },
  hard:   { interval: 60,  label: 'Hard' },
};

export function openSnake() {
  // Board is 20×22 = 440px, plus toolbar/buttons/padding/header ≈ 180px
  const neededW = GRID_SIZE * CELL_SIZE + 80;  // 520
  const neededH = GRID_SIZE * CELL_SIZE + 190;  // 630
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const dockHeight = 110; // dock + bottom margin
  const menuBar = 28;
  const availableH = vh - menuBar - dockHeight;
  const width = Math.min(neededW, vw - 60);
  const height = Math.min(neededH, availableH);
  const x = Math.max(20, (vw - width) / 2);
  const y = Math.max(menuBar + 8, menuBar + (availableH - height) / 2);

  const { id, body } = createWindow('snake', 'Snake', '', {
    width, height, x, y
  });

  let difficulty = 'medium';
  let snake = [];
  let food = null;
  let direction = 'right';
  let nextDirection = 'right';
  let gameOver = false;
  let gameWon = false;
  let score = 0;
  let highScore = parseInt(localStorage.getItem('snake_highscore') || '0');
  let gameLoop = null;
  let started = false;

  function init() {
    snake = [
      { x: 5, y: 10 },
      { x: 4, y: 10 },
      { x: 3, y: 10 },
    ];
    direction = 'right';
    nextDirection = 'right';
    gameOver = false;
    gameWon = false;
    score = 0;
    started = false;
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = null;
    placeFood();
    render();
  }

  function placeFood() {
    let pos;
    do {
      pos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(s => s.x === pos.x && s.y === pos.y));
    food = pos;
  }

  function tick() {
    direction = nextDirection;

    const head = { ...snake[0] };
    switch (direction) {
      case 'up':    head.y--; break;
      case 'down':  head.y++; break;
      case 'left':  head.x--; break;
      case 'right': head.x++; break;
    }

    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      endGame();
      return;
    }

    // Self collision
    if (snake.some(s => s.x === head.x && s.y === head.y)) {
      endGame();
      return;
    }

    snake.unshift(head);

    // Eat food
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      placeFood();
    } else {
      snake.pop();
    }

    render();
  }

  function endGame() {
    gameOver = true;
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = null;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('snake_highscore', String(highScore));
    }
    render();
  }

  function startGame() {
    if (started) return;
    started = true;
    trackSnakePlayed();
    const speed = SPEEDS[difficulty].interval;
    gameLoop = setInterval(tick, speed);
  }

  function render() {
    const boardWidth = GRID_SIZE * CELL_SIZE;
    const faceEmoji = gameOver ? '💀' : (started ? '🐍' : '😊');

    body.innerHTML = `
      <div class="minesweeper" style="position:relative">
        <div class="mine-difficulty">
          ${Object.entries(SPEEDS).map(([key, d]) => `
            <button class="mine-diff-btn ${key === difficulty ? 'active' : ''}" data-diff="${key}" ${started ? 'disabled' : ''}>${d.label}</button>
          `).join('')}
        </div>

        <div class="mine-toolbar">
          <div class="mine-counter">HI:${String(highScore).padStart(3, '0')}</div>
          <button class="mine-face-btn" id="snake-reset-${id}">${faceEmoji}</button>
          <div class="mine-timer">${String(score).padStart(4, '0')}</div>
        </div>

        <div class="snake-board" style="width:${boardWidth}px;height:${boardWidth}px;">
          ${renderBoard()}
        </div>

        ${!started && !gameOver ? `
          <div class="mine-overlay" style="pointer-events: auto;">
            <div class="mine-overlay-text">🐍 Snake</div>
            <div class="mine-overlay-sub">Press any arrow key or click Play to start</div>
            <button class="mine-play-again" id="snake-start-${id}">▶ Play</button>
          </div>
        ` : ''}

        ${gameOver ? `
          <div class="mine-overlay">
            <div class="mine-overlay-text">💥 Game Over</div>
            <div class="mine-overlay-sub">Score: ${score}${score >= highScore && score > 0 ? ' — New High Score! 🏆' : ''}</div>
            <button class="mine-play-again" id="snake-again-${id}">Play Again</button>
          </div>
        ` : ''}
      </div>
    `;

    bindEvents();
  }

  function renderBoard() {
    let cells = '';
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isHead = snake[0].x === x && snake[0].y === y;
        const isBody = !isHead && snake.some(s => s.x === x && s.y === y);
        const isFood = food && food.x === x && food.y === y;

        let cls = 'snake-cell';
        let content = '';
        if (isHead) {
          cls += ' snake-head';
          content = '●';
        } else if (isBody) {
          cls += ' snake-body';
        } else if (isFood) {
          cls += ' snake-food';
          content = '🍎';
        }

        cells += `<div class="${cls}" style="width:${CELL_SIZE}px;height:${CELL_SIZE}px;">${content}</div>`;
      }
    }
    return cells;
  }

  function bindEvents() {
    // Difficulty buttons
    body.querySelectorAll('.mine-diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (started) return;
        difficulty = btn.dataset.diff;
        init();
      });
    });

    // Reset
    const resetBtn = body.querySelector(`#snake-reset-${id}`);
    if (resetBtn) resetBtn.addEventListener('click', init);

    // Start
    const startBtn = body.querySelector(`#snake-start-${id}`);
    if (startBtn) startBtn.addEventListener('click', () => startGame());

    // Play again
    const againBtn = body.querySelector(`#snake-again-${id}`);
    if (againBtn) againBtn.addEventListener('click', init);
  }

  // Keyboard controls — scoped to this window
  function handleKeydown(e) {
    // Check if this window still exists
    if (!document.getElementById(id)) {
      document.removeEventListener('keydown', handleKeydown);
      return;
    }

    const key = e.key;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      e.preventDefault();

      if (!started && !gameOver) {
        startGame();
      }

      const map = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
      };
      const newDir = map[key];

      // Prevent 180-degree turns
      const opposites = { up: 'down', down: 'up', left: 'right', right: 'left' };
      if (newDir !== opposites[direction]) {
        nextDirection = newDir;
      }
    }
  }

  document.addEventListener('keydown', handleKeydown);

  init();
  return id;
}

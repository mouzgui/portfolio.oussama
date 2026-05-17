// Terminal App — interactive command-line interface

import { createWindow } from '../core/windowManager.js';
import { fs } from '../core/fileSystem.js';
import { projects, cvContent } from '../data/portfolio.js';
import { showToast, triggerConfetti, startMatrixRain } from '../utils/animations.js';
import { trackTerminalCommand, trackTerminalHelp } from '../core/achievements.js';

let appOpener = null;
export function setTerminalAppOpener(fn) { appOpener = fn; }

export function openTerminal() {
  const { id, body } = createWindow('terminal', 'Terminal', '', {
    width: 680, height: 440
  });

  let commandHistory = [];
  let historyIndex = -1;
  let currentDir = '~';

  const banner = `
 ┌─────────────────────────────────────────────┐
 │  ╔═╗╔═╗╦═╗╔╦╗╔═╗╔═╗╦  ╦╔═╗  ╔═╗╔═╗       │
 │  ╠═╝║ ║╠╦╝ ║ ╠╣ ║ ║║  ║║ ║  ║ ║╚═╗       │
 │  ╩  ╚═╝╩╚═ ╩ ╚  ╚═╝╩═╝╩╚═╝  ╚═╝╚═╝       │
 │                                             │
 │  Welcome to PortfolioOS Terminal v1.0       │
 │  Type 'help' to see available commands.     │
 └─────────────────────────────────────────────┘`;

  body.innerHTML = `
    <div class="terminal-container">
      <div class="terminal-output" id="term-out-${id}">
        <div class="terminal-line ascii">${banner.replace(/\n/g, '<br>')}</div>
        <div class="terminal-line output" style="margin-top:8px;color:#666">Last login: ${new Date().toLocaleString()}</div>
      </div>
      <div class="terminal-input-area">
        <span class="prompt">oussama@portfolio</span><span class="prompt-path">:${currentDir}$&nbsp;</span>
        <input class="terminal-input" id="term-in-${id}" type="text" autofocus autocomplete="off" spellcheck="false" />
      </div>
    </div>
  `;

  const output = body.querySelector(`#term-out-${id}`);
  const input = body.querySelector(`#term-in-${id}`);

  // Focus input when clicking terminal
  body.querySelector('.terminal-container').addEventListener('click', () => input.focus());

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      if (cmd) {
        commandHistory.push(cmd);
        historyIndex = commandHistory.length;
      }
      appendPromptLine(cmd);
      if (cmd) processCommand(cmd);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleAutocomplete();
    }
  });

  // Auto-focus
  setTimeout(() => input.focus(), 100);

  function appendPromptLine(cmd) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="prompt">oussama@portfolio</span><span class="prompt-path">:${currentDir}$</span> <span class="command">${escapeHtml(cmd)}</span>`;
    output.appendChild(line);
  }

  function appendOutput(text, cls = 'output') {
    const line = document.createElement('div');
    line.className = `terminal-line ${cls}`;
    line.innerHTML = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function resolvePath(target) {
    if (!target) return currentDir === '~' ? '/' : currentDir;
    let base = currentDir === '~' ? '/' : currentDir;
    
    if (target.startsWith('/')) {
      base = '/';
      target = target.substring(1);
    } else if (target.startsWith('~')) {
      base = '/';
      target = target.substring(1);
      if (target.startsWith('/')) target = target.substring(1);
    }
    
    if (!target) return base;

    const parts = base.split('/').filter(Boolean);
    const targetParts = target.split('/').filter(Boolean);

    for (const p of targetParts) {
      if (p === '.') continue;
      if (p === '..') {
        parts.pop();
      } else {
        parts.push(p);
      }
    }

    return '/' + parts.join('/');
  }

  const AVAILABLE_COMMANDS = [
    'help', 'about', 'projects', 'skills', 'open', 'ls', 'cd', 'pwd',
    'cat', 'whoami', 'clear', 'cv', 'email', 'minesweeper', 'easter_eggs',
    'matrix', 'exit', 'sudo', 'rm', 'neofetch'
  ];

  function handleAutocomplete() {
    const val = input.value;
    if (!val) return;

    let isCommand = !val.trim().includes(' ');
    
    if (isCommand) {
      const cmd = val.trim().toLowerCase();
      const matches = AVAILABLE_COMMANDS.filter(c => c.startsWith(cmd));
      if (matches.length === 1) {
        input.value = matches[0] + ' ';
      } else if (matches.length > 1) {
        appendPromptLine(val);
        appendOutput(matches.join('    '), 'output');
      }
    } else {
      let inQuotes = false;
      let lastSpaceIndex = -1;
      for (let i = 0; i < val.length; i++) {
        if (val[i] === '"' || val[i] === "'") inQuotes = !inQuotes;
        if (val[i] === ' ' && !inQuotes) lastSpaceIndex = i;
      }
      
      const prefix = val.substring(0, lastSpaceIndex + 1);
      let target = val.substring(lastSpaceIndex + 1);
      
      const hasQuotes = target.startsWith('"') || target.startsWith("'");
      if (hasQuotes) target = target.replace(/["']/g, '');
      
      const lastSlashIndex = target.lastIndexOf('/');
      let dirPath = '';
      let partialName = target;
      
      if (lastSlashIndex !== -1) {
        dirPath = target.substring(0, lastSlashIndex);
        partialName = target.substring(lastSlashIndex + 1);
      }
      
      const resolvedDir = resolvePath(dirPath);
      const items = fs.listDirAll(resolvedDir);
      if (!items) return;
      
      const matches = items.filter(i => i.name.toLowerCase().startsWith(partialName.toLowerCase()));
      
      if (matches.length === 1) {
        let matchName = matches[0].name;
        let completedTarget = dirPath ? dirPath + '/' + matchName : matchName;
        
        if (completedTarget.includes(' ') || hasQuotes) {
          completedTarget = '"' + completedTarget + '"';
        }
        
        input.value = prefix + completedTarget + (matches[0].type === 'folder' ? '/' : ' ');
      } else if (matches.length > 1) {
        appendPromptLine(val);
        const listing = matches.map(i => {
          const color = i.type === 'folder' ? '#007AFF' : '#c0c0c0';
          const suffix = i.type === 'folder' ? '/' : '';
          return `<span style="color:${color}">${i.name}${suffix}</span>`;
        }).join('    ');
        appendOutput(listing, 'output');
      }
    }
  }

  function processCommand(cmd) {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    
    let args = cmd.substring(command.length).trim();
    if ((args.startsWith('"') && args.endsWith('"')) || (args.startsWith("'") && args.endsWith("'"))) {
      args = args.slice(1, -1);
    }

    trackTerminalCommand();

    switch (command) {
      case 'help':
        trackTerminalHelp();
        appendOutput(`
<table class="terminal-table">
<tr><td>help</td><td>Show this help message</td></tr>
<tr><td>about</td><td>Learn about me</td></tr>
<tr><td>projects</td><td>List all projects</td></tr>
<tr><td>skills</td><td>View technical skills</td></tr>
<tr><td>open &lt;item&gt;</td><td>Open a desktop item or app</td></tr>
<tr><td>ls [path]</td><td>List directory contents</td></tr>
<tr><td>cd [dir]</td><td>Change directory</td></tr>
<tr><td>pwd</td><td>Print working directory</td></tr>
<tr><td>cat &lt;file&gt;</td><td>Display file contents</td></tr>
<tr><td>whoami</td><td>Who am I?</td></tr>
<tr><td>clear</td><td>Clear the terminal</td></tr>
<tr><td>cv</td><td>Open CV viewer</td></tr>
<tr><td>email</td><td>Open email client</td></tr>
<tr><td>minesweeper</td><td>Launch Minesweeper</td></tr>
<tr><td>easter_eggs</td><td>Discover hidden features</td></tr>
<tr><td>matrix</td><td>???</td></tr>
<tr><td>exit</td><td>Close terminal</td></tr>
</table>`, 'output');
        break;

      case 'about':
        appendOutput(`
<strong style="color:#f0f0f0">Oussama Mouzgui</strong> — Next.js & Full Stack Specialist
<span style="color:#666">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
I transform complex ideas into scalable, high-performance applications.
My core expertise lies in the Next.js, React, and Node.js ecosystem,
complemented by a solid foundation in Laravel, Python, and TypeScript.

📍 Morocco
📧 omouzgui@gmail.com
🔗 github.com/mouzgui`, 'output');
        break;

      case 'projects':
        let projectList = '\n';
        Object.entries(projects).forEach(([key, p]) => {
          projectList += `${p.icon}  <strong style="color:#f0f0f0">${p.title}</strong> (${p.year})\n   ${p.tech.slice(0, 3).join(', ')}\n\n`;
        });
        projectList += `Type <span style="color:var(--accent)">open &lt;project name&gt;</span> to view details.`;
        appendOutput(projectList, 'output');
        break;

      case 'skills':
        appendOutput(`
<strong style="color:#f0f0f0">Technical Skills</strong>
<span style="color:#666">━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<strong style="color:#007AFF">Languages:</strong>  JavaScript/TypeScript, PHP, Python
<strong style="color:#27C93F">Frontend:</strong>   Next.js, React.js, Tailwind CSS
<strong style="color:#FFBD2E">Backend:</strong>    Node.js, Laravel, Supabase, Firebase
<strong style="color:#FF5F57">Databases:</strong>  MySQL, PostgreSQL
<strong style="color:#5856D6">Other:</strong>      React Native, Expo, Headless Commerce`, 'output');
        break;

      case 'whoami':
        appendOutput('oussama — Next.js & Full Stack Specialist', 'success');
        break;

      case 'clear':
        output.innerHTML = '';
        break;

      case 'pwd':
        appendOutput(currentDir === '~' ? '/' : currentDir, 'output');
        break;

      case 'cd': {
        if (!args) {
          currentDir = '~';
          break;
        }
        const targetPath = resolvePath(args);
        const node = fs.resolve(targetPath);
        
        if (!node) {
          appendOutput(`cd: ${args}: No such file or directory`, 'error');
        } else if (node.type !== 'folder') {
          appendOutput(`cd: ${args}: Not a directory`, 'error');
        } else {
          currentDir = targetPath === '/' ? '~' : targetPath;
        }
        break;
      }

      case 'ls': {
        const resolvedPath = resolvePath(args);
        const lsPath = resolvedPath === '/' ? '/' : resolvedPath;
        const items = fs.listDirAll(lsPath);
        if (!items || items.length === 0) {
          appendOutput(`ls: ${args || (currentDir === '~' ? '/' : currentDir)}: No such file or directory`, 'error');
        } else {
          const listing = items.map(i => {
            const color = i.type === 'folder' ? '#007AFF' : '#c0c0c0';
            const suffix = i.type === 'folder' ? '/' : '';
            return `<span style="color:${color}">${i.name}${suffix}</span>`;
          }).join('    ');
          appendOutput(listing, 'output');
        }
        break;
      }

      case 'cat': {
        if (!args) {
          appendOutput('cat: missing file operand', 'error');
          break;
        }
        const targetPath = resolvePath(args);
        const content = fs.getContent(targetPath);
        if (content.startsWith('[No content')) {
          appendOutput(`cat: ${args}: No such file`, 'error');
        } else {
          appendOutput(`<pre style="white-space:pre-wrap">${escapeHtml(content)}</pre>`, 'output');
        }
        break;
      }

      case 'open': {
        if (!args) {
          appendOutput('open: missing argument. Try: open finder, open terminal, open email, open minesweeper', 'error');
          break;
        }
        const target = args.toLowerCase();
        if (['finder', 'terminal', 'email', 'mail', 'minesweeper', 'pdf', 'cv'].includes(target)) {
          const appId = target === 'mail' ? 'email' : target === 'cv' ? 'pdf' : target;
          if (appOpener) appOpener(appId);
          appendOutput(`Opening ${target}...`, 'success');
        } else {
          // Try to find as project
          const proj = Object.entries(projects).find(([k, p]) => 
            p.title.toLowerCase() === target || k.toLowerCase().includes(target)
          );
          if (proj && appOpener) {
            appOpener('project', proj[0]);
            appendOutput(`Opening ${proj[1].title}...`, 'success');
          } else {
            appendOutput(`open: ${args}: not found. Try 'help' for available commands.`, 'error');
          }
        }
        break;
      }

      case 'cv':
        if (appOpener) appOpener('pdf');
        appendOutput('Opening CV...', 'success');
        break;

      case 'email':
        if (appOpener) appOpener('email');
        appendOutput('Opening Mail...', 'success');
        break;

      case 'minesweeper':
        if (appOpener) appOpener('minesweeper');
        appendOutput('💣 Launching Minesweeper...', 'success');
        break;

      case 'matrix':
        appendOutput('Initiating Matrix rain...', 'success');
        startMatrixRain();
        break;

      case 'sudo':
        if (args.toLowerCase().includes('hire me')) {
          appendOutput('🎉 HIRE_ME process initiated with elevated privileges!', 'success');
          appendOutput('Sending resume to all tech companies...', 'info');
          appendOutput('Just kidding. But seriously, let\'s talk! 📧 omouzgui@gmail.com', 'output');
          triggerConfetti();
        } else {
          appendOutput('sudo: nice try, but this is a portfolio, not a server 😄', 'info');
        }
        break;

      case 'rm':
        if (args.includes('-rf')) {
          appendOutput('Nice try! 😈 This portfolio is indestructible.', 'error');
          appendOutput('But I appreciate the hacker energy.', 'info');
        } else {
          appendOutput(`rm: command not supported in portfolio mode`, 'error');
        }
        break;

      case 'easter_eggs':
      case 'easter-eggs':
      case 'eastereggs':
        appendOutput(`
🥚 <strong style="color:#f0f0f0">Easter Egg Hints</strong>
<span style="color:#666">━━━━━━━━━━━━━━━━━━━━━━━━━</span>
1. The Konami Code works... somewhere 🎮
2. Try 'sudo hire me' for a surprise
3. Type 'matrix' for a visual treat
4. There's a hidden file in the Playground folder
5. Click the menu bar logo 7 times
6. The number 42 means something special
7. Try resizing the terminal really small

More secrets are hidden throughout.
Happy exploring! 🔍`, 'output');
        break;

      case 'neofetch':
        appendOutput(`
<span style="color:#007AFF">        .--.        </span>  <strong style="color:#f0f0f0">oussama@portfolio</strong>
<span style="color:#007AFF">       |o_o |       </span>  <span style="color:#666">──────────────────</span>
<span style="color:#007AFF">       |:_/ |       </span>  <strong>OS:</strong> PortfolioOS 1.0
<span style="color:#007AFF">      //   \\ \\      </span>  <strong>Host:</strong> Browser Runtime
<span style="color:#007AFF">     (|     | )     </span>  <strong>Kernel:</strong> Vanilla JS
<span style="color:#007AFF">    /'\\_   _/'\`\\    </span>  <strong>Shell:</strong> portfolio-sh 1.0
<span style="color:#007AFF">    \\___)=(___/     </span>  <strong>Resolution:</strong> ${window.innerWidth}x${window.innerHeight}
                      <strong>Theme:</strong> Dark [monochrome]
                      <strong>Terminal:</strong> PortfolioTerm
                      <strong>CPU:</strong> Your Browser Engine
                      <strong>Memory:</strong> As much as Chrome allows`, 'output');
        break;

      case 'exit':
        appendOutput('Closing terminal...', 'info');
        setTimeout(() => {
          const { closeWindow } = require('../core/windowManager.js');
        }, 500);
        break;

      case 'date':
        appendOutput(new Date().toString(), 'output');
        break;

      case 'pwd':
        appendOutput(currentDir === '~' ? '/home/oussama' : currentDir, 'output');
        break;

      case 'echo':
        appendOutput(args || '', 'output');
        break;

      case '42':
        appendOutput('The answer to life, the universe, and everything.', 'success');
        appendOutput('You found an easter egg! 🥚', 'info');
        triggerConfetti();
        break;

      default:
        appendOutput(`command not found: ${command}. Type 'help' for available commands.`, 'error');
    }

    output.scrollTop = output.scrollHeight;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  return id;
}

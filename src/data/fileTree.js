// Inline SVG icons — zero external dependencies, retro 90s aesthetic
const s = 'width="100%" height="100%" viewBox="0 0 48 48"';

export const win98Icons = {
  desktop: `<svg ${s}><rect x="6" y="6" width="36" height="26" rx="2" fill="#008080" stroke="#c0c0c0" stroke-width="2"/><rect x="9" y="9" width="30" height="20" fill="#000080"/><rect x="18" y="32" width="12" height="4" fill="#808080"/><rect x="14" y="36" width="20" height="3" rx="1" fill="#c0c0c0"/><rect x="12" y="12" width="8" height="8" rx="1" fill="#ffff00" opacity=".8"/><rect x="22" y="16" width="14" height="2" fill="#00ff00"/><rect x="22" y="20" width="10" height="2" fill="#00ff00"/></svg>`,

  folder: `<svg ${s}><path d="M4 14v24c0 1.1.9 2 2 2h36c1.1 0 2-.9 2-2V18c0-1.1-.9-2-2-2H22l-4-4H6c-1.1 0-2 .9-2 2z" fill="#ffd700"/><path d="M4 18h40v20c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V18z" fill="#ffec80"/></svg>`,

  text: `<svg ${s}><rect x="10" y="4" width="28" height="40" rx="2" fill="#fff" stroke="#808080" stroke-width="1.5"/><path d="M10 4h20l8 8v32c0 1.1-.9 2-2 2H12c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="#fff" stroke="#808080" stroke-width="1.5"/><path d="M30 4v8h8" fill="#e0e0e0" stroke="#808080" stroke-width="1.5"/><line x1="15" y1="18" x2="33" y2="18" stroke="#000080" stroke-width="1.5"/><line x1="15" y1="23" x2="33" y2="23" stroke="#000080" stroke-width="1.5"/><line x1="15" y1="28" x2="28" y2="28" stroke="#000080" stroke-width="1.5"/><line x1="15" y1="33" x2="30" y2="33" stroke="#000080" stroke-width="1.5"/></svg>`,

  markdown: `<svg ${s}><rect x="10" y="4" width="28" height="40" rx="2" fill="#f0f0ff" stroke="#808080" stroke-width="1.5"/><path d="M30 4v8h8" fill="#d0d0e0" stroke="#808080" stroke-width="1.5"/><circle cx="24" cy="24" r="8" fill="#6060c0" opacity=".2"/><text x="24" y="29" text-anchor="middle" font-size="14" font-weight="bold" fill="#4040a0" font-family="monospace">M↓</text></svg>`,

  pdf: `<svg ${s}><rect x="10" y="4" width="28" height="40" rx="2" fill="#fff" stroke="#808080" stroke-width="1.5"/><path d="M30 4v8h8" fill="#e0e0e0" stroke="#808080" stroke-width="1.5"/><rect x="14" y="16" width="20" height="12" rx="2" fill="#cc0000"/><text x="24" y="26" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff" font-family="sans-serif">PDF</text></svg>`,

  project: `<svg ${s}><rect x="4" y="10" width="40" height="30" rx="3" fill="#c0c0c0" stroke="#808080" stroke-width="1.5"/><rect x="4" y="10" width="40" height="8" rx="3" fill="#000080"/><circle cx="10" cy="14" r="2" fill="#ff0000"/><circle cx="16" cy="14" r="2" fill="#ffff00"/><circle cx="22" cy="14" r="2" fill="#00c000"/><rect x="8" y="22" width="14" height="14" rx="1" fill="#008080"/><rect x="26" y="22" width="14" height="6" rx="1" fill="#fff" opacity=".7"/><rect x="26" y="30" width="14" height="6" rx="1" fill="#fff" opacity=".5"/></svg>`,

  trashEmpty: `<svg ${s}><rect x="12" y="12" width="24" height="30" rx="2" fill="#c0c0c0" stroke="#808080" stroke-width="1.5"/><rect x="8" y="8" width="32" height="4" rx="1" fill="#808080"/><rect x="20" y="4" width="8" height="5" rx="1" fill="#a0a0a0" stroke="#808080" stroke-width="1"/><line x1="18" y1="18" x2="18" y2="36" stroke="#808080" stroke-width="1.5"/><line x1="24" y1="18" x2="24" y2="36" stroke="#808080" stroke-width="1.5"/><line x1="30" y1="18" x2="30" y2="36" stroke="#808080" stroke-width="1.5"/></svg>`,

  trashFull: `<svg ${s}><rect x="12" y="12" width="24" height="30" rx="2" fill="#c0c0c0" stroke="#808080" stroke-width="1.5"/><rect x="8" y="8" width="32" height="4" rx="1" fill="#808080"/><rect x="20" y="4" width="8" height="5" rx="1" fill="#a0a0a0" stroke="#808080" stroke-width="1"/><rect x="15" y="14" width="8" height="5" rx="1" fill="#ffe080" transform="rotate(-15 19 16)"/><rect x="22" y="13" width="10" height="4" rx="1" fill="#80c0ff" transform="rotate(10 27 15)"/><rect x="17" y="16" width="6" height="8" rx="1" fill="#ff8080" transform="rotate(-5 20 20)"/></svg>`,

  terminal: `<svg ${s}><rect x="4" y="6" width="40" height="36" rx="3" fill="#1a1a2e" stroke="#808080" stroke-width="1.5"/><rect x="4" y="6" width="40" height="8" rx="3" fill="#333366"/><circle cx="10" cy="10" r="2" fill="#ff5555"/><circle cx="16" cy="10" r="2" fill="#ffff55"/><circle cx="22" cy="10" r="2" fill="#55ff55"/><text x="10" y="24" font-size="9" fill="#00ff00" font-family="monospace">$ _</text><text x="10" y="34" font-size="8" fill="#00ff00" font-family="monospace" opacity=".5">ready</text></svg>`,

  mail: `<svg ${s}><rect x="4" y="10" width="40" height="28" rx="2" fill="#fff" stroke="#808080" stroke-width="1.5"/><path d="M4 12l20 14 20-14" fill="none" stroke="#000080" stroke-width="2"/><path d="M4 10h40l-20 14L4 10z" fill="#e8e8ff" stroke="#808080" stroke-width="1.5"/></svg>`,

  minesweeper: `<svg ${s}><rect x="4" y="4" width="40" height="40" rx="2" fill="#c0c0c0" stroke="#808080" stroke-width="1.5"/><circle cx="24" cy="24" r="10" fill="#333"/><line x1="24" y1="10" x2="24" y2="14" stroke="#333" stroke-width="2"/><line x1="24" y1="34" x2="24" y2="38" stroke="#333" stroke-width="2"/><line x1="10" y1="24" x2="14" y2="24" stroke="#333" stroke-width="2"/><line x1="34" y1="24" x2="38" y2="24" stroke="#333" stroke-width="2"/><line x1="14" y1="14" x2="17" y2="17" stroke="#333" stroke-width="2"/><line x1="31" y1="31" x2="34" y2="34" stroke="#333" stroke-width="2"/><line x1="34" y1="14" x2="31" y2="17" stroke="#333" stroke-width="2"/><line x1="14" y1="34" x2="17" y2="31" stroke="#333" stroke-width="2"/><circle cx="21" cy="21" r="3" fill="#fff" opacity=".4"/></svg>`,

  experience: `<svg ${s}><rect x="6" y="16" width="36" height="26" rx="3" fill="#8B4513" stroke="#5C3317" stroke-width="1.5"/><rect x="18" y="12" width="12" height="6" rx="2" fill="none" stroke="#5C3317" stroke-width="2"/><rect x="6" y="16" width="36" height="8" fill="#A0522D" rx="3"/><rect x="20" y="18" width="8" height="6" rx="1" fill="#ffd700"/><rect x="10" y="28" width="28" height="2" fill="#5C3317" opacity=".3"/></svg>`,

  playground: `<svg ${s}><rect x="16" y="6" width="16" height="24" rx="3" fill="#333" stroke="#808080" stroke-width="1.5"/><circle cx="24" cy="18" r="6" fill="#222"/><circle cx="24" cy="18" r="4" fill="#c0c0c0"/><circle cx="24" cy="18" r="1.5" fill="#ff0000"/><rect x="22" y="30" width="4" height="10" rx="1" fill="#666"/><circle cx="14" cy="40" r="4" fill="#333" stroke="#808080" stroke-width="1"/><circle cx="34" cy="40" r="4" fill="#333" stroke="#808080" stroke-width="1"/></svg>`,

  projectsFolder: `<svg ${s}><path d="M4 14v24c0 1.1.9 2 2 2h36c1.1 0 2-.9 2-2V18c0-1.1-.9-2-2-2H22l-4-4H6c-1.1 0-2 .9-2 2z" fill="#4a90d9"/><path d="M4 18h40v20c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V18z" fill="#6ab0ff"/><rect x="14" y="23" width="8" height="10" rx="1" fill="#fff" opacity=".5"/><rect x="26" y="23" width="8" height="10" rx="1" fill="#fff" opacity=".5"/><rect x="20" y="26" width="8" height="10" rx="1" fill="#fff" opacity=".3"/></svg>`,

  secret: `<svg ${s}><circle cx="24" cy="16" r="10" fill="none" stroke="#ffd700" stroke-width="3"/><rect x="18" y="24" width="12" height="16" rx="2" fill="#ffd700" stroke="#b8860b" stroke-width="1.5"/><circle cx="24" cy="30" r="2" fill="#8B6914"/><rect x="23" y="31" width="2" height="5" fill="#8B6914"/></svg>`,

  nebula: `<svg ${s}><rect x="4" y="10" width="40" height="30" rx="3" fill="#1a1a3e" stroke="#808080" stroke-width="1.5"/><rect x="4" y="10" width="40" height="8" rx="3" fill="#2d2d5e"/><circle cx="10" cy="14" r="2" fill="#ff5555"/><circle cx="16" cy="14" r="2" fill="#ffff55"/><circle cx="22" cy="14" r="2" fill="#55ff55"/><text x="24" y="32" text-anchor="middle" font-size="10" fill="#8080ff" font-family="monospace">⚡</text></svg>`,

  dataforge: `<svg ${s}><rect x="6" y="16" width="36" height="26" rx="3" fill="#2c3e50" stroke="#1a252f" stroke-width="1.5"/><rect x="18" y="12" width="12" height="6" rx="2" fill="none" stroke="#1a252f" stroke-width="2"/><rect x="6" y="16" width="36" height="8" fill="#34495e" rx="3"/><rect x="10" y="28" width="6" height="10" fill="#3498db" opacity=".8"/><rect x="18" y="24" width="6" height="14" fill="#2ecc71" opacity=".8"/><rect x="26" y="30" width="6" height="8" fill="#e74c3c" opacity=".8"/><rect x="34" y="26" width="4" height="12" fill="#f1c40f" opacity=".8"/></svg>`,

  cloudsync: `<svg ${s}><ellipse cx="24" cy="26" rx="16" ry="10" fill="#87CEEB" stroke="#4682B4" stroke-width="1.5"/><ellipse cx="18" cy="22" rx="10" ry="8" fill="#B0E0E6"/><ellipse cx="30" cy="20" rx="8" ry="7" fill="#B0E0E6"/><path d="M20 30l4-6 4 6" fill="none" stroke="#4682B4" stroke-width="2"/><path d="M22 34l-4 6" fill="none" stroke="#4682B4" stroke-width="2"/><path d="M26 34l4 6" fill="none" stroke="#4682B4" stroke-width="2"/></svg>`,

  pixelcraft: `<svg ${s}><rect x="8" y="6" width="32" height="36" rx="2" fill="#fff" stroke="#808080" stroke-width="1.5"/><rect x="12" y="12" width="10" height="8" fill="#ff0000"/><rect x="22" y="12" width="10" height="8" fill="#00c000"/><rect x="12" y="20" width="10" height="8" fill="#0000ff"/><rect x="22" y="20" width="10" height="8" fill="#ffff00"/><rect x="12" y="32" width="24" height="3" rx="1" fill="#c0c0c0"/><rect x="12" y="37" width="16" height="2" rx="1" fill="#e0e0e0"/></svg>`,

  folderOpen: `<svg ${s}><path d="M4 14v24c0 1.1.9 2 2 2h36c1.1 0 2-.9 2-2V18c0-1.1-.9-2-2-2H22l-4-4H6c-1.1 0-2 .9-2 2z" fill="#ffd700"/><path d="M2 20l6-2h36l6 2-6 20H8L2 20z" fill="#ffec80" stroke="#e6c200" stroke-width="1"/></svg>`,

  csv: `<svg ${s}><rect x="10" y="4" width="28" height="40" rx="2" fill="#fff" stroke="#808080" stroke-width="1.5"/><path d="M30 4v8h8" fill="#e0e0e0" stroke="#808080" stroke-width="1.5"/><rect x="14" y="16" width="20" height="12" rx="2" fill="#22863a"/><text x="24" y="26" text-anchor="middle" font-size="9" font-weight="bold" fill="#fff" font-family="sans-serif">CSV</text></svg>`,

  snake: `<svg ${s}><rect x="4" y="4" width="40" height="40" rx="2" fill="#1a1a2e" stroke="#808080" stroke-width="1.5"/><rect x="8" y="8" width="32" height="32" fill="#111"/><path d="M12 32 L12 20 L20 20 L20 28 L28 28 L28 16 L36 16" fill="none" stroke="#27C93F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="36" cy="16" r="3" fill="#27C93F"/><circle cx="34" cy="15" r="1" fill="#000"/><rect x="16" y="12" width="4" height="4" rx="1" fill="#ff3333"/></svg>`,

  spotify: `<svg ${s}><rect x="4" y="4" width="40" height="40" rx="20" fill="#1DB954" stroke="#808080" stroke-width="1.5"/><path d="M34 32.5c-.5 0-.8-.2-1.1-.4-6-3.7-13.6-4.5-22.5-2.5-.9.2-1.7-.4-1.9-1.2-.2-.9.4-1.7 1.2-1.9 9.8-2.3 18.3-1.3 25.1 2.9.8.4 1 1.3.5 2.1-.3.6-.8 1-1.3 1z" fill="#fff"/><path d="M36.1 26.5c-.6 0-1-.2-1.3-.6-7.1-4.4-18-5.7-25-3.6-1 .3-2-.3-2.3-1.3-.3-1 .3-2 1.3-2.3 8.3-2.5 20.3-1 28.5 4.1 1 .6 1.3 1.8.7 2.8-.5.6-1 9-1.9 9z" fill="#fff"/><path d="M38.5 20c-.7 0-1.2-.2-1.6-.7-8.2-4.9-21-6.4-28.6-4.1-1.3.4-2.6-.4-3-1.6-.4-1.3.4-2.6 1.6-3 8.9-2.7 23.3-1.1 32.7 4.5 1.2.7 1.6 2.2.9 3.4-.6 1.1-1.3 1.5-2 1.5z" fill="#fff"/></svg>`
};

// Virtual file system tree structure
// Each node: { name, type: 'folder'|'file', icon, children?, fileType?, appHandler? }

export const fileTree = {
  name: 'Desktop',
  type: 'folder',
  icon: win98Icons.desktop,
  children: [
    {
      name: 'About Me',
      type: 'folder',
      icon: win98Icons.folder,
      children: [
        { name: 'bio.txt', type: 'file', icon: win98Icons.text, fileType: 'text' },
        { name: 'values.md', type: 'file', icon: win98Icons.markdown, fileType: 'markdown' },
        { name: 'skills.md', type: 'file', icon: win98Icons.markdown, fileType: 'markdown' },
      ]
    },
    {
      name: 'Experience',
      type: 'folder',
      icon: win98Icons.experience,
      children: [
        { name: 'RWS_Group.md', type: 'file', icon: win98Icons.markdown, fileType: 'markdown' },
        { name: 'Teal_ElGhazali.md', type: 'file', icon: win98Icons.markdown, fileType: 'markdown' },
        { name: 'Freelance.md', type: 'file', icon: win98Icons.markdown, fileType: 'markdown' },
        { name: 'SOREMED.md', type: 'file', icon: win98Icons.markdown, fileType: 'markdown' }
      ]
    },
    {
      name: 'Education',
      type: 'folder',
      icon: win98Icons.folder,
      children: [
        { name: 'ALX_Certificate.md', type: 'file', icon: win98Icons.markdown, fileType: 'markdown' },
        { name: 'Harvard_CS50.md', type: 'file', icon: win98Icons.markdown, fileType: 'markdown' },
        { name: '1337_Bootcamp.md', type: 'file', icon: win98Icons.markdown, fileType: 'markdown' },
        { name: 'Udemy_Courses.md', type: 'file', icon: win98Icons.markdown, fileType: 'markdown' }
      ]
    },
    {
      name: 'Projects',
      type: 'folder',
      icon: win98Icons.projectsFolder,
      children: [
        { name: 'Optician Shop Management.app', type: 'file', icon: win98Icons.project, fileType: 'project', appHandler: 'project' },
        { name: 'Headless-PWA-store.app', type: 'file', icon: win98Icons.cloudsync, fileType: 'project', appHandler: 'project' },
        { name: 'Zombie Subscriptions.app', type: 'file', icon: win98Icons.dataforge, fileType: 'project', appHandler: 'project' },
        { name: 'Complaints App.app', type: 'file', icon: win98Icons.nebula, fileType: 'project', appHandler: 'project' },
      ]
    },
    {
      name: 'Playground',
      type: 'folder',
      icon: win98Icons.playground,
      children: [
        { name: 'ideas.txt', type: 'file', icon: win98Icons.text, fileType: 'text' },
        { name: '.secret', type: 'file', icon: win98Icons.secret, fileType: 'text', hidden: true },
        { name: 'ascii-art.txt', type: 'file', icon: win98Icons.text, fileType: 'text' },
      ]
    },
    { name: 'cv.pdf', type: 'file', icon: win98Icons.pdf, fileType: 'pdf', appHandler: 'pdf' },
    {
      name: 'Trash',
      type: 'folder',
      icon: win98Icons.trashFull,
      children: [
        { name: 'passwords.txt', type: 'file', icon: win98Icons.text, fileType: 'text', easterEggMsg: "Absolutely not. PS don't store your passwords in a .txt file like EVER" },
        { name: 'journal_2020-2022.txt', type: 'file', icon: win98Icons.text, fileType: 'text', easterEggMsg: "Nope. Nope. Nope." },
        { name: 'bank_transactions_2021.csv', type: 'file', icon: win98Icons.csv, fileType: 'text', easterEggMsg: "Financial data is not part of the portfolio." },
        { name: 'side_projects_roi.csv', type: 'file', icon: win98Icons.csv, fileType: 'text', easterEggMsg: "Some metrics hurt more than they help." }
      ],
      isTrash: true
    }
  ]
};

// Icon mapping for Finder sidebar
export const sidebarFavorites = [
  { name: 'Desktop', path: '/', icon: win98Icons.desktop },
  { name: 'About Me', path: '/About Me', icon: win98Icons.folder },
  { name: 'Experience', path: '/Experience', icon: win98Icons.experience },
  { name: 'Education', path: '/Education', icon: win98Icons.folder },
  { name: 'Projects', path: '/Projects', icon: win98Icons.projectsFolder },
  { name: 'Playground', path: '/Playground', icon: win98Icons.playground },
  { name: 'Trash', path: '/Trash', icon: win98Icons.trashEmpty },
];

// Dock items configuration
export const dockItems = [
  { id: 'finder', name: 'Finder', icon: win98Icons.folderOpen, action: 'app' },
  { id: 'terminal', name: 'Terminal', icon: win98Icons.terminal, action: 'app' },
  { id: 'email', name: 'Mail', icon: win98Icons.mail, action: 'app' },
  { id: 'minesweeper', name: 'Minesweeper', icon: win98Icons.minesweeper, action: 'app' },
  { id: 'snake', name: 'Snake', icon: win98Icons.snake, action: 'app' },
  { id: 'separator' },
  { id: 'spotify', name: 'Spotify', icon: win98Icons.spotify, action: 'app' },
  { id: 'trash', name: 'Trash', icon: win98Icons.trashEmpty, action: 'app' },
];

(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}})();const xt="modulepreload",Et=function(t){return"/"+t},Ne={},st=function(e,i,n){let o=Promise.resolve();if(i&&i.length>0){let l=function(r){return Promise.all(r.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));o=l(i.map(r=>{if(r=Et(r),r in Ne)return;Ne[r]=!0;const d=r.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${h}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":xt,d||(u.as="script"),u.crossOrigin="",u.href=r,c&&u.setAttribute("nonce",c),document.head.appendChild(u),d)return new Promise((T,x)=>{u.addEventListener("load",T),u.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${r}`)))})}))}function s(l){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=l,window.dispatchEvent(a),!a.defaultPrevented)throw l}return o.then(l=>{for(const a of l||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})};let rt=100;const D=new Map;let ce=null;const je={focus:[],close:[],open:[]};function De(t,e){je[t]&&je[t].push(e)}function te(t,e){(je[t]||[]).forEach(i=>i(e))}function W(t,e,i,n={}){const o=t+"-"+Date.now(),s=document.getElementById("windows-container"),l=n.width||700,a=n.height||500,c=n.x??window.innerWidth/2-l/2+Math.random()*40-20,r=n.y??window.innerHeight/2-a/2+Math.random()*30-15,d=document.createElement("div");d.className="app-window opening",d.id=o,d.style.cssText=`left:${c}px;top:${r}px;width:${l}px;height:${a}px;z-index:${++rt};`,d.dataset.appId=t,d.innerHTML=`
    <div class="window-header">
      <div class="traffic-lights">
        <div class="traffic-light close" title="Close">✕</div>
        <div class="traffic-light minimize" title="Minimize">−</div>
        <div class="traffic-light maximize" title="Maximize">⤢</div>
      </div>
      <span class="window-title">${e}</span>
    </div>
    <div class="window-body">${i}</div>
    <div class="resize-handle right"></div>
    <div class="resize-handle bottom"></div>
    <div class="resize-handle corner"></div>
  `,s.appendChild(d),setTimeout(()=>d.classList.remove("opening"),300),d.querySelector(".traffic-light.close").addEventListener("click",u=>{u.stopPropagation(),St(o)}),d.querySelector(".traffic-light.minimize").addEventListener("click",u=>{u.stopPropagation(),$t(o)}),d.querySelector(".traffic-light.maximize").addEventListener("click",u=>{u.stopPropagation(),Lt(o)}),d.addEventListener("mousedown",()=>Q(o)),Tt(d,o),At(d);const h={el:d,appId:t,title:e,isMinimized:!1,isMaximized:!1,prevBounds:null};return D.set(o,h),Q(o),te("open",{id:o,appId:t,title:e}),{id:o,el:d,body:d.querySelector(".window-body")}}function St(t){const e=D.get(t);if(!e)return;const{el:i,appId:n}=e;i.classList.add("closing"),i.addEventListener("animationend",()=>{var o;if(i.remove(),D.delete(t),te("close",{id:t,appId:n}),ce===t){ce=null;const s=[...D.values()].filter(l=>!l.isMinimized);if(s.length){const l=s.reduce((a,c)=>parseInt(a.el.style.zIndex)>parseInt(c.el.style.zIndex)?a:c);Q((o=[...D.entries()].find(([,a])=>a===l))==null?void 0:o[0])}else te("focus",{id:null,appId:null,title:"Finder"})}},{once:!0})}function $t(t){var n;const e=D.get(t);if(!e)return;e.isMinimized=!0,e.el.classList.add("minimizing"),e.el.addEventListener("animationend",()=>{e.el.style.display="none",e.el.classList.remove("minimizing")},{once:!0}),ce=null;const i=[...D.values()].filter(o=>!o.isMinimized&&o!==e);if(i.length){const o=i.reduce((s,l)=>parseInt(s.el.style.zIndex)>parseInt(l.el.style.zIndex)?s:l);Q((n=[...D.entries()].find(([,s])=>s===o))==null?void 0:n[0])}else te("focus",{id:null,appId:null,title:"Finder"})}function lt(t){const e=D.get(t);e&&(e.isMinimized=!1,e.el.style.display="",e.el.classList.add("opening"),setTimeout(()=>e.el.classList.remove("opening"),300),Q(t))}function Lt(t){const e=D.get(t);if(!e)return;const i=e.el;if(e.isMaximized){const n=e.prevBounds;i.style.left=n.left,i.style.top=n.top,i.style.width=n.width,i.style.height=n.height,i.style.borderRadius="",e.isMaximized=!1}else e.prevBounds={left:i.style.left,top:i.style.top,width:i.style.width,height:i.style.height},i.style.left="0",i.style.top="28px",i.style.width="100vw",i.style.height="calc(100vh - 28px)",i.style.borderRadius="0",e.isMaximized=!0;i.classList.add("maximizing"),setTimeout(()=>i.classList.remove("maximizing"),300)}function Q(t){if(!t||!D.has(t))return;D.forEach(i=>{i.el.classList.remove("focused"),i.el.classList.add("unfocused")});const e=D.get(t);e.el.style.zIndex=++rt,e.el.classList.add("focused"),e.el.classList.remove("unfocused"),ce=t,te("focus",{id:t,appId:e.appId,title:e.title})}function ct(t){for(const[e,i]of D)if(i.appId===t&&!i.isMinimized)return e;for(const[e,i]of D)if(i.appId===t)return e;return null}function Mt(){const t=new Set;return D.forEach(e=>t.add(e.appId)),t}function Ct(t,e){const i=D.get(t);i&&(i.title=e,i.el.querySelector(".window-title").textContent=e,ce===t&&te("focus",{id:t,appId:i.appId,title:e}))}function Tt(t,e){const i=t.querySelector(".window-header");let n=!1,o,s,l,a;i.addEventListener("mousedown",c=>{if(c.target.classList.contains("traffic-light"))return;const r=D.get(e);r!=null&&r.isMaximized||(n=!0,o=c.clientX,s=c.clientY,l=parseInt(t.style.left),a=parseInt(t.style.top),document.body.style.cursor="grabbing",c.preventDefault())}),document.addEventListener("mousemove",c=>{if(!n)return;const r=c.clientX-o,d=c.clientY-s;t.style.left=l+r+"px",t.style.top=Math.max(28,a+d)+"px"}),document.addEventListener("mouseup",()=>{n&&(n=!1,document.body.style.cursor="")})}function At(t){t.querySelectorAll(".resize-handle").forEach(i=>{let n=!1,o,s,l,a;const c=i.classList.contains("right")||i.classList.contains("corner"),r=i.classList.contains("bottom")||i.classList.contains("corner");i.addEventListener("mousedown",d=>{n=!0,o=d.clientX,s=d.clientY,l=t.offsetWidth,a=t.offsetHeight,parseInt(t.style.left),parseInt(t.style.top),document.body.style.cursor=i.style.cursor,d.preventDefault(),d.stopPropagation()}),document.addEventListener("mousemove",d=>{if(n){if(c){const h=Math.max(400,l+(d.clientX-o));t.style.width=h+"px"}if(r){const h=Math.max(300,a+(d.clientY-s));t.style.height=h+"px"}}}),document.addEventListener("mouseup",()=>{n&&(n=!1,document.body.style.cursor="")})})}function It(){Ue(),setInterval(Ue,1e3),De("focus",({title:t,appId:e})=>{const i=document.getElementById("active-app-name");i&&(i.textContent=t||"Finder")}),jt(),Dt()}function Ue(){const t=document.getElementById("menu-clock");if(!t)return;const e=new Date,i=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],o=i[e.getDay()],s=n[e.getMonth()],l=e.getDate(),a=e.getHours()%12||12,c=String(e.getMinutes()).padStart(2,"0"),r=e.getHours()>=12?"PM":"AM";t.textContent=`${o} ${s} ${l}  ${a}:${c} ${r}`}function jt(){const t=document.querySelectorAll(".menu-item");let e=null;const i={file:[{label:"New Finder Window",shortcut:"⌘N"},{label:"New Terminal",shortcut:"⌘T"},{divider:!0},{label:"Close Window",shortcut:"⌘W"}],edit:[{label:"Undo",shortcut:"⌘Z"},{label:"Redo",shortcut:"⇧⌘Z"},{divider:!0},{label:"Cut",shortcut:"⌘X"},{label:"Copy",shortcut:"⌘C"},{label:"Paste",shortcut:"⌘V"},{label:"Select All",shortcut:"⌘A"}],view:[{label:"as Icons",shortcut:"⌘1"},{label:"as List",shortcut:"⌘2"},{divider:!0},{label:"Show Hidden Files",shortcut:"⇧⌘."}],window:[{label:"Minimize",shortcut:"⌘M"},{label:"Zoom"},{divider:!0},{label:"Bring All to Front"}],help:[{label:"Portfolio Help"},{divider:!0},{label:"About This Portfolio"},{label:"Keyboard Shortcuts",shortcut:"⌘/"}]};function n(){e&&(e.remove(),e=null),document.removeEventListener("click",n)}t.forEach(o=>{o.addEventListener("click",s=>{s.stopPropagation(),n();const l=o.dataset.menu,a=i[l];if(!a)return;const c=document.createElement("div");c.className="menu-dropdown";const r=o.getBoundingClientRect();c.style.left=r.left+"px",a.forEach(d=>{if(d.divider){const h=document.createElement("div");h.className="menu-divider",c.appendChild(h)}else{const h=document.createElement("button");h.innerHTML=`${d.label}${d.shortcut?`<span class="shortcut">${d.shortcut}</span>`:""}`,h.addEventListener("click",n),c.appendChild(h)}}),document.body.appendChild(c),e=c,setTimeout(()=>document.addEventListener("click",n),10)})})}function Dt(){const t=document.getElementById("menu-logo");t&&t.addEventListener("click",e=>{e.stopPropagation(),document.body.click();const i=document.createElement("div");i.className="menu-dropdown";const n=t.getBoundingClientRect();i.style.left=n.left+"px",i.style.top=n.bottom+4+"px";const o=document.createElement("button");o.innerHTML="System Preferences...",o.addEventListener("click",()=>{st(()=>Promise.resolve().then(()=>Ri),void 0).then(c=>{c.openSystemPreferences()}).catch(c=>console.error(c))}),i.appendChild(o);const s=document.createElement("div");s.className="menu-divider",i.appendChild(s);const l=document.createElement("button");l.innerHTML="Restart...",l.addEventListener("click",()=>{localStorage.removeItem("portfolio_achievements"),localStorage.removeItem("portfolio_has_booted"),localStorage.removeItem("portfolio_settings"),window.location.reload()}),i.appendChild(l),document.body.appendChild(i);const a=()=>{i.remove(),document.removeEventListener("click",a)};setTimeout(()=>document.addEventListener("click",a),10)})}const I='width="100%" height="100%" viewBox="0 0 48 48"',v={desktop:`<svg ${I}><rect x="6" y="6" width="36" height="26" rx="2" fill="#008080" stroke="#c0c0c0" stroke-width="2"/><rect x="9" y="9" width="30" height="20" fill="#000080"/><rect x="18" y="32" width="12" height="4" fill="#808080"/><rect x="14" y="36" width="20" height="3" rx="1" fill="#c0c0c0"/><rect x="12" y="12" width="8" height="8" rx="1" fill="#ffff00" opacity=".8"/><rect x="22" y="16" width="14" height="2" fill="#00ff00"/><rect x="22" y="20" width="10" height="2" fill="#00ff00"/></svg>`,folder:`<svg ${I}><path d="M4 14v24c0 1.1.9 2 2 2h36c1.1 0 2-.9 2-2V18c0-1.1-.9-2-2-2H22l-4-4H6c-1.1 0-2 .9-2 2z" fill="#ffd700"/><path d="M4 18h40v20c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V18z" fill="#ffec80"/></svg>`,text:`<svg ${I}><rect x="10" y="4" width="28" height="40" rx="2" fill="#fff" stroke="#808080" stroke-width="1.5"/><path d="M10 4h20l8 8v32c0 1.1-.9 2-2 2H12c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="#fff" stroke="#808080" stroke-width="1.5"/><path d="M30 4v8h8" fill="#e0e0e0" stroke="#808080" stroke-width="1.5"/><line x1="15" y1="18" x2="33" y2="18" stroke="#000080" stroke-width="1.5"/><line x1="15" y1="23" x2="33" y2="23" stroke="#000080" stroke-width="1.5"/><line x1="15" y1="28" x2="28" y2="28" stroke="#000080" stroke-width="1.5"/><line x1="15" y1="33" x2="30" y2="33" stroke="#000080" stroke-width="1.5"/></svg>`,markdown:`<svg ${I}><rect x="10" y="4" width="28" height="40" rx="2" fill="#f0f0ff" stroke="#808080" stroke-width="1.5"/><path d="M30 4v8h8" fill="#d0d0e0" stroke="#808080" stroke-width="1.5"/><circle cx="24" cy="24" r="8" fill="#6060c0" opacity=".2"/><text x="24" y="29" text-anchor="middle" font-size="14" font-weight="bold" fill="#4040a0" font-family="monospace">M↓</text></svg>`,pdf:`<svg ${I}><rect x="10" y="4" width="28" height="40" rx="2" fill="#fff" stroke="#808080" stroke-width="1.5"/><path d="M30 4v8h8" fill="#e0e0e0" stroke="#808080" stroke-width="1.5"/><rect x="14" y="16" width="20" height="12" rx="2" fill="#cc0000"/><text x="24" y="26" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff" font-family="sans-serif">PDF</text></svg>`,project:`<svg ${I}><rect x="4" y="10" width="40" height="30" rx="3" fill="#c0c0c0" stroke="#808080" stroke-width="1.5"/><rect x="4" y="10" width="40" height="8" rx="3" fill="#000080"/><circle cx="10" cy="14" r="2" fill="#ff0000"/><circle cx="16" cy="14" r="2" fill="#ffff00"/><circle cx="22" cy="14" r="2" fill="#00c000"/><rect x="8" y="22" width="14" height="14" rx="1" fill="#008080"/><rect x="26" y="22" width="14" height="6" rx="1" fill="#fff" opacity=".7"/><rect x="26" y="30" width="14" height="6" rx="1" fill="#fff" opacity=".5"/></svg>`,trashEmpty:`<svg ${I}><rect x="12" y="12" width="24" height="30" rx="2" fill="#c0c0c0" stroke="#808080" stroke-width="1.5"/><rect x="8" y="8" width="32" height="4" rx="1" fill="#808080"/><rect x="20" y="4" width="8" height="5" rx="1" fill="#a0a0a0" stroke="#808080" stroke-width="1"/><line x1="18" y1="18" x2="18" y2="36" stroke="#808080" stroke-width="1.5"/><line x1="24" y1="18" x2="24" y2="36" stroke="#808080" stroke-width="1.5"/><line x1="30" y1="18" x2="30" y2="36" stroke="#808080" stroke-width="1.5"/></svg>`,trashFull:`<svg ${I}><rect x="12" y="12" width="24" height="30" rx="2" fill="#c0c0c0" stroke="#808080" stroke-width="1.5"/><rect x="8" y="8" width="32" height="4" rx="1" fill="#808080"/><rect x="20" y="4" width="8" height="5" rx="1" fill="#a0a0a0" stroke="#808080" stroke-width="1"/><rect x="15" y="14" width="8" height="5" rx="1" fill="#ffe080" transform="rotate(-15 19 16)"/><rect x="22" y="13" width="10" height="4" rx="1" fill="#80c0ff" transform="rotate(10 27 15)"/><rect x="17" y="16" width="6" height="8" rx="1" fill="#ff8080" transform="rotate(-5 20 20)"/></svg>`,terminal:`<svg ${I}><rect x="4" y="6" width="40" height="36" rx="3" fill="#1a1a2e" stroke="#808080" stroke-width="1.5"/><rect x="4" y="6" width="40" height="8" rx="3" fill="#333366"/><circle cx="10" cy="10" r="2" fill="#ff5555"/><circle cx="16" cy="10" r="2" fill="#ffff55"/><circle cx="22" cy="10" r="2" fill="#55ff55"/><text x="10" y="24" font-size="9" fill="#00ff00" font-family="monospace">$ _</text><text x="10" y="34" font-size="8" fill="#00ff00" font-family="monospace" opacity=".5">ready</text></svg>`,mail:`<svg ${I}><rect x="4" y="10" width="40" height="28" rx="2" fill="#fff" stroke="#808080" stroke-width="1.5"/><path d="M4 12l20 14 20-14" fill="none" stroke="#000080" stroke-width="2"/><path d="M4 10h40l-20 14L4 10z" fill="#e8e8ff" stroke="#808080" stroke-width="1.5"/></svg>`,minesweeper:`<svg ${I}><rect x="4" y="4" width="40" height="40" rx="2" fill="#c0c0c0" stroke="#808080" stroke-width="1.5"/><circle cx="24" cy="24" r="10" fill="#333"/><line x1="24" y1="10" x2="24" y2="14" stroke="#333" stroke-width="2"/><line x1="24" y1="34" x2="24" y2="38" stroke="#333" stroke-width="2"/><line x1="10" y1="24" x2="14" y2="24" stroke="#333" stroke-width="2"/><line x1="34" y1="24" x2="38" y2="24" stroke="#333" stroke-width="2"/><line x1="14" y1="14" x2="17" y2="17" stroke="#333" stroke-width="2"/><line x1="31" y1="31" x2="34" y2="34" stroke="#333" stroke-width="2"/><line x1="34" y1="14" x2="31" y2="17" stroke="#333" stroke-width="2"/><line x1="14" y1="34" x2="17" y2="31" stroke="#333" stroke-width="2"/><circle cx="21" cy="21" r="3" fill="#fff" opacity=".4"/></svg>`,experience:`<svg ${I}><rect x="6" y="16" width="36" height="26" rx="3" fill="#8B4513" stroke="#5C3317" stroke-width="1.5"/><rect x="18" y="12" width="12" height="6" rx="2" fill="none" stroke="#5C3317" stroke-width="2"/><rect x="6" y="16" width="36" height="8" fill="#A0522D" rx="3"/><rect x="20" y="18" width="8" height="6" rx="1" fill="#ffd700"/><rect x="10" y="28" width="28" height="2" fill="#5C3317" opacity=".3"/></svg>`,playground:`<svg ${I}><rect x="16" y="6" width="16" height="24" rx="3" fill="#333" stroke="#808080" stroke-width="1.5"/><circle cx="24" cy="18" r="6" fill="#222"/><circle cx="24" cy="18" r="4" fill="#c0c0c0"/><circle cx="24" cy="18" r="1.5" fill="#ff0000"/><rect x="22" y="30" width="4" height="10" rx="1" fill="#666"/><circle cx="14" cy="40" r="4" fill="#333" stroke="#808080" stroke-width="1"/><circle cx="34" cy="40" r="4" fill="#333" stroke="#808080" stroke-width="1"/></svg>`,projectsFolder:`<svg ${I}><path d="M4 14v24c0 1.1.9 2 2 2h36c1.1 0 2-.9 2-2V18c0-1.1-.9-2-2-2H22l-4-4H6c-1.1 0-2 .9-2 2z" fill="#4a90d9"/><path d="M4 18h40v20c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V18z" fill="#6ab0ff"/><rect x="14" y="23" width="8" height="10" rx="1" fill="#fff" opacity=".5"/><rect x="26" y="23" width="8" height="10" rx="1" fill="#fff" opacity=".5"/><rect x="20" y="26" width="8" height="10" rx="1" fill="#fff" opacity=".3"/></svg>`,secret:`<svg ${I}><circle cx="24" cy="16" r="10" fill="none" stroke="#ffd700" stroke-width="3"/><rect x="18" y="24" width="12" height="16" rx="2" fill="#ffd700" stroke="#b8860b" stroke-width="1.5"/><circle cx="24" cy="30" r="2" fill="#8B6914"/><rect x="23" y="31" width="2" height="5" fill="#8B6914"/></svg>`,nebula:`<svg ${I}><rect x="4" y="10" width="40" height="30" rx="3" fill="#1a1a3e" stroke="#808080" stroke-width="1.5"/><rect x="4" y="10" width="40" height="8" rx="3" fill="#2d2d5e"/><circle cx="10" cy="14" r="2" fill="#ff5555"/><circle cx="16" cy="14" r="2" fill="#ffff55"/><circle cx="22" cy="14" r="2" fill="#55ff55"/><text x="24" y="32" text-anchor="middle" font-size="10" fill="#8080ff" font-family="monospace">⚡</text></svg>`,dataforge:`<svg ${I}><rect x="6" y="16" width="36" height="26" rx="3" fill="#2c3e50" stroke="#1a252f" stroke-width="1.5"/><rect x="18" y="12" width="12" height="6" rx="2" fill="none" stroke="#1a252f" stroke-width="2"/><rect x="6" y="16" width="36" height="8" fill="#34495e" rx="3"/><rect x="10" y="28" width="6" height="10" fill="#3498db" opacity=".8"/><rect x="18" y="24" width="6" height="14" fill="#2ecc71" opacity=".8"/><rect x="26" y="30" width="6" height="8" fill="#e74c3c" opacity=".8"/><rect x="34" y="26" width="4" height="12" fill="#f1c40f" opacity=".8"/></svg>`,cloudsync:`<svg ${I}><ellipse cx="24" cy="26" rx="16" ry="10" fill="#87CEEB" stroke="#4682B4" stroke-width="1.5"/><ellipse cx="18" cy="22" rx="10" ry="8" fill="#B0E0E6"/><ellipse cx="30" cy="20" rx="8" ry="7" fill="#B0E0E6"/><path d="M20 30l4-6 4 6" fill="none" stroke="#4682B4" stroke-width="2"/><path d="M22 34l-4 6" fill="none" stroke="#4682B4" stroke-width="2"/><path d="M26 34l4 6" fill="none" stroke="#4682B4" stroke-width="2"/></svg>`,folderOpen:`<svg ${I}><path d="M4 14v24c0 1.1.9 2 2 2h36c1.1 0 2-.9 2-2V18c0-1.1-.9-2-2-2H22l-4-4H6c-1.1 0-2 .9-2 2z" fill="#ffd700"/><path d="M2 20l6-2h36l6 2-6 20H8L2 20z" fill="#ffec80" stroke="#e6c200" stroke-width="1"/></svg>`,csv:`<svg ${I}><rect x="10" y="4" width="28" height="40" rx="2" fill="#fff" stroke="#808080" stroke-width="1.5"/><path d="M30 4v8h8" fill="#e0e0e0" stroke="#808080" stroke-width="1.5"/><rect x="14" y="16" width="20" height="12" rx="2" fill="#22863a"/><text x="24" y="26" text-anchor="middle" font-size="9" font-weight="bold" fill="#fff" font-family="sans-serif">CSV</text></svg>`,snake:`<svg ${I}><rect x="4" y="4" width="40" height="40" rx="2" fill="#1a1a2e" stroke="#808080" stroke-width="1.5"/><rect x="8" y="8" width="32" height="32" fill="#111"/><path d="M12 32 L12 20 L20 20 L20 28 L28 28 L28 16 L36 16" fill="none" stroke="#27C93F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="36" cy="16" r="3" fill="#27C93F"/><circle cx="34" cy="15" r="1" fill="#000"/><rect x="16" y="12" width="4" height="4" rx="1" fill="#ff3333"/></svg>`,spotify:`<svg ${I}><rect x="4" y="4" width="40" height="40" rx="20" fill="#1DB954" stroke="#808080" stroke-width="1.5"/><path d="M34 32.5c-.5 0-.8-.2-1.1-.4-6-3.7-13.6-4.5-22.5-2.5-.9.2-1.7-.4-1.9-1.2-.2-.9.4-1.7 1.2-1.9 9.8-2.3 18.3-1.3 25.1 2.9.8.4 1 1.3.5 2.1-.3.6-.8 1-1.3 1z" fill="#fff"/><path d="M36.1 26.5c-.6 0-1-.2-1.3-.6-7.1-4.4-18-5.7-25-3.6-1 .3-2-.3-2.3-1.3-.3-1 .3-2 1.3-2.3 8.3-2.5 20.3-1 28.5 4.1 1 .6 1.3 1.8.7 2.8-.5.6-1 9-1.9 9z" fill="#fff"/><path d="M38.5 20c-.7 0-1.2-.2-1.6-.7-8.2-4.9-21-6.4-28.6-4.1-1.3.4-2.6-.4-3-1.6-.4-1.3.4-2.6 1.6-3 8.9-2.7 23.3-1.1 32.7 4.5 1.2.7 1.6 2.2.9 3.4-.6 1.1-1.3 1.5-2 1.5z" fill="#fff"/></svg>`},Pt={name:"Desktop",type:"folder",icon:v.desktop,children:[{name:"About Me",type:"folder",icon:v.folder,children:[{name:"bio.txt",type:"file",icon:v.text,fileType:"text"},{name:"values.md",type:"file",icon:v.markdown,fileType:"markdown"},{name:"skills.md",type:"file",icon:v.markdown,fileType:"markdown"}]},{name:"Experience",type:"folder",icon:v.experience,children:[{name:"RWS_Group.md",type:"file",icon:v.markdown,fileType:"markdown"},{name:"Teal_ElGhazali.md",type:"file",icon:v.markdown,fileType:"markdown"},{name:"Freelance.md",type:"file",icon:v.markdown,fileType:"markdown"},{name:"SOREMED.md",type:"file",icon:v.markdown,fileType:"markdown"}]},{name:"Education",type:"folder",icon:v.folder,children:[{name:"ALX_Certificate.md",type:"file",icon:v.markdown,fileType:"markdown"},{name:"Harvard_CS50.md",type:"file",icon:v.markdown,fileType:"markdown"},{name:"1337_Bootcamp.md",type:"file",icon:v.markdown,fileType:"markdown"},{name:"Udemy_Courses.md",type:"file",icon:v.markdown,fileType:"markdown"}]},{name:"Projects",type:"folder",icon:v.projectsFolder,children:[{name:"Optician Shop Management.app",type:"file",icon:v.project,fileType:"project",appHandler:"project"},{name:"Headless-PWA-store.app",type:"file",icon:v.cloudsync,fileType:"project",appHandler:"project"},{name:"Zombie Subscriptions.app",type:"file",icon:v.dataforge,fileType:"project",appHandler:"project"},{name:"Complaints App.app",type:"file",icon:v.nebula,fileType:"project",appHandler:"project"}]},{name:"Playground",type:"folder",icon:v.playground,children:[{name:"ideas.txt",type:"file",icon:v.text,fileType:"text"},{name:".secret",type:"file",icon:v.secret,fileType:"text",hidden:!0},{name:"ascii-art.txt",type:"file",icon:v.text,fileType:"text"}]},{name:"cv.pdf",type:"file",icon:v.pdf,fileType:"pdf",appHandler:"pdf"},{name:"Trash",type:"folder",icon:v.trashFull,children:[{name:"passwords.txt",type:"file",icon:v.text,fileType:"text",easterEggMsg:"Absolutely not. PS don't store your passwords in a .txt file like EVER"},{name:"journal_2020-2022.txt",type:"file",icon:v.text,fileType:"text",easterEggMsg:"Nope. Nope. Nope."},{name:"bank_transactions_2021.csv",type:"file",icon:v.csv,fileType:"text",easterEggMsg:"Financial data is not part of the portfolio."},{name:"side_projects_roi.csv",type:"file",icon:v.csv,fileType:"text",easterEggMsg:"Some metrics hurt more than they help."}],isTrash:!0}]},Ft=[{name:"Desktop",path:"/",icon:v.desktop},{name:"About Me",path:"/About Me",icon:v.folder},{name:"Experience",path:"/Experience",icon:v.experience},{name:"Education",path:"/Education",icon:v.folder},{name:"Projects",path:"/Projects",icon:v.projectsFolder},{name:"Playground",path:"/Playground",icon:v.playground},{name:"Trash",path:"/Trash",icon:v.trashEmpty}],Ht=[{id:"finder",name:"Finder",icon:v.folderOpen,action:"app"},{id:"terminal",name:"Terminal",icon:v.terminal,action:"app"},{id:"email",name:"Mail",icon:v.mail,action:"app"},{id:"minesweeper",name:"Minesweeper",icon:v.minesweeper,action:"app"},{id:"snake",name:"Snake",icon:v.snake,action:"app"},{id:"separator"},{id:"spotify",name:"Spotify",icon:v.spotify,action:"app"},{id:"trash",name:"Trash",icon:v.trashEmpty,action:"app"}];let Pe=null;function Bt(t){Pe=t}function zt(){_t(),Wt(),De("open",Ve),De("close",Ve)}function _t(){const t=document.getElementById("dock-items");t.innerHTML="",Ht.forEach(e=>{if(e.id==="separator"){const n=document.createElement("div");n.className="dock-separator",t.appendChild(n);return}const i=document.createElement("div");i.className="dock-icon",i.dataset.appId=e.id,i.innerHTML=`
      <div class="dock-tooltip">${e.name}</div>
      <div class="dock-icon-img">${e.icon}</div>
      <div class="dock-indicator"></div>
    `,i.addEventListener("click",()=>Ot(e.id)),t.appendChild(i)})}function Ot(t){const e=ct(t);if(e){const n=document.getElementById(e);n&&n.style.display==="none"?lt(e):Q(e);return}const i=document.querySelector(`.dock-icon[data-app-id="${t}"]`);i&&(i.classList.add("bouncing"),setTimeout(()=>i.classList.remove("bouncing"),600)),Pe&&Pe(t)}function Ve(){const t=Mt();document.querySelectorAll(".dock-icon").forEach(e=>{const i=e.dataset.appId;t.has(i)?e.classList.add("running"):e.classList.remove("running")})}function Wt(){const t=document.getElementById("dock"),e=()=>t.querySelectorAll(".dock-icon");t.addEventListener("mousemove",i=>{t.getBoundingClientRect();const n=i.clientX;e().forEach(o=>{const s=o.querySelector(".dock-icon-img").getBoundingClientRect(),l=s.left+s.width/2,a=Math.abs(n-l),c=120;if(a<c){const r=1+.35*(1-a/c);o.querySelector(".dock-icon-img").style.transform=`scale(${r})`}else o.querySelector(".dock-icon-img").style.transform=""})}),t.addEventListener("mouseleave",()=>{e().forEach(i=>{i.querySelector(".dock-icon-img").style.transform=""})})}const Rt="/assets/opticina-banner-CbkGCtAp.png",qt="/assets/Headless-Store-PWA-D-IiKi4j.png",Nt="/assets/zombie-banner-mRPN_otJ.png",Ut="/assets/complaints-banner-HsIP11j2.png",Vt={"/About Me/bio.txt":`==============================================
  ABOUT ME
==============================================

Hey there! I'm Oussama Mouzgui — a passionate Full Stack Software Engineer.

I transform complex ideas into scalable, high-performance applications. 
My core expertise lies in architecting robust solutions using React.js, Node.js, 
and modern JavaScript, complemented by a solid foundation in C, PHP, and SQL. 
I am dedicated to writing clean, maintainable code, crafting responsive designs, 
and delivering exceptional user experiences.

I have successfully engineered 6+ robust web development projects, ranging from 
pixel-perfect frontend interfaces to complex fullstack platforms. I thrive on 
solving challenging technical problems, optimizing system performance, and 
crafting modern UI/UX designs that drive user engagement.

Contact: omouzgui@gmail.com
LinkedIn: linkedin.com/in/mouzgui-oussama-9b046123a/
GitHub:  github.com/mouzgui
`,"/About Me/values.md":`# My Core Values

## Turning Ideas into Digital Reality
I leverage modern frameworks to build scalable and robust applications for web and mobile.

## Crafting Beautiful UI/UX
Crafting beautiful, responsive interfaces with a focus on accessibility and performance using Tailwind CSS, Bootstrap, and modern styling tools.

## Architecture & Performance
Architecting high-performance, SEO-optimized web applications with modern fullstack patterns.

## Problem Solving
Approaching complex challenges with critical thinking and computer science fundamentals.
`,"/About Me/skills.md":`# Technical Skills

## Programming Languages
- JavaScript
- C
- Basic PHP
- SQL

## Frontend Development
- React.js
- React Native
- HTML5 & CSS3
- Tailwind CSS & Bootstrap

## Backend Development
- Node.js
- MySQL

## Tools & Core Knowledge
- Git & GitHub, Terminal & Linux
- Algorithms & Data Structures
- Problem Solving & Critical Thinking
- Responsive Web Design
- Fullstack Architecture
`,"/Experience/RWS_Group.md":`# Frontend Software Engineer
**RWS Group** | April 2025 – May 2026

- Engineered complex frontend solutions and integrated advanced AI-related features in a fully remote environment.
- Spearheaded UI improvements and streamlined development workflows, resulting in significantly enhanced web interfaces and user retention.
- Collaborated seamlessly with cross-functional, distributed teams utilizing Agile methodologies to deliver scalable software on tight deadlines.
`,"/Experience/Teal_ElGhazali.md":`# Frontend Developer Intern
**Teal ElGhazali** | 3 Months

- Engineered responsive, mobile-first web interfaces in a fast-paced startup environment.
- Contributed to modern frontend development tasks, optimizing application load times and rendering performance.
- Collaborated directly with designers and senior engineers to translate UI/UX wireframes into functional, high-quality code.
`,"/Experience/Freelance.md":`# Full Stack Web Developer
**Self-Employed** | 2023 – Present

- Architected and delivered custom websites and fullstack solutions for diverse local and international clients.
- Designed responsive UI layouts and implemented modern web applications using React.js and Node.js.
- Managed the end-to-end project lifecycle—from client requirements gathering to deployment—ensuring exceptional quality and client satisfaction.
`,"/Experience/SOREMED.md":`# Accounting Intern
**SOREMED** | 6 Months Internship

- Assisted with financial accounting and streamlined administrative tasks, showcasing strong organizational skills.
- Gained valuable professional experience in corporate operations, data management, and meticulous record-keeping.
`,"/Education/ALX_Certificate.md":`# ALX Fullstack Software Engineering
**ALX Africa** | 2021 – 2022

- Completed an intensive, project-based Fullstack Software Engineering training program.
- Gained hands-on experience in advanced software development, system architecture, and modern backend/frontend technologies.
`,"/Education/Harvard_CS50.md":`# CS50 – Introduction to Computer Science
**Harvard University** | 2020

- Mastered core computer science fundamentals, including algorithms, memory management, and data structures.
- Demonstrated strong problem-solving capabilities through rigorous programming assignments in C, Python, and SQL.
`,"/Education/1337_Bootcamp.md":`# 1337 Coding School – Pool Bootcamp
**1337 (42 Network)** | 2023

- Survived a rigorous, immersive bootcamp focused on low-level systems programming and algorithmic problem-solving.
- Enhanced critical thinking and peer-to-peer collaboration skills through complex C programming challenges.
`,"/Education/Udemy_Courses.md":`# Advanced Technical Certifications
**Udemy**

Successfully completed multiple advanced technical courses to stay at the cutting edge of web development:
- **Computer Science Fundamentals**: Deep dive into computational theory and logic.
- **Fullstack JavaScript Development**: Comprehensive training in MERN stack architecture.
- **Node.js Development**: Advanced backend API design, authentication, and database integration.
`,"/Playground/ideas.txt":`=== IDEA NOTEBOOK ===

[x] Build a Headless E-commerce Store
[x] Build a Multi-tenant SaaS App
[x] Launch a Mobile App
[ ] Explore Web3Forms Integration
[ ] Dive deeper into Three.js

=== RANDOM THOUGHTS ===

Let's build something remarkable together!
`,"/Playground/.secret":`🔮 You found the secret file!

Congratulations, you curious explorer.
Not many people dig this deep.

Here's a little secret: this entire portfolio OS
was built with vanilla JavaScript. No React,
no Vue, no frameworks. Just pure DOM manipulation,
CSS animations, and a lot of attention to detail.

— Oussama
`},Fe={"Optician Shop Management.app":{title:"Optician Shop Management.",icon:"🏢",description:"A complete multi-shop management solution for optical retail businesses, supporting multiple independent businesses, branches, staff, and inventory.",tech:["Laravel","React","TypeScript","Inertia.js"],liveUrl:"#",githubUrl:"https://github.com/mouzgui/optician-shop-managment",year:"2024",image:Rt,details:{highlights:[{title:"🏢 Multi-Shop Architecture",description:"Single installation manages multiple businesses with complete data isolation"},{title:"👓 Optical-Specific Workflows",description:"Handles the unique 'Deposit → Lab Work → Pickup' sales cycle"},{title:"📋 Prescription Management",description:"Complete spectacle and contact lens prescription tracking with expiry alerts"}],features:[{category:"👥 Customer Management",items:["Complete customer profiles","Family linking system","Prescription expiry alerts"]},{category:"💳 Point of Sale (POS)",items:["Touch-optimized interface","Split payments","Multiple payment methods"]}]}},"Headless-PWA-store.app":{title:"Headless-PWA-store.",icon:"🛒",description:"A high-performance headless e-commerce store with full PWA support, multi-theme capability, and real-time push notifications.",tech:["Next.js 15","React 19","Tailwind 4","Firebase"],liveUrl:"https://healdess-woo-store.vercel.app/",githubUrl:"#",year:"2024",image:qt,details:{highlights:[{title:"🛒 Full E-Commerce",description:"Complete shopping experience with cart, wishlist, and order tracking."},{title:"📱 PWA Ready",description:"Installable on any device with offline support for browsing products."},{title:"🔔 Push Notifications",description:"Real-time order status updates powered by Firebase Cloud Messaging."}],features:[{category:"🛍️ Shopping Experience",items:["Advanced Cart & Wishlist","Secure checkout flow","Real-time tracking"]},{category:"⚙️ Core Capabilities",items:["Offline functionality","Auto-detect Dark Mode","Full Authentication"]}]}},"Zombie Subscriptions.app":{title:"Zombie Subscriptions.",icon:"🧟",description:"A beautiful, modern subscription tracker app. Manage your recurring payments with ease and never miss a renewal.",tech:["React Native","Expo","Supabase","Lucide"],liveUrl:"https://appetize.io/app/b_mlkz4wtkvntp5cug43t2kgkhye",githubUrl:"https://github.com/mouzgui/reminder-subscriptions-app",year:"2024",image:Nt,details:{highlights:[{title:"📊 Spending Dashboard",description:"Track total monthly spending and upcoming renewal costs at a glance."},{title:"🔔 Renewal Reminders",description:"Automated push notifications to ensure you never miss a payment."},{title:"🌍 Multi-language",description:"Full support for English, French, and Arabic interfaces."}],features:[{category:"✨ App Features",items:["Beautiful UI with smooth animations","Dark/Light Mode switching","Supabase Auth"]}]}},"Complaints App.app":{title:"Union Complaint System",icon:"⚖️",description:"A robust complaint management system for union members, featuring multi-language support, real-time notifications, and automated workflows.",tech:["React","Node.js","PostgreSQL","Tailwind CSS"],liveUrl:"#",githubUrl:"#",year:"2024",image:Ut,details:{highlights:[{title:"🌍 Multi-Language Support",description:"Complete support for Arabic and French with RTL UI."},{title:"🔒 CNDP Compliance",description:"Strict data privacy features and automated consent tracking."},{title:"📱 Responsive Design",description:"Optimized for all devices including mobile-friendly data tables."}],features:[{category:"🛡️ Security",items:["Row Level Security","Two-Factor Auth","Audit Logging"]},{category:"📊 Management",items:["Admin Dashboard","Export to CSV/PDF","Real-time analytics"]}]}}};class Gt{constructor(){this.root=Pt,this.trash=this._findNode(this.root,"Trash")}resolve(e){if(!e||e==="/")return this.root;const i=e.split("/").filter(Boolean);let n=this.root;for(const o of i)if(!n.children||(n=n.children.find(s=>s.name===o),!n))return null;return n}listDir(e){const i=this.resolve(e);return!i||i.type!=="folder"?[]:i.children.filter(n=>!n.hidden)}listDirAll(e){const i=this.resolve(e);return!i||i.type!=="folder"?[]:i.children}getContent(e){return Vt[e]||`[No content available for ${e}]`}moveToTrash(e){const i=e.split("/").filter(Boolean),n=i.pop(),o="/"+i.join("/"),s=this.resolve(o||"/");if(!s||!s.children)return!1;const l=s.children.findIndex(c=>c.name===n);if(l===-1)return!1;const[a]=s.children.splice(l,1);return this.trash.children.push(a),!0}emptyTrash(){const e=this.trash.children.length;return this.trash.children=[],e}get trashCount(){return this.trash.children.length}getFileType(e){if(e.type==="folder")return"folder";if(e.fileType)return e.fileType;const i=e.name.split(".").pop().toLowerCase();return{txt:"text",md:"markdown",pdf:"pdf",app:"application",png:"image",jpg:"image",js:"code",py:"code",sh:"script"}[i]||"text"}_findNode(e,i){if(e.name===i)return e;if(e.children)for(const n of e.children){const o=this._findNode(n,i);if(o)return o}return null}findPath(e,i=this.root,n=""){const o=n?`${n}/${i.name}`:"";if(i.name===e)return o||"/";if(i.children)for(const s of i.children){const l=this.findPath(e,s,o);if(l)return l}return null}}const H=new Gt;let X=null,K=new Set;function Xt(t){X=t}function Jt(){Be(),Yt()}function Be(){const t=document.getElementById("desktop-icons");t.innerHTML="",H.listDir("/").forEach(i=>{const n=document.createElement("div");n.className="desktop-icon",n.dataset.name=i.name,n.dataset.type=i.type,n.innerHTML=`
      <div class="desktop-icon-img">${i.icon}</div>
      <span class="desktop-icon-label">${i.name}</span>
    `,n.addEventListener("dblclick",o=>{o.preventDefault(),ze(i)}),n.addEventListener("click",o=>{o.stopPropagation(),!o.ctrlKey&&!o.metaKey&&be(),Ge(n)}),n.addEventListener("contextmenu",o=>{o.preventDefault(),o.stopPropagation(),be(),Ge(n),Kt(o.clientX,o.clientY,i)}),t.appendChild(n)})}function ze(t){X&&(t.type==="folder"?t.isTrash?X("finder","/Trash"):X("finder","/"+t.name):t.fileType==="pdf"?X("pdf"):t.fileType==="project"?X("project",t.name):X("text","/"+t.name))}function Yt(){const t=document.getElementById("desktop");t.addEventListener("click",e=>{(e.target===t||e.target.id==="desktop-icons")&&(be(),N())}),t.addEventListener("contextmenu",e=>{(e.target===t||e.target===document.getElementById("desktop-icons")||e.target.id==="desktop")&&(e.preventDefault(),Qt(e.clientX,e.clientY))}),document.addEventListener("click",N),document.addEventListener("keydown",e=>{K.size!==0&&(e.key==="Enter"&&K.forEach(i=>{const n=i.dataset.name,o=H.resolve("/"+n)||H.listDir("/").find(s=>s.name===n);o&&ze(o)}),(e.key==="Delete"||e.key==="Backspace")&&(K.forEach(i=>{const n=i.dataset.name;n!=="Trash"&&H.moveToTrash("/"+n)}),be(),Be()))})}function Ge(t){t.classList.contains("selected")?(t.classList.remove("selected"),K.delete(t)):(t.classList.add("selected"),K.add(t))}function be(){K.forEach(t=>t.classList.remove("selected")),K.clear()}function Kt(t,e,i){const n=document.getElementById("context-menu");n.classList.remove("hidden"),n.style.left=t+"px",n.style.top=e+"px";const o=n.getBoundingClientRect();o.right>window.innerWidth&&(n.style.left=t-o.width+"px"),o.bottom>window.innerHeight&&(n.style.top=e-o.height+"px"),n.querySelector('[data-action="open"]').onclick=()=>{ze(i),N()},n.querySelector('[data-action="get-info"]').onclick=()=>{const{showToast:s}=require("../utils/animations.js");N()},n.querySelector('[data-action="move-to-trash"]').onclick=()=>{i.name!=="Trash"&&(H.moveToTrash("/"+i.name),Be()),N()}}function Qt(t,e){N();const i=document.getElementById("context-menu");i.classList.remove("hidden"),i.style.left=t+"px",i.style.top=e+"px",i.querySelector('[data-action="open"]').textContent="Change Wallpaper",i.querySelector('[data-action="open"]').onclick=()=>N(),i.querySelector('[data-action="get-info"]').textContent="About This Desktop",i.querySelector('[data-action="get-info"]').onclick=()=>N(),i.querySelector('[data-action="move-to-trash"]').textContent="Clean Up",i.querySelector('[data-action="move-to-trash"]').onclick=()=>N()}function N(){const t=document.getElementById("context-menu");t&&t.classList.add("hidden");const e=t==null?void 0:t.querySelector('[data-action="open"]');e&&(e.textContent="Open");const i=t==null?void 0:t.querySelector('[data-action="get-info"]');i&&(i.textContent="Get Info");const n=t==null?void 0:t.querySelector('[data-action="move-to-trash"]');n&&(n.textContent="Move to Trash")}const dt="/assets/batman-oBY-bU5F.jpg",$e={theme:"default",wallpaper:`url('${dt}')`,screensaverEnabled:!0,screensaverTimeout:5},Zt=[];function xe(){const t=localStorage.getItem("portfolio_settings");if(t)try{const e=JSON.parse(t);return e.wallpaper==="url('../walpapper/batman.jpg')"&&(e.wallpaper=$e.wallpaper),{...$e,...e}}catch(e){console.error("Failed to parse settings",e)}return{...$e}}function ie(t){const i={...xe(),...t};return localStorage.setItem("portfolio_settings",JSON.stringify(i)),ft(i.wallpaper),pt(i.theme),Zt.forEach(n=>n(i)),i}function pt(t){t&&document.documentElement.setAttribute("data-theme",t)}function ft(t){const e=document.getElementById("desktop");e&&(t.startsWith("url(")||t.startsWith("linear-gradient")||t.startsWith("radial-gradient")?(e.style.backgroundImage=t,e.style.backgroundColor="transparent"):(e.style.backgroundImage="none",e.style.backgroundColor=t))}function ei(){const t=xe();ft(t.wallpaper),pt(t.theme)}let mt=Date.now(),de=!1,we=null,J=null,ne=0,oe=0,he=2,ge=2,Le=["#ff0000","#00ff00","#0000ff","#ffff00","#00ffff","#ff00ff","#ffffff"],ve=0;function ti(){["mousemove","mousedown","keydown","touchstart"].forEach(t=>{document.addEventListener(t,ii)}),setInterval(ni,1e3)}function ii(){mt=Date.now(),de&&ai()}function ni(){const t=xe();if(!t.screensaverEnabled||de)return;const e=t.screensaverTimeout*60*1e3;Date.now()-mt>e&&oi()}function oi(){de=!0,J=document.createElement("div"),J.id="screensaver-overlay";const t=document.createElement("div");t.id="screensaver-logo",t.textContent="PORTFOLIO",t.style.color=Le[ve],J.appendChild(t),document.body.appendChild(J);const e=window.innerWidth,i=window.innerHeight;ne=Math.random()*(e-150),oe=Math.random()*(i-60),he=(Math.random()>.5?1:-1)*(1.5+Math.random()),ge=(Math.random()>.5?1:-1)*(1.5+Math.random());function n(){if(!de)return;ne+=he,oe+=ge;let o=!1;(ne+150>=window.innerWidth||ne<=0)&&(he=-he,o=!0),(oe+60>=window.innerHeight||oe<=0)&&(ge=-ge,o=!0),o&&(ve=(ve+1)%Le.length,t.style.color=Le[ve]),t.style.transform=`translate(${ne}px, ${oe}px)`,we=requestAnimationFrame(n)}n()}function ai(){de=!1,J&&(J.remove(),J=null),we&&(cancelAnimationFrame(we),we=null)}const ut=[{id:"first_boot",name:"First Boot",desc:"Booted up the OS for the first time."},{id:"desktop_explorer",name:"Desktop Explorer",desc:"Opened 5 different files or folders."},{id:"context_matters",name:"Context Matters",desc:"Read multiple files in About Me."},{id:"reference_check",name:"Reference Check",desc:"Opened the Email app."},{id:"actually_read_it",name:"Actually Read It",desc:"Opened the CV PDF."},{id:"command_line_curious",name:"Command Line Curious",desc:"Ran a command in the Terminal."},{id:"help_actually",name:"Help, Actually",desc:"Used the help command in Terminal."},{id:"trash_explorer",name:"Trash Explorer",desc:"Tried to open every file in the Trash."},{id:"first_mine",name:"First Mine",desc:"Hit a mine in Minesweeper."},{id:"clean_board",name:"Clean Board",desc:"Won a game of Minesweeper."},{id:"just_one_more",name:"Just One More",desc:"Played the same game more than once."},{id:"gamer",name:"Gamer",desc:"Played both mini-games."}];let pe=new Set,si=[],Xe=new Set,Je=new Set,Ye=new Set,Me=new Set,Ce={};const ri=["passwords.txt","journal_2020-2022.txt","bank_transactions_2021.csv","side_projects_roi.csv"];function li(){const t=localStorage.getItem("portfolio_achievements");if(t)try{const e=JSON.parse(t);pe=new Set(e)}catch{}localStorage.getItem("portfolio_has_booted")||(localStorage.setItem("portfolio_has_booted","1"),_("first_boot"))}function ci(){return ut.map(t=>({...t,unlocked:pe.has(t.id)}))}function _(t){if(pe.has(t))return;const e=ut.find(n=>n.id===t);if(!e)return;pe.add(t),di(),pi(e);const i=document.getElementById("trophy-icon");i&&(i.classList.add("achievement-pulse"),setTimeout(()=>i.classList.remove("achievement-pulse"),2e3)),si.forEach(n=>n(e))}function di(){localStorage.setItem("portfolio_achievements",JSON.stringify([...pe]))}function pi(t){const e=document.querySelector(".achievement-notification");e&&e.remove();const i=document.createElement("div");i.className="achievement-notification",i.innerHTML=`
    <div class="achievement-notif-icon">🏆</div>
    <div class="achievement-notif-text">
      <div class="achievement-notif-label">Achievement unlocked</div>
      <div class="achievement-notif-name">${t.name}</div>
    </div>
  `,i.addEventListener("click",()=>{i.remove(),st(()=>Promise.resolve().then(()=>qi),void 0).then(n=>n.openAchievements())}),document.body.appendChild(i),setTimeout(()=>{i.classList.add("fading"),setTimeout(()=>i.remove(),500)},4e3)}function fi(t){Xe.add(t),Xe.size>=5&&_("desktop_explorer"),["bio.txt","values.md","skills.md"].forEach(i=>{t.includes(i)&&Je.add(i)}),Je.size>=2&&_("context_matters")}function mi(t){Ye.add(t),ri.every(e=>Ye.has(e))&&_("trash_explorer")}function ui(){_("reference_check")}function hi(){_("actually_read_it")}function gi(){_("command_line_curious")}function vi(){_("help_actually")}function yi(){_("first_mine"),_e("minesweeper")}function wi(){_("clean_board"),_e("minesweeper")}function _e(t){Me.add(t),Ce[t]=(Ce[t]||0)+1,Ce[t]>1&&_("just_one_more"),Me.has("minesweeper")&&Me.has("snake")&&_("gamer")}function bi(){_e("snake")}const Ke=["Mrhba bik! 🧙 Ana l'wizard dyalk, hover 3liya w nwrik kolchi!","Ftech f About Me 📁 bach t3rf chkoun ana w chnou kandir!","Sir l Projects 🚀 w chouf chnou bniit b yeddiya!","3ndi Experience folder 💼 fih khedmati kolha, ftech w chouf!","Chouf Education 🎓 dyali, ghadi t3jbek!","Wrk 3la ☰ li fo9 3la liser, fih Settings bach tbddel theme wla wallpaper! 🎨","Jerreb Terminal ⌨️ kteb 'help' bach tchouf l'commands li kaynin!","Bghi tsiftli message? 📧 Click 3la Mail f'dock!","Sme3 muzika 🎵 click 3la Spotify f'dock w nta kat'explori!","Ila mlliti, l3ab chi game 🎮 f'dock, 3ndi Minesweeper w Snake!","Chouf 🏆 fo9 3la limen, fih achievements secrets!","CV dyali 📄 kayn f Desktop, click 3lih!"],Qe=["feen albatal? 🏃‍♂️","ta tla9 mni? ra rjli hadik! 😤","khooya tla9 mni! 🙏","achbghiti 3ndi? 😂","waaaah tban lia mn hadok li kaydwiw m3a l'écran 👀","sir chouf CV dyali, machi ana! 📄","wa ntaya, wach baghi t5dm m3aya? 🤝","ana developer machi souris! 🖱️","3tini break gha 3yit! 😩","wa chkoun nta bach t'hoverini? 😂","ana sahir d'code, machi wizard 3adi! 🧙","abracadabra... deployiiit! 🚀","gha sir l Projects, tema feen l'magic! ✨","wach 3jbek l'portfolio? ila 3jbek hire me! 😎","click 3la chi haja, matb9ach gha tstari fiya! 🖱️","ra ana gha pixel, matkhlaa3ch! 😅","ntaya zwin hit jawbti 3la l'wizard 🫶"];let F=null,z=null,re=null,Y=0,U=0,ht=0,gt=0,Oe=!1,Te=0,Ze=0,ye=0,He=null;function ki(){re=document.createElement("div"),re.id="mascot-trails",re.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:799;overflow:hidden;",document.getElementById("desktop-environment").appendChild(re),F=document.createElement("div"),F.id="desktop-mascot",F.innerHTML=Mi(),document.getElementById("desktop-environment").appendChild(F),z=document.createElement("div"),z.id="mascot-bubble",z.classList.add("mascot-bubble"),document.getElementById("desktop-environment").appendChild(z),Y=window.innerWidth-120,U=window.innerHeight-180,F.style.left=Y+"px",F.style.top=U+"px",We(),F.addEventListener("mouseenter",et),F.addEventListener("mouseleave",xi),F.addEventListener("click",et),vt()}function We(){ht=80+Math.random()*(window.innerWidth-160-40),gt=50+Math.random()*(window.innerHeight-200)}function vt(){if(!Oe){Te++,Ze++;const t=ht-Y,e=gt-U,i=Math.sqrt(t*t+e*e);if(i>3){const o=Math.min(2.8,Math.max(.8,i*.015));Y+=t/i*o,U+=e/i*o}else Te%120===0&&We();Math.abs(t)>1&&(F.style.transform=t<0?"scaleX(-1)":"scaleX(1)"),F.style.left=Y+"px",F.style.top=U+"px";const n=Math.sin(Te*.08)*3;F.style.marginTop=n+"px",i>4&&Ze%6===0&&Li(Y+18,U+35)}requestAnimationFrame(vt)}function et(){Oe=!0,F.classList.add("paused"),He&&clearTimeout(He);const t=Ei();Si(t)}function xi(){Oe=!1,F.classList.remove("paused"),He=setTimeout(()=>{$i(),We()},600)}function Ei(){if(ye<Ke.length){const t=Ke[ye];return ye++,t}else return ye++,Qe[Math.floor(Math.random()*Qe.length)]}function Si(t){z.textContent=t,z.getBoundingClientRect();let e=Y+20-120,i=U-60;e=Math.max(8,Math.min(e,window.innerWidth-260)),i<10?(i=U+58,z.classList.add("below")):z.classList.remove("below"),z.style.left=e+"px",z.style.top=i+"px",z.classList.add("visible")}function $i(){z.classList.remove("visible")}function Li(t,e){const i=document.createElement("div");i.className="mascot-trail-particle",i.style.left=t+(Math.random()-.5)*10+"px",i.style.top=e+(Math.random()-.5)*6+"px";const n=["✦","✧","⋆","˚","∗","·"];i.textContent=n[Math.floor(Math.random()*n.length)],re.appendChild(i),setTimeout(()=>i.remove(),800)}function Mi(){return`<svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Wizard Hat -->
    <polygon points="20,0 8,18 32,18" fill="#5b21b6"/>
    <polygon points="20,0 14,18 26,18" fill="#7c3aed"/>
    <ellipse cx="20" cy="18" rx="14" ry="3" fill="#5b21b6"/>
    <text x="18" y="14" font-size="7" fill="#fbbf24">★</text>
    <!-- Face -->
    <rect x="12" y="18" width="16" height="12" rx="5" fill="#e8c39e"/>
    <!-- Eyes -->
    <circle cx="17" cy="24" r="2" fill="#7c3aed">
      <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="23" cy="24" r="2" fill="#7c3aed">
      <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="17" cy="23.5" r="0.8" fill="#fff"/>
    <circle cx="23" cy="23.5" r="0.8" fill="#fff"/>
    <!-- Beard -->
    <path d="M14 28 Q16 36 20 38 Q24 36 26 28" fill="#d1d5db"/>
    <path d="M16 30 Q18 35 20 36 Q22 35 24 30" fill="#e5e7eb"/>
    <!-- Robe -->
    <path d="M10 30 L8 50 L32 50 L30 30 Z" fill="#5b21b6"/>
    <path d="M14 30 L12 50 L28 50 L26 30 Z" fill="#7c3aed"/>
    <rect x="12" y="34" width="16" height="2" rx="1" fill="#fbbf24"/>
    <!-- Staff -->
    <rect x="32" y="22" width="2.5" height="26" rx="1" fill="#92400e"/>
    <circle cx="33.25" cy="20" r="4" fill="#a78bfa" opacity="0.8">
      <animate attributeName="r" values="3.5;4.5;3.5" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="33.25" cy="20" r="2" fill="#c4b5fd">
      <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite"/>
    </circle>
    <!-- Left hand -->
    <circle cx="8" cy="38" r="3" fill="#e8c39e"/>
    <!-- Feet -->
    <rect x="10" y="48" width="8" height="4" rx="2" fill="#3b0764"/>
    <rect x="22" y="48" width="8" height="4" rx="2" fill="#3b0764"/>
  </svg>`}function V(t,e=3e3){const i=document.getElementById("toast-container"),n=document.createElement("div");n.className="toast",n.textContent=t,i.appendChild(n),setTimeout(()=>{n.classList.add("removing"),n.addEventListener("animationend",()=>n.remove())},e)}function ke(){const t=document.createElement("div");t.className="confetti-container",document.body.appendChild(t);const e=["#FF5F57","#FFBD2E","#27C93F","#007AFF","#5856D6","#FF9500"];for(let i=0;i<60;i++){const n=document.createElement("div");n.className="confetti-piece",n.style.left=Math.random()*100+"%",n.style.background=e[Math.floor(Math.random()*e.length)],n.style.animationDelay=Math.random()*1.5+"s",n.style.animationDuration=2+Math.random()*2+"s",n.style.borderRadius=Math.random()>.5?"50%":"2px",n.style.width=4+Math.random()*8+"px",n.style.height=4+Math.random()*8+"px",t.appendChild(n)}setTimeout(()=>t.remove(),5e3)}function Ci(){const t=document.querySelector(".matrix-rain");if(t){t.remove();return}const e=document.createElement("div");e.className="matrix-rain";const i=document.createElement("canvas");e.appendChild(i),document.body.appendChild(e);const n=i.getContext("2d");i.width=window.innerWidth,i.height=window.innerHeight;const o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()",s=14,l=Math.floor(i.width/s),a=Array(l).fill(1);function c(){n.fillStyle="rgba(0, 0, 0, 0.05)",n.fillRect(0,0,i.width,i.height),n.fillStyle="#0f0",n.font=s+"px monospace";for(let d=0;d<a.length;d++){const h=o[Math.floor(Math.random()*o.length)];n.fillText(h,d*s,a[d]*s),a[d]*s>i.height&&Math.random()>.975&&(a[d]=0),a[d]++}}const r=setInterval(c,35);e._interval=r,setTimeout(()=>{clearInterval(r),e.style.transition="opacity 1s ease",e.style.opacity="0",setTimeout(()=>e.remove(),1e3)},1e4)}let le=null;function Ti(t){le=t}function tt(t="/"){const{id:e,body:i}=W("finder","Finder","",{width:780,height:500});let n=t,o=[t],s=0;function l(){const r=n==="/"?H.listDir("/"):H.listDir(n),d=n.split("/").filter(Boolean);i.innerHTML=`
      <div class="finder-container">
        <div class="finder-sidebar">
          <div class="finder-sidebar-section">
            <div class="finder-sidebar-title">Favorites</div>
            ${Ft.map(u=>`
              <div class="finder-sidebar-item ${n===u.path?"active":""}" data-path="${u.path}">
                <span class="sidebar-icon">${u.icon}</span>
                <span>${u.name}</span>
              </div>
            `).join("")}
          </div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;">
          <div class="finder-toolbar">
            <button class="finder-nav-btn" id="finder-back-${e}" ${s<=0?"disabled":""}>◀</button>
            <button class="finder-nav-btn" id="finder-fwd-${e}" ${s>=o.length-1?"disabled":""}>▶</button>
            <div class="finder-breadcrumbs">
              <span class="finder-breadcrumb ${d.length===0?"current":""}" data-path="/">Desktop</span>
              ${d.map((u,T)=>{const x="/"+d.slice(0,T+1).join("/");return`<span class="finder-breadcrumb-sep">›</span>
                        <span class="finder-breadcrumb ${T===d.length-1?"current":""}" data-path="${x}">${u}</span>`}).join("")}
            </div>
          </div>
          <div class="finder-content">
            ${r.length===0?`
              <div class="finder-empty">
                <div class="finder-empty-icon" style="width: 64px; height: 64px;">${v.folderOpen}</div>
                <div>This folder is empty</div>
              </div>
            `:`
              <div class="finder-grid">
                ${r.map(u=>`
                  <div class="finder-item" data-name="${u.name}" data-type="${u.type}">
                    <div class="finder-item-icon">${u.icon}</div>
                    <div class="finder-item-name">${u.name}</div>
                  </div>
                `).join("")}
              </div>
            `}
          </div>
        </div>
      </div>
    `;const h=d.length?d[d.length-1]:"Desktop";Ct(e,h),c()}function a(r){n=r,o=o.slice(0,s+1),o.push(r),s=o.length-1,l()}function c(){i.querySelectorAll(".finder-sidebar-item").forEach(h=>{h.addEventListener("click",()=>a(h.dataset.path))});const r=i.querySelector(`#finder-back-${e}`),d=i.querySelector(`#finder-fwd-${e}`);r&&r.addEventListener("click",()=>{s>0&&(s--,n=o[s],l())}),d&&d.addEventListener("click",()=>{s<o.length-1&&(s++,n=o[s],l())}),i.querySelectorAll(".finder-breadcrumb").forEach(h=>{h.addEventListener("click",()=>a(h.dataset.path))}),i.querySelectorAll(".finder-item").forEach(h=>{h.addEventListener("click",()=>{i.querySelectorAll(".finder-item").forEach(u=>u.classList.remove("selected")),h.classList.add("selected")}),h.addEventListener("dblclick",()=>{const u=h.dataset.name,T=h.dataset.type,x=n==="/"?"/"+u:n+"/"+u;if(T==="folder")a(x);else{const f=H.resolve(x);if(f){if(fi(x),f.easterEggMsg){mi(u),V(f.easterEggMsg);return}le&&(f.fileType==="pdf"?le("pdf"):f.fileType==="project"?le("project",u):le("text",x))}}})})}return l(),e}let O=null;function Ai(t){O=t}function Ii(){const{id:t,body:e}=W("terminal","Terminal","",{width:680,height:440});let i=[],n=-1,o="~";const s=`
 ┌─────────────────────────────────────────────┐
 │  ╔═╗╔═╗╦═╗╔╦╗╔═╗╔═╗╦  ╦╔═╗  ╔═╗╔═╗       │
 │  ╠═╝║ ║╠╦╝ ║ ╠╣ ║ ║║  ║║ ║  ║ ║╚═╗       │
 │  ╩  ╚═╝╩╚═ ╩ ╚  ╚═╝╩═╝╩╚═╝  ╚═╝╚═╝       │
 │                                             │
 │  Welcome to PortfolioOS Terminal v1.0       │
 │  Type 'help' to see available commands.     │
 └─────────────────────────────────────────────┘`;e.innerHTML=`
    <div class="terminal-container">
      <div class="terminal-output" id="term-out-${t}">
        <div class="terminal-line ascii">${s.replace(/\n/g,"<br>")}</div>
        <div class="terminal-line output" style="margin-top:8px;color:#666">Last login: ${new Date().toLocaleString()}</div>
      </div>
      <div class="terminal-input-area">
        <span class="prompt">oussama@portfolio</span><span class="prompt-path">:${o}$&nbsp;</span>
        <input class="terminal-input" id="term-in-${t}" type="text" autofocus autocomplete="off" spellcheck="false" />
      </div>
    </div>
  `;const l=e.querySelector(`#term-out-${t}`),a=e.querySelector(`#term-in-${t}`);e.querySelector(".terminal-container").addEventListener("click",()=>a.focus()),a.addEventListener("keydown",f=>{if(f.key==="Enter"){const $=a.value.trim();$&&(i.push($),n=i.length),c($),$&&T($),a.value=""}else f.key==="ArrowUp"?(f.preventDefault(),n>0&&(n--,a.value=i[n])):f.key==="ArrowDown"?(f.preventDefault(),n<i.length-1?(n++,a.value=i[n]):(n=i.length,a.value="")):f.key==="Tab"&&(f.preventDefault(),u())}),setTimeout(()=>a.focus(),100);function c(f){const $=document.createElement("div");$.className="terminal-line",$.innerHTML=`<span class="prompt">oussama@portfolio</span><span class="prompt-path">:${o}$</span> <span class="command">${x(f)}</span>`,l.appendChild($)}function r(f,$="output"){const C=document.createElement("div");C.className=`terminal-line ${$}`,C.innerHTML=f,l.appendChild(C),l.scrollTop=l.scrollHeight}function d(f){if(!f)return o==="~"?"/":o;let $=o==="~"?"/":o;if(f.startsWith("/")?($="/",f=f.substring(1)):f.startsWith("~")&&($="/",f=f.substring(1),f.startsWith("/")&&(f=f.substring(1))),!f)return $;const C=$.split("/").filter(Boolean),y=f.split("/").filter(Boolean);for(const A of y)A!=="."&&(A===".."?C.pop():C.push(A));return"/"+C.join("/")}const h=["help","about","projects","skills","open","ls","cd","pwd","cat","whoami","clear","cv","email","minesweeper","easter_eggs","matrix","exit","sudo","rm","neofetch"];function u(){const f=a.value;if(!f)return;if(!f.trim().includes(" ")){const C=f.trim().toLowerCase(),y=h.filter(A=>A.startsWith(C));y.length===1?a.value=y[0]+" ":y.length>1&&(c(f),r(y.join("    "),"output"))}else{let C=!1,y=-1;for(let L=0;L<f.length;L++)(f[L]==='"'||f[L]==="'")&&(C=!C),f[L]===" "&&!C&&(y=L);const A=f.substring(0,y+1);let k=f.substring(y+1);const m=k.startsWith('"')||k.startsWith("'");m&&(k=k.replace(/["']/g,""));const g=k.lastIndexOf("/");let p="",w=k;g!==-1&&(p=k.substring(0,g),w=k.substring(g+1));const b=d(p),E=H.listDirAll(b);if(!E)return;const M=E.filter(L=>L.name.toLowerCase().startsWith(w.toLowerCase()));if(M.length===1){let L=M[0].name,P=p?p+"/"+L:L;(P.includes(" ")||m)&&(P='"'+P+'"'),a.value=A+P+(M[0].type==="folder"?"/":" ")}else if(M.length>1){c(f);const L=M.map(P=>{const Ee=P.type==="folder"?"#007AFF":"#c0c0c0",me=P.type==="folder"?"/":"";return`<span style="color:${Ee}">${P.name}${me}</span>`}).join("    ");r(L,"output")}}}function T(f){const C=f.trim().split(/\s+/)[0].toLowerCase();let y=f.substring(C.length).trim();switch((y.startsWith('"')&&y.endsWith('"')||y.startsWith("'")&&y.endsWith("'"))&&(y=y.slice(1,-1)),gi(),C){case"help":vi(),r(`
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
</table>`,"output");break;case"about":r(`
<strong style="color:#f0f0f0">Oussama Mouzgui</strong> — Next.js & Full Stack Specialist
<span style="color:#666">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
I transform complex ideas into scalable, high-performance applications.
My core expertise lies in the Next.js, React, and Node.js ecosystem,
complemented by a solid foundation in Laravel, Python, and TypeScript.

📍 Morocco
📧 omouzgui@gmail.com
🔗 github.com/mouzgui`,"output");break;case"projects":let A=`
`;Object.entries(Fe).forEach(([k,m])=>{A+=`${m.icon}  <strong style="color:#f0f0f0">${m.title}</strong> (${m.year})
   ${m.tech.slice(0,3).join(", ")}

`}),A+='Type <span style="color:var(--accent)">open &lt;project name&gt;</span> to view details.',r(A,"output");break;case"skills":r(`
<strong style="color:#f0f0f0">Technical Skills</strong>
<span style="color:#666">━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<strong style="color:#007AFF">Languages:</strong>  JavaScript/TypeScript, PHP, Python
<strong style="color:#27C93F">Frontend:</strong>   Next.js, React.js, Tailwind CSS
<strong style="color:#FFBD2E">Backend:</strong>    Node.js, Laravel, Supabase, Firebase
<strong style="color:#FF5F57">Databases:</strong>  MySQL, PostgreSQL
<strong style="color:#5856D6">Other:</strong>      React Native, Expo, Headless Commerce`,"output");break;case"whoami":r("oussama — Next.js & Full Stack Specialist","success");break;case"clear":l.innerHTML="";break;case"pwd":r(o==="~"?"/":o,"output");break;case"cd":{if(!y){o="~";break}const k=d(y),m=H.resolve(k);m?m.type!=="folder"?r(`cd: ${y}: Not a directory`,"error"):o=k==="/"?"~":k:r(`cd: ${y}: No such file or directory`,"error");break}case"ls":{const k=d(y),m=k==="/"?"/":k,g=H.listDirAll(m);if(!g||g.length===0)r(`ls: ${y||(o==="~"?"/":o)}: No such file or directory`,"error");else{const p=g.map(w=>{const b=w.type==="folder"?"#007AFF":"#c0c0c0",E=w.type==="folder"?"/":"";return`<span style="color:${b}">${w.name}${E}</span>`}).join("    ");r(p,"output")}break}case"cat":{if(!y){r("cat: missing file operand","error");break}const k=d(y),m=H.getContent(k);m.startsWith("[No content")?r(`cat: ${y}: No such file`,"error"):r(`<pre style="white-space:pre-wrap">${x(m)}</pre>`,"output");break}case"open":{if(!y){r("open: missing argument. Try: open finder, open terminal, open email, open minesweeper","error");break}const k=y.toLowerCase();if(["finder","terminal","email","mail","minesweeper","pdf","cv"].includes(k))O&&O(k==="mail"?"email":k==="cv"?"pdf":k),r(`Opening ${k}...`,"success");else{const m=Object.entries(Fe).find(([g,p])=>p.title.toLowerCase()===k||g.toLowerCase().includes(k));m&&O?(O("project",m[0]),r(`Opening ${m[1].title}...`,"success")):r(`open: ${y}: not found. Try 'help' for available commands.`,"error")}break}case"cv":O&&O("pdf"),r("Opening CV...","success");break;case"email":O&&O("email"),r("Opening Mail...","success");break;case"minesweeper":O&&O("minesweeper"),r("💣 Launching Minesweeper...","success");break;case"matrix":r("Initiating Matrix rain...","success"),Ci();break;case"sudo":y.toLowerCase().includes("hire me")?(r("🎉 HIRE_ME process initiated with elevated privileges!","success"),r("Sending resume to all tech companies...","info"),r("Just kidding. But seriously, let's talk! 📧 omouzgui@gmail.com","output"),ke()):r("sudo: nice try, but this is a portfolio, not a server 😄","info");break;case"rm":y.includes("-rf")?(r("Nice try! 😈 This portfolio is indestructible.","error"),r("But I appreciate the hacker energy.","info")):r("rm: command not supported in portfolio mode","error");break;case"easter_eggs":case"easter-eggs":case"eastereggs":r(`
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
Happy exploring! 🔍`,"output");break;case"neofetch":r(`
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
                      <strong>Memory:</strong> As much as Chrome allows`,"output");break;case"exit":r("Closing terminal...","info"),setTimeout(()=>{const{closeWindow:k}=require("../core/windowManager.js")},500);break;case"date":r(new Date().toString(),"output");break;case"pwd":r(o==="~"?"/home/oussama":o,"output");break;case"echo":r(y||"","output");break;case"42":r("The answer to life, the universe, and everything.","success"),r("You found an easter egg! 🥚","info"),ke();break;default:r(`command not found: ${C}. Type 'help' for available commands.`,"error")}l.scrollTop=l.scrollHeight}function x(f){const $=document.createElement("div");return $.textContent=f,$.innerHTML}return t}const ae=[{id:1,sender:"Oussama Mouzgui",email:"omouzgui@gmail.com",role:"Full Stack Developer",subject:"Welcome to my Portfolio OS! 👋",date:"Today",unread:!0,avatarColor:"#7c3aed",body:`Hey there!

Welcome to my interactive Portfolio OS. Thanks for taking the time to explore it — I built this entire experience from scratch using vanilla JavaScript, CSS, and Vite.

Feel free to browse around:
• Check out my Projects to see what I've built
• Open the Finder to explore my files
• Play some games if you need a break!

If you'd like to work together or have any questions, hit the "Compose" button and send me a real email.

Looking forward to hearing from you!

Best,
Oussama Mouzgui
Full Stack Software Engineer`},{id:2,sender:"GitHub Notifications",email:"noreply@github.com",role:"GitHub",subject:"New star on your repository: portfolio-os",date:"May 15, 2026",unread:!0,avatarColor:"#24292e",body:`Hi Oussama,

Someone just starred your repository portfolio-os! 🌟

Your project is gaining traction. Keep up the great work!

Repository: mouzgui/portfolio-os
Stars: Growing!
Language: JavaScript

— GitHub`},{id:3,sender:"ALX Africa",email:"no-reply@alx.com",role:"ALX Software Engineering",subject:"Congratulations on completing your Fullstack SE program!",date:"Dec 20, 2022",unread:!1,avatarColor:"#e63946",body:`Dear Oussama,

Congratulations on successfully completing the ALX Fullstack Software Engineering program! 🎓

Over the past year, you've demonstrated exceptional dedication to mastering software development, system design, and problem-solving skills. Your hard work and commitment to growth have set you apart.

We're proud to have you as part of the ALX alumni network. Keep building, keep learning, and keep pushing boundaries.

Your certificate is now available for download.

Best regards,
The ALX Team`},{id:4,sender:"Freelance Client",email:"client@project.com",role:"Project Owner",subject:"Re: Website delivery — Looks great!",date:"Mar 8, 2025",unread:!1,avatarColor:"#2a9d8f",body:`Hi Oussama,

Just wanted to confirm — the website looks fantastic! Everything is responsive and the animations are smooth. The client is very happy with the final result.

We'll definitely reach out again for future projects. Thanks for delivering on time and being so easy to work with.

Regards,
A satisfied client`},{id:5,sender:"Harvard CS50",email:"cs50@harvard.edu",role:"Harvard University",subject:"This was CS50! Certificate of completion",date:"Jun 15, 2020",unread:!1,avatarColor:"#a51c30",body:`Dear Oussama,

Congratulations! You have successfully completed CS50: Introduction to Computer Science.

Throughout this course, you've explored:
• Algorithms and data structures
• Memory management and low-level programming in C
• Web development with Python, SQL, and JavaScript
• Problem-solving and computational thinking

"This was CS50!" 🎉

We hope you continue to explore computer science and build amazing things.

Best,
David J. Malan & the CS50 Team
Harvard University`}];function ji(){ui();const{id:t,body:e}=W("email","Mail","",{width:850,height:520});let i="inbox",n=null;function o(){const l=i==="inbox"?ae:[],a=n?ae.find(c=>c.id===n):null;e.innerHTML=`
      <div class="email-container">
        <div class="email-sidebar">
          <button class="email-compose-btn" id="email-compose-${t}">
            <div style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:4px;">${v.text}</div>
            Compose
          </button>
          <div class="email-folder active" data-folder="inbox">
            <span class="email-folder-icon" style="display:inline-block;width:16px;height:16px;">${v.mail}</span>
            <span>Inbox</span>
            <span class="email-folder-badge">${ae.filter(c=>c.unread).length}</span>
          </div>
          <div class="email-folder" data-folder="sent">
            <span class="email-folder-icon" style="display:inline-block;width:16px;height:16px;">${v.mail}</span>
            <span>Sent</span>
          </div>
          <div class="email-folder" data-folder="drafts">
            <span class="email-folder-icon" style="display:inline-block;width:16px;height:16px;">${v.text}</span>
            <span>Drafts</span>
          </div>
          <div class="email-folder" data-folder="starred">
            <span class="email-folder-icon" style="display:inline-block;width:16px;height:16px;">${v.secret}</span>
            <span>Starred</span>
          </div>
        </div>

        <div class="email-list">
          ${l.map(c=>`
            <div class="email-list-item ${c.unread?"unread":""} ${n===c.id?"active":""}" data-id="${c.id}">
              <div class="email-item-header">
                <span class="email-item-sender">
                  ${c.unread?'<span class="email-unread-dot"></span>':""}
                  ${c.sender}
                </span>
                <span class="email-item-date">${c.date}</span>
              </div>
              <div class="email-item-subject">${c.subject}</div>
              <div class="email-item-preview">${c.body.substring(0,80).replace(/\n/g," ")}...</div>
            </div>
          `).join("")}
        </div>

        <div class="email-detail">
          ${a?`
            <div class="email-detail-header">
              <div class="email-detail-subject">${a.subject}</div>
              <div class="email-detail-meta">
                <div class="email-avatar" style="background:${a.avatarColor}">
                  ${a.sender.charAt(0)}
                </div>
                <div class="email-detail-sender-info">
                  <div class="email-detail-sender">${a.sender}</div>
                  <div class="email-detail-address">${a.email} — ${a.role}</div>
                </div>
                <div class="email-detail-date">${a.date}</div>
              </div>
            </div>
            <div class="email-detail-body">
              ${a.body.split(`

`).map(c=>`<p>${c.replace(/\n/g,"<br>")}</p>`).join("")}
            </div>
          `:`
            <div class="email-empty">Select an email to read</div>
          `}
        </div>
      </div>
    `,s()}function s(){e.querySelectorAll(".email-list-item").forEach(a=>{a.addEventListener("click",()=>{n=parseInt(a.dataset.id),o()})});const l=e.querySelector(`#email-compose-${t}`);l&&l.addEventListener("click",()=>{window.location.href="mailto:omouzgui@gmail.com?subject=Hello Oussama!&body=I saw your awesome portfolio OS and wanted to reach out.",V("📧 Opening your email client to contact Oussama...")}),e.querySelectorAll(".email-folder").forEach(a=>{a.addEventListener("click",()=>{i=a.dataset.folder,n=null,o()})})}return o(),ae.length>0&&(n=ae[0].id,o()),t}const it="/assets/advanced%20%20oussama%20mouzgui-BYbnh__L.pdf";function Di(){hi();const{id:t,body:e}=W("pdf","cv.pdf","",{width:800,height:600});return e.innerHTML=`
    <div class="pdf-viewer" style="height: 100%; display: flex; flex-direction: column;">
      <div class="pdf-toolbar" style="display: flex; justify-content: space-between; padding: 8px 16px; background: rgba(35, 35, 35, 0.9); border-bottom: 1px solid var(--border);">
        <div style="color: var(--text-secondary); font-size: 14px;">Oussama Mouzgui - Resume</div>
        <button class="pdf-download-btn" id="pdf-download-${t}" style="padding: 6px 16px; background: var(--accent); color: #fff; border-radius: 4px; font-weight: 600;">⬇ Download CV</button>
      </div>
      <div class="pdf-content" style="flex: 1; overflow: hidden; margin: 0; padding: 0;">
        <iframe src="${it}" width="100%" height="100%" style="border: none;"></iframe>
      </div>
    </div>
  `,e.querySelector(`#pdf-download-${t}`).addEventListener("click",()=>{window.open(it,"_blank")}),t}function Pi(t){const e=t.split("/").filter(Boolean),i=e[e.length-1],n=H.getContent(t),o=i.endsWith(".md"),{id:s,body:l}=W("text",i,"",{width:600,height:450});return o?l.innerHTML=`<div class="text-viewer">${Fi(n)}</div>`:l.innerHTML=`<div class="text-viewer monospace">${yt(n)}</div>`,s}function Fi(t){let e=yt(t);return e=e.replace(/^### (.+)$/gm,"<h3>$1</h3>"),e=e.replace(/^## (.+)$/gm,"<h2>$1</h2>"),e=e.replace(/^# (.+)$/gm,"<h1>$1</h1>"),e=e.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),e=e.replace(/\*(.+?)\*/g,"<em>$1</em>"),e=e.replace(/`(.+?)`/g,"<code>$1</code>"),e=e.replace(/^&gt; (.+)$/gm,"<blockquote>$1</blockquote>"),e=e.replace(/^- (.+)$/gm,"<li>$1</li>"),e=e.replace(/((?:<li>.*<\/li>\n?)+)/g,"<ul>$1</ul>"),e=e.replace(/\n\n/g,"</p><p>"),e="<p>"+e+"</p>",e=e.replace(/<p>\s*<\/p>/g,""),e=e.replace(/<p>(<h[1-3]>)/g,"$1"),e=e.replace(/(<\/h[1-3]>)<\/p>/g,"$1"),e=e.replace(/<p>(<ul>)/g,"$1"),e=e.replace(/(<\/ul>)<\/p>/g,"$1"),e=e.replace(/<p>(<blockquote>)/g,"$1"),e=e.replace(/(<\/blockquote>)<\/p>/g,"$1"),e}function yt(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}function Hi(t){var u,T;const e=Fe[t];if(!e){V(`Project "${t}" not found.`);return}const i=window.innerWidth,n=window.innerHeight,o=Math.min(850,i-80),s=Math.min(700,n-100),l=Math.max(20,(i-o)/2),a=Math.max(36,(n-s)/2),{id:c,body:r}=W("project",e.title,"",{width:o,height:s,x:l,y:a}),d=(u=e.details)!=null&&u.highlights?`
    <div class="project-section">
      <h3 class="project-section-title">✨ Key Highlights</h3>
      <div class="project-highlights">
        ${e.details.highlights.map(x=>`
          <div class="highlight-item">
            <div class="highlight-title">${x.title}</div>
            <div class="highlight-desc">${x.description}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `:"",h=(T=e.details)!=null&&T.features?`
    <div class="project-section">
      <h3 class="project-section-title">⚙️ Core Features</h3>
      <div class="project-features">
        ${e.details.features.map(x=>`
          <div class="feature-category">
            <div class="feature-category-title">${x.category}</div>
            <ul class="feature-list">
              ${x.items.map(f=>`<li>${f}</li>`).join("")}
            </ul>
          </div>
        `).join("")}
      </div>
    </div>
  `:"";return r.innerHTML=`
    <div class="project-preview">
      <div class="project-hero">
        <img src="${e.image}" alt="${e.title} Banner" class="project-hero-img" />
      </div>

      <div class="project-header">
        <div class="project-title">${e.title}</div>
        <div class="project-links">
          ${e.liveUrl!=="#"?`<button class="project-link-btn primary" data-url="${e.liveUrl}">🔗 Live Demo</button>`:""}
          ${e.githubUrl!=="#"?`<button class="project-link-btn" data-url="${e.githubUrl}">⭐ GitHub</button>`:""}
        </div>
      </div>

      <div class="project-meta">
        ${e.tech.map(x=>`<span class="project-tag">${x}</span>`).join("")}
        <span class="project-tag" style="color:var(--accent);border-color:var(--accent-subtle)">${e.year}</span>
      </div>

      <div class="project-description" style="font-size: 16px; margin-bottom: 24px;">${e.description}</div>

      ${d}
      ${h}
    </div>
  `,r.querySelectorAll(".project-link-btn").forEach(x=>{x.addEventListener("click",()=>{window.open(x.dataset.url,"_blank")})}),c}const G={easy:{rows:9,cols:9,mines:10,label:"Easy"},medium:{rows:16,cols:16,mines:40,label:"Medium"},hard:{rows:16,cols:30,mines:99,label:"Hard"}};function Bi(){const{id:t,body:e}=W("minesweeper","Minesweeper","",{width:520,height:560});let i="easy",n=[],o=[],s=[],l=!1,a=!1,c=!0,r=0,d=0,h=0,u=null;function T(){const m=G[i];n=[],o=[],s=[],l=!1,a=!1,c=!0,r=m.mines,d=0,h=0,u&&clearInterval(u),u=null;for(let g=0;g<m.rows;g++){n[g]=[],o[g]=[],s[g]=[];for(let p=0;p<m.cols;p++)n[g][p]=0,o[g][p]=!1,s[g][p]=!1}y()}function x(m,g){const p=G[i];let w=0;for(;w<p.mines;){const b=Math.floor(Math.random()*p.rows),E=Math.floor(Math.random()*p.cols);Math.abs(b-m)<=1&&Math.abs(E-g)<=1||n[b][E]!==-1&&(n[b][E]=-1,w++)}for(let b=0;b<p.rows;b++)for(let E=0;E<p.cols;E++){if(n[b][E]===-1)continue;let M=0;f(b,E,(L,P)=>{n[L][P]===-1&&M++}),n[b][E]=M}}function f(m,g,p){const w=G[i];for(let b=-1;b<=1;b++)for(let E=-1;E<=1;E++){if(b===0&&E===0)continue;const M=m+b,L=g+E;M>=0&&M<w.rows&&L>=0&&L<w.cols&&p(M,L)}}function $(m,g){const p=G[i];if(!(m<0||m>=p.rows||g<0||g>=p.cols)&&!(o[m][g]||s[m][g])){if(o[m][g]=!0,n[m][g]===-1){l=!0,yi(),u&&clearInterval(u);for(let w=0;w<p.rows;w++)for(let b=0;b<p.cols;b++)n[w][b]===-1&&(o[w][b]=!0);y();return}n[m][g]===0&&f(m,g,(w,b)=>$(w,b)),C()}}function C(){const m=G[i];let g=0;for(let p=0;p<m.rows;p++)for(let w=0;w<m.cols;w++)o[p][w]||g++;g===m.mines&&(a=!0,l=!0,wi(),u&&clearInterval(u),y())}function y(){const m=G[i],g=l?a?"😎":"💀":"😊";if(i==="hard"){const p=document.getElementById(t);p&&(p.style.width="900px",p.style.height="560px")}else if(i==="medium"){const p=document.getElementById(t);p&&(p.style.width="560px",p.style.height="620px")}else{const p=document.getElementById(t);p&&(p.style.width="380px",p.style.height="500px")}e.innerHTML=`
      <div class="minesweeper" style="position:relative">
        <div class="mine-difficulty">
          ${Object.entries(G).map(([p,w])=>`
            <button class="mine-diff-btn ${p===i?"active":""}" data-diff="${p}">${w.label}</button>
          `).join("")}
        </div>

        <div class="mine-toolbar">
          <div class="mine-counter">${String(r-d).padStart(3,"0")}</div>
          <button class="mine-face-btn" id="mine-reset-${t}">${g}</button>
          <div class="mine-timer">${String(h).padStart(3,"0")}</div>
        </div>

        <div class="mine-board" style="grid-template-columns: repeat(${m.cols}, 28px)">
          ${A(m)}
        </div>

        ${l?`
          <div class="mine-overlay">
            <div class="mine-overlay-text">${a?"🎉 You Won!":"💥 Game Over"}</div>
            <div class="mine-overlay-sub">${a?`Completed in ${h}s`:"Better luck next time!"}</div>
            <button class="mine-play-again" id="mine-again-${t}">Play Again</button>
          </div>
        `:""}
      </div>
    `,k()}function A(m){let g="";for(let p=0;p<m.rows;p++)for(let w=0;w<m.cols;w++){const b=o[p][w],E=s[p][w],M=n[p][w];let L="mine-cell",P="";b?(L+=" revealed",M===-1?(P="💣",l&&!a&&(L+=" mine-exploded")):M>0&&(P=M,L+=` n${M}`)):E&&(L+=" flagged",P="🚩"),g+=`<div class="${L}" data-r="${p}" data-c="${w}">${P}</div>`}return g}function k(m){e.querySelectorAll(".mine-cell").forEach(w=>{const b=parseInt(w.dataset.r),E=parseInt(w.dataset.c);w.addEventListener("click",()=>{l||s[b][E]||(c&&(c=!1,x(b,E),u=setInterval(()=>{h++;const M=e.querySelector(".mine-timer");M&&(M.textContent=String(h).padStart(3,"0"))},1e3)),$(b,E),y())}),w.addEventListener("contextmenu",M=>{M.preventDefault(),!(l||o[b][E])&&(s[b][E]=!s[b][E],d+=s[b][E]?1:-1,y())})}),e.querySelectorAll(".mine-diff-btn").forEach(w=>{w.addEventListener("click",()=>{i=w.dataset.diff,T()})});const g=e.querySelector(`#mine-reset-${t}`);g&&g.addEventListener("click",T);const p=e.querySelector(`#mine-again-${t}`);p&&p.addEventListener("click",T)}return T(),t}const q=20,se=22,nt={easy:{interval:150,label:"Easy"},medium:{interval:100,label:"Medium"},hard:{interval:60,label:"Hard"}};function zi(){const t=q*se+80,e=q*se+190,i=window.innerWidth,n=window.innerHeight,o=110,s=28,l=n-s-o,a=Math.min(t,i-60),c=Math.min(e,l),r=Math.max(20,(i-a)/2),d=Math.max(s+8,s+(l-c)/2),{id:h,body:u}=W("snake","Snake","",{width:a,height:c,x:r,y:d});let T="medium",x=[],f=null,$="right",C="right",y=!1,A=0,k=parseInt(localStorage.getItem("snake_highscore")||"0"),m=null,g=!1;function p(){x=[{x:5,y:10},{x:4,y:10},{x:3,y:10}],$="right",C="right",y=!1,A=0,g=!1,m&&clearInterval(m),m=null,w(),L()}function w(){let S;do S={x:Math.floor(Math.random()*q),y:Math.floor(Math.random()*q)};while(x.some(j=>j.x===S.x&&j.y===S.y));f=S}function b(){$=C;const S={...x[0]};switch($){case"up":S.y--;break;case"down":S.y++;break;case"left":S.x--;break;case"right":S.x++;break}if(S.x<0||S.x>=q||S.y<0||S.y>=q){E();return}if(x.some(j=>j.x===S.x&&j.y===S.y)){E();return}x.unshift(S),S.x===f.x&&S.y===f.y?(A+=10,w()):x.pop(),L()}function E(){y=!0,m&&clearInterval(m),m=null,A>k&&(k=A,localStorage.setItem("snake_highscore",String(k))),L()}function M(){if(g)return;g=!0,bi();const S=nt[T].interval;m=setInterval(b,S)}function L(){const S=q*se,j=y?"💀":g?"🐍":"😊";u.innerHTML=`
      <div class="minesweeper" style="position:relative">
        <div class="mine-difficulty">
          ${Object.entries(nt).map(([B,R])=>`
            <button class="mine-diff-btn ${B===T?"active":""}" data-diff="${B}" ${g?"disabled":""}>${R.label}</button>
          `).join("")}
        </div>

        <div class="mine-toolbar">
          <div class="mine-counter">HI:${String(k).padStart(3,"0")}</div>
          <button class="mine-face-btn" id="snake-reset-${h}">${j}</button>
          <div class="mine-timer">${String(A).padStart(4,"0")}</div>
        </div>

        <div class="snake-board" style="width:${S}px;height:${S}px;">
          ${P()}
        </div>

        ${!g&&!y?`
          <div class="mine-overlay" style="pointer-events: auto;">
            <div class="mine-overlay-text">🐍 Snake</div>
            <div class="mine-overlay-sub">Press any arrow key or click Play to start</div>
            <button class="mine-play-again" id="snake-start-${h}">▶ Play</button>
          </div>
        `:""}

        ${y?`
          <div class="mine-overlay">
            <div class="mine-overlay-text">💥 Game Over</div>
            <div class="mine-overlay-sub">Score: ${A}${A>=k&&A>0?" — New High Score! 🏆":""}</div>
            <button class="mine-play-again" id="snake-again-${h}">Play Again</button>
          </div>
        `:""}
      </div>
    `,Ee()}function P(){let S="";for(let j=0;j<q;j++)for(let B=0;B<q;B++){const R=x[0].x===B&&x[0].y===j,Re=!R&&x.some(qe=>qe.x===B&&qe.y===j),kt=f&&f.x===B&&f.y===j;let ue="snake-cell",Se="";R?(ue+=" snake-head",Se="●"):Re?ue+=" snake-body":kt&&(ue+=" snake-food",Se="🍎"),S+=`<div class="${ue}" style="width:${se}px;height:${se}px;">${Se}</div>`}return S}function Ee(){u.querySelectorAll(".mine-diff-btn").forEach(R=>{R.addEventListener("click",()=>{g||(T=R.dataset.diff,p())})});const S=u.querySelector(`#snake-reset-${h}`);S&&S.addEventListener("click",p);const j=u.querySelector(`#snake-start-${h}`);j&&j.addEventListener("click",()=>M());const B=u.querySelector(`#snake-again-${h}`);B&&B.addEventListener("click",p)}function me(S){if(!document.getElementById(h)){document.removeEventListener("keydown",me);return}const j=S.key;if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(j)){S.preventDefault(),!g&&!y&&M();const R={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right"}[j];R!=={up:"down",down:"up",left:"right",right:"left"}[$]&&(C=R)}}return document.addEventListener("keydown",me),p(),h}function _i(){const t=window.innerWidth,e=window.innerHeight,i=Math.min(360,t-40),n=Math.min(480,e-100),{id:o,body:s}=W("spotify","Spotify","",{width:i,height:n}),l='<iframe style="position:absolute; top:0; left:0; width:100%; height:100%; border:none; border-radius:0;" src="https://open.spotify.com/embed/playlist/37i9dQZF1EVHGWrwldPRtj?utm_source=generator&theme=0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>';return s.innerHTML=`
    <div class="spotify-container" style="position: absolute; inset: 0; background: #121212;">
      ${l}
    </div>
  `,o}const Ae=[{id:"wp-default",name:"Default",value:`url('${dt}')`,type:"image"},{id:"wp-landscape1",name:"Mountain",value:"url('https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80')",type:"image"},{id:"wp-landscape2",name:"Forest",value:"url('https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80')",type:"image"},{id:"wp-neon",name:"Neon City",value:"url('https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1920&auto=format&fit=crop')",type:"image"},{id:"wp-clouds",name:"Classic Clouds",value:"url('https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?q=80&w=1920&auto=format&fit=crop')",type:"image"},{id:"wp-matrix",name:"The Matrix",value:"url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1920&auto=format&fit=crop')",type:"image"},{id:"wp-sand",name:"Minimal Sand",value:"url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop')",type:"image"},{id:"wp-grad1",name:"Midnight Blue",value:"linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",type:"gradient"},{id:"wp-grad2",name:"Deep Space",value:"linear-gradient(to right, #0f2027, #203a43, #2c5364)",type:"gradient"},{id:"wp-solid1",name:"Dark Gray",value:"#2b2b2b",type:"solid"},{id:"wp-solid2",name:"Pitch Black",value:"#000000",type:"solid"},{id:"wp-solid3",name:"Classic Teal",value:"#008080",type:"solid"}],Oi=[{id:"default",name:"Default",desc:"Modern dark mode with glassmorphism."},{id:"vintage",name:"Vintage Tech",desc:"Warm CRT and classic beige hardware."},{id:"minimal",name:"Minimal",desc:"Stark, high-contrast monochrome."},{id:"aurora",name:"Aurora",desc:"Deep Nordic blues and polar lights."},{id:"concrete",name:"Concrete",desc:"Brutalist greys and thick bold borders."}];function wt(){const{id:t,body:e}=W("syspref","System Preferences","",{width:600,height:450}),i=xe();return e.innerHTML=`
    <div class="syspref-container">
      <div class="syspref-sidebar">
        <div class="syspref-tab active" data-tab="themes">Themes</div>
        <div class="syspref-tab" data-tab="wallpaper">Desktop</div>
        <div class="syspref-tab" data-tab="screensaver">Screensaver</div>
      </div>
      
      <div class="syspref-content">
        <!-- Themes Section -->
        <div class="syspref-section active" id="syspref-themes">
          <div class="syspref-title">System Theme</div>
          <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 13px;">Choose a visual style. This affects all windows, icons, and fonts.</p>
          
          <div class="theme-grid">
            ${Oi.map(n=>`
              <div class="theme-card ${i.theme===n.id?"active":""}" data-theme-id="${n.id}">
                <div class="theme-card-preview theme-preview-${n.id}">
                  <div class="preview-header"></div>
                  <div class="preview-body"></div>
                </div>
                <div class="theme-card-info">
                  <div class="theme-card-name">${n.name}</div>
                  <div class="theme-card-desc">${n.desc}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Wallpaper Section -->
        <div class="syspref-section" id="syspref-wallpaper">
          <div class="syspref-title">Desktop Background</div>
          
          <div class="wallpaper-category">Images</div>
          <div class="wallpaper-grid">
            ${Ae.filter(n=>n.type==="image").map(n=>`
              <div class="wallpaper-item ${i.wallpaper===n.value?"active":""}" 
                   style="background-image: ${n.value}"
                   data-value="${n.value}"></div>
            `).join("")}
          </div>

          <div class="wallpaper-category">Gradients</div>
          <div class="wallpaper-grid">
            ${Ae.filter(n=>n.type==="gradient").map(n=>`
              <div class="wallpaper-item ${i.wallpaper===n.value?"active":""}" 
                   style="background-image: ${n.value}"
                   data-value="${n.value}"></div>
            `).join("")}
          </div>

          <div class="wallpaper-category">Solid Colors</div>
          <div class="wallpaper-grid">
            ${Ae.filter(n=>n.type==="solid").map(n=>`
              <div class="wallpaper-item ${i.wallpaper===n.value?"active":""}" 
                   style="background-color: ${n.value}"
                   data-value="${n.value}"></div>
            `).join("")}
          </div>

          <div class="wallpaper-category" style="margin-top: 24px;">Custom Wallpaper</div>
          <div class="pref-form-group" style="border-bottom: none;">
            <div class="pref-label">
              <strong>Upload Image</strong>
              Select an image from your computer.
            </div>
            <input type="file" id="pref-custom-wp" accept="image/*" style="font-size: 13px; color: var(--text-secondary);" />
          </div>
        </div>

        <!-- Screensaver Section -->
        <div class="syspref-section" id="syspref-screensaver">
          <div class="syspref-title">Screensaver</div>
          
          <div class="pref-form-group">
            <div class="pref-label">
              <strong>Enable Screensaver</strong>
              Show an animation when you're away.
            </div>
            <label class="pref-switch">
              <input type="checkbox" id="pref-ss-enable" ${i.screensaverEnabled?"checked":""}>
              <span class="pref-slider"></span>
            </label>
          </div>

          <div class="pref-form-group">
            <div class="pref-label">
              <strong>Start after</strong>
              How long to wait before starting.
            </div>
            <select class="pref-select" id="pref-ss-timeout" ${i.screensaverEnabled?"":"disabled"}>
              <option value="1" ${i.screensaverTimeout===1?"selected":""}>1 Minute</option>
              <option value="5" ${i.screensaverTimeout===5?"selected":""}>5 Minutes</option>
              <option value="15" ${i.screensaverTimeout===15?"selected":""}>15 Minutes</option>
              <option value="60" ${i.screensaverTimeout===60?"selected":""}>1 Hour</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `,Wi(e),t}function Wi(t){const e=t.querySelectorAll(".syspref-tab"),i=t.querySelectorAll(".syspref-section");e.forEach(a=>{a.addEventListener("click",()=>{e.forEach(c=>c.classList.remove("active")),i.forEach(c=>c.classList.remove("active")),a.classList.add("active"),t.querySelector(`#syspref-${a.dataset.tab}`).classList.add("active")})});const n=t.querySelectorAll(".wallpaper-item");n.forEach(a=>{a.addEventListener("click",()=>{n.forEach(c=>c.classList.remove("active")),a.classList.add("active"),ie({wallpaper:a.dataset.value})})});const o=t.querySelector("#pref-ss-enable"),s=t.querySelector("#pref-ss-timeout");o.addEventListener("change",a=>{const c=a.target.checked;s.disabled=!c,ie({screensaverEnabled:c})}),s.addEventListener("change",a=>{ie({screensaverTimeout:parseInt(a.target.value)})});const l=t.querySelector("#pref-custom-wp");return l&&l.addEventListener("change",a=>{const c=a.target.files[0];if(!c)return;const r=new FileReader;r.onload=d=>{const u=`url('${d.target.result}')`;n.forEach(T=>T.classList.remove("active")),ie({wallpaper:u})},r.readAsDataURL(c)}),t.querySelectorAll(".theme-card").forEach(a=>{a.addEventListener("click",()=>{t.querySelectorAll(".theme-card").forEach(r=>r.classList.remove("active")),a.classList.add("active");const c=a.dataset.themeId;ie({theme:c})})}),id}const Ri=Object.freeze(Object.defineProperty({__proto__:null,openSystemPreferences:wt},Symbol.toStringTag,{value:"Module"}));function bt(){const{id:t,body:e}=W("achievements","Achievements","",{width:380,height:480}),i=ci();return e.innerHTML=`
    <div class="achievements-container">
      <div class="achievements-header">ACHIEVEMENTS</div>
      <div class="achievements-list">
        ${i.map(n=>`
          <div class="achievement-row ${n.unlocked?"unlocked":""}">
            <span class="achievement-indicator">${n.unlocked?"✓":"•"}</span>
            <div class="achievement-info">
              <span class="achievement-name">${n.name}</span>
              <span class="achievement-desc">${n.unlocked?n.desc:"???"}</span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `,t}const qi=Object.freeze(Object.defineProperty({__proto__:null,openAchievements:bt},Symbol.toStringTag,{value:"Module"}));let Z=[];const Ie=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];let ee=0,ot=null;function Ni(){document.addEventListener("keydown",e=>{Z.push(e.key),Z.length>Ie.length&&Z.shift(),Z.length===Ie.length&&Z.every((i,n)=>i===Ie[n])&&(Ui(),Z=[])});const t=document.getElementById("menu-logo");t&&t.addEventListener("click",()=>{ee++,clearTimeout(ot),ee>=7?(Vi(),ee=0):ee>=3&&V(`${7-ee} more clicks to activate developer mode...`),ot=setTimeout(()=>{ee=0},2e3)}),document.addEventListener("keydown",e=>{(e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key==="D"&&(e.preventDefault(),V("🌗 Theme toggle is a feature for v2.0! Stay tuned."))})}function Ui(){if(document.body.classList.toggle("retro-mode")){V("🕹️ RETRO MODE ACTIVATED! Press Konami code again to disable."),ke();const e=document.getElementById("desktop");e.style.background="linear-gradient(180deg, #000033 0%, #000066 50%, #000033 100%)"}else{V("Retro mode deactivated. Welcome back to the future!");const e=document.getElementById("desktop");e.style.background=""}}function Vi(){V("🛠️ Developer Mode activated! Check the console for a secret message."),ke(),console.log("%c🔧 DEVELOPER MODE 🔧","font-size: 24px; font-weight: bold; color: #27C93F;"),console.log("%cHey there, fellow developer! 👋","font-size: 16px; color: #007AFF;"),console.log("%cYou found the secret developer mode!","font-size: 14px; color: #f0f0f0;"),console.log("%cThis portfolio was built with:","font-size: 14px; color: #f0f0f0;"),console.log("%c  • Vanilla JavaScript (no frameworks!)","font-size: 12px; color: #8e8e93;"),console.log("%c  • CSS Custom Properties for theming","font-size: 12px; color: #8e8e93;"),console.log("%c  • Vite for bundling","font-size: 12px; color: #8e8e93;"),console.log("%c  • A lot of love and attention to detail 💜","font-size: 12px; color: #8e8e93;"),console.log("%cLet's connect: alex@designcraft.dev","font-size: 14px; color: #FFBD2E; font-weight: bold;"),document.querySelectorAll(".app-window").forEach(t=>{t.classList.add("dev-mode-glow"),setTimeout(()=>t.classList.remove("dev-mode-glow"),5e3)})}function fe(t,e){const i=ct(t);if(i&&t!=="finder"&&t!=="text"&&t!=="project"){const n=document.getElementById(i);n&&n.style.display==="none"?lt(i):Q(i);return}switch(t){case"finder":tt(e||"/");break;case"terminal":Ii();break;case"email":ji();break;case"pdf":Di();break;case"text":Pi(e);break;case"project":Hi(e);break;case"minesweeper":Bi();break;case"snake":zi();break;case"spotify":_i();break;case"trash":tt("/Trash");break;case"settings":wt();break;case"achievements":bt();break;default:console.warn(`Unknown app: ${t}`)}}Bt(fe);Xt(fe);Ti(fe);Ai(fe);function at(){const t=document.getElementById("boot-screen"),e=document.getElementById("desktop-environment"),i=document.querySelector(".boot-progress-bar");let n=0;const o=setInterval(()=>{n+=Math.random()*15+5,n>=100&&(n=100,clearInterval(o),setTimeout(()=>{t.classList.add("fade-out"),e.classList.remove("hidden"),It(),zt(),Jt(),ei(),ti(),li(),Ni(),ki();const s=document.getElementById("trophy-icon");s&&s.addEventListener("click",()=>fe("achievements")),setTimeout(()=>t.remove(),800)},300)),i.style.width=n+"%"},150)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",at):at();

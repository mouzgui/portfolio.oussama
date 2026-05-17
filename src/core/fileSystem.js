// Virtual File System — navigate and query the file tree

import { fileTree } from '../data/fileTree.js';
import { fileContents } from '../data/portfolio.js';

class FileSystem {
  constructor() {
    this.root = fileTree;
    this.trash = this._findNode(this.root, 'Trash');
  }

  // Resolve a path like "/About Me/bio.txt" to a node
  resolve(path) {
    if (!path || path === '/') return this.root;
    const parts = path.split('/').filter(Boolean);
    let node = this.root;
    for (const part of parts) {
      if (!node.children) return null;
      node = node.children.find(c => c.name === part);
      if (!node) return null;
    }
    return node;
  }

  // List children of a folder path
  listDir(path) {
    const node = this.resolve(path);
    if (!node || node.type !== 'folder') return [];
    return node.children.filter(c => !c.hidden);
  }

  // List ALL children including hidden
  listDirAll(path) {
    const node = this.resolve(path);
    if (!node || node.type !== 'folder') return [];
    return node.children;
  }

  // Get file content
  getContent(path) {
    return fileContents[path] || `[No content available for ${path}]`;
  }

  // Move item to trash
  moveToTrash(path) {
    const parts = path.split('/').filter(Boolean);
    const fileName = parts.pop();
    const parentPath = '/' + parts.join('/');
    const parent = this.resolve(parentPath || '/');
    if (!parent || !parent.children) return false;
    
    const idx = parent.children.findIndex(c => c.name === fileName);
    if (idx === -1) return false;
    
    const [item] = parent.children.splice(idx, 1);
    this.trash.children.push(item);
    return true;
  }

  // Empty trash
  emptyTrash() {
    const count = this.trash.children.length;
    this.trash.children = [];
    return count;
  }

  // Check if trash has items
  get trashCount() {
    return this.trash.children.length;
  }

  // Get file type info
  getFileType(node) {
    if (node.type === 'folder') return 'folder';
    if (node.fileType) return node.fileType;
    const ext = node.name.split('.').pop().toLowerCase();
    const typeMap = {
      txt: 'text', md: 'markdown', pdf: 'pdf',
      app: 'application', png: 'image', jpg: 'image',
      js: 'code', py: 'code', sh: 'script',
    };
    return typeMap[ext] || 'text';
  }

  // Find node by name (recursive)
  _findNode(node, name) {
    if (node.name === name) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = this._findNode(child, name);
        if (found) return found;
      }
    }
    return null;
  }

  // Get path string for a search
  findPath(targetName, node = this.root, currentPath = '') {
    const path = currentPath ? `${currentPath}/${node.name}` : '';
    if (node.name === targetName) return path || '/';
    if (node.children) {
      for (const child of node.children) {
        const result = this.findPath(targetName, child, path);
        if (result) return result;
      }
    }
    return null;
  }
}

export const fs = new FileSystem();

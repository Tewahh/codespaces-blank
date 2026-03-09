import { state } from '../state.js';

export function saveGame() {
  localStorage.setItem('rpgSave', JSON.stringify(state));
  console.log('Game saved.');
}

export function loadGame() {
  const saved = localStorage.getItem('rpgSave');
  if (saved) {
    const parsed = JSON.parse(saved);
    Object.assign(state, parsed);
    console.log('Game loaded.');
  }
}
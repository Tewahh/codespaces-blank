import { state } from '../state.js';

export function addItem(item) {
  state.player.inventory.push(item);
  console.log(`Added ${item} to inventory`);
}

export function removeItem(item) {
  const index = state.player.inventory.indexOf(item);
  if (index !== -1) state.player.inventory.splice(index, 1);
}

export function hasItem(item) {
  return state.player.inventory.includes(item);
}
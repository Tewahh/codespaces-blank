import { renderInventory } from "./systems/inventorySystem.js";
import { renderEquipment } from "./systems/equipmentSystem.js";

export const stats = document.getElementById("stats");
export const health = document.getElementById("health");
export const xp = document.getElementById("xp");
export const attackBtn = document.getElementById("attack-btn");
export const dialogue = document.getElementById("dialogue");
export const choicesDiv = document.getElementById("choicesDiv");
export const inventoryGrid = document.getElementById("inventory-grid");

// Generic UI updater
export function updateUI(state) {
  stats.innerHTML = `
  <div id="stat-level" style="display: inline-block;">LVL ${state.player.level}</div>  |
  <div id="stat-attack" style="display: inline-block;">ATK ${state.player.attack}</div>        | 
  <div id="stat-defense" style="display: inline-block;">DEF ${state.player.defense}</div> |
  <div id="stat-coins" style="display: inline-block;">COINS ${state.player.coins}</div>`;
  health.textContent = `HP ${state.player.health}/${state.player.maxHealth}`;
  xp.textContent = `XP ${state.player.xp}/${state.player.xpToNext}`;

  renderEquipment();
  renderInventory();
}

// Heal player a bit between scenes
export function healBetweenScenes(state) {
  state.player.health = Math.min(
    state.player.health + 10,
    state.player.maxHealth,
  );
}
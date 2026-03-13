import { renderInventory } from "./systems/inventorySystem.js";

export const stats = document.getElementById("stats");
export const health = document.getElementById("health");
export const xp = document.getElementById("xp");
export const attackBtn = document.getElementById("attack-btn");
export const dialogue = document.getElementById("dialogue");
export const choicesDiv = document.getElementById("choicesDiv");
export const inventoryGrid = document.getElementById("inventory-grid");

// Generic UI updater
export function updateUI(state) {
  stats.textContent = `LVL ${state.player.level} ATK ${state.player.attack} DEF ${state.player.defense}`;
  health.textContent = `HP ${state.player.health}/${state.player.maxHealth}`;
  xp.textContent = `XP ${state.player.xp}/${state.player.xpToNext}`;

  renderInventory();
}

// Heal player a bit between scenes
export function healBetweenScenes(state) {
  state.player.health = Math.min(
    state.player.health + 10,
    state.player.maxHealth,
  );
}
// ui.js
import { state } from "./state.js";
import { renderInventory } from "./systems/inventorySystem.js";

export function updateUI() {
  document.getElementById("stats").textContent =
    `Level: ${state.player.level} ATK:${state.player.attack} DEF:${state.player.defense}`;
  document.getElementById("health").textContent =
    `HP: ${state.player.health}/${state.player.maxHealth}`;
  document.getElementById("xp").textContent =
    `XP: ${state.player.xp}/${state.player.xpToNext}`;

  renderInventory();
}
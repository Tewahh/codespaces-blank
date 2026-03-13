import { state } from "../state.js";
import { updateUI } from "../ui.js";

export function addXP(amount) {
  state.player.xp += amount;

  while (state.player.xp >= state.player.xpToNext) {
    levelUp();
  }

  updateUI(state);
}

function levelUp() {
  state.player.level++;

  state.player.xp -= state.player.xpToNext;

  state.player.xpToNext = Math.floor(state.player.xpToNext * 1.5);

  state.player.maxHealth += 2;
  state.player.attack += 1;
  state.player.defense += 1;

  state.player.health = state.player.maxHealth;

  console.log("Level Up!");
}

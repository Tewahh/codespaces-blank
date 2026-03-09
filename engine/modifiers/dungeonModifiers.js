import { state } from "./state.js";
import { addItem } from "./inventorySystem.js";
import { generateLoot } from "./lootGenerator.js";

export function applyDungeonModifier(room) {
  // Cursed dungeon: reduce XP but chance for rare loot
  if (room.cursed) {
    state.player.xp -= 1;
    if (Math.random() < 0.5) {
      const loot = generateLoot();
      addItem(loot);
      console.log("Cursed dungeon bonus loot:", loot.name);
    }
  }

  // Environmental hazards
  if (room.hazard) {
    state.player.health -= 2;
    console.log("You triggered a trap! Lose 2 HP.");
  }
}
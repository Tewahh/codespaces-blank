import { state } from "../state.js";
import { startCombat } from "../combat/combatSystem.js";
import { addItem } from "../systems/inventorySystem.js";
import { generateLoot } from "./lootGenerator.js";

export function generateDungeon(size = 6) {
  const dungeon = [];

  for (let i = 0; i < size; i++) {
    dungeon.push({
      enemy: Math.random() < 0.6,

      treasure: Math.random() < 0.4,

      visited: false,
    });
  }

  return dungeon;
}

export function enterDungeon() {
  state.dungeon = generateDungeon();

  state.dungeonRoom = 0;

  loadRoom();
}

export function loadRoom() {
  const room = state.dungeon[state.dungeonRoom];

  if (!room) return;

  if (room.enemy) startCombat(["wolf"]);

  if (room.treasure) addItem(generateLoot());
}

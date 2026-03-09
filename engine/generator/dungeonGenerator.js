import { state } from "../state.js";
import { addItem } from "../systems/inventorySystem.js";
import { startCombat } from "../combat/combatSystem.js";
import { generateLoot } from "./lootGenerator.js";

export function generateDungeon(size = 6) {
  const dungeon = [];
  for (let i = 0; i < size; i++) {
    dungeon.push({
      id: "room_" + i,
      enemy: Math.random() < 0.6,
      treasure: Math.random() < 0.5,
      hazard: Math.random() < 0.3, // new hazards
      visited: false,
      miniBoss: Math.random() < 0.1
    });
  }
  return dungeon;
}

export function enterDungeon() {
  state.dungeon = generateDungeon();
  state.dungeonRoom = 0;
  loadDungeonRoom();
}

export function loadDungeonRoom() {
  const room = state.dungeon[state.dungeonRoom];
  if (!room.visited) {
    room.visited = true;

    if (room.enemy) startCombat(["wolf"]); // or procedural enemy
    if (room.treasure) addItem(generateLoot());
    if (room.hazard) console.log("You triggered a trap! Lose 2 HP"), state.player.health -= 2;
    if (room.miniBoss) startCombat(["guardian"]); // mini-boss
  }
}
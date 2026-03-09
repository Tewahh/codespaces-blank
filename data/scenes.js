import { unlockLocation, renderMap } from "../engine/systems/mapSystem.js";
import { enterDungeon } from "../engine/generator/dungeonGenerator.js";
import { addItem } from "../engine/systems/inventorySystem.js";
import { generateLoot } from "../engine/generator/lootGenerator.js";

export const scenes = {

  // --- INTRO ---
  intro: {
    text: `You awaken at the edge of a dense forest. Birds call in the distance, and the wind whispers promises of adventure.`,
    choices: [
      { text: "Open the World Map", next: "map" },
      { text: "Venture into the forest", next: "forest" }
    ]
  },

  // --- WORLD MAP ---
  map: {
    text: "Where would you like to go? Explore, fight, and discover treasures.",
    effect: () => renderMap(),
    choices: []
  },

  // --- RANDOM TRAVEL EVENT ---
  travelEvent: {
    text: "",
    effect: async (state) => {
      const events = [
        { text: "You are ambushed by wolves!", combat: "wolf" },
        { text: "You find a small treasure chest!", loot: true },
        { text: "A wandering traveler shares advice.", message: "Gain +1 XP" },
        { text: "The path is peaceful. Nothing happens." }
      ];

      const choice = events[Math.floor(Math.random() * events.length)];

      if (choice.combat) return { combat: choice.combat };
      if (choice.loot) {
        addItem(generateLoot());
        state.player.xp += 1;
        return { next: "map" };
      }
      if (choice.message) {
        state.player.xp += 1;
        return { next: "map" };
      }
      return { next: "map" };
    },
    choices: []
  },

  // --- FOREST ---
  forest: {
    text: `The forest canopy blocks most of the sunlight. The air smells damp and earthy. Rustling sounds make you alert.`,
    choices: [
      { text: "Investigate the rustling", combat: "wolf" },
      { text: "Follow a hidden trail", next: "forestPath" },
      { text: "Return to map", next: "map" }
    ]
  },

  forestPath: {
    text: `A hidden path winds through the dense foliage. You feel a faint magical hum around you, as if the forest itself is alive.`,
    effect: () => {
      unlockLocation("dungeon");
      unlockLocation("ruins");
    },
    choices: [
      { text: "Proceed down the hidden path", next: "dungeonEntrance" },
      { text: "Return to forest entrance", next: "forest" }
    ]
  },

  // --- BURNED VILLAGE ---
  burnedVillage: {
    text: `The village is eerily quiet. Charred wooden beams and smoke from ruined houses indicate a recent disaster.`,
    effect: () => unlockLocation("burnedVillage"),
    choices: [
      { text: "Search for survivors", combat: "bandit" },
      { text: "Loot the rubble", effect: (state) => addItem(generateLoot()) },
      { text: "Return to map", next: "map" }
    ]
  },

  // --- RUINS ---
  ruinsUnlocked: {
    text: `Ancient ruins emerge from the overgrowth. Faded symbols and broken statues hint at a civilization long forgotten.`,
    effect: () => unlockLocation("ruins"),
    choices: [
      { text: "Enter the ruins", next: "ruins" },
      { text: "Return to map", next: "map" }
    ]
  },

  ruins: {
    text: `Inside the ruins, you see cracked stone walls, broken statues, and murals depicting forgotten heroes.`,
    choices: [
      { text: "Search for treasure", effect: (state) => addItem(generateLoot()), combat: "wolf" },
      { text: "Examine murals for clues", effect: () => unlockLocation("dungeon") },
      { text: "Exit the ruins", next: "map" }
    ]
  },

  // --- DUNGEON ---
  dungeonEntrance: {
    text: `The entrance to the dungeon is dark and foreboding. You can feel the chill of something ancient and dangerous.`,
    choices: [
      { text: "Enter the dungeon", next: "enterDungeon" },
      { text: "Return to map", next: "map" }
    ]
  },

  enterDungeon: {
    text: `You step into the dungeon. Stones are damp and the air smells of moss and decay.`,
    effect: (state) => enterDungeon(state)
  },

  dungeonRoom: {
    text: `A shadowy chamber stretches before you. Broken weapons and old bones litter the floor.`,
    effect: (state) => {
      const room = state.dungeon[state.dungeonRoom];
      if (!room.visited) {
        room.visited = true;
        if (room.enemy) return { combat: "wolf" };
        if (room.treasure) addItem(generateLoot());
      }
    },
    choices: [
      { text: "Go deeper", next: "nextDungeonRoom" },
      { text: "Leave dungeon", next: "map" }
    ]
  },

  nextDungeonRoom: {
    effect: (state) => {
      state.dungeonRoom++;
      if (state.dungeonRoom >= state.dungeon.length) return { next: "bossRoom" };
      return { next: "dungeonRoom" };
    }
  },

  bossRoom: {
    text: `A massive stone guardian awakens, its eyes glowing red. The dungeon trembles as it moves.`,
    choices: [
      { text: "Fight the Guardian", combat: "guardian" },
      { text: "Flee to safety", next: "map" }
    ]
  },

  // --- ENDINGS ---
  endingGood: {
    text: `You defeated the evil and restored peace to the land! Villagers and travelers celebrate your heroism.`,
    choices: [
      { text: "Restart Adventure", next: "intro" }
    ]
  },

  endingNeutral: {
    text: `You survived your journey, but danger still lurks in the shadows. Perhaps one day you'll return stronger.`,
    choices: [
      { text: "Restart Adventure", next: "intro" }
    ]
  }
};
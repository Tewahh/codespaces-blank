export const scenes = {
  intro: {
    text: "You arrive in a small village surrounded by forest. Smoke rises from chimneys and the road continues into distant lands.",
    choices: [
      { text: "Visit the village square", next: "village_square" },
      { text: "Explore the forest", next: "forest_edge" },
      { text: "Walk toward the river", next: "river_bank" },
    ],
  },

  village_square: {
    text: "Villagers gather around a small market. A blacksmith works nearby while the village elder watches from a bench.",
    choices: [
      { text: "Talk to the elder", dialogue: "elder_intro" },
      { text: "Visit the blacksmith", next: "blacksmith" },
      { text: "Visit the tavern", next: "tavern" },
      { text: "Travel the world", map: true },
      { text: "Leave village", next: "intro" },
    ],
  },

  blacksmith: {
    text: "The blacksmith wipes sweat from his brow. Weapons and armor line the walls.",
    choices: [
      { text: "Browse weapons", shop: "weapons" },
      { text: "Browse armors", shop: "armors" },
      { text: "Return to square", next: "village_square" },
    ],
  },

  tavern: {
    text: "The tavern smells of roasted meat and ale. Adventurers talk about monsters in nearby lands.",
    choices: [
      { text: "Listen for rumors", dialogue: "tavern_rumors" },
      { text: "Accept bounty hunt", next: "bounty_board" },
      { text: "Return to square", next: "village_square" },
    ],
  },

  bounty_board: {
    text: "A wooden board lists dangerous creatures threatening nearby roads.",
    choices: [
      { text: "Hunt wolves", combat: ["wolf", "wolf"] },
      { text: "Hunt goblins", combat: ["goblin", "goblin", "goblin"] },
      { text: "Return to tavern", next: "tavern" },
    ],
  },

  forest_edge: {
    text: "The forest is dark and quiet. Wind rustles through the trees.",
    choices: [
      { text: "Search the forest", combat: ["wolf"] },
      { text: "Gather herbs", next: "herb_patch" },
      { text: "Go deeper", next: "deep_forest" },
      { text: "Return to village", next: "intro" },
    ],
  },

  herb_patch: {
    text: "You find glowing herbs growing beneath the trees.",
    choices: [
      { text: "Collect herbs", loot: true },
      { text: "Return to forest edge", next: "forest_edge" },
    ],
  },

  deep_forest: {
    text: "The trees grow thick and twisted. You sense danger watching you.",
    choices: [
      { text: "Fight goblins", combat: ["goblin", "goblin"] },
      { text: "Explore ruins", next: "forest_ruins" },
      { text: "Return", next: "forest_edge" },
    ],
  },

  forest_ruins: {
    text: "Ancient stone ruins lie hidden beneath vines and moss.",
    choices: [
      { text: "Search the ruins", loot: true },
      { text: "Disturb the shadows", combat: ["skeleton"] },
      { text: "Return to forest", next: "deep_forest" },
    ],
  },

  river_bank: {
    text: "A slow river winds through the land. A broken bridge crosses to the far side.",
    choices: [
      { text: "Fish by the river", next: "fishing_spot" },
      { text: "Cross the bridge", next: "bridge_crossing" },
      { text: "Return to village", next: "intro" },
    ],
  },

  fishing_spot: {
    text: "The water is calm. You might catch something valuable.",
    choices: [
      { text: "Fish", loot: true },
      { text: "Return to river", next: "river_bank" },
    ],
  },

  bridge_crossing: {
    text: "As you cross the bridge, bandits emerge from the shadows.",
    choices: [
      { text: "Fight bandits", combat: ["bandit", "bandit"] },
      { text: "Run back", next: "river_bank" },
    ],
  },
};
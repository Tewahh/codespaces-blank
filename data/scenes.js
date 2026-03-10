import { startCombat } from "../engine/combat/combat.js";
import { startScene } from "../engine/manager/sceneManager.js";
import { state } from "../engine/state.js";

export const scenes = {

  intro: {
    text: "You wake up in a dark forest. The air is cold and the trees whisper in the wind.",
    choices: [
      { text: "Follow the northern path", action: () => startScene("forestPath") },
      { text: "Search the forest floor", action: () => startScene("searchForest") },
      { text: "Rest for a moment", action: () => startScene("rest") }
    ]
  },

  forestPath: {
    text: "The path winds deeper into the forest. You hear something moving in the bushes.",
    choices: [
      { text: "Investigate the noise", action: () => startCombat(["wolf"]) },
      { text: "Continue walking", action: () => startScene("deepForest") },
      { text: "Return to where you woke up", action: () => startScene("intro") }
    ]
  },

  searchForest: {
    text: "You search the ground and find some useful herbs.",
    choices: [
      {
        text: "Take the herbs",
        action: () => {
          state.player.inventory.push("Herbs");
          startScene("intro");
        }
      }
    ]
  },

  rest: {
    text: "You sit against a tree and rest.",
    choices: [
      {
        text: "Recover health",
        action: () => {
          state.player.hp = Math.min(state.player.hp + 15, state.player.maxHp);
          startScene("intro");
        }
      }
    ]
  },

  deepForest: {
    text: "The forest grows darker here. You see a ruined shrine and a narrow trail.",
    choices: [
      { text: "Inspect the shrine", action: () => startScene("ruinedShrine") },
      { text: "Follow the narrow trail", action: () => startScene("banditAmbush") },
      { text: "Head back", action: () => startScene("forestPath") }
    ]
  },

  ruinedShrine: {
    text: "An ancient shrine stands covered in moss. Something glows beneath the altar.",
    choices: [
      {
        text: "Take the glowing object",
        action: () => {
          state.player.inventory.push("Ancient Amulet");
          startScene("deepForest");
        }
      },
      { text: "Leave the shrine", action: () => startScene("deepForest") }
    ]
  },

  banditAmbush: {
    text: "Bandits jump from the bushes!",
    choices: [
      { text: "Fight!", action: () => startCombat(["bandit", "bandit"]) },
      { text: "Run away", action: () => startScene("forestPath") }
    ]
  },

  caveEntrance: {
    text: "Behind a waterfall you discover a hidden cave entrance.",
    choices: [
      { text: "Enter the cave", action: () => startScene("caveInterior") },
      { text: "Return to the forest", action: () => startScene("deepForest") }
    ]
  },

  caveInterior: {
    text: "The cave is dark and damp. You hear dripping water echoing through the tunnels.",
    choices: [
      { text: "Explore deeper", action: () => startScene("caveTunnel") },
      { text: "Search for treasure", action: () => startScene("caveTreasure") },
      { text: "Leave the cave", action: () => startScene("caveEntrance") }
    ]
  },

  caveTunnel: {
    text: "A giant spider crawls from the shadows!",
    choices: [
      { text: "Fight the spider", action: () => startCombat(["spider"]) },
      { text: "Retreat", action: () => startScene("caveInterior") }
    ]
  },

  caveTreasure: {
    text: "You find an old chest covered in dust.",
    choices: [
      {
        text: "Open the chest",
        action: () => {
          state.player.inventory.push("Gold Coin");
          state.player.inventory.push("Potion");
          startScene("caveInterior");
        }
      },
      { text: "Ignore it", action: () => startScene("caveInterior") }
    ]
  },

  villageEntrance: {
    text: "You reach a small village at the edge of the forest.",
    choices: [
      { text: "Visit the tavern", action: () => startScene("tavern") },
      { text: "Go to the shop", action: () => startScene("shop") },
      { text: "Leave the village", action: () => startScene("forestPath") }
    ]
  },

  tavern: {
    text: "The tavern is warm and filled with travelers.",
    choices: [
      { text: "Talk to a mysterious stranger", action: () => startScene("strangerQuest") },
      { text: "Rest for the night", action: () => startScene("tavernRest") },
      { text: "Leave", action: () => startScene("villageEntrance") }
    ]
  },

  tavernRest: {
    text: "You rest in a bed and recover fully.",
    choices: [
      {
        text: "Wake up refreshed",
        action: () => {
          state.player.hp = state.player.maxHp;
          startScene("villageEntrance");
        }
      }
    ]
  },

  strangerQuest: {
    text: "The stranger whispers: 'A dungeon lies beneath the hills. Great treasure awaits.'",
    choices: [
      { text: "Accept the quest", action: () => startScene("dungeonEntrance") },
      { text: "Decline", action: () => startScene("tavern") }
    ]
  },

  shop: {
    text: "A merchant greets you.",
    choices: [
      {
        text: "Buy Potion (10 gold)",
        action: () => {
          state.player.inventory.push("Potion");
          startScene("shop");
        }
      },
      { text: "Leave shop", action: () => startScene("villageEntrance") }
    ]
  },

  dungeonEntrance: {
    text: "A massive stone door marks the entrance to an ancient dungeon.",
    choices: [
      { text: "Enter the dungeon", action: () => startScene("dungeonRoom1") },
      { text: "Return to village", action: () => startScene("villageEntrance") }
    ]
  },

  dungeonRoom1: {
    text: "Torches flicker along the walls. You hear monsters nearby.",
    choices: [
      { text: "Explore the room", action: () => startCombat(["skeleton"]) },
      { text: "Go deeper", action: () => startScene("dungeonBoss") },
      { text: "Leave dungeon", action: () => startScene("dungeonEntrance") }
    ]
  },

  dungeonBoss: {
    text: "A towering guardian blocks your path!",
    choices: [
      { text: "Fight the guardian", action: () => startCombat(["guardian"]) },
      { text: "Retreat", action: () => startScene("dungeonRoom1") }
    ]
  }

};
export const scenes = {

  intro: {
    text: "You wake up in a dark forest. The air is cold and the trees whisper in the wind.",
    choices: [
      { text: "Follow the northern path", scene: "forestPath" },
      { text: "Search the forest floor", scene: "searchForest" },
      { text: "Rest for a moment", scene: "rest" },
    ]
  },

  forestPath: {
    text: "The path winds deeper into the forest. You hear something moving in the bushes.",
    enemy: ["wolf"],
    choices: [
      { text: "Investigate the noise", combat: true },
      { text: "Continue walking", scene: "deepForest" },
      { text: "Return to where you woke up", scene: "intro" }
    ]
  },

  searchForest: {
    text: "You search the ground and find some useful herbs.",
    choices: [
      {
        text: "Take the herbs",
        scene: "intro",
        giveItem: "Herbs",
      }
    ]
  },

  rest: {
    text: "You sit against a tree and rest.",
    choices: [
      {
        text: "Recover health",
        scene: "intro", 
        heal: 15,
      }
    ]
  },

  deepForest: {
    text: "The forest grows darker here. You see a ruined shrine and a narrow trail.",
    choices: [
      { text: "Inspect the shrine", scene: "ruinedShrine" },
      { text: "Follow the narrow trail", scene: "banditAmbush" },
      { text: "Head back", scene: "forestPath" }
    ]
  },

  ruinedShrine: {
    text: "An ancient shrine stands covered in moss. Something glows beneath the altar.",
    choices: [
      {
        text: "Take the glowing object",
        scene: "deepForest",
        giveItem: "Ancient Amulet",
      },
      { text: "Leave the shrine", scene: "deepForest" }
    ]
  },

  banditAmbush: {
    text: "Bandits jump from the bushes!",
    enemy: ["bandit", "bandit"],
    choices: [
      { text: "Fight!", combat: true },
      { text: "Run away", scene: "forestPath" }
    ]
  },

  caveEntrance: {
    text: "Behind a waterfall you discover a hidden cave entrance.",
    choices: [
      { text: "Enter the cave", scene: "caveInterior" },
      { text: "Return to the forest", scene: "deepForest" }
    ]
  },

  caveInterior: {
    text: "The cave is dark and damp. You hear dripping water echoing through the tunnels.",
    choices: [
      { text: "Explore deeper", scene: "caveTunnel" },
      { text: "Search for treasure", scene: "caveTreasure" },
      { text: "Leave the cave", scene: "caveEntrance" }
    ]
  },

  caveTunnel: {
    text: "A giant spider crawls from the shadows!",
    enemy: ["spider"],
    choices: [
      { text: "Fight the spider", combat: true },
      { text: "Retreat", scene: "caveInterior" }
    ]
  },

  caveTreasure: {
    text: "You find an old chest covered in dust.",
    choices: [
      {
        text: "Open the chest",
        scene: "caveInterior",
        giveItem: ["Gold Coin", "Potion"]
      },
      { text: "Ignore it", scene: "caveInterior" }
    ]
  },

  villageEntrance: {
    text: "You reach a small village at the edge of the forest.",
    choices: [
      { text: "Visit the tavern", scene: "tavern" },
      { text: "Go to the shop", scene: "shop" },
      { text: "Leave the village", scene: "forestPath" }
    ]
  },

  tavern: {
    text: "The tavern is warm and filled with travelers.",
    choices: [
      { text: "Talk to a mysterious stranger", scene: "strangerQuest" },
      { text: "Rest for the night", scene: "tavernRest" },
      { text: "Leave", scene: "villageEntrance" }
    ]
  },

  tavernRest: {
    text: "You rest in a bed and recover fully.",
    choices: [
      {
        text: "Wake up refreshed",
        scene: "villageEntrance",
        heal: 100,
      }
    ]
  },

  strangerQuest: {
    text: "The stranger whispers: 'A dungeon lies beneath the hills. Great treasure awaits.'",
    choices: [
      { text: "Accept the quest", scene: "dungeonEntrance" },
      { text: "Decline", scene: "tavern" }
    ]
  },

  shop: {
    text: "A merchant greets you.",
    choices: [
      {
        text: "Buy Potion (10 gold)",
        scene: "shop",
        giveItem: "Potion",
      },
      { text: "Leave shop", scene: "villageEntrance" }
    ]
  },

  dungeonEntrance: {
    text: "A massive stone door marks the entrance to an ancient dungeon.",
    choices: [
      { text: "Enter the dungeon", scene: "dungeonRoom1" },
      { text: "Return to village", scene: "villageEntrance" }
    ]
  },

  dungeonRoom1: {
    text: "Torches flicker along the walls. You hear monsters nearby.",
    enemy: ["skeleton"],
    choices: [
      { text: "Explore the room", combat: true },
      { text: "Go deeper", scene: "dungeonBoss" },
      { text: "Leave dungeon", scene: "dungeonEntrance" }
    ]
  },

  dungeonBoss: {
    text: "A towering guardian blocks your path!",
    enemy: ["guardian"],
    choices: [
      { text: "Fight the guardian", combat: true },
      { text: "Retreat", scene: "dungeonRoom1" }
    ]
  }

};
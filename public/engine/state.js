export const state = {
  scene: "intro",

  player: {
    name: "Hero",
    level: 1,
    xp: 0,
    xpToNext: 10,

    maxHealth: 20,
    health: 20,

    baseAttack: 2,
    attack: 2,
    baseDefense: 1,
    defense: 1,
    speed: 3,

    coins: 0,

    inventory: {
      items: [],
      page: 0,
      pageSize: 40, // 10x4 grid
    },
    equipment: { weapon: null, armor: null },

    quests: {},
    npcAffinity: {},
  },

  combat: {
    active: false,
    enemies: [],
  },
};

export const state = {
  scene: "intro",
  player: {
    name: "Hero",
    level: 1,
    xp: 0,
    xpToNext: 10,
    maxHealth: 20,
    health: 20,
    attack: 2,
    defense: 1,
    speed: 3,
    inventory: [],
    equipment: { weapon: null, armor: null },
    skillPoints: 0,
    effects: [],
    quests: {},
    npcAffinity: {}
  },
  combat: { active: false, enemies: [] },
  flags: {},
  dungeon: [],
  dungeonRoom: 0
};
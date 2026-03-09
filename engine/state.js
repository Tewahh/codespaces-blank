export const state = {
  player: {
    name: 'Hero',
    level: 1,
    xp: 0,
    hp: 100,
    maxHp: 100,
    attack: 10,
    defense: 5,
    skills: [],
    inventory: [],
    position: { x: 0, y: 0 },
    alignment: 'neutral'
  },
  world: {
    day: 1,
    time: 'morning',
    discoveredLocations: [],
    events: []
  },
  currentScene: 'intro',
  enemiesInBattle: []
};
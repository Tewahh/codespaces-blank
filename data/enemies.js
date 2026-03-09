export const enemies = [
  {
    id: 'wolf',
    name: 'Forest Wolf',
    hp: 30,
    maxHp: 30,
    attack: 5,
    defense: 2,
    skills: ['bite'],
    behavior: { lowHp: 'flee', normal: 'attack' },
    loot: [{ item: 'Wolf Pelt', chance: 0.5 }]
  },
  {
    id: 'bandit',
    name: 'Bandit',
    hp: 40,
    maxHp: 40,
    attack: 6,
    defense: 3,
    skills: ['slash'],
    behavior: { lowHp: 'heal', normal: 'attack' },
    loot: [{ item: 'Gold Coin', chance: 0.8 }]
  }
];
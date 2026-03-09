export const dungeonModifiers = [
  {
    id: 'cursed',
    description: 'XP reduced but rare loot increased',
    modify: dungeon => {
      dungeon.lootMultiplier = 2;
      dungeon.xpMultiplier = 0.5;
      return dungeon;
    }
  },
  {
    id: 'hazardous',
    description: 'Extra traps in rooms',
    modify: dungeon => {
      dungeon.rooms.forEach(r => {
        if (Math.random() < 0.3) r.type = 'trap';
      });
      return dungeon;
    }
  }
];
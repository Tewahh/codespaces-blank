export function generateDungeon(level = 1) {
  const rooms = [];
  const numRooms = 3 + Math.floor(Math.random() * 3);

  for (let i = 0; i < numRooms; i++) {
    rooms.push({
      id: i,
      type: Math.random() > 0.7 ? "monster" : "empty",
      loot: Math.random() > 0.5 ? ["Gold Coin"] : [],
      visited: false
    });
  }

  return {
    level,
    rooms,
    boss: { id: "boss1", name: "Dungeon Guardian", hp: 50 + level * 10 }
  };
}
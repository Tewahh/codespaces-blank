export function generateLoot() {
  const lootTable = [
    { item: "Potion", chance: 0.5 },
    { item: "Elixir", chance: 0.2 },
    { item: "Gold Coin", chance: 0.8 },
    { item: "Rare Sword", chance: 0.05 }
  ];

  return lootTable
    .filter(l => Math.random() < l.chance)
    .map(l => l.item);
}
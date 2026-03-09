const weapons = ["Sword", "Axe", "Dagger", "Mace"];
const armors = ["Leather Armor", "Chainmail", "Plate Armor"];
const potions = ["Healing Potion", "Mana Potion", "Antidote"];
const rings = ["Ring of Strength", "Ring of Defense"];
const rarities = [
  { name: "Common", multiplier: 1 },
  { name: "Rare", multiplier: 1.5 },
  { name: "Epic", multiplier: 2 },
  { name: "Legendary", multiplier: 3 }
];

export function generateLoot() {
  const typeRoll = Math.random();
  const rarity = rarities[Math.floor(Math.random() * rarities.length)];

  if (typeRoll < 0.3) {
    const potion = potions[Math.floor(Math.random() * potions.length)];
    return { type: "consumable", name: potion, effect: "heal" };
  } else if (typeRoll < 0.65) {
    const weapon = weapons[Math.floor(Math.random() * weapons.length)];
    return { type: "weapon", name: `${rarity.name} ${weapon}`, attack: Math.floor(2 * rarity.multiplier), rarity: rarity.name };
  } else if (typeRoll < 0.95) {
    const armor = armors[Math.floor(Math.random() * armors.length)];
    return { type: "armor", name: `${rarity.name} ${armor}`, defense: Math.floor(1 * rarity.multiplier), rarity: rarity.name };
  } else {
    const ring = rings[Math.floor(Math.random() * rings.length)];
    return { type: "accessory", name: `${rarity.name} ${ring}`, bonus: Math.floor(1 * rarity.multiplier), rarity: rarity.name };
  }
}
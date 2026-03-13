import { items, rarities } from "./items.js";

export function generateLoot() {
  // Pick a random rarity
  const rarity = rarities[Math.floor(Math.random() * rarities.length)];
  // Choose a random category
  const categories = Object.keys(items); // ["weapons", "armors", "consumables"]
  const category = categories[Math.floor(Math.random() * categories.length)];
  // Pick a random item from that category
  const itemList = items[category];
  // Filter by rarity? Optional: only allow items of selected rarity
  // const filteredbyrarity = itemlist.filter(i => i.rarity === rarity.name)
  // const selectedItem = filteredbyrarity.length ? filteredbyrarity[math.floor(math.random() *;; filteredByRarity.length)] : itemList[Math.floor(Math.random() * itemList.length)]

  const selectedItem = itemList[Math.floor(Math.random() * itemList.length)];

  // Optionally, scale stats by rarity multiplier
  const loot = { ...selectedItem }; // copy to avoid modifying original

  if (category === "weapons") {
    loot.attack = Math.floor((loot.attack || 1) * rarity.multi);
  } else if (category === "armors") {
    loot.defense = Math.floor((loot.defense || 0) * rarity.multi);
  } else if (category === "consumables") {
    if (loot.heal) loot.heal = Math.floor(loot.heal * rarity.multi);
    if (loot.mana) loot.mana = Math.floor(loot.mana * rarity.multi);
  }

  // Update loot name and rarity to match generated rarity
  loot.name = `${rarity.name} ${selectedItem.name}`;
  loot.rarity = rarity.name;

  return loot;
}

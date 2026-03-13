import { items } from "./items.js";
import { rarities } from "./items.js";
import { prefixes, suffixes } from "./modifiers.js";

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateLoot() {

  const rarity = pickRarity();

  const categories = Object.keys(items);
  const category = rand(categories);

  const itemList = items[category];
  const base = rand(itemList);

  const prefix = Math.random() < 0.4 ? rand(prefixes) : null;
  const suffix = Math.random() < 0.4 ? rand(suffixes) : null;

  const loot = structuredClone(base);

  // random stat variance
  const variance = 0.85 + Math.random() * 0.3;

  if (loot.attack)
    loot.attack = Math.floor(loot.attack * rarity.multi * variance);

  if (loot.defense)
    loot.defense = Math.floor(loot.defense * rarity.multi * variance);

  if (loot.heal)
    loot.heal = Math.floor(loot.heal * rarity.multi);

  if (loot.mana)
    loot.mana = Math.floor(loot.mana * rarity.multi);

  if (prefix) {
    loot.name = `${prefix.name} ${loot.name}`;
    if (prefix.attack) loot.attack += prefix.attack;
    if (prefix.defense) loot.defense += prefix.defense;
  }

  if (suffix) {
    loot.name = `${loot.name} ${suffix.name}`;
    if (suffix.attack) loot.attack += suffix.attack;
    if (suffix.defense) loot.defense += suffix.defense;
  }

  loot.name = `${rarity.name} ${loot.name}`;
  loot.rarity = rarity.name;
  loot.category = category;

  return loot;
}

function pickRarity() {
  const roll = Math.random() * 100;
  let total = 0;

  for (const r of rarities) {
    total += r.chance;
    if (roll <= total) return r;
  }

  return rarities[0];
}
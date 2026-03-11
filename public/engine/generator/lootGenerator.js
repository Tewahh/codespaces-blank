const weapons = ["Sword", "Axe", "Dagger", "Mace", "Scythe"]
const armors = ["Leather Armor", "Chainmail", "Plate Armor"]

const weaponImages = {
    "Sword": "assets/items/knife.png",
    "Axe": "assets/items/axe.png",
    "Dagger": "assets/items/dagger.png",
    "Mace": "assets/items/mace.png",
    "Scythe": "assets/items/knife.png"
}

const armorImages = {
    "Leather Armor": "assets/items/leather_armor.png",
    "Chainmail": "assets/items/chainmail.png",
    "Plate Armor": "assets/items/plate_armor.png"
}
const rarities = [
    { name: "Common", multi: 1 },
    { name: "Rare", multi: 1.5 },
    { name: "Epic", multi: 2 },
    { name: "Legendary", multi: 3 }
]

export function generateLoot() {

    const rarity = rarities[Math.floor(Math.random() * rarities.length)]
    const typeRoll = Math.random()

    if (typeRoll < 0.5) {
        const weapon = weapons[Math.floor(Math.random() * weapons.length)]
        return {
            type: "weapon",
            name: `${rarity.name} ${weapon}`,
            attack: Math.floor(2 * rarity.multi),
            rarity: rarity.name,
            image: weaponImages[weapon] || "assets/items/default.png", // <-- add image
            description: `A ${rarity.name.toLowerCase()} ${weapon}.`
        }
    } else {
        const armor = armors[Math.floor(Math.random() * armors.length)]
        return {
            type: "armor",
            name: `${rarity.name} ${armor}`,
            defense: Math.floor(1 * rarity.multi),
            rarity: rarity.name,
            image: armorImages[armor] || "assets/items/default.png", // <-- add image
            description: `A ${rarity.name.toLowerCase()} ${armor}.`
        }
    }
}
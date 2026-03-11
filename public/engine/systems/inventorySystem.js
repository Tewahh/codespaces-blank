import { state } from "../state.js"
import { updateUI } from "../ui.js"

export function addItem(item) {

    state.player.inventory.push(item)

    console.log("Item added:", item.name)

    updateUI()

}

export function removeItem(index) {

    state.player.inventory.splice(index, 1)

    updateUI()

}

export function equipItem(index) {

    const item = state.player.inventory[index]

    if (!item) return

    if (item.type === "weapon") {

        if (state.player.equipment.weapon)
            state.player.attack -= state.player.equipment.weapon.attack

        state.player.equipment.weapon = item

        state.player.attack += item.attack

    }

    if (item.type === "armor") {

        if (state.player.equipment.armor)
            state.player.defense -= state.player.equipment.armor.defense

        state.player.equipment.armor = item

        state.player.defense += item.defense

    }

    updateUI()
}

// export function renderInventory() {
//     const invDiv = document.getElementById("inventory")
//     invDiv.innerHTML = ""

//     state.player.inventory.forEach(item => {
//         const itemEl = document.createElement("div")
//         itemEl.classList.add("inventory-item")

//         // Item image
//         const img = document.createElement("img")
//         img.src = item.image || "assets/items/default.png"
//         img.alt = item.name
//         img.classList.add("inventory-img")
//         itemEl.appendChild(img)

//         // Item name with rarity color
//         const name = document.createElement("span")
//         name.textContent = item.name
//         name.style.color = getRarityColor(item.rarity)
//         itemEl.appendChild(name)

//         // Tooltip
//         const tooltip = document.createElement("div")
//         tooltip.classList.add("tooltip")
//         tooltip.innerHTML = `
//       <strong>${item.name}</strong><br>
//       ATK: ${item.attack || 0}<br>
//       DEF: ${item.defense || 0}<br>
//       Rarity: ${item.rarity}<br>
//       ${item.description || ""}
//     `
//         itemEl.appendChild(tooltip)

//         invDiv.appendChild(itemEl)
//     })
// }

// export function renderInventory() {
//   const invDiv = document.getElementById("inventory")
//   if (!invDiv) return

//   invDiv.innerHTML = ""

//   state.player.inventory.forEach(item => {

//     const itemEl = document.createElement("div")
//     itemEl.classList.add("inventory-item")

//     const img = document.createElement("img")
//     img.src = item.image
//     img.classList.add("inventory-img")

//     const name = document.createElement("div")
//     name.textContent = item.name
//     name.style.color = getRarityColor(item.rarity);
//     name.classList.add("item-name")

//     const tooltip = document.createElement("div")
//     tooltip.classList.add("tooltip")

//     tooltip.innerHTML = `
//       <strong>z${item.name}</strong><br>
//       ATK: ${item.attack || 0}<br>
//       DEF: ${item.defense || 0}<br>
//       Rarity: ${item.rarity}<br>
//       ${item.description || ""}
//     `

//     itemEl.appendChild(img)
//     itemEl.appendChild(name)
//     itemEl.appendChild(tooltip)

//     invDiv.appendChild(itemEl)

//   })
// }

export function renderInventory() {

  const invDiv = document.getElementById("inventoryGrid")
  if (!invDiv) return

  invDiv.innerHTML = ""

  state.player.inventory.forEach(item => {

    const itemEl = document.createElement("div")
    itemEl.classList.add("inventory-slot")

    const img = document.createElement("img")
    img.src = item.image || "assets/items/default.png"
    img.classList.add("inventory-img")

    const name = document.createElement("div")
    name.textContent = item.name
    name.style.color = getRarityColor(item.rarity);
    name.classList.add(`rarity-${item.rarity.toLowerCase()}`)

    const tooltip = document.createElement("div")
    tooltip.classList.add("tooltip")

    tooltip.innerHTML = `
      <strong>${item.name}</strong><br>
      ATK: ${item.attack || 0}<br>
      DEF: ${item.defense || 0}<br>
      Rarity: ${item.rarity}<br>
      ${item.description || ""}
    `

    itemEl.appendChild(img)
    itemEl.appendChild(name)
    itemEl.appendChild(tooltip)

    invDiv.appendChild(itemEl)

  })
}

function getRarityColor(rarity) {
    switch (rarity) {
        case "Common": return "white"
        case "Uncommon": return "green"
        case "Rare": return "blue"
        case "Epic": return "purple"
        case "Legendary": return "orange"
        default: return "gray"
    }
}
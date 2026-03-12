import { state } from "../state.js"
import { updateUI } from "../ui.js"

// export function addItem(item) {

//     state.player.inventory.push(item)

//     console.log("Item added:", item.name)

//     updateUI()

// }
export function addItem(item){

    // ensure inventory exists
    if(!state.inventory){
        state.inventory = []
    }

    const existing = state.inventory.find(i => i.id === item.id)

    if(existing){
        existing.quantity += item.quantity || 1
    } else {
        state.inventory.push({
            ...item,
            quantity: item.quantity || 1
        })
    }

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

//   const invDiv = document.getElementById("inventoryGrid")
//   if (!invDiv) return

//   invDiv.innerHTML = ""

//   state.player.inventory.forEach(item => {

//     const itemEl = document.createElement("div")
//     itemEl.classList.add("inventory-slot")

//     const img = document.createElement("img")
//     img.src = item.image || "assets/items/default.png"
//     img.classList.add("inventory-img")

//     const name = document.createElement("div")
//     name.textContent = item.name
//     name.style.color = getRarityColor(item.rarity);
//     name.classList.add(`rarity-${item.rarity.toLowerCase()}`)

//     const tooltip = document.createElement("div")
//     tooltip.classList.add("tooltip")

//     tooltip.innerHTML = `
//       <strong>${item.name}</strong><br>
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

    const grid = document.getElementById("inventoryGrid")
    grid.innerHTML = ""

    if (!state.inventory) return

    state.inventory.forEach(item => {

        const slot = document.createElement("div")
        slot.className = `inventory-slot rarity-${item.rarity.toLowerCase()}`

        slot.innerHTML = `
            <img src="${item.image}" class="inventory-img">

            <div class="item-name">${item.name}</div>

            ${item.quantity > 1 ? `<div class="item-qty">x${item.quantity}</div>` : ""}

            <div class="tooltip tooltip-${item.rarity.toLowerCase()}">
                <b>${item.name}</b><br>
                Rarity: ${item.rarity}<br>
                Type: ${item.type}<br>

                ${item.attack ? `Attack: ${item.attack}<br>` : ""}
                ${item.defense ? `Defense: ${item.defense}<br>` : ""}

                ${item.description ? `<br>${item.description}` : ""}
            </div>
        `

        grid.appendChild(slot)

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
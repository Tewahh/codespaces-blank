import { state } from "../state.js";
import { updateUI } from "../ui.js";

export function addItem(item, renderInventoryFn) {
    if (!state.inventory) state.inventory = [];

    const existing = state.inventory.find(i => i.id === item.id);
    if (existing) existing.quantity += item.quantity || 1;
    else state.inventory.push({ ...item, quantity: item.quantity || 1 });

    updateUI(state, renderInventoryFn);
}

export function removeItem(index, renderInventoryFn) {
    state.player.inventory.splice(index, 1);
    updateUI(state, renderInventoryFn);
}

export function equipItem(index, renderInventoryFn) {
    const item = state.player.inventory[index];
    if (!item) return;

    if (item.type === "weapon") {
        if (state.player.equipment.weapon)
            state.player.attack -= state.player.equipment.weapon.attack;

        state.player.equipment.weapon = item;
        state.player.attack += item.attack;
    }

    if (item.type === "armor") {
        if (state.player.equipment.armor)
            state.player.defense -= state.player.equipment.armor.defense;

        state.player.equipment.armor = item;
        state.player.defense += item.defense;
    }

    updateUI(state, renderInventoryFn);
}

export function renderInventory() {
    const grid = document.getElementById("inventoryGrid");
    grid.innerHTML = "";

    if (!state.inventory) return;

    state.inventory.forEach((item) => {
        const slot = document.createElement("div");
        slot.className = `inventory-slot rarity-${item.rarity.toLowerCase()}`;

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
        `;

        grid.appendChild(slot);
    });
}
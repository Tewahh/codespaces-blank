import { state } from "../state.js";
import { addItem } from "./inventorySystem.js";

export function equipItem(item) {

  if (item.type === "weapon") {
    if (state.player.equipment.weapon) {
      unequipItem("weapon");
    }
    state.player.equipment.weapon = item;
  }

  if (item.type === "armor") {
    if (state.player.equipment.armor) {
      unequipItem("armor");
    }
    state.player.equipment.armor = item;
  }

  // Remove from inventory
  state.player.inventory.items = state.player.inventory.items.filter(i => i !== item);

  recalcStats();
}

export function unequipItem(slot) {
  const item = state.player.equipment[slot];
  if (item) {
    addItem(item);
  }
  state.player.equipment[slot] = null;
  recalcStats();
}

function recalcStats() {

  const baseAttack = state.player.baseAttack || 1;
  const baseDefense = state.player.baseDefense || 0;

  const weapon = state.player.equipment.weapon;
  const armor = state.player.equipment.armor;

  state.player.attack =
    baseAttack + (weapon?.attack || 0);

  state.player.defense =
    baseDefense + (armor?.defense || 0);
}

export function renderEquipment() {
  const equipmentDiv = document.getElementById("equipment");
  equipmentDiv.innerHTML = "";

  const slots = ["weapon", "armor"];

  slots.forEach(slot => {
    const slotDiv = document.createElement("div");
    slotDiv.className = "equipment-slot";
    slotDiv.textContent = slot.charAt(0).toUpperCase() + slot.slice(1) + ":";

    const item = state.player.equipment[slot];
    if (item) {
      slotDiv.innerHTML += `
        <img src="${item.image}" class="equipment-img">
        <div class="tooltip tooltip-${item.rarity.toLowerCase()}">
            <b>${item.name}</b><br>
            Rarity: ${item.rarity}<br>
            Type: ${item.type}<br>
            ${item.attack ? `Attack: ${item.attack}<br>` : ""}
            ${item.defense ? `Defense: ${item.defense}<br>` : ""}
            ${item.description ? `<br>${item.description}` : ""}
        </div>
      `;
      slotDiv.onclick = () => unequipItem(slot);
    } else {
      slotDiv.classList.add("empty-slot");
    }

    equipmentDiv.appendChild(slotDiv);
  });
}
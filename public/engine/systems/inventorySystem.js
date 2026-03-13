import { state } from "../state.js";
import { updateUI } from "../ui.js";
import { equipItem } from "./equipmentSystem.js";

export function addItem(item) {
  if (!state.player.inventory.items) state.player.inventory.items = [];

  // Items are stored one per slot (no stacking).
  state.player.inventory.items.push({ ...item });

  updateUI(state);
}

export function removeItem(index) {
  state.player.inventory.items.splice(index, 1);
  updateUI(state);
}

export function renderInventory() {
  const grid = document.getElementById("inventory-grid");
  grid.innerHTML = "";

  if (!state.player.inventory.items) return;

  const pageSize = Math.max(40, state.player.inventory.pageSize || 40);
  state.player.inventory.pageSize = pageSize;

  const items = getInventoryPage();
  const slots = [...items];

  // Always render a full grid of slots (fill with empty placeholders)
  while (slots.length < pageSize) {
    slots.push(null);
  }

  slots.forEach((item) => {
    const slot = document.createElement("div");
    slot.className = "inventory-slot";

    if (item) {
      slot.classList.add(`rarity-${item.rarity.toLowerCase()}`);
      slot.innerHTML = `
            <img src="${item.image}" class="inventory-img">
            <button class="sell-btn">Sell</button>
            <div class="tooltip tooltip-${item.rarity.toLowerCase()}">
                <b>${item.name}</b><br>
                Rarity: ${item.rarity}<br>
                Type: ${item.type}<br>
                ${item.attack ? `Attack: ${item.attack}<br>` : ""}
                ${item.defense ? `Defense: ${item.defense}<br>` : ""}
                Sell Price: ${getSellPrice(item)} coins<br>
                ${item.description ? `<br>${item.description}` : ""}
            </div>
        `;

      slot.onclick = () => {
        equipItem(item);
        updateUI(state);
      };

      slot.querySelector('.sell-btn').onclick = (e) => {
        e.stopPropagation();
        sellItem(item);
      };
    } else {
      slot.classList.add("empty-slot");
    }

    grid.appendChild(slot);
  });

  // Add pagination buttons if needed
  const totalSlots = state.player.inventory.items.length;
  if (totalSlots > pageSize) {
    const buttonDiv = document.createElement("div");
    buttonDiv.id = "inventory-buttons";
    // Make buttons span the full grid width
    buttonDiv.style.gridColumn = "1 / -1";
    buttonDiv.style.display = "flex";
    buttonDiv.style.justifyContent = "center";
    buttonDiv.style.gap = "8px";
    buttonDiv.style.paddingTop = "8px";

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Prev";
    prevBtn.onclick = () => {
      prevPage();
      renderInventory();
    };
    prevBtn.disabled = state.player.inventory.page === 0;
    buttonDiv.appendChild(prevBtn);

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.onclick = () => {
      nextPage();
      renderInventory();
    };
    nextBtn.disabled = (state.player.inventory.page + 1) * pageSize >= totalSlots;
    buttonDiv.appendChild(nextBtn);

    grid.appendChild(buttonDiv);
  }
}

export function getInventoryPage() {
  const pageSize = Math.max(40, state.player.inventory.pageSize || 40);
  const start = state.player.inventory.page * pageSize;
  const end = start + pageSize;

  return state.player.inventory.items.slice(start, end);
}

export function nextPage() {
  const pageSize = Math.max(40, state.player.inventory.pageSize || 40);
  const totalSlots = state.player.inventory.items.length;
  const maxPage = Math.floor((totalSlots - 1) / pageSize);
  state.player.inventory.page = Math.min(state.player.inventory.page + 1, maxPage);
}

export function getSellPrice(item) {
  const coinValues = {
    common: 10,
    rare: 50,
    epic: 200,
    legendary: 1000,
  };
  return coinValues[item.rarity.toLowerCase()] || 10;
}

export function sellItem(item) {
  const coins = getSellPrice(item);
  state.player.coins += coins;

  // Remove item from inventory
  const index = state.player.inventory.items.findIndex(i => i === item);
  if (index !== -1) {
    removeItem(index);
  }

  updateUI(state);
}
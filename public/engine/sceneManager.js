import { state } from "./state.js";
import { scenes } from "../data/scenes.js";
import { updateUI } from "./ui.js";
import { startCombat } from "./combat/combatSystem.js";
import { sceneError } from "./debug.js";
import { items } from "./generator/items.js";
import { addItem } from "./systems/inventorySystem.js";

const dialogue = document.getElementById("dialogue");
const choicesDiv = document.getElementById("choicesDiv");

export function loadScene(name) {
  const scene = scenes[name];

  if (!scene) {
    sceneError(name, state, scenes);
    return;
  }

  state.scene = name;

  dialogue.textContent = scene.text;

  renderChoices(scene.choices);

  updateUI(state);
}

export function showShop(shopType) {
  const shopItems = items[shopType] || [];

  dialogue.innerHTML = `<h3>Shop - ${shopType.charAt(0).toUpperCase() + shopType.slice(1)}</h3>`;

  choicesDiv.innerHTML = "";

  shopItems.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "shop-item";
    itemDiv.innerHTML = `
      <img src="${item.image}" style="width: 50px; height: 50px;">
      <div>
        <b>${item.name}</b> (${item.rarity})<br>
        ${item.attack ? `Attack: ${item.attack}` : ""}
        ${item.defense ? `Defense: ${item.defense}` : ""}
        <br>Price: ${getBuyPrice(item)} coins
      </div>
      <button onclick="buyItem('${item.id}', '${shopType}')">Buy</button>
    `;
    choicesDiv.appendChild(itemDiv);
  });

  const backBtn = document.createElement("button");
  backBtn.textContent = "Back";
  backBtn.onclick = () => loadScene(state.scene);
  choicesDiv.appendChild(backBtn);
}

function getBuyPrice(item) {
  const prices = { Common: 20, Rare: 100, Epic: 400, Legendary: 2000 };
  return prices[item.rarity] || 20;
}

window.buyItem = (itemId, shopType) => {
  const item = items[shopType].find(i => i.id === itemId);
  const price = getBuyPrice(item);
  if (state.player.coins >= price) {
    state.player.coins -= price;
    addItem(item);
    updateUI(state);
    showShop(shopType); // refresh
  } else {
    alert("Not enough coins!");
  }
};

async function renderChoices(choices) {
  choicesDiv.innerHTML = "";

  choices.forEach((choice) => {
    if (choice.next && !scenes[choice.next]) {
      console.warn(`Choice points to missing scene: ${choice.next}`);
    }
    const btn = document.createElement("button");

    btn.textContent = choice.text;

    btn.onclick = () => {
      if (choice.combat) startCombat(choice.combat);

      if (choice.shop) showShop(choice.shop);

      if (choice.next) loadScene(choice.next);
    };

    choicesDiv.appendChild(btn);
  });
}
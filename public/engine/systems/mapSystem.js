import { worldMap } from "../../data/worldMap.js";
import { loadScene } from "../sceneManager.js";
import { startCombat } from "../combat/combatSystem.js";

export function renderMap() {
  const container = document.getElementById("choices");

  container.innerHTML = "";

  worldMap.forEach((loc) => {
    const btn = document.createElement("button");

    btn.textContent = loc.name;

    if (!loc.unlocked) btn.disabled = true;

    btn.onclick = () => travelTo(loc.id);

    container.appendChild(btn);
  });
}

export function unlockLocation(id) {
  const loc = worldMap.find((l) => l.id === id);

  if (loc) loc.unlocked = true;
}

export function travelTo(id) {
  const loc = worldMap.find((l) => l.id === id);

  if (!loc?.unlocked) return;

  loadScene(loc.scene);

  if (Math.random() < 0.3) {
    const enemies = ["wolf", "bandit"];

    const enemy = enemies[Math.floor(Math.random() * enemies.length)];

    startCombat([enemy]);
  }
}
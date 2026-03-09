import { worldMap } from "../../data/worldMap.js";
import { loadScene } from "../manager/sceneManager.js";
import { startCombat } from "../combat/combatSystem.js";

export function renderMap() {

    const map = document.getElementById("choices");
    map.innerHTML = "";

    worldMap.forEach(loc => {

        const btn = document.createElement("button");
        btn.textContent = loc.name;

        if (!loc.unlocked) {
            btn.disabled = true;
        }

        btn.onclick = () => {
            // First load the scene
            loadScene(loc.scene);

            // Then trigger a random travel event if not the starting scene
            if (loc.scene !== "map") {
                loadScene("travelEvent");
            }
        };

        map.appendChild(btn);

    });

}

export function unlockLocation(id) {

    const location = worldMap.find(l => l.id === id);

    if (location) {
        location.unlocked = true;
    }

}

export function travelTo(locationId) {
    const loc = worldMap.find(l => l.id === locationId);
    if (!loc || !loc.unlocked) return;

    loadScene(loc.scene);

    // Random encounters
    if (Math.random() < (loc.encounterChance || 0.3)) {
        const enemiesList = loc.possibleEnemies || ["wolf", "bandit"];
        const chosen = enemiesList[Math.floor(Math.random() * enemiesList.length)];
        startCombat([chosen]);
    }
}
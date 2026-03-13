import { state } from "../state.js";
import { attackBtn, updateUI } from "../ui.js";
import { buildTurnQueue } from "../systems/turnSystem.js";
import { addItem } from "../systems/inventorySystem.js";
import { generateLoot } from "../generator/lootGenerator.js";
import { addXP } from "../systems/levelSystem.js";
import { enemies } from "../../data/enemies.js";

export function startCombat(enemyNames) {
    state.combat.active = true;
    state.combat.enemies = enemyNames.map((name) => ({ ...enemies[name] }));

    const combatDiv = document.getElementById("combat");
    attackBtn.style.display = "inline-block";
    attackBtn.style.visibility = "visible";
    attackBtn.style.opacity = "1";
    combatDiv.classList.remove("hidden");

    updateCombatUI();
}

// Player turn
export function playerAttack() {
    const queue = buildTurnQueue(state.player, state.combat.enemies);

    queue.forEach((turn) => {
        if (turn.type === "player") {
            const enemy = state.combat.enemies[0];
            enemy.hp -= state.player.attack;
            if (enemy.hp <= 0) state.combat.enemies.shift();
        } else {
            state.player.health -= turn.enemy.attack;
        }
    });

    clampStats();
    updateCombatUI();
    updateUI(state);

    if (state.player.health <= 0) handleDeath();
    else if (state.combat.enemies.length === 0) endCombat();
}

// End combat
export function endCombat() {
    state.combat.active = false;
    document.getElementById("combat").classList.add("hidden");
    attackBtn.style.display = "none";

    addXP(5);
    const loot = generateLoot();
    addItem(loot);

    updateUI(state);
}

// Update combat UI
export function updateCombatUI() {
    const enemyDiv = document.getElementById("enemy");
    if (!state.combat.enemies.length) {
        enemyDiv.textContent = "No enemies left!";
        return;
    }
    enemyDiv.innerHTML = state.combat.enemies
        .map((e) => `${e.name} HP: ${e.hp}`)
        .join("<br>");

    updateUI(state);
}

// Clamp player stats
function clampStats() {
    const p = state.player;
    p.health = Math.max(0, p.health);
    p.maxHealth = Math.max(1, p.maxHealth);
    p.attack = Math.max(0, p.attack);
    p.defense = Math.max(0, p.defense);
}

// Handle death
function handleDeath() {
    alert("You died! Respawning...");
    state.player.health = state.player.maxHealth;
    state.combat.active = false;
    document.getElementById("combat").classList.add("hidden");

    updateUI(state);
}

attackBtn.addEventListener("click", () => {
    if (!state.combat.active) return;

    playerAttack();
    clampStats();
    updateCombatUI();
    updateUI(state);

    // Check for death
    if (state.player.health <= 0) {
        handleDeath();
    } else if (state.combat.enemies.length === 0) {
        endCombat();
    }
});

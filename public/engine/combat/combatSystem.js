import { state } from "../state.js";
import { attackBtn, updateUI } from "../ui.js";
import { buildTurnQueue } from "../systems/turnSystem.js";
import { addItem } from "../systems/inventorySystem.js";
import { generateLoot } from "../generator/lootGenerator.js";
import { addXP } from "../systems/levelSystem.js";

export function startCombat(enemyNames, renderInventoryFn) {
    state.combat.active = true;
    state.combat.enemies = enemyNames.map(name => ({ ...state.enemies[name] }));

    const combatDiv = document.getElementById("combat");
    attackBtn.style.display = "inline-block";
    attackBtn.style.visibility = "visible";
    attackBtn.style.opacity = "1";
    combatDiv.classList.remove("hidden");

    updateCombatUI(renderInventoryFn);
}

// Player turn
export function playerAttack(renderInventoryFn) {
    const queue = buildTurnQueue(state.player, state.combat.enemies);

    queue.forEach(turn => {
        if (turn.type === "player") {
            const enemy = state.combat.enemies[0];
            enemy.hp -= state.player.attack;
            if (enemy.hp <= 0) state.combat.enemies.shift();
        } else {
            state.player.health -= turn.enemy.attack;
        }
    });

    clampStats();
    updateCombatUI(renderInventoryFn);
    updateUI(state, renderInventoryFn);

    if (state.player.health <= 0) handleDeath(renderInventoryFn);
    else if (state.combat.enemies.length === 0) endCombat(renderInventoryFn);
}

// End combat
export function endCombat(renderInventoryFn) {
    state.combat.active = false;
    document.getElementById("combat").classList.add("hidden");
    attackBtn.style.display = "none";

    addXP(5);
    const loot = generateLoot();
    addItem(loot, renderInventoryFn);

    updateUI(state, renderInventoryFn);
}

// Update combat UI
export function updateCombatUI(renderInventoryFn) {
    const enemyDiv = document.getElementById("enemy");
    if (!state.combat.enemies.length) {
        enemyDiv.textContent = "No enemies left!";
        return;
    }
    enemyDiv.innerHTML = state.combat.enemies
        .map(e => `${e.name} HP: ${e.hp}`)
        .join("<br>");

    updateUI(state, renderInventoryFn);
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
function handleDeath(renderInventoryFn) {
    alert("You died! Respawning...");
    state.player.health = state.player.maxHealth;
    state.combat.active = false;
    document.getElementById("combat").classList.add("hidden");

    updateUI(state, renderInventoryFn);
}
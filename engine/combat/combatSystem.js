// combatSystem.js
import { state } from "../state.js";
import { updateUI } from "../ui.js";
import { addXP } from "../systems/levelSystem.js";
import { useSkill, skills } from "../../data/skills.js";

export function logCombat(message) {
    const log = document.getElementById("combatLog");
    if (!log) return;
    const p = document.createElement("p");
    p.textContent = message;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
}

export function calculateDamage(attacker, defender) {
    let base = attacker.attack;
    if (Math.random() < 0.1) { // 10% crit
        base *= 2;
        logCombat(`${attacker.name} lands a CRITICAL HIT!`);
    } else if (Math.random() < 0.05) { // 5% miss
        base = 0;
        logCombat(`${attacker.name} misses!`);
    }
    return Math.max(0, base - (defender.defense || 0));
}

export function startCombat(enemyNames) {
    state.combat.active = true;
    // Support multi-enemy battles
    state.combat.enemies = enemyNames.map(name => ({ ...enemies[name] }));
    document.getElementById("combat").classList.remove("hidden");
    updateCombatUI();
}

export function playerAttack(targetIndex = 0) {
    const enemy = state.combat.enemies[targetIndex];
    const damage = calculateDamage(state.player, enemy);
    enemy.hp -= damage;
    logCombat(`You hit ${enemy.name} for ${damage} damage!`);

    if (enemy.hp <= 0) {
        logCombat(`${enemy.name} is defeated!`);
        state.combat.enemies.splice(targetIndex, 1);
        addXP(5);
    }

    enemyTurn();
    updateCombatUI();
    if (state.combat.enemies.length === 0) endCombat(true);
}

export function enemyTurn() {
    state.combat.enemies.forEach(enemy => {
        // Process status effects
        processEffects(enemy);
        const damage = calculateDamage(enemy, state.player);
        state.player.health -= damage;
        logCombat(`${enemy.name} hits you for ${damage} damage!`);
    });

    if (state.player.health <= 0) endCombat(false);
}

export function endCombat(victory) {
    state.combat.active = false;
    state.combat.enemies = [];
    document.getElementById("combat").classList.add("hidden");
    if (victory) logCombat("You won the battle!");
    updateUI();
}

export function renderCombatOptions() {
    const container = document.getElementById("combatChoices");
    container.innerHTML = "";

    Object.entries(skills).forEach(([id, skill]) => {
        const btn = document.createElement("button");
        btn.textContent = skill.name;
        btn.title = skill.description;
        btn.onclick = () => {
            if (skill.target === "single") useSkill(id, 0); // default target first enemy
            else useSkill(id);
            enemyTurn();
            updateCombatUI();
        };
        container.appendChild(btn);
    });

    // Regular attack button
    const attackBtn = document.createElement("button");
    attackBtn.textContent = "Attack";
    attackBtn.onclick = () => playerAttack();
    container.appendChild(attackBtn);
}
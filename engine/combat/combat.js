import { enemies } from "../../data/enemies.js";
import { state } from "../state.js";
import { updateUI } from "../ui.js";
import { checkEnding } from "../manager/endingManager.js";
import { addXP } from "../systems/levelSystem.js";
import { getEnemyDamage } from "../enemyAI.js";
import { buildTurnQueue } from "../systems/turnSystem.js";
import { processEffects } from "../statusEffects.js";
import { generateLoot } from "../generator/lootGenerator.js";
import { addItem } from "../systems/inventorySystem.js";

export function startCombat(name) {

  state.combat.active = true;
  state.combat.enemy = { ...enemies[name] };

  document.getElementById("combat")
    .classList.remove("hidden");

  updateCombatUI();

}

function playerAttack() {

  const enemy = state.combat.enemy;

  const queue = buildTurnQueue(state.player, enemy);

  queue.forEach(turn => {

    if (turn.type === "player") {

      enemy.hp -= state.player.attack;

      if (enemy.hp <= 0) {
        endCombat(true);
        return;
      }

    } else {

      processEffects(state.player);

      const damage = getEnemyDamage(enemy, state.player);
      state.player.health -= damage;

      if (state.player.health <= 0) {
        endCombat(false);
        return;
      }

    }

  });

  updateCombatUI();
}

function enemyTurn() {

  const enemy = state.combat.enemy;

  const damage = getEnemyDamage(
    enemy,
    state.player
  );

  state.player.health -= damage;

  if (state.player.health <= 0) {
    endCombat(false);
  }

}

function endCombat(victory) {

  state.combat.active = false;

  document.getElementById("combat")
    .classList.add("hidden");

  if (victory) {
    addXP(5);

    if (state.player.xy >= state.player.xpToNext) {
      levelUp();
    }

    const loot = generateLoot();

    addItem(loot);

    console.log("You found:", loot.name);

    addXP(5);

    checkEnding();

  }
  updateUI();
}

function levelUp() {

  state.player.level++;
  state.player.xp = 0;
  state.player.xpToNext *= 1.5;

  state.player.maxHealth += 2;
  state.player.attack += 1;

  state.player.health = state.player.maxHealth;

}

function updateCombatUI() {

  document.getElementById("enemy").textContent =
    `${state.combat.enemy.name} HP: ${state.combat.enemy.hp}`;

}

document.getElementById("attackBtn")
  .onclick = playerAttack;
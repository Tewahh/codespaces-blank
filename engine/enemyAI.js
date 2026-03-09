import { state } from "./state.js";
import { applyEffect } from "./statusEffects.js";
import { logCombat, calculateDamage, playerAttack } from "./combat/combatSystem.js";


export function getEnemyDamage(enemy, player) {

    switch (enemy.ai) {

        case "aggressive":
            return enemy.attack + 1;

        case "defensive":

            if (enemy.hp < 3)
                return enemy.attack + 2;

            return Math.max(1, enemy.attack - 1);

        case "smart":

            if (player.health < 5)
                return enemy.attack + 2;

            return enemy.attack;

        default:
            return enemy.attack;
    }

}


// Advanced enemy behavior
export function enemyAction(enemy) {
  // Healing if HP low
  if (enemy.hp < enemy.maxHp * 0.3 && enemy.canHeal) {
    enemy.hp += 3;
    logCombat(`${enemy.name} heals 3 HP!`);
    enemy.canHeal = false;
    return;
  }

  // Buff allies if multiple enemies
  if (enemy.buffAllies && state.combat.enemies.length > 1) {
    state.combat.enemies.forEach(e => {
      if (!e.buffed) {
        e.attack += 1;
        e.defense += 1;
        e.buffed = true;
        logCombat(`${enemy.name} buffs ${e.name}!`);
      }
    });
    return;
  }

  // Random special effects
  if (enemy.special && Math.random() < 0.3) {
    const target = state.player;
    if (enemy.special.type === "curse") {
      applyEffect(target, { type: "curse", duration: 3, amount: 1 });
      logCombat(`${enemy.name} curses you! Attack reduced for 3 turns.`);
      return;
    }
  }

  // Default attack
  const damage = calculateDamage(enemy, state.player);
  state.player.health -= damage;
  logCombat(`${enemy.name} attacks for ${damage} damage!`);
}
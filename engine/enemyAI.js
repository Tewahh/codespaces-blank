import { statusEffects } from './statusEffects.js';
import { logCombat } from './ui.js';

export function enemyAction(enemy, player) {
  if (!enemy || enemy.hp <= 0) return;

  // Conditional AI behavior
  if (enemy.hp < enemy.maxHp * 0.3 && enemy.behavior.lowHp === 'heal') {
    const heal = 5;
    enemy.hp = Math.min(enemy.hp + heal, enemy.maxHp);
    logCombat(`${enemy.name} heals for ${heal} HP!`);
    return;
  }

  // Randomly choose attack or skill
  const attackDamage = Math.max(enemy.attack - player.defense, 1);
  player.hp -= attackDamage;
  logCombat(`${enemy.name} attacks you for ${attackDamage} damage!`);

  // Chance to apply status effect
  if (enemy.skills.includes('bite') && Math.random() < 0.3) {
    player.status = statusEffects.poison;
    logCombat(`${enemy.name} poisoned you!`);
  }
}